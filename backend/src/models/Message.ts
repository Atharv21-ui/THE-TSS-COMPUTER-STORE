import { db } from '../config/firebase';
import { Timestamp, FieldValue } from 'firebase-admin/firestore';

export interface IMessage {
  id?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  category: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied';
  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
}

export const messagesCollection = db.collection('messages');
