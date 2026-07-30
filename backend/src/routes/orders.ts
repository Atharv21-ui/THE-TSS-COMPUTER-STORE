import { Router, Request, Response } from 'express';
import { ordersCollection } from '../models/Order';
import { FieldValue } from 'firebase-admin/firestore';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/orders - Fetch all orders (Admin only)
router.get('/', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const snapshot = await ordersCollection.get();
    const orders: any[] = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
      
      // Auto-purge demo seeded orders from Firestore
      if (
        ['ORD-9842A', 'ORD-9843B', 'ORD-9844C'].includes(data.orderId) ||
        ['user_01', 'user_02', 'user_03'].includes(data.userId)
      ) {
        ordersCollection.doc(doc.id).delete().catch(() => {});
        return;
      }

      let formattedDate = new Date().toISOString();
      if (data.createdAt && typeof data.createdAt.toDate === 'function') {
        formattedDate = data.createdAt.toDate().toISOString();
      } else if (data.createdAt) {
        formattedDate = new Date(data.createdAt).toISOString();
      }

      orders.push({
        _id: doc.id,
        id: doc.id,
        ...data,
        createdAt: formattedDate,
      });
    });

    // Sort by createdAt descending (newest first)
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json(orders);
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

import { productsCollection } from '../models/Product';
import { db } from '../config/firebase';

// POST /api/orders - Create a new order (Public / Authenticated users on checkout)
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      orderId, 
      userId, 
      customerName, 
      customerEmail, 
      customerPhone, 
      shippingAddress, 
      items, 
      totalAmount, 
      paymentId, 
      paymentStatus 
    } = req.body;

    if (!customerEmail || !items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ message: 'Customer email and item list are required' });
      return;
    }

    const newOrder = {
      orderId: orderId || `ORD-${Date.now().toString(36).toUpperCase()}`,
      userId: userId || 'guest',
      customerName: customerName || 'Valued Customer',
      customerEmail,
      customerPhone: customerPhone || '',
      shippingAddress: shippingAddress || 'Standard Delivery',
      items,
      totalAmount: Number(totalAmount) || 0,
      status: 'Processing',
      paymentId: paymentId || `pay_${Date.now()}`,
      paymentStatus: paymentStatus || 'Paid',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    };

    const docRef = await ordersCollection.add(newOrder);

    // Update inventory for each purchased item
    try {
      const batch = db.batch();
      let hasUpdates = false;

      for (const item of items) {
        if (item.id && item.quantity) {
          const productRef = productsCollection.doc(String(item.id));
          batch.update(productRef, {
            stock: FieldValue.increment(-Number(item.quantity))
          });
          hasUpdates = true;
        }
      }

      if (hasUpdates) {
        await batch.commit();
      }
    } catch (invError) {
      console.error('Failed to update inventory:', invError);
      // Proceed without failing the order
    }

    res.status(201).json({
      message: 'Order recorded successfully',
      id: docRef.id,
      _id: docRef.id,
      ...newOrder,
      createdAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to record order', error: error.message });
  }
});

// PATCH /api/orders/:id/status - Update order status (Admin only)
router.patch('/:id/status', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { status } = req.body;

    if (!['Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
      res.status(400).json({ message: 'Invalid status value' });
      return;
    }

    const docRef = ordersCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    const docData = doc.data();

    // Restock inventory if status changed to Cancelled
    if (docData && docData.status !== 'Cancelled' && status === 'Cancelled') {
      try {
        const batch = db.batch();
        let hasUpdates = false;
        const items = docData.items || [];
        for (const item of items) {
          if (item.id && item.quantity) {
            const productRef = productsCollection.doc(String(item.id));
            batch.update(productRef, {
              stock: FieldValue.increment(Number(item.quantity))
            });
            hasUpdates = true;
          }
        }
        if (hasUpdates) await batch.commit();
      } catch (invError) {
        console.error('Failed to restock inventory:', invError);
      }
    }

    await docRef.update({
      status,
      updatedAt: FieldValue.serverTimestamp()
    });

    res.json({ message: 'Order status updated successfully', id, status });
  } catch (error: any) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Failed to update order status', error: error.message });
  }
});

// DELETE /api/orders/:id - Delete order (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const docRef = ordersCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    const docData = doc.data();

    if (docData && docData.status !== 'Cancelled') {
      // Restock inventory if it wasn't already cancelled
      try {
        const batch = db.batch();
        let hasUpdates = false;
        const items = docData.items || [];
        for (const item of items) {
          if (item.id && item.quantity) {
            const productRef = productsCollection.doc(String(item.id));
            batch.update(productRef, {
              stock: FieldValue.increment(Number(item.quantity))
            });
            hasUpdates = true;
          }
        }
        if (hasUpdates) await batch.commit();
      } catch (invError) {
        console.error('Failed to restock inventory:', invError);
      }
    }

    await docRef.delete();
    res.json({ message: 'Order deleted successfully', id });
  } catch (error: any) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Failed to delete order', error: error.message });
  }
});

export default router;
