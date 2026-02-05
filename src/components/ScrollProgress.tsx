import { useState, useEffect } from 'react';

export const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none"
      role="progressbar"
      aria-valuenow={scrollProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Scroll progress"
    >
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-150 ease-out shadow-lg"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
