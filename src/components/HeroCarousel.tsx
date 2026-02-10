import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Slide {
  id: number;
  headline: string;
  subtext: string;
  cta?: {
    text: string;
    link: string;
  };
  accentColor: 'blue' | 'red' | 'yellow' | 'mint';
  bgStyle: string;
}

const slides: Slide[] = [
  {
    id: 1,
    headline: 'INKVIA — Where Creativity Becomes Culture',
    subtext: 'Posters, Stickers, Clothing & Creative Media',
    accentColor: 'blue',
    bgStyle: 'bg-gradient-to-br from-comic-blue/20 via-background to-comic-mint/20',
  },
  {
    id: 2,
    headline: 'First Drop is Live',
    subtext: 'A4 Wall Posters – Limited Edition',
    cta: { text: 'Shop Now', link: '/shop' },
    accentColor: 'yellow',
    bgStyle: 'bg-gradient-to-br from-comic-yellow/30 via-background to-comic-red/20',
  },
  {
    id: 3,
    headline: 'We Create. We Promote. We Collaborate.',
    subtext: 'Event merch, viral reels, brand storytelling',
    cta: { text: 'Partner With Us', link: '/contact' },
    accentColor: 'mint',
    bgStyle: 'bg-gradient-to-br from-comic-mint/20 via-background to-comic-blue/20',
  },
];

const accentStyles = {
  blue: 'bg-comic-blue',
  red: 'bg-comic-red',
  yellow: 'bg-comic-yellow',
  mint: 'bg-comic-mint',
};

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = slides[currentSlide];

  return (
    <section className={`relative w-full min-h-[70vh] md:min-h-[80vh] overflow-hidden transition-colors duration-700 ${slide.bgStyle}`}>
      {/* Comic-style halftone overlay */}
      <div className="absolute inset-0 halftone opacity-50" />
      
      {/* Ink splatter SVG decorations */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10" viewBox="0 0 1200 800">
        <circle cx="100" cy="100" r="80" fill="currentColor" className="text-comic-red" />
        <circle cx="1100" cy="700" r="120" fill="currentColor" className="text-comic-blue" />
        <circle cx="200" cy="600" r="60" fill="currentColor" className="text-comic-yellow" />
        <circle cx="1000" cy="150" r="90" fill="currentColor" className="text-comic-mint" />
      </svg>

      {/* Comic panel borders */}
      <div className="absolute inset-4 md:inset-8 border-4 border-foreground/10 rounded-3xl pointer-events-none" />
      <div className="absolute inset-8 md:inset-16 border-2 border-dashed border-foreground/5 rounded-2xl pointer-events-none" />

      {/* Floating decorative elements with comic shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-comic-red rounded-full border-4 border-foreground opacity-70 animate-float shadow-comic flex items-center justify-center">
        <span className="text-2xl">💥</span>
      </div>
      <div className="absolute top-1/4 right-20 w-16 h-16 bg-comic-yellow rounded-lg border-4 border-foreground opacity-80 animate-float-delayed rotate-12 shadow-comic flex items-center justify-center">
        <span className="text-xl">⚡</span>
      </div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-comic-mint rounded-2xl border-4 border-foreground opacity-60 animate-float rotate-[-8deg] shadow-comic flex items-center justify-center">
        <span className="text-3xl">🎨</span>
      </div>
      <div className="hidden md:flex absolute bottom-1/3 right-1/4 w-12 h-12 bg-comic-blue rounded-full border-4 border-foreground opacity-70 animate-float-delayed shadow-comic flex items-center justify-center">
        <span className="text-lg">✨</span>
      </div>
      
      {/* Speed lines for comic effect */}
      <div className="absolute top-1/2 left-0 w-32 h-1 bg-gradient-to-r from-comic-yellow to-transparent opacity-40 -rotate-12" />
      <div className="absolute top-1/2 left-0 w-48 h-0.5 bg-gradient-to-r from-comic-red to-transparent opacity-30 -rotate-6 translate-y-4" />
      <div className="absolute top-1/3 right-0 w-40 h-1 bg-gradient-to-l from-comic-blue to-transparent opacity-40 rotate-12" />
      <div className="absolute bottom-1/3 right-0 w-56 h-0.5 bg-gradient-to-l from-comic-mint to-transparent opacity-30 rotate-6" />

      {/* Sticker decorations */}
      <div className="hidden md:flex absolute top-20 right-10 md:right-32 sticker bg-comic-yellow text-foreground text-xs md:text-sm z-10 shadow-comic">
        NEW DROP! 🔥
      </div>
      <div className="hidden md:flex absolute bottom-32 left-10 md:left-20 sticker bg-comic-mint text-foreground text-xs md:text-sm rotate-[5deg] z-10 shadow-comic">
        LIMITED EDITION
      </div>
      <div className="absolute top-1/2 right-5 md:right-16 sticker bg-comic-red text-white text-xs rotate-[-8deg] z-10 shadow-comic hidden md:block">
        HOT! 🌟
      </div>

      {/* Speech bubble decoration */}
      <div className="absolute bottom-1/4 right-10 md:right-24 speech-bubble bg-card p-3 hidden lg:block">
        <span className="text-xs font-bold">WOW!</span>
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-4 lg:px-8 h-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center">
        <div 
          key={slide.id}
          className="text-center max-w-4xl animate-fade-in"
        >
          {/* Accent bar */}
          <div className={`w-24 h-2 ${accentStyles[slide.accentColor]} mx-auto mb-6 rounded-full border-2 border-foreground shadow-comic-sm`} />
          
          {/* Headline with comic text effect */}
          <h1 className="font-comic text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight drop-shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
            {slide.headline}
          </h1>
          
          {/* Subtext */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto font-medium">
            {slide.subtext}
          </p>
          
          {/* CTA Button */}
          {slide.cta && (
            <Link to={slide.cta.link}>
              <Button variant="comic" size="xl" className="animate-bounce-subtle shadow-comic-lg">
                {slide.cta.text}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-card border-4 border-foreground rounded-full flex items-center justify-center shadow-comic hover:shadow-comic-lg hover:-translate-y-1/2 hover:scale-110 transition-all z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-card border-4 border-foreground rounded-full flex items-center justify-center shadow-comic hover:shadow-comic-lg hover:-translate-y-1/2 hover:scale-110 transition-all z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button> */}

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full border-2 border-foreground transition-all duration-300 shadow-comic-sm ${
              index === currentSlide
                ? 'bg-primary scale-125'
                : 'bg-card hover:bg-secondary'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;