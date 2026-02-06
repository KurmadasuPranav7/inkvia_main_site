import React, { useState } from 'react';
import { Mail, Phone, Instagram, Send, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { saveEnquiry } from '@/lib/EnquirySubmit';

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    eventType: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await saveEnquiry({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        eventType: formData.eventType,
        message: formData.message,
      });

      toast.success("Message sent! We'll get back to you soon.");

      setFormData({
        name: '',
        email: '',
        company: '',
        eventType: '',
        message: '',
      });
    } catch (error) {
      console.error('Enquiry submission failed:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'inkvia.studio@gmail.com',
      href: 'mailto:inkvia.studio@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 6301628002',
      href: 'tel:+916301628002',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@inkvia.in',
      href: 'https://www.instagram.com/inkvia.in?igsh=MXc2NjllNHp4aTNzYQ==',
    },
  ];

  return (
    <div className="min-h-screen pt-8 pb-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 animate-slide-up">
          <div className="inline-block sticker bg-comic-mint text-foreground mb-6">
            SAY HELLO 👋
          </div>
          <h1 className="font-comic text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a question, want to collaborate, or just want to say hi?
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="comic-panel bg-card p-6 lg:p-8">
              <h2 className="font-comic text-2xl text-foreground mb-6">
                Contact Info
              </h2>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-4 comic-panel-sm bg-secondary hover:bg-comic-yellow transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center border-2 border-foreground">
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-bold text-foreground">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Collaboration CTA */}
            <div className="comic-panel bg-comic-yellow p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-card rounded-lg border-2 border-foreground flex items-center justify-center">
                  <Handshake className="w-6 h-6 text-foreground" />
                </div>
                <h2 className="font-comic text-2xl text-foreground">
                  Event Partnerships
                </h2>
              </div>
              <p className="text-foreground/80 mb-4">
                Looking for custom merch for your event? We create exclusive
                designs and merchandise that make your event unforgettable.
              </p>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-foreground" />
                  Custom event merchandise
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-foreground" />
                  Viral creative content for PR
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-foreground" />
                  Brand collaboration projects
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="comic-panel bg-card p-6 lg:p-8">
            <h2 className="font-comic text-2xl text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg border-2 border-foreground flex items-center justify-center">
                <Send className="w-5 h-5 text-primary-foreground" />
              </div>
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> 
                    <div>
                        <Label htmlFor="name" className="font-bold">Your Name</Label> 
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required className="mt-1 border-2 border-foreground" /> 
                    </div> 
                    <div> 
                        <Label htmlFor="email" className="font-bold">Email</Label> 
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required className="mt-1 border-2 border-foreground" /> 
                    </div> 
                </div> 
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> 
                    <div> 
                        <Label htmlFor="company" className="font-bold">Company/Brand (Optional)</Label> 
                        <Input id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Your company" className="mt-1 border-2 border-foreground" /> 
                    </div> 
                    <div> 
                        <Label htmlFor="eventType" className="font-bold">Event Type (Optional)</Label> 
                        <Input id="eventType" name="eventType" value={formData.eventType} onChange={handleChange} placeholder="Concert, Festival, etc." className="mt-1 border-2 border-foreground" /> 
                    </div> 
                </div> 
                <div> 
                    <Label htmlFor="message" className="font-bold">Message</Label> 
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project or how we can help..." rows={5} required className="mt-1 resize-none border-2 border-foreground" /> 
                </div> 
                <Button type="submit" variant="comic" size="lg" className="w-full" disabled={isSubmitting} > {isSubmitting ? 'Sending...' : 'Send Message'} </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
