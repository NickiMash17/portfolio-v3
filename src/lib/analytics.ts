/**
 * Google Analytics 4 (GA4) Integration
 * Provides comprehensive analytics tracking for SEO and user behavior
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';
let gaInitialized = false;

/**
 * Initialize Google Analytics
 */
export const initGA = () => {
  // Only initialize if measurement ID is provided and not the placeholder
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX' || typeof window === 'undefined' || gaInitialized) return;

  // Create dataLayer
  window.dataLayer = window.dataLayer || [];

  // Load GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.gtag = function () {
    window.dataLayer!.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    send_page_view: true,
  });

  gaInitialized = true;
};

/**
 * Track page views
 */
export const trackPageView = (path: string, title?: string) => {
  if (!window.gtag || !GA_MEASUREMENT_ID) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title || document.title,
  });
};

/**
 * Track custom events
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (!window.gtag || !GA_MEASUREMENT_ID) return;

  window.gtag('event', eventName, {
    ...eventParams,
    event_category: eventParams?.category || 'engagement',
  });
};

/**
 * Track project views
 */
export const trackProjectView = (projectName: string) => {
  trackEvent('view_project', {
    project_name: projectName,
    category: 'portfolio',
  });
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url: string, linkType: string) => {
  trackEvent('click_external_link', {
    link_url: url,
    link_type: linkType,
    category: 'engagement',
  });
};

/**
 * Track AI chat interactions
 */
export const trackAIChat = (action: string, query?: string) => {
  trackEvent('ai_chat_interaction', {
    action,
    query: query?.substring(0, 100), // Limit length
    category: 'ai_assistant',
  });
};

/**
 * Track download events (CV, etc.)
 */
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
    category: 'engagement',
  });
};
