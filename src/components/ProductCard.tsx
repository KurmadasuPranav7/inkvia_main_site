import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  category?: string;
  isAvailable?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
  category,
  isAvailable = true,
}) => {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleAddToCart = () => {
    if (!isAvailable) return;
    addToCart({ id, title, price, image });
  };

  return (
    <>
      {/* PRODUCT CARD */}
      <div className="group comic-panel overflow-hidden pop-hover animate-fade-in bg-card">
        {/* Image */}
        <div
          className={`relative aspect-[3/4] overflow-hidden bg-secondary ${
            isAvailable ? 'cursor-zoom-in' : 'cursor-not-allowed'
          }`}
          onClick={() => isAvailable && setIsOpen(true)}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* OUT OF STOCK OVERLAY */}
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="sticker bg-comic-red text-white text-sm">
                OUT OF STOCK
              </span>
            </div>
          )}

          {/* QUICK ADD BUTTON */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Button
              variant="comic"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!isAvailable}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>

          {/* CATEGORY BADGE */}
          {category && (
            <div className="absolute top-4 left-4">
              <span className="sticker bg-comic-mint text-foreground text-xs">
                {category}
              </span>
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="p-4 border-t-2 border-foreground">
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="font-comic text-2xl text-primary mt-1">
            ₹{price.toLocaleString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
