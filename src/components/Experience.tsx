import { Briefcase, GraduationCap } from 'lucide-react';
import { ScrollAnimation } from '@/components/ScrollAnimation';

export const Experience = () => {
  const experiences = [
    {
      type: 'work',
      title: 'Technical Trainer (Volunteer)',
      company: 'TechBridle Foundation',
      period: '2026 - Present',
      location: 'Remote',
      description: [
        'Teaching software development to aspiring developers',
        'Covering HTML/CSS, JavaScript, Bootstrap, React, TypeScript',
        'Instructing C#, ASP.NET Core Web API, Python, Python Flask',
        'Training on AI-assisted coding, Git/GitHub, and Agile methodology',
      ],
    },
    {
      type: 'work',
      title: 'Software Engineering Intern',
      company: 'Coast IT (PTY) Ltd',
      period: 'Nov 2025 - Dec 2025',
      location: 'Remote',
      description: [
        'Developing mobile applications using Flutter for cross-platform deployment',
        'Collaborating on full-stack development projects with Agile methodologies',
        'Enhancing skills in coding, testing, and project delivery under mentorship',
      ],
    },
    {
      type: 'work',
      title: 'AI Model Trainer',
      company: 'Outlier',
      period: 'Oct 2024 - Dec 2024',
      location: 'Remote',
      description: [
        'Refined 100+ AI prompts, improving model accuracy by 25%',
        'Streamlined debugging, saving developers 10 hours/week',
      ],
    },
    {
      type: 'work',
      title: 'Navigation Officer',
      company: 'South African Navy',
      period: 'Jan 2015 - Jul 2021',
      location: "Simon's Town",
      description: [
        'Optimized voyage plans, reducing fuel consumption by 10%',
        'Conducted weekly navigational equipment audits, reducing downtime by 15%',
        'Mentored 5+ junior officers, fostering safety and learning culture',
      ],
    },
    {
      type: 'education',
      title: 'Software Engineering (NQF Level 6)',
      company: 'CTU Training Solutions',
      period: 'Graduated 2026',
      location: 'Polokwane',
      description: ['Occupational Certificate in Software Engineering'],
    },
    {
      type: 'education',
      title: 'IT Programming Foundation (NQF Level 4)',
      company: 'CTU Training Solutions',
      period: 'Graduated 2024',
      location: 'Polokwane',
      description: ['Top Performer Award'],
    },
  ];

  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimation animation="fade-up">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 glow-text">
              <span className="text-primary font-mono">{'<'}</span>
              Journey
              <span className="text-primary font-mono">{' />'}</span>
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg">Experience & Education</p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={100}>
          <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-accent to-secondary opacity-30" />

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const Icon = exp.type === 'work' ? Briefcase : GraduationCap;
            const isCurrent = index === 0 && exp.type === 'work';

            return (
              <div
                key={index}
                className={`relative flex items-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:flex-row`}
              >
                {/* Content */}
                <div className={`w-full md:w-5/12 ${isLeft ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} text-left`}>
                  <div className={`glass rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 transition-all duration-300 hover:glow-primary ${isCurrent ? 'border border-primary/40 shadow-lg shadow-primary/10' : 'hover:scale-105'}`}>
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 md:justify-end justify-start">
                      <Icon className="text-accent" size={14} />
                      <span className="text-[9px] sm:text-[10px] md:text-xs text-accent font-mono">{exp.type.toUpperCase()}</span>
                      {isCurrent && (
                        <span className="ml-2 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono bg-primary/15 text-primary border border-primary/30">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 text-foreground">{exp.title}</h3>
                    <div className="text-xs sm:text-sm md:text-base text-primary font-semibold mb-1">{exp.company}</div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-2 sm:mb-3">
                      {exp.period} &middot; {exp.location}
                    </div>
                    <ul className={`space-y-1 sm:space-y-1.5 md:space-y-2 text-left ${isLeft ? 'md:text-right' : ''}`}>
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-[11px] sm:text-xs md:text-sm text-foreground/75 leading-relaxed flex items-start gap-1.5">
                          <span className="text-accent mt-0.5 flex-shrink-0">&rsaquo;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Center node - hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary glow-primary animate-pulse-glow z-10" />

                {/* Spacer */}
                <div className="hidden md:block w-5/12" />
              </div>
            );
          })}
          </div>
        </ScrollAnimation>

        {/* Certifications */}
        <ScrollAnimation animation="fade-up" delay={200}>
          <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center glow-text">Certifications & Awards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {[
              'Microsoft Certified: Azure Developer Associate (AZ-204)',
              'Microsoft Certified: Azure Data Fundamentals (DP-900)',
              'SheCodes: Basics, Plus, Responsive Web Development',
              'Winner, AIMS Hackathon 2025 - Best Team',
              'Programming Foundation Top Performer - CTU Training Solutions',
              'J.P. Morgan Midas Core Software Engineering Simulation',
            ].map((cert, index) => (
              <div
                key={index}
                className="glass rounded-lg p-2.5 sm:p-3 md:p-4 hover:scale-105 transition-transform hover:glow-accent"
              >
                <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                  <div className="text-primary text-lg sm:text-xl md:text-2xl flex-shrink-0">✓</div>
                  <div className="text-xs sm:text-sm md:text-base text-foreground leading-relaxed">{cert}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};
