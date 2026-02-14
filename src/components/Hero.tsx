import { Suspense, lazy, useEffect, useState } from 'react';
import { Folder, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { trackExternalLink, trackDownload } from '@/lib/analytics';
import { useIsMobile } from '@/hooks/use-mobile';

const InteractiveTerminal = lazy(async () => {
  const mod = await import('./InteractiveTerminal');
  return { default: mod.InteractiveTerminal };
});

const PortfolioCube = lazy(async () => {
  const mod = await import('./PortfolioCube');
  return { default: mod.PortfolioCube };
});

const TITLES = [
  'Software Engineer',
  'AI/ML Enthusiast',
  'Azure Cloud Expert',
  'Hackathon Winner',
  'Full-Stack Developer',
];

export const Hero = () => {
  const isMobile = useIsMobile();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [titleText, setTitleText] = useState(TITLES[0]);
  const [isTitleDeleting, setIsTitleDeleting] = useState(false);
  const [showCube, setShowCube] = useState(false);
  const [isPanelReady, setIsPanelReady] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setPrefersReducedMotion(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsPanelReady(true);
      return;
    }

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) {
      setIsPanelReady(false);
      return;
    }

    const timer = window.setTimeout(() => setIsPanelReady(true), 1800);
    return () => window.clearTimeout(timer);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile || prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setTitleIndex((i) => (i + 1) % TITLES.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, [isMobile, prefersReducedMotion]);

  useEffect(() => {
    if (!isMobile || prefersReducedMotion) return;

    setTitleText(TITLES[titleIndex % TITLES.length]);
    setIsTitleDeleting(false);
  }, [isMobile, prefersReducedMotion, titleIndex]);

  useEffect(() => {
    if (!isMobile || !prefersReducedMotion) return;

    setTitleText(TITLES[0]);
    setIsTitleDeleting(false);
  }, [isMobile, prefersReducedMotion]);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) {
      return;
    }

    const current = TITLES[titleIndex % TITLES.length];
    const speed = isTitleDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isTitleDeleting) {
        setTitleText(current.slice(0, titleText.length + 1));
        if (titleText.length + 1 === current.length) {
          setTimeout(() => setIsTitleDeleting(true), 2000);
        }
      } else {
        setTitleText(current.slice(0, Math.max(0, titleText.length - 1)));
        if (titleText.length === 0) {
          setIsTitleDeleting(false);
          setTitleIndex((i) => (i + 1) % TITLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [isMobile, prefersReducedMotion, titleText, titleIndex, isTitleDeleting]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const iconButtonClass =
    'p-2 sm:p-3 glass rounded-xl border border-foreground/10 transition-all duration-300';

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-20 md:py-0">
      <div className={prefersReducedMotion ? 'hidden' : 'hidden sm:block gradient-mesh'} />
      <div className={prefersReducedMotion ? 'hidden' : 'sm:hidden absolute top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/10 rounded-full blur-2xl'} />
      <div className={prefersReducedMotion ? 'hidden' : 'sm:hidden absolute bottom-8 right-6 w-24 h-24 bg-accent/10 rounded-full blur-xl'} />

      <div className={prefersReducedMotion ? 'hidden' : 'hidden sm:block absolute top-1/4 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/10 rounded-full blur-[100px] animate-float'} />
      <div className={prefersReducedMotion ? 'hidden' : 'hidden sm:block absolute bottom-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent/10 rounded-full blur-[100px] animate-float'} style={{ animationDelay: '2s' }} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 lg:space-y-6 order-1">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
              <div className="relative group flex-shrink-0">
                <div className={`absolute -inset-2 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 ${prefersReducedMotion ? '' : 'sm:animate-rotate-slow'}`}></div>
                <div className="absolute -inset-1 bg-gradient-to-tr from-primary/50 via-accent/30 to-primary/50 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>

                <div className="relative glass rounded-full p-2 border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-300">
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-accent rounded-tl-full group-hover:scale-125 transition-transform duration-300"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-primary rounded-tr-full group-hover:scale-125 transition-transform duration-300" style={{ transitionDelay: '0.1s' }}></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-primary rounded-bl-full group-hover:scale-125 transition-transform duration-300" style={{ transitionDelay: '0.2s' }}></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-accent rounded-br-full group-hover:scale-125 transition-transform duration-300" style={{ transitionDelay: '0.3s' }}></div>

                  <picture>
                    <source media="(max-width: 767px)" srcSet="/my-caricature-mobile.jpg" />
                    <img
                      src="/my-caricature.jpeg"
                      alt="Nicolette Mashaba - Software Engineer"
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      width={224}
                      height={224}
                      sizes="(max-width: 639px) 80px, (max-width: 767px) 96px, 112px"
                    />
                  </picture>
                </div>

                <div className="absolute -top-11 sm:-top-16 left-1/2 -translate-x-1/2 glass rounded-xl px-2.5 py-1.5 text-[10px] sm:text-xs font-medium text-primary border border-primary/20 leading-tight w-max">
                  <div className={prefersReducedMotion ? '' : 'animate-float-soft'}>
                    <span className="block whitespace-nowrap">#1 Female Most Active</span>
                    <span className="block whitespace-nowrap">GitHub User 🇿🇦</span>
                  </div>
                </div>
                <div className={`absolute -bottom-2 -left-2 glass rounded-full px-2 py-1 text-xs font-medium text-accent border border-accent/20 ${prefersReducedMotion ? '' : 'animate-float'}`} style={{ animationDelay: '1s' }}>
                  Azure
                </div>
              </div>

              <header className="w-full" aria-label="Introduction">
                <div className="inline-flex items-center gap-1.5 sm:gap-3 glass rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 border border-primary/20 mb-3 sm:mb-4 lg:mb-6">
                  <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  </span>
                  <span className="text-[10px] sm:text-sm font-medium text-foreground">Open to Opportunities</span>
                  <span className="text-[10px] sm:text-sm text-muted-foreground hidden sm:inline">Johannesburg, SA</span>
                </div>

                <div className="relative">
                  <a
                    href="https://github.com/NickiMash17"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:block absolute -top-2 left-[5%] animate-float group z-20 cursor-pointer"
                    style={{ animationDelay: '0s', animationDuration: '4s' }}
                    onClick={() => trackExternalLink('https://github.com/NickiMash17', 'github')}
                  >
                    <div className={`${iconButtonClass} group-hover:border-primary/50 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20`}>
                      <Github className="w-5 h-5 sm:w-7 sm:h-7 text-foreground/70 group-hover:text-foreground transition-colors" />
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com/in/nicolette-mashaba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:block absolute top-0 right-[10%] animate-float group z-20 cursor-pointer"
                    style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}
                    onClick={() => trackExternalLink('https://linkedin.com/in/nicolette-mashaba', 'linkedin')}
                  >
                    <div className={`${iconButtonClass} group-hover:border-[#0A66C2]/50 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#0A66C2]/20`}>
                      <Linkedin className="w-5 h-5 sm:w-7 sm:h-7 text-[#0A66C2] group-hover:text-[#0A66C2]/80 transition-colors" />
                    </div>
                  </a>

                  <button
                    onClick={() => scrollToSection('projects')}
                    className="hidden sm:block absolute bottom-0 left-[15%] animate-float group z-20 cursor-pointer"
                    style={{ animationDelay: '1s', animationDuration: '5s' }}
                  >
                    <div className={`${iconButtonClass} group-hover:border-primary/50 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20`}>
                      <Folder className="w-5 h-5 sm:w-7 sm:h-7 text-primary fill-primary/20 group-hover:fill-primary/40 transition-colors" />
                    </div>
                  </button>

                  <button
                    onClick={() => scrollToSection('contact')}
                    className="hidden sm:block absolute -bottom-4 right-[5%] animate-float group z-20 cursor-pointer"
                    style={{ animationDelay: '1.5s', animationDuration: '4.2s' }}
                  >
                    <div className={`${iconButtonClass} group-hover:border-accent/50 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent/20`}>
                      <Mail className="w-5 h-5 sm:w-7 sm:h-7 text-accent group-hover:text-accent/80 transition-colors" />
                    </div>
                  </button>

                  <a
                    href="/Nicolette_Mashaba_Junior_Software_Engineer_CV.pdf"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:block absolute top-1/2 -translate-y-1/2 right-0 animate-float group z-20 cursor-pointer"
                    style={{ animationDelay: '2s', animationDuration: '4.8s' }}
                    onClick={() => trackDownload('Nicolette_Mashaba_Junior_Software_Engineer_CV.pdf', 'pdf')}
                  >
                    <div className={`${iconButtonClass} group-hover:border-primary/50 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20`}>
                      <FileText className="w-5 h-5 sm:w-7 sm:h-7 text-primary group-hover:text-primary/80 transition-colors" />
                    </div>
                  </a>

                  <div className="space-y-1 sm:space-y-3 relative z-10 py-2 sm:py-8 md:py-12 px-2 sm:px-10 md:px-0">
                    <h1 className="font-medium tracking-tight">
                      <span className="block text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground">Nicolette Mashaba</span>
                      <span className="block text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-semibold mt-1 sm:mt-2 min-h-[1.2em]">
                        {titleText}<span className={isMobile || prefersReducedMotion ? 'text-primary' : 'animate-pulse text-primary'}>|</span>
                      </span>
                    </h1>

                    <div className="sm:hidden flex flex-wrap justify-center gap-2 pt-3">
                      <a
                        href="https://github.com/NickiMash17"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${iconButtonClass} hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20`}
                        onClick={() => trackExternalLink('https://github.com/NickiMash17', 'github')}
                      >
                        <Github className="w-5 h-5 text-foreground/70" />
                      </a>
                      <a
                        href="https://linkedin.com/in/nicolette-mashaba"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${iconButtonClass} hover:border-[#0A66C2]/50 hover:shadow-lg hover:shadow-[#0A66C2]/20`}
                        onClick={() => trackExternalLink('https://linkedin.com/in/nicolette-mashaba', 'linkedin')}
                      >
                        <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                      </a>
                      <button
                        onClick={() => scrollToSection('projects')}
                        className={`${iconButtonClass} hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20`}
                      >
                        <Folder className="w-5 h-5 text-primary fill-primary/20" />
                      </button>
                      <button
                        onClick={() => scrollToSection('contact')}
                        className={`${iconButtonClass} hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20`}
                      >
                        <Mail className="w-5 h-5 text-accent" />
                      </button>
                      <a
                        href="/Nicolette_Mashaba_Junior_Software_Engineer_CV.pdf"
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${iconButtonClass} hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20`}
                        onClick={() => trackDownload('Nicolette_Mashaba_Junior_Software_Engineer_CV.pdf', 'pdf')}
                      >
                        <FileText className="w-5 h-5 text-primary" />
                      </a>
                    </div>
                  </div>
                </div>
              </header>
            </div>
          </div>

          <div className="order-2 lg:order-2 flex w-full flex-col items-center justify-center gap-4">
            <div className="inline-flex items-center gap-2 glass rounded-full p-1 border border-primary/20">
              <button
                onClick={() => {
                  setIsPanelReady(true);
                  setShowCube(false);
                }}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all ${
                  !showCube ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Terminal
              </button>
              <button
                onClick={() => {
                  setIsPanelReady(true);
                  setShowCube(true);
                }}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all ${
                  showCube ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Cube
              </button>
            </div>

            {isPanelReady ? (
              <Suspense fallback={<div className="w-full min-h-[340px] sm:min-h-[420px] glass rounded-2xl border border-primary/30" aria-hidden="true" />}>
                {showCube ? <PortfolioCube /> : <InteractiveTerminal />}
              </Suspense>
            ) : (
              <div className="w-full min-h-[340px] sm:min-h-[420px] glass rounded-2xl border border-primary/30 flex items-center justify-center px-4">
                <button
                  onClick={() => setIsPanelReady(true)}
                  className="px-4 py-2 rounded-full border border-primary/30 text-sm text-primary hover:bg-primary/10 transition-colors"
                >
                  Load Interactive Panel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
