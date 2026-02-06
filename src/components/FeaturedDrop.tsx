import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import poster1 from '@/assets/poster-1.jpg';
import poster2 from '@/assets/poster-2.jpg';
import poster3 from '@/assets/poster-3.jpg';

const FeaturedDrop: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 halftone opacity-30" />
      
      {/* Floating shapes */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-comic-yellow/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-comic-blue/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 sticker bg-comic-red text-white mb-6">
            <Sparkles className="w-4 h-4" />
            FEATURED DROP
          </div>
          <h2 className="font-comic text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            The First Collection
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Premium A4 wall posters that make a statement. Limited edition artwork for the bold and creative.
          </p>
        </div>

        {/* Featured products showcase */}
        <div className="relative flex items-center justify-center mb-12">
          {/* Left poster - tilted */}
          <div className="hidden md:block absolute left-10 lg:left-20 transform -rotate-12 z-10 animate-float-delayed">
            <div className="comic-panel-sm overflow-hidden w-40 lg:w-52">
              <img 
                src={poster2} 
                alt="Featured poster" 
                className="w-full h-56 lg:h-72 object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 sticker bg-comic-mint text-foreground text-xs">
              NEW
            </div>
          </div>

          {/* Center poster - main */}
          <div className="relative z-20">
            <div className="comic-panel overflow-hidden w-64 md:w-80 lg:w-96 transform hover:scale-105 transition-transform duration-300">
              <img 
                src={poster1} 
                alt="Featured poster" 
                className="w-full h-80 md:h-96 lg:h-[28rem] object-cover"
              />
            </div>
            {/* Speech bubble */}
            <div className="absolute -top-8 -right-8 md:-right-16 speech-bubble bg-comic-yellow text-foreground text-sm font-bold max-w-[140px] animate-wiggle">
              Get yours before it's gone!
            </div>
          </div>

          {/* Right poster - tilted */}
          <div className="hidden md:block absolute right-10 lg:right-20 transform rotate-12 z-10 animate-float">
            <div className="comic-panel-sm overflow-hidden w-40 lg:w-52">
              <img 
                src={poster3} 
                alt="Featured poster" 
                className="w-full h-56 lg:h-72 object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 sticker bg-comic-blue text-white text-xs rotate-[-5deg]">
              HOT 🔥
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/shop">
            <Button variant="default" size="xl" className="group">
              Shop First Drop
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDrop;
