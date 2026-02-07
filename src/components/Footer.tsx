import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone } from 'lucide-react';
import Logo from '../assets/tm-inkvia.png';
import ScrollToTop from './ScrollToTop';


const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-primary/20 py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src={Logo} className='w-20'/>
            <p className="mt-4 text-muted-foreground max-w-md">
              Design. Merch. Creative Impact. We craft premium products and viral content
              that makes your brand unforgettable.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.instagram.com/inkvia.in?igsh=MXc2NjllNHp4aTNzYQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:neon-glow transition-all duration-300"
              >
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              <a
                href="mailto:inkvia.studio@gmail.com"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:neon-glow transition-all duration-300"
              >
                <Mail className="w-5 h-5 text-primary" />
              </a>
              <a
                href="tel:+916301628002"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:neon-glow transition-all duration-300"
              >
                <Phone className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <ScrollToTop/>
              {[
                { name: 'Shop', path: '/shop' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>Custom Merch</li>
              <li>Poster Design</li>
              <li>Creative Media</li>
              <li>Event Partnerships</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 INKVIA. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made by team at Inkvia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
