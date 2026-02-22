import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  imageUrls: string[];
  category?: string;
  isAvailable?: boolean;
  stock?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  imageUrls,
  category,
  isAvailable = true,
  stock = 0,
}) => {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const mainImage = imageUrls?.[0] ?? '';

  const isOutOfStock = !isAvailable || stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    addToCart({
      id,
      title,
      price,
      image: mainImage,
    });
  };

  return (
    <div className="group comic-panel overflow-hidden pop-hover bg-card">

      <div
        className={`relative aspect-[3/4] overflow-hidden bg-secondary ${
          !isOutOfStock ? 'cursor-zoom-in' : 'cursor-not-allowed'
        }`}
        onClick={() => !isOutOfStock && setIsOpen(true)}
      >
        <img
          src={mainImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="sticker bg-comic-red text-white text-sm">
              OUT OF STOCK
            </span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button
            variant="comic"
            className="w-full"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>

        {/* {category && (
          <div className="absolute top-4 left-4">
            <span className="sticker bg-comic-mint text-foreground text-xs">
              {category}
            </span>
          </div>
        )} */}
      </div>

      <div className="p-4 border-t-2 border-foreground">
        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="font-comic text-2xl text-primary mt-1">
          ₹{price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
