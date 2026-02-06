import React from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import FeaturedDrop from '@/components/FeaturedDrop';
import BrandMeaning from '@/components/BrandMeaning';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Featured Drop Section */}
      <FeaturedDrop />

      {/* Brand Meaning Section */}
      <BrandMeaning />

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-comic-yellow/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-comic-blue/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="comic-panel p-8 lg:p-16 text-center max-w-4xl mx-auto bg-comic-yellow">
            <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Whether you're looking for premium merch or a creative partnership,
              we're here to make it happen.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/shop">
                <Button variant="default" size="lg">
                  Explore Collection
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="bg-card">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
