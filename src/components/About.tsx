import { Code2, Cloud, Anchor, Trophy } from 'lucide-react';
import profileImage from '@/assets/Myself.jpg';

export const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: 'Full-Stack Developer',
      description: 'Building scalable applications with React, Node.js, .NET, and Flutter',
    },
    {
      icon: Cloud,
      title: 'Azure Certified',
      description: 'Microsoft Azure Developer Associate & Data Fundamentals certified',
    },
    {
      icon: Anchor,
      title: 'Naval Background',
      description: 'Former Navigation Officer with South African Navy',
    },
    {
      icon: Trophy,
      title: 'Award Winner',
      description: 'Winner at AIMS Hackathon 2025 - AI Compliance Interrogator',
    },
  ];

  return (
    <section id="about" className="relative py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 glow-text">
            <span className="text-primary font-mono">{'<'}</span>
            About Me
            <span className="text-primary font-mono">{' />'}</span>
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg">From Naval Officer to Software Engineer</p>
        </div>

        {/* Bio Card with Image */}
        <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 mb-8 sm:mb-10 md:mb-12 glow-primary">
          <div className="grid md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-4 sm:gap-6 md:gap-8 items-center">
            {/* Profile Image */}
            <div className="relative group mx-auto md:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-full md:h-full rounded-xl sm:rounded-2xl overflow-hidden border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-300">
                <img 
                  src={profileImage} 
                  alt="Nicolette Mashaba - Software Engineer Graduate"
                  loading="eager"
                  decoding="async"
                  width="400"
                  height="400" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Bio Text */}
            <div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-3 sm:mb-4 md:mb-6">
                I'm a <span className="text-primary font-semibold">Software Engineer Graduate</span> with a unique journey from the 
                Navy to the world of technology. My experience as a Naval Officer taught me precision, 
                problem-solving, and strategic thinking which are skills I now apply to building innovative software solutions.
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground">
                Currently excelling in <span className="text-accent">full-stack development</span>, 
                <span className="text-accent"> cloud computing</span>, and 
                <span className="text-accent"> AI technologies</span>. I'm passionate about creating 
                clean, maintainable code and scalable applications that make a real-world impact.
              </p>
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
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

        {/* Stats */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {[
            { value: '5+', label: 'Technologies' },
            { value: '10+', label: 'Projects' },
            { value: '3+', label: 'Certifications' },
            { value: '100%', label: 'Dedication' },
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
      </div>
    </section>
  );
};
