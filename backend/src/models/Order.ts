import { getFirestore } from 'firebase-admin/firestore';

export interface IOrderItem {
  id: string;
  title: string;
  price: string;
  quantity: number;
  src?: string;
}

export interface IOrder {
  _id?: string;
  orderId: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress?: string;
  items: IOrderItem[];
  totalAmount: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentId?: string;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  createdAt: any;
  updatedAt?: any;
}

export const ordersCollection = getFirestore().collection('orders');
