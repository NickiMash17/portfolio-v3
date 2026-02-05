import { AuroraBackground } from '@/components/AuroraBackground';
import { AIChat } from '@/components/AIChat';
import { GitHubActivity } from '@/components/GitHubActivity';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Preloader } from '@/components/Preloader';
import { CustomCursor } from '@/components/CustomCursor';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SEO } from '@/components/SEO';
import { SocialShare } from '@/components/SocialShare';
import { Navigation } from '@/components/Navigation';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ScrollProgress } from '@/components/ScrollProgress';
import { SectionDivider } from '@/components/SectionDivider';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

const Index = () => {
  useKeyboardNavigation();

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
      <AuroraBackground />
      
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
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
      <AIChat />
      
      {/* Social Share Button */}
      <SocialShare />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
    </>
  );
};

export default Index;
