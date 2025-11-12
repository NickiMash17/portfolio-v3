import { AuroraBackground } from '@/components/AuroraBackground';
import { AIChat } from '@/components/AIChat';
import { GitHubActivity } from '@/components/GitHubActivity';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Preloader } from '@/components/Preloader';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  return (
    <>
      <Preloader />
      <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Aurora Background */}
      <AuroraBackground />
      
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHubActivity />
        <Contact />
        <Footer />
      </div>

      {/* AI Chat Assistant */}
      <AIChat />
    </div>
    </>
  );
};

export default Index;
