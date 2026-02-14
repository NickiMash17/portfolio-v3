import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react';
import { AuroraBackground } from '@/components/AuroraBackground';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { Preloader } from '@/components/Preloader';
import { CustomCursor } from '@/components/CustomCursor';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ScrollProgress } from '@/components/ScrollProgress';
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: '350px 0px' }
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
  const [loadInteractiveTools, setLoadInteractiveTools] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoadInteractiveTools(true);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, []);

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
      <CustomCursor />
      <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
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
      <ScrollToTop />
    </div>
    </>
  );
};

export default Index;
