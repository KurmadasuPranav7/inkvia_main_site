import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const fetchCollection = async (name: string, category: any) => {
  const snapshot = await getDocs(collection(db, name));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    category,
  }));
};

export const fetchAllProducts = async () => {
  const [posters, stickers, clothing] = await Promise.all([
    fetchCollection('posters', 'posters'),
    fetchCollection('stickers', 'stickers'),
    fetchCollection('clothing', 'merch'),
  ]);

  return [...posters, ...stickers, ...clothing];
};
