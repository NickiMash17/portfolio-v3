import { Suspense, lazy, useEffect, useState } from 'react';
import { AuroraBackground } from '@/components/AuroraBackground';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { Preloader } from '@/components/Preloader';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { SectionDivider } from '@/components/SectionDivider';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Testimonials } from '@/components/Testimonials';
import { GitHubActivity } from '@/components/GitHubActivity';
import { Contact } from '@/components/Contact';

const SocialShare = lazy(async () => {
  const mod = await import('@/components/SocialShare');
  return { default: mod.SocialShare };
});
const AIChat = lazy(async () => {
  const mod = await import('@/components/AIChat');
  return { default: mod.AIChat };
});
const CustomCursor = lazy(async () => {
  const mod = await import('@/components/CustomCursor');
  return { default: mod.CustomCursor };
});
const ScrollToTop = lazy(async () => {
  const mod = await import('@/components/ScrollToTop');
  return { default: mod.ScrollToTop };
});
const ScrollProgress = lazy(async () => {
  const mod = await import('@/components/ScrollProgress');
  return { default: mod.ScrollProgress };
});

const Index = () => {
  useKeyboardNavigation();
  const isMobile = useIsMobile();
  const [renderAurora, setRenderAurora] = useState(false);
  const [loadChromeEnhancements, setLoadChromeEnhancements] = useState(false);
  const [loadInteractiveTools, setLoadInteractiveTools] = useState(false);

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const timeout = isMobile ? 3200 : 1400;
      const idleId = window.requestIdleCallback(() => {
        setLoadChromeEnhancements(true);
      }, { timeout });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = window.setTimeout(() => {
      setLoadChromeEnhancements(true);
    }, isMobile ? 2600 : 1000);

    return () => window.clearTimeout(timer);
  }, [isMobile]);

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const timeout = isMobile ? 5200 : 2600;
      const idleId = window.requestIdleCallback(() => {
        setLoadInteractiveTools(true);
      }, { timeout });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = window.setTimeout(() => {
      setLoadInteractiveTools(true);
    }, isMobile ? 4500 : 2000);

    return () => window.clearTimeout(timer);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setRenderAurora(false);
      return;
    }

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setRenderAurora(true), { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(() => setRenderAurora(true), 500);
    return () => window.clearTimeout(timer);
  }, [isMobile]);

  return (
    <>
      <SEO />
      <Preloader />
      {!isMobile && loadChromeEnhancements && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}
      <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Scroll Progress Indicator */}
      {!isMobile && loadChromeEnhancements && (
        <Suspense fallback={null}>
          <ScrollProgress />
        </Suspense>
      )}
      
      {/* Navigation */}
      <Navigation />
      
      {/* Aurora Background */}
      {renderAurora && <AuroraBackground />}
      
      {/* Main Content */}
      <main id="main-content" className="relative z-10 pt-16 md:pt-20" role="main">
        <Hero />
        <SectionDivider variant="gradient" />
        <About />
        <SectionDivider variant="dots" />
        <Skills />
        <SectionDivider variant="gradient" />
        <Experience />
        <SectionDivider variant="dots" />
        <Projects />
        <SectionDivider variant="gradient" />
        <Testimonials />
        <SectionDivider variant="dots" />
        <GitHubActivity />
        <SectionDivider variant="gradient" />
        <Contact />
        <Footer />
      </main>

      {/* AI Chat Assistant */}
      {loadInteractiveTools && (
        <Suspense fallback={null}>
          <AIChat />
        </Suspense>
      )}
      
      {/* Social Share Button */}
      {loadInteractiveTools && (
        <Suspense fallback={null}>
          <SocialShare />
        </Suspense>
      )}
      
      {/* Scroll to Top Button */}
      {loadChromeEnhancements && (
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
      )}
    </div>
    </>
  );
};

export default Index;
