import React from 'react';
import { Palette, Calendar, Megaphone } from 'lucide-react';

const values = [
  {
    icon: Palette,
    title: 'Creativity',
    description: 'We turn ideas into visual stories that captivate and inspire.',
    color: 'bg-comic-blue',
    rotation: 'rotate-[-2deg]',
  },
  {
    icon: Calendar,
    title: 'Events',
    description: 'Custom merch and experiences for unforgettable moments.',
    color: 'bg-comic-yellow',
    rotation: 'rotate-[1deg]',
  },
  {
    icon: Megaphone,
    title: 'Marketing & PR',
    description: 'Viral content and brand storytelling that gets noticed.',
    color: 'bg-comic-mint',
    rotation: 'rotate-[-1deg]',
  },
];

const BrandMeaning: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary halftone">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            What We Stand For
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            More than a brand — a creative movement.
          </p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`comic-panel ${value.color} p-6 lg:p-8 ${value.rotation} hover:rotate-0 transition-transform duration-300 pop-hover`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-card rounded-2xl border-2 border-foreground flex items-center justify-center mb-4 shadow-comic-sm">
                <value.icon className="w-8 h-8 text-foreground" />
              </div>

              {/* Content */}
              <h3 className="font-comic text-2xl text-foreground mb-2">
                {value.title}
              </h3>
              <p className="text-foreground/80 font-medium">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandMeaning;
