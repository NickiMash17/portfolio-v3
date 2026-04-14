import { useState } from 'react';
import { 
  Code2, 
  Cloud, 
  Anchor, 
  Trophy, 
  Users, 
  FileText,
  Database,
  Server,
  Cpu,
  Globe,
  Layers
} from 'lucide-react';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { trackDownload } from '@/lib/analytics';

export const About = () => {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  const toolkit = [
    { icon: Code2, label: 'Frontend', level: 95, color: 'from-primary to-accent' },
    { icon: Server, label: 'Backend', level: 90, color: 'from-accent to-primary' },
    { icon: Database, label: 'Database', level: 85, color: 'from-primary to-secondary' },
    { icon: Cloud, label: 'Cloud', level: 80, color: 'from-secondary to-accent' },
    { icon: Cpu, label: 'AI/ML', level: 75, color: 'from-accent to-secondary' },
    { icon: Globe, label: 'Web', level: 95, color: 'from-primary to-accent' },
    { icon: Layers, label: 'Architecture', level: 80, color: 'from-secondary to-primary' }
  ];

  const glitchStyle = `
    @keyframes glitch {
      0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, -1px); }
      20% { clip-path: inset(92% 0 1% 0); transform: translate(1px, 2px); }
      40% { clip-path: inset(43% 0 1% 0); transform: translate(-1px, -2px); }
      60% { clip-path: inset(25% 0 58% 0); transform: translate(2px, 1px); }
      80% { clip-path: inset(54% 0 7% 0); transform: translate(-2px, 2px); }
      100% { clip-path: inset(58% 0 43% 0); transform: translate(1px, -1px); }
    }
    .animate-glitch-hover:hover .glitch-text::before {
      content: attr(data-text);
      position: absolute; left: 0; text-shadow: -1px 0 #ff00c1;
      background: inherit; overflow: hidden; clip: rect(0,900px,0,0);
      animation: glitch 2s infinite linear alternate-reverse;
    }
  `;

  const highlights = [
    {
      icon: Code2,
      title: 'Full-Stack Developer',
      description: 'Building scalable applications with React, TypeScript, Node.js, .NET, and Flutter',
    },
    {
      icon: Cloud,
      title: 'Azure Certified',
      description: 'Microsoft Certified: Azure Developer Associate (AZ-204) & Data Fundamentals (DP-900)',
    },
    {
      icon: Anchor,
      title: 'Naval Background',
      description: 'Former Navigation Officer with South African Navy - precision & strategic thinking',
    },
    {
      icon: Trophy,
      title: 'Hackathon Winner',
      description: 'AIMS Hackathon 2025 Winner - AI Compliance Interrogator for human trafficking prevention',
    },
    {
      icon: Users,
      title: 'Technical Trainer',
      description: 'Volunteer Trainer at TechBridle Foundation - teaching software development to aspiring developers',
    },
  ];

  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6">
      <style>{glitchStyle}</style>
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimation animation="fade-up">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 glow-text">
              <span className="text-primary font-mono">{'<'}</span>
              About Me
              <span className="text-primary font-mono">{' />'}</span>
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg">From Naval Officer to Software Engineer</p>
          </div>
        </ScrollAnimation>

        {/* Bio Card with Image */}
        <ScrollAnimation animation="fade-up" delay={100}>
          <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 mb-8 sm:mb-10 md:mb-12 glow-primary">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] xl:grid-cols-[380px_1fr] gap-10 md:gap-12 items-start">
            {/* Profile Image */}
            <div className="relative group mx-auto md:mx-0 w-full max-w-[260px] sm:max-w-[300px] md:max-w-none">
              {/* Unique animated geometric frame */}
              <div className="absolute -inset-2 sm:-inset-4">
                {/* Rotating outer ring */}
                <div className="absolute inset-0 rounded-3xl border-2 border-primary/20 animate-spin-slow"></div>
                
                {/* Pulsing middle ring */}
                <div className="absolute inset-2 rounded-3xl border border-accent/30 animate-pulse-ring"></div>
                
                {/* Floating particles */}
                <div className="absolute top-0 left-1/4 w-2 h-2 bg-primary rounded-full animate-float-particle"></div>
                <div className="absolute top-1/4 right-0 w-1.5 h-1.5 bg-accent rounded-full animate-float-particle" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-0 left-1/3 w-2.5 h-2.5 bg-primary rounded-full animate-float-particle" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-accent rounded-full animate-float-particle" style={{ animationDelay: '1.5s' }}></div>
                
                {/* Corner triangles */}
                <div className="absolute -top-1 -left-1 w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-primary/40 animate-triangle-pulse"></div>
                <div className="absolute -top-1 -right-1 w-0 h-0 border-r-[12px] border-r-transparent border-b-[12px] border-b-accent/40 animate-triangle-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="absolute -bottom-1 -left-1 w-0 h-0 border-l-[12px] border-l-transparent border-t-[12px] border-t-accent/40 animate-triangle-pulse" style={{ animationDelay: '0.6s' }}></div>
                <div className="absolute -bottom-1 -right-1 w-0 h-0 border-r-[12px] border-r-transparent border-t-[12px] border-t-primary/40 animate-triangle-pulse" style={{ animationDelay: '0.9s' }}></div>
              </div>
              
              {/* Main image container with holographic effect */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border-2 border-primary/50 group-hover:border-primary/80 transition-all duration-500 shadow-2xl">
                {/* Holographic overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Scanning line effect */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line"></div>
                
                {/* Data matrix effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                  <div className="grid grid-cols-4 grid-rows-4 h-full">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="border border-primary/20 animate-matrix-flicker" style={{ animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                  </div>
                </div>
                
                {/* HUD Overlay Detail */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-10 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-1 h-12 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-1 h-3 bg-accent rounded-full"></div>
                </div>

                <img 
                  src="/Nico.jpeg" 
                  alt="Nicolette Mashaba - Software Engineer Graduate"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  sizes="(max-width: 768px) 260px, 400px"
                  width="400"
                  height="400" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />

                {/* Typewriter Overlay */}
                <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-2 sm:p-4 z-20 animate-glitch-hover">
                  <div 
                    className="glitch-text font-mono text-primary text-[9px] sm:text-xs bg-background/80 px-2 sm:px-3 py-1.5 sm:py-2 rounded border border-primary/30 shadow-[0_0_15px_rgba(0,230,230,0.3)] relative"
                    data-text="Personnel File: N. Mashaba"
                  >
                    <span className="animate-pulse mr-1">{'>'}</span>
                    <span className="relative z-10">Personnel File: N. Mashaba</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bio Text */}
            <div className="space-y-6 md:pt-4">
              <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-full w-full rounded-full bg-primary"></span>
                </span>
                Status: Active Duty // Tech Transition
              </div>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-balance md:text-left">
                I'm a <span className="text-primary font-semibold">Software Engineer Graduate</span> transitioning from the 
                South African Navy to technology. My naval background taught me precision, leadership, and strategic thinking - skills I now apply to building innovative software solutions.
              </p>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground text-balance md:text-left">
                Currently excelling in <span className="text-accent">full-stack development</span>, 
                <span className="text-accent"> cloud computing</span>, and 
                <span className="text-accent"> AI/ML technologies</span>. As the <span className="text-primary font-semibold">#1 Female Most Active GitHub User</span>, 
                I demonstrate consistent commitment to technical excellence.
              </p>

              {/* Mission Statement Code Block */}
              <div className="relative group w-full max-w-md pt-2 mx-auto md:mx-0">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative p-4 rounded-lg bg-[#0d1117]/80 backdrop-blur-md border border-primary/20 font-mono text-[10px] sm:text-xs shadow-2xl">
                  <div className="flex gap-1.5 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-accent/50" />
                  </div>
                  <div className="space-y-1 text-foreground/90">
                    <p><span className="text-primary">const</span> <span className="text-accent">mission</span> = {'{'}</p>
                    <p className="pl-4">objective: <span className="text-emerald-400">"Build innovative software solutions"</span>,</p>
                    <p className="pl-4">strategy: [<span className="text-emerald-400">"Precision"</span>, <span className="text-emerald-400">"Leadership"</span>],</p>
                    <p className="pl-4">status: <span className="text-emerald-400">"Charting a new course in tech"</span></p>
                    <p>{'}'};</p>
                  </div>
                </div>
              </div>

              {/* Technical Toolkit */}
              <div className="pt-4 space-y-3">
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">Technical Toolkit</p>
                <div className="flex flex-wrap gap-2.5">
                  {toolkit.map((tool, i) => (
                    <div key={i} className="group/tool relative">
                      <div className="absolute -inset-2 bg-primary/20 rounded-lg blur opacity-0 group-hover/tool:opacity-100 transition-opacity duration-300" />
                      <button 
                        onClick={() => setActiveSkill(activeSkill === i ? null : i)}
                        className={`relative p-3 sm:p-2.5 rounded-lg glass border transition-all duration-300 hover:-translate-y-1 ${activeSkill === i ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(0,230,230,0.2)]' : 'border-primary/10 hover:border-primary/40'}`}
                      >
                        <tool.icon size={18} className="text-primary" />
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-background/90 backdrop-blur-sm text-[10px] font-mono text-primary rounded border border-primary/20 opacity-0 group-hover/tool:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                          {tool.label}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Interactive Diagnostic Bar */}
                <div className={`flex flex-col justify-center transition-all duration-500 overflow-hidden ${activeSkill !== null ? 'opacity-100 max-h-24 pt-3' : 'opacity-0 max-h-0'}`}>
                  {activeSkill !== null && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-end px-1 sm:px-0">
                        <span className="text-[10px] font-mono text-primary uppercase tracking-wider">{toolkit[activeSkill].label} Proficiency</span>
                        <span className="text-[10px] font-mono text-accent">{toolkit[activeSkill].level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden border border-primary/5">
                        <div 
                          className={`h-full bg-gradient-to-r ${toolkit[activeSkill].color} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,230,230,0.3)]`}
                          style={{ width: `${toolkit[activeSkill].level}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Glowing Download Button */}
              <div className="pt-4 flex justify-center md:justify-start">
                <a 
                  href="/Nicolette-Mashaba-CV.pdf"
                  download="Nicolette-Mashaba-CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackDownload('Nicolette-Mashaba-CV.pdf', 'pdf')}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,230,230,0.5)] shadow-lg shadow-primary/20 group text-sm sm:text-base w-full sm:w-auto justify-center"
                >
                  <FileText size={20} className="group-hover:rotate-12 transition-transform" />
                  <span>Download Full Resume</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        </ScrollAnimation>

        {/* Highlights Grid */}
        <ScrollAnimation animation="scale" delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="glass rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:bg-card/60 transition-all duration-300 hover:scale-105 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <div className="p-2 sm:p-2.5 md:p-3 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors glow-primary flex-shrink-0">
                    <Icon className="text-primary" size={18} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 text-foreground">{item.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </ScrollAnimation>

        {/* Stats */}
        <ScrollAnimation animation="fade-up" delay={300}>
          <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {[
            { value: '2448', label: 'GitHub Commits' },
            { value: '15+', label: 'Projects Built' },
            { value: '2', label: 'Azure Certs' },
            { value: '#1', label: 'Female Most Active GitHub User' },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 text-center hover:scale-105 transition-transform"
            >
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary glow-text mb-1">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-mono text-[10px] sm:text-xs md:text-sm">{stat.label}</div>
            </div>
          ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};
