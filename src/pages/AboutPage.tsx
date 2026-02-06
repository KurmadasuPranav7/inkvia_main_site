import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Bold Vision',
      description: 'We don\'t follow trends—we create them. Every design pushes boundaries.',
      color: 'bg-comic-blue',
    },
    {
      icon: Zap,
      title: 'Creative Excellence',
      description: 'Premium quality in everything we create, from posters to campaigns.',
      color: 'bg-comic-yellow',
    },
    {
      icon: Users,
      title: 'Collaborative Spirit',
      description: 'We partner with brands and events to create unforgettable experiences.',
      color: 'bg-comic-mint',
    },
    {
      icon: Eye,
      title: 'Future-Forward',
      description: 'Blending technology with art to stay ahead of the curve.',
      color: 'bg-comic-red',
    },
  ];

  return (
    <div className="min-h-screen pt-8 pb-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16 lg:mb-24 max-w-4xl mx-auto animate-slide-up">
          <div className="inline-block sticker bg-comic-blue text-white mb-6">
            OUR STORY
          </div>
          <h1 className="font-comic text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            About INKVIA
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We're a design, product, and creative media brand on a mission to
            make bold visual statements. From premium wall art to viral
            campaigns, we bring creative visions to life.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-24">
          <div className="comic-panel bg-card p-8 lg:p-10 rotate-[-1deg] hover:rotate-0 transition-transform">
            <h2 className="font-comic text-2xl lg:text-3xl text-foreground mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                INKVIA was born from a simple belief: creative work should make
                an impact. We started with a passion for design and a vision to
                create products that people would be proud to own.
              </p>
              <p>
                Our first drop—premium A4 wall posters—represents everything we
                stand for: bold aesthetics, quality craftsmanship, and designs
                that transform spaces.
              </p>
              <p>
                But we're more than just a merch brand. We partner with events
                and businesses to create custom merchandise and viral creative
                content that gets noticed.
              </p>
            </div>
          </div>

          <div className="comic-panel bg-comic-yellow p-8 lg:p-10 rotate-[1deg] hover:rotate-0 transition-transform">
            <h2 className="font-comic text-2xl lg:text-3xl text-foreground mb-6">
              Our Vision
            </h2>
            <div className="space-y-4 text-foreground/80">
              <p>
                We envision a world where creativity knows no bounds. Our goal
                is to become the go-to creative partner for brands looking to
                make bold statements.
              </p>
              <p>
                From event merchandise to PR campaigns, we're building a
                creative ecosystem that empowers brands to stand out in a
                crowded market.
              </p>
              <p className="font-bold text-foreground">
                Design. Merch. Creative Impact. That's INKVIA.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16 lg:mb-24">
          <h2 className="font-comic text-3xl lg:text-4xl text-center text-foreground mb-12">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`comic-panel ${value.color} p-6 text-center pop-hover animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-card border-2 border-foreground flex items-center justify-center mx-auto mb-4 shadow-comic-sm">
                  <value.icon className="w-7 h-7 text-foreground" />
                </div>
                <h3 className="font-comic text-xl mb-2 text-foreground">{value.title}</h3>
                <p className="text-sm text-foreground/80">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Collaborations */}
        <div className="comic-panel bg-comic-mint p-8 lg:p-12 text-center">
          <h2 className="font-comic text-3xl lg:text-4xl text-foreground mb-4">
            Let's Collaborate
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto mb-6">
            We're always looking for exciting partnerships. Whether you're an
            event organizer, brand, or creator—let's make something amazing
            together.
          </p>
          <Link to="/contact">
            <Button variant="default" size="lg">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
