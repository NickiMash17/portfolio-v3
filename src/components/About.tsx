import { Code2, Cloud, Anchor, Trophy, Users } from 'lucide-react';
import profileImage from '@/assets/Myself.jpg';
import { ScrollAnimation } from '@/hooks/useScrollAnimation';

export const About = () => {
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
          <div className="grid md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-4 sm:gap-6 md:gap-8 items-center">
            {/* Profile Image */}
            <div className="relative group mx-auto md:mx-0">
              {/* Unique animated geometric frame */}
              <div className="absolute -inset-4">
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
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-full md:h-full rounded-2xl overflow-hidden border-2 border-primary/50 group-hover:border-primary/80 transition-all duration-500">
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
                
                <img 
                  src={profileImage} 
                  alt="Nicolette Mashaba - Software Engineer Graduate"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  sizes="(max-width: 768px) 224px, 320px"
                  width="400"
                  height="400" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
              </div>
            </div>
            
            {/* Bio Text */}
            <div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-3 sm:mb-4 md:mb-6">
                I'm a <span className="text-primary font-semibold">Software Engineer Graduate</span> transitioning from the 
                South African Navy to technology. My naval background taught me precision, leadership, and strategic thinking - skills I now apply to building innovative software solutions.
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground">
                Currently excelling in <span className="text-accent">full-stack development</span>, 
                <span className="text-accent"> cloud computing</span>, and 
                <span className="text-accent"> AI/ML technologies</span>. As the <span className="text-primary font-semibold">#1 Female Most Active GitHub User</span>, 
                I demonstrate consistent commitment to technical excellence.
              </p>
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
            { value: '1962', label: 'GitHub Commits' },
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


