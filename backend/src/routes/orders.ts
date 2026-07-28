import { Router, Request, Response } from 'express';
import { ordersCollection, IOrder } from '../models/Order';
import { FieldValue } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { usersCollection } from '../models/User';

const router = Router();

// Middleware: Authenticate user & check Admin role
const verifyAdmin = async (req: Request, res: Response, next: Function): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized - Missing or invalid token' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    const userDoc = await usersCollection.doc(decodedToken.uid).get();

    if (!userDoc.exists || userDoc.data()?.role !== 'admin') {
      res.status(403).json({ message: 'Forbidden - Requires Admin role' });
      return;
    }

    (req as any).user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

// GET /api/orders - Fetch all orders (Admin only)
router.get('/', verifyAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const snapshot = await ordersCollection.get();
    const orders: any[] = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
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
router.patch('/:id/status', verifyAdmin, async (req: Request, res: Response): Promise<void> => {
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
router.delete('/:id', verifyAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const docRef = ordersCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    await docRef.delete();
    res.json({ message: 'Order deleted successfully', id });
  } catch (error: any) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Failed to delete order', error: error.message });
  }
});

export default router;
