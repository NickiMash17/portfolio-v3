import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ScrollAnimation } from '@/hooks/useScrollAnimation';
import { trackEvent } from '@/lib/analytics';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        setTouched(prev => ({ ...prev, [key]: true }));
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    trackEvent('Contact', 'Form Submit', 'success');

    // Create mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    // Small delay for better UX
    setTimeout(() => {
      window.location.href = `mailto:nene171408@gmail.com?subject=${subject}&body=${body}`;
      toast.success('Opening email client...');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setTouched({});
      setIsSubmitting(false);
    }, 300);
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
                  Name <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className={`glass transition-all text-sm sm:text-base ${
                      touched.name && errors.name
                        ? 'border-destructive focus:border-destructive'
                        : touched.name && !errors.name
                        ? 'border-accent focus:border-accent'
                        : 'border-primary/30 focus:border-primary'
                    } focus:glow-primary`}
                    placeholder="John Doe"
                    aria-invalid={touched.name && !!errors.name}
                    aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                  />
                  {touched.name && !errors.name && formData.name && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                  )}
                </div>
                {touched.name && errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-foreground">
                  Email <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`glass transition-all text-sm sm:text-base ${
                      touched.email && errors.email
                        ? 'border-destructive focus:border-destructive'
                        : touched.email && !errors.email
                        ? 'border-accent focus:border-accent'
                        : 'border-primary/30 focus:border-primary'
                    } focus:glow-primary`}
                    placeholder="john@example.com"
                    aria-invalid={touched.email && !!errors.email}
                    aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                  />
                  {touched.email && !errors.email && formData.email && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                  )}
                </div>
                {touched.email && errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-foreground">
                  Message <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    rows={5}
                    className={`glass transition-all resize-none text-sm sm:text-base ${
                      touched.message && errors.message
                        ? 'border-destructive focus:border-destructive'
                        : touched.message && !errors.message
                        ? 'border-accent focus:border-accent'
                        : 'border-primary/30 focus:border-primary'
                    } focus:glow-primary`}
                    placeholder="Tell me about your project..."
                    aria-invalid={touched.message && !!errors.message}
                    aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
                  />
                  {touched.message && !errors.message && formData.message && (
                    <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-accent" />
                  )}
                </div>
                {touched.message && errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
                {formData.message && (
                  <p className="mt-1 text-xs text-muted-foreground text-right">
                    {formData.message.length} characters
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="w-full glass glow-primary hover:scale-105 transition-all group text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={18} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 group-hover:translate-x-1 transition-transform" size={18} />
                    Send Message
                  </>
                )}
              </Button>
            </form>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};
