import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  imageUrls: string[]; // 🔥 matches Firestore
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

  // Use first image safely
  const mainImage = imageUrls?.[0] ?? '';

  const handleAddToCart = () => {
    if (!isAvailable || stock === 0) return;

    addToCart({
      id,
      title,
      price,
      image: mainImage,
    });
  };

  const isOutOfStock = !isAvailable || stock === 0;

  return (
    <>
      <div className="group comic-panel overflow-hidden pop-hover animate-fade-in bg-card">
        
        {/* IMAGE */}
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

          {/* OUT OF STOCK OVERLAY */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="sticker bg-comic-red text-white text-sm">
                OUT OF STOCK
              </span>
            </div>
          )}

          {/* ADD TO CART */}
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

          {/* CATEGORY */}
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

      {/* ZOOM MODAL */}
      {/* {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-card rounded-2xl shadow-comic-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 bg-card border-2 border-foreground rounded-full flex items-center justify-center hover:scale-110 transition"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {imageUrls.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${title}-${index}`}
                  className="w-full max-h-[70vh] object-contain rounded-xl"
                />
              ))}
            </div>

            <div className="mt-4 text-center">
              <h3 className="font-bold text-xl text-foreground">{title}</h3>
              <p className="font-comic text-2xl text-primary mt-2">
                ₹{price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default ProductCard;
