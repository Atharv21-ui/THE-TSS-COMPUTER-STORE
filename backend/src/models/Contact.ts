import { db } from '../config/firebase';
import { Timestamp, FieldValue } from 'firebase-admin/firestore';

export interface IContactMessage {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  category: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied';
  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
}

export const contactsCollection = db.collection('contacts');
