// src/lib/FetchProducts.ts

import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { Product } from '@/data/products';

const fetchCollection = async (
  collectionName: string,
  category: Product['category']
): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, collectionName));

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name || data.title || '',
      price: data.price || 0,
      imageUrls: Array.isArray(data.imageUrls)
        ? data.imageUrls
        : Array.isArray(data.imageUrl)
        ? data.imageUrl
        : data.imageUrl
        ? [data.imageUrl]
        : [],
      isAvailable: data.isAvailable ?? true,
      category,
    };
  });
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  const [posters, stickers, clothing] = await Promise.all([
    fetchCollection('posters', 'posters'),
    fetchCollection('stickers', 'stickers'),
    fetchCollection('clothing', 'merch'),
  ]);

  return [...posters, ...stickers, ...clothing];
};
