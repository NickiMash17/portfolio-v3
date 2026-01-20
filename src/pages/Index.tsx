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
import { ThemeToggle } from '@/components/ThemeToggle';
import { CustomCursor } from '@/components/CustomCursor';
import { SEO } from '@/components/SEO';

const Index = () => {
  return (
    <>
      <SEO />
      <Preloader />
      <CustomCursor />
      <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Aurora Background */}
      <AuroraBackground />
      
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      {/* Main Content */}
      <main className="relative z-10" role="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Testimonials />
        <GitHubActivity />
        <Contact />
        <Footer />
      </main>

      {/* AI Chat Assistant */}
      <AIChat />
    </div>
    </>
  );
};

export default Index;
