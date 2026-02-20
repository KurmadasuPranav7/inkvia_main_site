export type ProductCategory = 'posters' | 'stickers' | 'merch';

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrls: string[];
  category: ProductCategory;
  isAvailable: boolean;
}
