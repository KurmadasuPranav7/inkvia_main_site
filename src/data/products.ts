import poster1 from '@/assets/poster-1.jpg';
import poster2 from '@/assets/poster-2.jpg';
import poster3 from '@/assets/poster-3.jpg';
import poster4 from '@/assets/poster-4.jpg';

export type ProductCategory = 'posters' | 'stickers' | 'merch';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: ProductCategory;
  description?: string;
}

export const products: Product[] = [
  // Posters
  {
    id: 'poster-001',
    name: 'Cyber Genesis',
    price: 499,
    image: poster1,
    category: 'posters',
    description: 'Abstract geometric art with neon accents - A4 Premium Wall Poster',
  },
  {
    id: 'poster-002',
    name: 'Cosmic Dreams',
    price: 499,
    image: poster2,
    category: 'posters',
    description: 'Space nebula art with ethereal glow - A4 Premium Wall Poster',
  },
  {
    id: 'poster-003',
    name: 'Neon Tokyo',
    price: 549,
    image: poster3,
    category: 'posters',
    description: 'Japanese typography with neon aesthetic - A4 Premium Wall Poster',
  },
  {
    id: 'poster-004',
    name: 'Fluid Motion',
    price: 499,
    image: poster4,
    category: 'posters',
    description: 'Abstract fluid art in cyan gradients - A4 Premium Wall Poster',
  },
  // Stickers
  {
    id: 'sticker-001',
    name: 'INKVIA Logo Pack',
    price: 149,
    image: poster1,
    category: 'stickers',
    description: 'Premium vinyl sticker pack with INKVIA logos - Set of 5',
  },
  {
    id: 'sticker-002',
    name: 'Cosmic Vibes Set',
    price: 199,
    image: poster2,
    category: 'stickers',
    description: 'Holographic space-themed stickers - Set of 8',
  },
  {
    id: 'sticker-003',
    name: 'Neon Dreams Pack',
    price: 179,
    image: poster3,
    category: 'stickers',
    description: 'Glowing neon aesthetic stickers - Set of 6',
  },
  {
    id: 'sticker-004',
    name: 'Abstract Flow',
    price: 129,
    image: poster4,
    category: 'stickers',
    description: 'Minimalist abstract art stickers - Set of 4',
  },
  // Merch
  {
    id: 'merch-001',
    name: 'INKVIA Classic Tee',
    price: 899,
    image: poster1,
    category: 'merch',
    description: 'Premium cotton t-shirt with INKVIA branding - Black',
  },
  {
    id: 'merch-002',
    name: 'Cosmic Hoodie',
    price: 1499,
    image: poster2,
    category: 'merch',
    description: 'Cozy hoodie with cosmic print on back - Navy Blue',
  },
  {
    id: 'merch-003',
    name: 'Neon Cap',
    price: 599,
    image: poster3,
    category: 'merch',
    description: 'Snapback cap with embroidered logo - Black/Cyan',
  },
  {
    id: 'merch-004',
    name: 'Creator Tote Bag',
    price: 449,
    image: poster4,
    category: 'merch',
    description: 'Canvas tote with creative print - Natural',
  },
];

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(p => p.category === category);
};