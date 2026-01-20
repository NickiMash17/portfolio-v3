# Portfolio

A modern, responsive portfolio built with React, TypeScript, and Tailwind CSS.

## Tech Stack

### Core Framework & Language
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool & dev server
- **React Router DOM** - Client-side routing

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn-ui** - Component library (Radix UI primitives)
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **next-themes** - Dark/light theme management
- **tailwindcss-animate** - Animation utilities

### State Management & Data Fetching
- **TanStack Query (React Query)** - Server state management
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### UI Components & Libraries
- **Embla Carousel** - Carousel/slider component
- **Sonner** - Toast notifications
- **Recharts** - Chart library
- **CMDK** - Command menu component
- **Vaul** - Drawer component

### Backend & APIs
- **Supabase** - Backend-as-a-Service (for AI chat)
- **Server-Sent Events (SSE)** - Streaming API responses

### SEO & Analytics
- **Google Analytics 4 (GA4)** - Comprehensive analytics tracking
- **Structured Data (JSON-LD)** - Rich snippets for search engines
- **Open Graph & Twitter Cards** - Social media optimization
- **Sitemap.xml** - Search engine indexing
- **Robots.txt** - Crawler directives
- **PWA Manifest** - Progressive Web App support
- **Meta Tags** - Comprehensive SEO meta tags

### Build Tools & Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **@vitejs/plugin-react-swc** - Fast React refresh with SWC

### Deployment
- **Vercel** - Hosting platform

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env

# Edit .env and add your configuration:
# - VITE_SUPABASE_URL
# - VITE_SUPABASE_ANON_KEY
# - VITE_SUPABASE_PUBLISHABLE_KEY
# - VITE_GA_MEASUREMENT_ID (Google Analytics 4)

# Start development server
npm run dev
```

Visit `http://localhost:8080`

## Build

```bash
npm run build
```

## SEO Configuration

This portfolio is optimized for search engines with:

### Google Analytics Setup
1. Create a GA4 property at [Google Analytics](https://analytics.google.com/)
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Add it to `.env` as `VITE_GA_MEASUREMENT_ID`

### SEO Features Implemented
- ✅ Comprehensive meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Structured data (JSON-LD) for:
  - Person schema
  - WebSite schema
  - ProfessionalService schema
  - SoftwareApplication schemas (projects)
  - BreadcrumbList schema
  - Organization schema
- ✅ Sitemap.xml with all pages
- ✅ Robots.txt with crawl directives
- ✅ PWA manifest.json
- ✅ Canonical URLs
- ✅ Security headers
- ✅ Performance optimizations (preconnect, dns-prefetch)
- ✅ Analytics event tracking

### SEO Best Practices
- All images have alt text
- Semantic HTML structure
- Fast page load times
- Mobile-responsive design
- Accessible components
- Clean URL structure

## Deployment

Build output is in the `dist/` folder. Deploy to Vercel, Netlify, or your preferred host.

**Important**: Make sure to set environment variables in your hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_GA_MEASUREMENT_ID`

Repository: https://github.com/NickiMash17/portfolio-v3