import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '../assets/inkvia.png';
import { useCart } from '@/contexts/CartContext';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();

  const leftLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
  ];

  const rightLinks = [
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b-2 border-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left Navigation - Desktop */}
          <div className="hidden md:flex items-center gap-6 flex-1">
            {leftLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-comic-yellow rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle - Left */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* Centered Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img src={Logo} className='w-20'/>
          </Link>

          {/* Right Navigation - Desktop */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
            {rightLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-comic-yellow rounded-full" />
                )}
              </Link>
            ))}
            
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative ml-4 p-2 bg-comic-yellow border-2 border-foreground rounded-xl shadow-comic-sm hover:shadow-comic hover:scale-105 transition-all"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-comic-red text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-foreground">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative md:hidden p-2 bg-comic-yellow border-2 border-foreground rounded-xl shadow-comic-sm"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-comic-red text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-foreground">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-foreground/20 animate-fade-in">
            <div className="flex flex-col gap-3">
              {[...leftLinks, ...rightLinks].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-bold uppercase tracking-wider transition-colors py-2 ${
                    isActive(link.path)
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
