import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId = 0;

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      rafId = 0;
    };

    const onScroll = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(toggleVisibility);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    trackEvent('Navigation', 'Scroll to Top', 'clicked');
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 p-3 rounded-full glass border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all shadow-lg hover:shadow-primary/20 group"
      aria-label="Scroll to top"
      title="Scroll to top (K)"
    >
      <ArrowUp className="w-5 h-5 text-primary group-hover:-translate-y-1 transition-transform" />
    </Button>
  );
};
