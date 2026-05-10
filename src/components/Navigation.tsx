import { useState, useEffect } from 'react';
import { Menu, X, Code2, User, Briefcase, FolderOpen, Award, Mail, FileText } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SoundToggle } from '@/components/SoundToggle';
import { trackEvent, trackDownload } from '@/lib/analytics';
import { playUISound } from '@/lib/sound';
import { CVPreviewModal } from '@/components/CVPreviewModal';

const navItems = [
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'testimonials', label: 'Testimonials', icon: Award },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let rafId = 0;
    let sections: { id: string; el: HTMLElement }[] = [];

    const refreshSections = () => {
      sections = navItems
        .map((item) => {
          const el = document.getElementById(item.id);
          return el ? { id: item.id, el } : null;
        })
        .filter((v): v is { id: string; el: HTMLElement } => v !== null);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + 140;
      let current = '';

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].el.offsetTop <= scrollPosition) {
          current = sections[i].id;
          break;
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    const onScroll = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(() => {
        handleScroll();
        rafId = 0;
      });
    };

    refreshSections();
    const mutationObserver = new MutationObserver(refreshSections);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', refreshSections);
    handleScroll(); // Initial check

    return () => {
      mutationObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', refreshSections);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const target =
      document.getElementById(id) ??
      (document.querySelector(`[data-nav-target="${id}"]`) as HTMLElement | null);

    if (!target) return;

    const offset = 80;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    setActiveSection(id);
    trackEvent('navigation_click', { section: id });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Skip to Content Link - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:font-medium focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass border-b border-primary/20 shadow-lg backdrop-blur-xl'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo/Brand */}
            <button
              onClick={() => {
                void playUISound('tap');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                trackEvent('navigation_click', { section: 'home' });
              }}
              className="flex items-center gap-2 group"
              aria-label="Go to top"
            >
              <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <span className="hidden sm:block font-mono text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                NM
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      void playUISound('tap');
                      scrollToSection(item.id);
                    }}
                    className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 group ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right side buttons - Mobile */}
            <div className="md:hidden flex items-center gap-2">
              <SoundToggle />
              <ThemeToggle />
              <button
                onClick={() => {
                  void playUISound('toggle');
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="p-2 rounded-lg glass border border-primary/20 hover:border-primary/50 transition-all"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-foreground" />
                ) : (
                  <Menu className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>

            {/* Right side - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <CVPreviewModal
                trigger={
                  <button
                    onClick={() => void playUISound('tap')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/40 text-primary text-sm font-medium hover:bg-primary/10 hover:border-primary/60 transition-all duration-200"
                  >
                    <FileText className="w-4 h-4" />
                    <span>CV</span>
                  </button>
                }
              />
              <SoundToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass border-t border-primary/20 backdrop-blur-xl">
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      void playUISound('tap');
                      scrollToSection(item.id);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'text-primary bg-primary/10 border border-primary/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </button>
                );
              })}
              <CVPreviewModal
                trigger={
                  <button
                    onClick={() => {
                      void playUISound('tap');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm border border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 transition-all duration-200"
                  >
                    <FileText className="w-5 h-5" />
                    <span>View / Download CV</span>
                  </button>
                }
              />
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
