import { useState, useEffect } from 'react';
import { Folder, Github, Linkedin, Mail, FileText } from 'lucide-react';

export const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [codeDisplay, setCodeDisplay] = useState('');
  const [codeIndex, setCodeIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [titleText, setTitleText] = useState('');
  const [isTitleDeleting, setIsTitleDeleting] = useState(false);
  
  const fullText = '> Nicolette Mashaba_';
  const snippets = [
    'git clone https://github.com/NickiMash17/portfolio',
    'npm run build && npm run preview',
    'docker build -t nmashaba/app .',
    'az webapp up --runtime "NODE:18-lts"',
  ];
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
                className="absolute -top-2 left-[10%] sm:left-[5%] animate-float group"
                style={{ animationDelay: '0s', animationDuration: '4s' }}
              >
                <div className="p-2 sm:p-3 glass rounded-xl border border-foreground/10 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                  <Github className="w-5 h-5 sm:w-7 sm:h-7 text-foreground/70 group-hover:text-foreground transition-colors" />
                </div>
              </a>

              <a
                href="https://linkedin.com/in/nicolette-mashaba"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-0 right-[5%] sm:right-[10%] animate-float group"
                style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}
              >
                <div className="p-2 sm:p-3 glass rounded-xl border border-foreground/10 group-hover:border-[#0A66C2]/50 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#0A66C2]/20">
                  <Linkedin className="w-5 h-5 sm:w-7 sm:h-7 text-[#0A66C2] group-hover:text-[#0A66C2]/80 transition-colors" />
                </div>
              </a>

              <button
                onClick={() => scrollToSection('projects')}
                className="absolute bottom-0 left-[5%] sm:left-[15%] animate-float group"
                style={{ animationDelay: '1s', animationDuration: '5s' }}
              >
                <div className="p-2 sm:p-3 glass rounded-xl border border-foreground/10 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                  <Folder className="w-5 h-5 sm:w-7 sm:h-7 text-primary fill-primary/20 group-hover:fill-primary/40 transition-colors" />
                </div>
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="absolute -bottom-4 right-[15%] sm:right-[5%] animate-float group"
                style={{ animationDelay: '1.5s', animationDuration: '4.2s' }}
              >
                <div className="p-2 sm:p-3 glass rounded-xl border border-foreground/10 group-hover:border-accent/50 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent/20">
                  <Mail className="w-5 h-5 sm:w-7 sm:h-7 text-accent group-hover:text-accent/80 transition-colors" />
                </div>
              </button>

              <a
                href="/Nicolette-Mashaba-CV.pdf"
                download="Nicolette_Mashaba_Resume.pdf"
                className="absolute top-1/2 -translate-y-1/2 -right-2 sm:right-0 animate-float group"
                style={{ animationDelay: '2s', animationDuration: '4.8s' }}
              >
                <div className="p-2 sm:p-3 glass rounded-xl border border-foreground/10 group-hover:border-secondary/50 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-secondary/20">
                  <FileText className="w-5 h-5 sm:w-7 sm:h-7 text-secondary group-hover:text-secondary/80 transition-colors" />
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

          {/* Right: Interactive Terminal Card */}
          <div className="glass rounded-2xl p-4 sm:p-6 md:p-8 glow-primary border border-primary/30 w-full">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-destructive/70" />
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-secondary/70" />
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-accent/70" />
              <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-muted-foreground font-mono">/dev/terminal</span>
            </div>
            <div className="bg-card/50 rounded-lg p-3 sm:p-4 min-h-[180px] sm:min-h-[220px] md:min-h-[260px] overflow-hidden">
              <pre className="text-left font-mono text-xs sm:text-sm md:text-base leading-relaxed text-foreground/90 overflow-x-auto">
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
      </div>
    </section>
  );
};
