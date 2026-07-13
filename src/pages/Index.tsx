import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { AuroraBackground } from '@/components/AuroraBackground';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';
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
const EngineeringLog = lazy(async () => {
  const mod = await import('@/components/EngineeringLog');
  return { default: mod.EngineeringLog };
});
const VideosSection = lazy(async () => {
  const mod = await import('@/components/VideosSection');
  return { default: mod.VideosSection };
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
const Preloader = lazy(async () => {
  const mod = await import('@/components/Preloader');
  return { default: mod.Preloader };
});

const SectionSkeleton = ({ minHeight = 420 }: { minHeight?: number }) => (
  <div className="px-4 sm:px-6 py-12 sm:py-16 md:py-24 lg:py-32" style={{ minHeight }}>
    <div className="container mx-auto max-w-6xl">
      <div className="glass rounded-2xl border border-primary/20 h-40 sm:h-48 animate-pulse" aria-hidden="true" />
    </div>
  </div>
);

const DeferredSection = ({
  id,
  isMobile,
  minHeight = 420,
  children,
}: {
  id: string;
  isMobile: boolean;
  minHeight?: number;
  children: React.ReactNode;
}) => {
  const anchorRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: isMobile ? '520px 0px' : '760px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <section id={id} ref={anchorRef} className="relative">
      {isVisible ? children : <SectionSkeleton minHeight={minHeight} />}
    </section>
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
      const timeout = isMobile ? 7000 : 1400;
      const idleId = window.requestIdleCallback(() => {
        setLoadChromeEnhancements(true);
      }, { timeout });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = window.setTimeout(() => {
      setLoadChromeEnhancements(true);
    }, isMobile ? 6000 : 1000);

    return () => window.clearTimeout(timer);
  }, [isMobile]);

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const timeout = isMobile ? 14000 : 2600;
      const idleId = window.requestIdleCallback(() => {
        setLoadInteractiveTools(true);
      }, { timeout });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = window.setTimeout(() => {
      setLoadInteractiveTools(true);
    }, isMobile ? 12000 : 2000);

    return () => window.clearTimeout(timer);
  }, [isMobile]);

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setRenderAurora(true), { timeout: isMobile ? 2200 : 1200 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(() => setRenderAurora(true), isMobile ? 1200 : 500);
    return () => window.clearTimeout(timer);
  }, [isMobile]);

  return (
    <>
      <SEO />
      <Suspense fallback={null}>
        <Preloader />
      </Suspense>
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
      <main id="main-content" className="relative z-10 pt-16 sm:pt-[5.75rem] md:pt-[6.75rem]" role="main">
        <Hero />
        <SectionDivider variant="gradient" />
        <DeferredSection id="about" isMobile={isMobile} minHeight={760}>
          <Suspense fallback={<SectionSkeleton minHeight={760} />}>
            <About />
          </Suspense>
        </DeferredSection>
        <SectionDivider variant="dots" />
        <DeferredSection id="skills" isMobile={isMobile} minHeight={680}>
          <Suspense fallback={<SectionSkeleton minHeight={680} />}>
            <Skills />
          </Suspense>
        </DeferredSection>
        <SectionDivider variant="gradient" />
        <DeferredSection id="github" isMobile={isMobile} minHeight={560}>
          <Suspense fallback={<SectionSkeleton minHeight={560} />}>
            <GitHubActivity />
          </Suspense>
        </DeferredSection>
        <SectionDivider variant="dots" />
        <DeferredSection id="experience" isMobile={isMobile} minHeight={820}>
          <Suspense fallback={<SectionSkeleton minHeight={820} />}>
            <Experience />
          </Suspense>
        </DeferredSection>
        <SectionDivider variant="dots" />
        <DeferredSection id="engineering-log" isMobile={isMobile} minHeight={280}>
          <Suspense fallback={<SectionSkeleton minHeight={280} />}>
            <section className="relative py-8 sm:py-10 md:py-14 px-4 sm:px-6">
              <div className="container mx-auto max-w-3xl">
                <EngineeringLog />
              </div>
            </section>
          </Suspense>
        </DeferredSection>
        <SectionDivider variant="dots" />
        <DeferredSection id="projects" isMobile={isMobile} minHeight={920}>
          <Suspense fallback={<SectionSkeleton minHeight={920} />}>
            <Projects />
          </Suspense>
        </DeferredSection>
        <SectionDivider variant="dots" />
        <DeferredSection id="videos" isMobile={isMobile} minHeight={640}>
          <Suspense fallback={<SectionSkeleton minHeight={640} />}>
            <VideosSection />
          </Suspense>
        </DeferredSection>
        <SectionDivider variant="gradient" />
        <DeferredSection id="testimonials" isMobile={isMobile} minHeight={720}>
          <Suspense fallback={<SectionSkeleton minHeight={720} />}>
            <Testimonials />
          </Suspense>
        </DeferredSection>
        <SectionDivider variant="gradient" />
        <DeferredSection id="contact" isMobile={isMobile} minHeight={740}>
          <Suspense fallback={<SectionSkeleton minHeight={740} />}>
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

