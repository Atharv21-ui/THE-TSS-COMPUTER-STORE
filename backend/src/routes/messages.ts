import { Router, Request, Response } from 'express';
import { messagesCollection } from '../models/Message';
import { FieldValue } from 'firebase-admin/firestore';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

// POST /api/messages - Create a new contact message (Public)
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, phone, email, category, message } = req.body;

    if (!firstName || (!email && !phone) || !message) {
      res.status(400).json({ message: 'First name, phone number or email, and message are required' });
      return;
    }

    const newMessage = {
      firstName,
      lastName: lastName || '',
      phone: phone || '',
      email: email || '',
      category: category || 'General Inquiry',
      message,
      status: 'Unread',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    };

    const docRef = await messagesCollection.add(newMessage);

    res.status(201).json({
      ...newMessage,
      message: 'Message sent successfully',
      id: docRef.id,
      _id: docRef.id,
      createdAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error saving message:', error);
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
});

// GET /api/messages - Fetch all contact messages (Admin only)
router.get('/', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const snapshot = await messagesCollection.get();
    const messages: any[] = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
      
      let formattedDate = new Date().toISOString();
      if (data.createdAt && typeof data.createdAt.toDate === 'function') {
        formattedDate = data.createdAt.toDate().toISOString();
      } else if (data.createdAt) {
        formattedDate = new Date(data.createdAt).toISOString();
      }

      messages.push({
        _id: doc.id,
        id: doc.id,
        ...data,
        createdAt: formattedDate,
      });
    });

    // Sort by createdAt descending (newest first)
    messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json(messages);
  } catch (error: any) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
});

// PATCH /api/messages/:id/status - Update message status (Admin only)
router.patch('/:id/status', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { status } = req.body;

    if (!['Unread', 'Read', 'Replied'].includes(status)) {
      res.status(400).json({ message: 'Invalid status value' });
      return;
    }

    const docRef = messagesCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      res.status(404).json({ message: 'Message not found' });
      return;
    }

    await docRef.update({
      status,
      updatedAt: FieldValue.serverTimestamp()
    });

    res.json({ message: 'Message status updated successfully', id, status });
  } catch (error: any) {
    console.error('Error updating message status:', error);
    res.status(500).json({ message: 'Failed to update message status', error: error.message });
  }
});

// DELETE /api/messages/:id - Delete message (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const docRef = messagesCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      res.status(404).json({ message: 'Message not found' });
      return;
    }

    await docRef.delete();
    res.json({ message: 'Message deleted successfully', id });
  } catch (error: any) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Failed to delete message', error: error.message });
  }
});

export default router;
