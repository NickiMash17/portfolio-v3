import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, trackPageView } from '@/lib/analytics';

/**
 * Google Analytics Component
 * Initializes GA4 and tracks page views
 */
export const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => initGA(), { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(() => initGA(), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Track page views on route change
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);

  // Return null - this component doesn't render anything
  return null;
};
