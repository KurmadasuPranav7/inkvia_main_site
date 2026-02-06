import React from 'react';
import { Link } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const CartPanel: React.FC = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l-2 border-foreground z-50 flex flex-col animate-slide-in-right shadow-comic-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-foreground bg-comic-yellow">
          <h2 className="font-comic text-2xl text-foreground flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            Your Cart
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCartOpen(false)}
            className="hover:bg-foreground/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4 border-2 border-foreground">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <p className="font-comic text-xl text-muted-foreground mb-2">Cart is empty!</p>
              <p className="text-sm text-muted-foreground mb-6">
                Add some awesome items to get started.
              </p>
              <Button variant="default" onClick={() => setIsCartOpen(false)}>
                <Link to="/shop">Browse Shop</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="comic-panel-sm p-4 flex gap-4 animate-fade-in"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border-2 border-foreground"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{item.name}</h3>
                    <p className="font-comic text-lg text-primary">₹{item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border-2 border-foreground rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border-2 border-foreground rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-destructive hover:text-destructive/80 transition-colors font-bold text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t-2 border-foreground bg-secondary">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold">Total</span>
              <span className="font-comic text-2xl text-primary">₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={clearCart}
              >
                Clear
              </Button>
              <Link to="/checkout" className="flex-1" onClick={() => setIsCartOpen(false)}>
                <Button variant="default" className="w-full">
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPanel;
