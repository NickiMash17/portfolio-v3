import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react';
import { AuroraBackground } from '@/components/AuroraBackground';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { Preloader } from '@/components/Preloader';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { SectionDivider } from '@/components/SectionDivider';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useIsMobile } from '@/hooks/use-mobile';

const About = lazy(async () => {
  const mod = await import('@/components/About');
  return { default: mod.About };
});
const Skills = lazy(async () => {
  const mod = await import('@/components/Skills');
  return { default: mod.Skills };
});
const Experience = lazy(async () => {
  const mod = await import('@/components/Experience');
  return { default: mod.Experience };
});
const Projects = lazy(async () => {
  const mod = await import('@/components/Projects');
  return { default: mod.Projects };
});
const Testimonials = lazy(async () => {
  const mod = await import('@/components/Testimonials');
  return { default: mod.Testimonials };
});
const GitHubActivity = lazy(async () => {
  const mod = await import('@/components/GitHubActivity');
  return { default: mod.GitHubActivity };
});
const Contact = lazy(async () => {
  const mod = await import('@/components/Contact');
  return { default: mod.Contact };
});
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

const DeferredSection = ({
  children,
  minHeight = 280,
}: {
  children: ReactNode;
  minHeight?: number;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const markerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMounted) return;

    const marker = markerRef.current;
    if (!marker) return;
    const mobile = window.innerWidth < 768;
    const rootMargin = mobile ? '180px 0px' : '350px 0px';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(marker);
    return () => observer.disconnect();
  }, [isMounted]);

  return (
    <div ref={markerRef}>
      {isMounted ? children : <div style={{ minHeight }} aria-hidden="true" />}
    </div>
  );
};

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
        <DeferredSection minHeight={720}>
          <Suspense fallback={<div style={{ minHeight: 720 }} aria-hidden="true" />}>
            <About />
          </Suspense>
        </DeferredSection>
        <SectionDivider variant="dots" />
        <DeferredSection minHeight={520}>
          <Suspense fallback={<div style={{ minHeight: 520 }} aria-hidden="true" />}>
            <Skills />
          </Suspense>
        </DeferredSection>
        <SectionDivider variant="gradient" />
        <DeferredSection minHeight={520}>
          <Suspense fallback={<div style={{ minHeight: 520 }} aria-hidden="true" />}>
            <Experience />
          </Suspense>
        </DeferredSection>
        <SectionDivider variant="dots" />
        <DeferredSection minHeight={920}>
          <Suspense fallback={<div style={{ minHeight: 920 }} aria-hidden="true" />}>
            <Projects />
          </Suspense>
        </DeferredSection>
        <SectionDivider variant="gradient" />
        <DeferredSection minHeight={560}>
          <Suspense fallback={<div style={{ minHeight: 560 }} aria-hidden="true" />}>
            <Testimonials />
          </Suspense>
        </DeferredSection>
        <SectionDivider variant="dots" />
        <DeferredSection minHeight={520}>
          <Suspense fallback={<div style={{ minHeight: 520 }} aria-hidden="true" />}>
            <GitHubActivity />
          </Suspense>
        </DeferredSection>
        <SectionDivider variant="gradient" />
        <DeferredSection minHeight={480}>
          <Suspense fallback={<div style={{ minHeight: 480 }} aria-hidden="true" />}>
            <Contact />
          </Suspense>
        </DeferredSection>
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
