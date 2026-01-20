import { useState, useEffect } from 'react';
import { Folder, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { InteractiveTerminal } from './InteractiveTerminal';
import { trackExternalLink, trackDownload } from '@/lib/analytics';

export const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [titleIndex, setTitleIndex] = useState(0);
  const [titleText, setTitleText] = useState('');
  const [isTitleDeleting, setIsTitleDeleting] = useState(false);
  
  const fullText = '> Nicolette Mashaba_';
  const titles = [
    'Software Engineer',
    'AI/ML Enthusiast',
    'Azure Cloud Expert',
    'Hackathon Winner',
    'Full-Stack Developer',
  ];

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  // Animated typing for title rotation
  useEffect(() => {
    const current = titles[titleIndex % titles.length];
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
          setTitleIndex((i) => (i + 1) % titles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [titleText, titleIndex, isTitleDeleting]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-20 md:py-0">
      {/* Animated gradient mesh background */}
      <div className="gradient-mesh" />
      
      {/* Additional depth layers */}
      <div className="absolute top-1/4 right-1/4 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[500px] bg-primary/10 rounded-full blur-[80px] sm:blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 left-1/4 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[500px] bg-accent/10 rounded-full blur-[80px] sm:blur-[100px] animate-float" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Left: Headline and CTAs */}
          <header className="text-center md:text-left w-full" aria-label="Introduction">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-3 glass rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 border border-primary/20 mb-4 sm:mb-6">
              <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-accent"></span>
              </span>
              <span className="text-[10px] sm:text-sm font-medium text-foreground">Open to Opportunities</span>
              <span className="text-[10px] sm:text-sm text-muted-foreground hidden sm:inline">• Johannesburg, SA</span>
            </div>

            {/* Name with Orbiting Icons */}
            <div className="relative py-8 sm:py-12 md:py-16">
              {/* Floating Icons */}
              <a
                href="https://github.com/NickiMash17"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -top-2 left-[10%] sm:left-[5%] animate-float group z-20 cursor-pointer"
                style={{ animationDelay: '0s', animationDuration: '4s' }}
                onClick={() => trackExternalLink('https://github.com/NickiMash17', 'github')}
              >
                <div className="p-2 sm:p-3 glass rounded-xl border border-foreground/10 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                  <Github className="w-5 h-5 sm:w-7 sm:h-7 text-foreground/70 group-hover:text-foreground transition-colors" />
                </div>
              </a>

              <a
                href="https://linkedin.com/in/nicolette-mashaba"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-0 right-[5%] sm:right-[10%] animate-float group z-20 cursor-pointer"
                style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}
                onClick={() => trackExternalLink('https://linkedin.com/in/nicolette-mashaba', 'linkedin')}
              >
                <div className="p-2 sm:p-3 glass rounded-xl border border-foreground/10 group-hover:border-[#0A66C2]/50 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#0A66C2]/20">
                  <Linkedin className="w-5 h-5 sm:w-7 sm:h-7 text-[#0A66C2] group-hover:text-[#0A66C2]/80 transition-colors" />
                </div>
              </a>

              <button
                onClick={() => scrollToSection('projects')}
                className="absolute bottom-0 left-[5%] sm:left-[15%] animate-float group z-20 cursor-pointer"
                style={{ animationDelay: '1s', animationDuration: '5s' }}
              >
                <div className="p-2 sm:p-3 glass rounded-xl border border-foreground/10 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                  <Folder className="w-5 h-5 sm:w-7 sm:h-7 text-primary fill-primary/20 group-hover:fill-primary/40 transition-colors" />
                </div>
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="absolute -bottom-4 right-[15%] sm:right-[5%] animate-float group z-20 cursor-pointer"
                style={{ animationDelay: '1.5s', animationDuration: '4.2s' }}
              >
                <div className="p-2 sm:p-3 glass rounded-xl border border-foreground/10 group-hover:border-accent/50 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent/20">
                  <Mail className="w-5 h-5 sm:w-7 sm:h-7 text-accent group-hover:text-accent/80 transition-colors" />
                </div>
              </button>

              <a
                href="/Nicolette-Mashaba-CV.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-1/2 -translate-y-1/2 -right-2 sm:right-0 animate-float group z-20 cursor-pointer"
                style={{ animationDelay: '2s', animationDuration: '4.8s' }}
                onClick={() => trackDownload('Nicolette-Mashaba-CV.pdf', 'pdf')}
              >
                <div className="p-2 sm:p-3 glass rounded-xl border border-foreground/10 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                  <FileText className="w-5 h-5 sm:w-7 sm:h-7 text-primary group-hover:text-primary/80 transition-colors" />
                </div>
              </a>

              {/* Name and Title */}
              <div className="space-y-1 sm:space-y-3 relative z-10">
                <h1 className="font-medium tracking-tight">
                  <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground">Nicolette Mashaba</span>
                  <span className="block text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-semibold mt-1 sm:mt-2 min-h-[1.2em]">
                    {titleText}<span className="animate-pulse text-primary">|</span>
                  </span>
                </h1>
              </div>
            </div>
          </header>

          {/* Right: Interactive Terminal */}
          <InteractiveTerminal />
        </div>
      </div>
    </section>
  );
};
