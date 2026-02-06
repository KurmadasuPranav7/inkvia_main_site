import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, category }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
  };

  return (
    <div className="group comic-panel overflow-hidden pop-hover animate-fade-in bg-card">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Quick Add Button */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button
            variant="comic"
            className="w-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>

        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="sticker bg-comic-mint text-foreground text-xs">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 border-t-2 border-foreground">
        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="font-comic text-2xl text-primary mt-1">
          ₹{price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
