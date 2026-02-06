import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export type EnquiryPayload = {
  name: string;
  email: string;
  company?: string;
  eventType?: string;
  message: string;
  productId?: string;
  productCategory?: 'posters' | 'stickers' | 'merch';
};

export const saveEnquiry = async (data: EnquiryPayload) => {
  await addDoc(collection(db, 'enquiries'), {
    ...data,
    status: 'new',
    createdAt: serverTimestamp(),
  });
};
