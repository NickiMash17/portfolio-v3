import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';

export const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [codeDisplay, setCodeDisplay] = useState('');
  const [codeIndex, setCodeIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = '> Nicolette Mashaba_';
  const snippets = [
    'git clone https://github.com/NickiMash17/portfolio',
    'npm run build && npm run preview',
    'docker build -t nmashaba/app .',
    'az webapp up --runtime "NODE:18-lts"',
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

  // Animated typing for code snippets in the terminal card
  useEffect(() => {
    const current = snippets[codeIndex % snippets.length];
    const isComplete = codeDisplay.length === current.length;
    const speed = isDeleting ? 30 : 50;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCodeDisplay(current.slice(0, codeDisplay.length + 1));
        if (codeDisplay.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 800);
        }
      } else {
        setCodeDisplay(current.slice(0, Math.max(0, codeDisplay.length - 1)));
        if (codeDisplay.length === 0) {
          setIsDeleting(false);
          setCodeIndex((i) => (i + 1) % snippets.length);
        }
      }
    }, isComplete && !isDeleting ? 1000 : speed);

    return () => clearTimeout(timer);
  }, [codeDisplay, codeIndex, isDeleting]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-0">
      {/* Animated gradient mesh background */}
      <div className="gradient-mesh" />
      
      {/* Additional depth layers */}
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Headline and CTAs */}
          <header className="text-center md:text-left space-y-5 sm:space-y-6 md:space-y-8" aria-label="Introduction">
            {/* Professional Header Card */}
            <div className="space-y-3 sm:space-y-4">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 sm:gap-3 glass rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-primary/20">
                <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-accent"></span>
                </span>
                <span className="text-xs sm:text-sm font-medium text-foreground">Open to Opportunities</span>
                <span className="w-px h-3 sm:h-4 bg-border"></span>
                <span className="text-xs sm:text-sm text-muted-foreground">Johannesburg, SA</span>
              </div>

              {/* Name and Title */}
              <div className="space-y-2 sm:space-y-3">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                  <span className="block text-foreground mb-1 sm:mb-2">Nicolette Mashaba</span>
                  <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-extrabold">
                    Software Engineer
                  </span>
                </h1>
                
                {/* Specializations */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="text-primary">//</span>
                    Full-Stack Development
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-primary">//</span>
                    Cloud Architecture
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-primary">//</span>
                    AI Integration
                  </span>
                </div>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="space-y-3">
              <div className="glass rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-primary/50 backdrop-blur-xl">
                <p className="text-sm sm:text-base md:text-lg text-foreground/90 leading-relaxed">
                  Crafting scalable solutions at the intersection of{' '}
                  <span className="text-primary font-semibold">cloud infrastructure</span>,{' '}
                  <span className="text-accent font-semibold">AI innovation</span>, and{' '}
                  <span className="text-secondary font-semibold">full-stack development</span>.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-2.5 sm:gap-3">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/50 font-semibold px-6"
                onClick={() => scrollToSection('projects')}
              >
                View Projects
                <ArrowDown className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto glass border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300 font-semibold px-6"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto glass border-2 border-accent/30 hover:border-accent hover:bg-accent/5 transition-all duration-300 font-semibold px-6"
                asChild
              >
                <a href="/Nicolette-Mashaba-CV.pdf" download="Nicolette_Mashaba_Resume.pdf">
                  <Download className="mr-2 w-4 h-4" />
                  Resume
                </a>
              </Button>
            </div>

            {/* Professional Links */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 pt-2 pb-4 sm:pb-6">
              <span className="text-xs sm:text-sm text-muted-foreground font-mono">Connect:</span>
              <div className="flex gap-2 sm:gap-3">
                <a 
                  href="https://github.com/NickiMash17" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass p-2.5 sm:p-3 rounded-lg hover:bg-primary/10 hover:scale-110 transition-all duration-300 border border-transparent hover:border-primary/30 group"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
                </a>
                <a 
                  href="https://linkedin.com/in/nicolette-mashaba" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass p-2.5 sm:p-3 rounded-lg hover:bg-primary/10 hover:scale-110 transition-all duration-300 border border-transparent hover:border-primary/30 group"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="mailto:nene171408@gmail.com"
                  className="glass p-2.5 sm:p-3 rounded-lg hover:bg-primary/10 hover:scale-110 transition-all duration-300 border border-transparent hover:border-primary/30 group"
                  aria-label="Email Contact"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-[-2px] transition-transform" />
                </a>
              </div>
            </div>
          </header>

          {/* Right: Interactive Terminal Card */}
          <div className="glass rounded-2xl p-4 sm:p-6 md:p-8 glow-primary border border-primary/30">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-destructive/70" />
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-secondary/70" />
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-accent/70" />
              <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-muted-foreground font-mono">/dev/terminal</span>
            </div>
            <div className="bg-card/50 rounded-lg p-3 sm:p-4 min-h-[180px] sm:min-h-[220px] md:min-h-[260px] overflow-hidden">
              <pre className="text-left font-mono text-xs sm:text-sm md:text-base leading-relaxed text-foreground/90">
                <code>
                  <span className="text-primary">$ </span>{codeDisplay}
                  <span className="terminal-cursor">|</span>
                </code>
              </pre>
              <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground">
                <div className="glass rounded-md px-2 sm:px-3 py-1.5 sm:py-2">Tech: React • Node</div>
                <div className="glass rounded-md px-2 sm:px-3 py-1.5 sm:py-2">Cloud: Azure</div>
                <div className="glass rounded-md px-2 sm:px-3 py-1.5 sm:py-2">AI: Gemini</div>
                <div className="glass rounded-md px-2 sm:px-3 py-1.5 sm:py-2">Deploy: Docker</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="scan-line absolute w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};
