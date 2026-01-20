/**
 * SEO Utility Functions
 * Provides dynamic SEO management and meta tag updates
 */

export interface SEOData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
}

const DEFAULT_TITLE = 'Nicolette Mashaba | Software Engineer Graduate | Full-Stack Developer | Azure Certified';
const DEFAULT_DESCRIPTION = 'Software Engineer Graduate specializing in full-stack development, cloud computing, and AI technologies. Experienced in React, Node.js, Flutter, Azure, and .NET. #1 ranked female GitHub contributor in South Africa.';
const DEFAULT_IMAGE = 'https://nicmash-porfolio.vercel.app/src/assets/Myself.jpg';
const BASE_URL = 'https://nicmash-porfolio.vercel.app';

/**
 * Update document title
 */
export const updateTitle = (title: string) => {
  document.title = title;
};

/**
 * Update or create meta tag
 */
export const updateMetaTag = (
  property: string,
  content: string,
  isProperty = false
) => {
  const selector = isProperty
    ? `meta[property="${property}"]`
    : `meta[name="${property}"]`;
  let meta = document.querySelector(selector) as HTMLMetaElement;

  if (!meta) {
    meta = document.createElement('meta');
    if (isProperty) {
      meta.setAttribute('property', property);
    } else {
      meta.setAttribute('name', property);
    }
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
};

/**
 * Update canonical URL
 */
export const updateCanonical = (url: string) => {
  let canonical = document.querySelector(
    'link[rel="canonical"]'
  ) as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
};

/**
 * Update all SEO meta tags
 */
export const updateSEO = (data: SEOData) => {
  const {
    title = DEFAULT_TITLE,
    description = DEFAULT_DESCRIPTION,
    image = DEFAULT_IMAGE,
    url = BASE_URL,
    type = 'website',
    keywords = [],
  } = data;

  // Update title
  updateTitle(title);

  // Primary meta tags
  updateMetaTag('title', title);
  updateMetaTag('description', description);
  if (keywords.length > 0) {
    updateMetaTag('keywords', keywords.join(', '));
  }

  // Open Graph tags
  updateMetaTag('og:title', title, true);
  updateMetaTag('og:description', description, true);
  updateMetaTag('og:image', image, true);
  updateMetaTag('og:url', url, true);
  updateMetaTag('og:type', type, true);

  // Twitter Card tags
  updateMetaTag('twitter:title', title);
  updateMetaTag('twitter:description', description);
  updateMetaTag('twitter:image', image);
  updateMetaTag('twitter:url', url);

  // Canonical URL
  updateCanonical(url);
};

/**
 * Generate structured data for a project
 */
export const generateProjectSchema = (project: {
  title: string;
  description: string;
  url?: string;
  tech?: string[];
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    ...(project.url && { url: project.url }),
    ...(project.tech && {
      softwareRequirements: project.tech.join(', '),
    }),
    creator: {
      '@type': 'Person',
      name: 'Nicolette Mashaba',
    },
  };
};

/**
 * Generate breadcrumb schema
 */
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};
