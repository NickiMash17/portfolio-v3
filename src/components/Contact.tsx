import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { toast } from 'sonner';
import { ScrollAnimation } from '@/hooks/useScrollAnimation';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:nene171408@gmail.com?subject=${subject}&body=${body}`;
    
    toast.success('Opening email client...');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimation animation="fade-up">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 glow-text">
              <span className="text-primary font-mono">{'<'}</span>
              Get In Touch
              <span className="text-primary font-mono">{' />'}</span>
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg">Let's build something amazing together</p>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {/* Contact Info */}
          <ScrollAnimation animation="fade-right" delay={100}>
            <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
            <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-foreground">Contact Information</h3>
              
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <div className="p-1.5 sm:p-2 md:p-3 glass rounded-lg glow-primary flex-shrink-0">
                    <Mail className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-0.5 sm:mb-1">Email</div>
                    <a 
                      href="mailto:nene171408@gmail.com"
                      className="text-xs sm:text-sm md:text-base text-foreground hover:text-primary transition-colors break-all"
                    >
                      nene171408@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <div className="p-1.5 sm:p-2 md:p-3 glass rounded-lg glow-primary flex-shrink-0">
                    <Phone className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-0.5 sm:mb-1">Phone</div>
                    <a 
                      href="tel:+27631526795"
                      className="text-xs sm:text-sm md:text-base text-foreground hover:text-primary transition-colors"
                    >
                      +27 63 152 6795
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <div className="p-1.5 sm:p-2 md:p-3 glass rounded-lg glow-primary flex-shrink-0">
                    <MapPin className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-0.5 sm:mb-1">Location</div>
                    <div className="text-xs sm:text-sm md:text-base text-foreground">South Africa</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 animate-pulse-glow">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 text-foreground">Availability</h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-2 sm:mb-3 md:mb-4 leading-relaxed">
                Currently available for internships, freelance projects, and full-time opportunities.
              </p>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-accent animate-pulse" />
                <span className="text-accent font-mono text-[10px] sm:text-xs md:text-sm">Open to opportunities</span>
              </div>
            </div>
            </div>
          </ScrollAnimation>

          {/* Contact Form */}
          <ScrollAnimation animation="fade-left" delay={100}>
            <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-foreground">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-foreground">
                  Name
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="glass border-primary/30 focus:border-primary focus:glow-primary transition-all text-sm sm:text-base"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="glass border-primary/30 focus:border-primary focus:glow-primary transition-all text-sm sm:text-base"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="glass border-primary/30 focus:border-primary focus:glow-primary transition-all resize-none text-sm sm:text-base"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full glass glow-primary hover:scale-105 transition-all group text-sm sm:text-base"
              >
                <Send className="mr-2 group-hover:translate-x-1 transition-transform" size={18} />
                Send Message
              </Button>
            </form>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};
