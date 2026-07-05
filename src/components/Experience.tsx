import { Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';
import { ScrollAnimation } from '@/components/ScrollAnimation';

export const Experience = () => {
  const experiences = [
    {
      type: 'work',
      title: 'AI Engineer',
      company: "Always Enough LLC (Marisa Peer's RTT brand)",
      period: 'May 2026 - Present',
      location: 'South Africa · Remote',
      description: [
        'Engineering and maintaining three live production AI systems across the full engineering lifecycle',
        'Maintains an Azure Durable Functions compliance pipeline running GPT-4-powered analysis with automated structured reporting',
        'Maintains a real-time scheduling system and an executive AI productivity agent on Azure VM',
        'Renewed AZ-204 at 92% and recognised as a Geekulcha Top 15 AI Innovator (South Africa 2026)',
      ],
    },
    {
      type: 'work',
      title: 'Engineer',
      company: 'EmpowaAI (Open Source)',
      period: '2025 - Present',
      location: 'Remote · Open Source',
      description: [
        'Sole developer, architect, and open source maintainer of an AI career platform',
        'Built multi-step LLM workflows and agentic orchestration patterns using LangGraph and LangChain',
        'Deployed and maintained production systems on Vercel and Render serving real beta users',
      ],
    },
    {
      type: 'work',
      title: 'Technical Trainer (Volunteer)',
      company: 'TechBridle Foundation',
      period: '2026 - Present',
      location: 'Remote',
      description: [
        'Trains aspiring developers in JavaScript, React, HTML/CSS, backend engineering, and AI integration',
        'Leads code review sessions and guides Git workflows, secure project setup, and debugging practices',
      ],
    },
    {
      type: 'work',
      title: 'Software Engineering Intern (Part-Time)',
      company: 'Coast IT (Pty) Ltd',
      period: 'Jan 2025 - Dec 2025',
      location: 'South Africa',
      description: [
        'Contributed to feature development within an Agile/Scrum team, shipping tested code across sprint cycles',
        'Tested APIs, resolved production bugs, and participated in peer code reviews improving application stability',
      ],
    },
    {
      type: 'work',
      title: 'AI Model Trainer',
      company: 'Outlier AI',
      period: 'Oct 2024 - Dec 2024',
      location: 'Remote',
      description: [
        'Refined 100+ AI prompts, improving model accuracy by 25%',
        'Conducted systematic prompt testing and model behaviour analysis across multiple domains',
      ],
    },
    {
      type: 'work',
      title: 'Navigation Officer',
      company: 'South African Navy',
      period: '2015 - 2021',
      location: "Simon's Town",
      description: [
        'Served as a commissioned Navigation Officer in mission-critical maritime environments',
        'Developed cross-functional leadership, precision decision-making, and composure under pressure',
        'Mentored 5+ junior officers, fostering a culture of safety and continuous learning',
      ],
    },
    {
      type: 'work',
      title: 'Naval Officer Cadet',
      company: 'South African Navy',
      period: '2012 - 2015',
      location: 'South Africa',
      description: [
        'Completed a three-year full military officer training programme covering leadership, navigation, maritime operations, and command under pressure',
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
        <ScrollAnimation animation="cinematic">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-2 sm:mb-3 md:mb-4">
              Journey
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg">Experience &amp; Education</p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={100}>
          <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-secondary to-primary opacity-30" />

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const Icon = exp.type === 'work' ? Briefcase : GraduationCap;
            const isCurrent = index === 0 && exp.type === 'work';

            return (
              <div
                key={index}
                className={`relative flex flex-col items-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-full md:w-5/12 ${isLeft ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} text-left`}>
                  <div className={`glass rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 transition-all duration-300 hover:glow-primary ${isCurrent ? 'border border-primary/40 shadow-lg shadow-primary/10' : 'hover:scale-105'}`}>
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 md:justify-end justify-start">
                      <Icon className="text-secondary" size={14} />
                      <span className="text-[11px] sm:text-xs md:text-xs text-secondary font-medium uppercase tracking-wide">{exp.type}</span>
                      {isCurrent && (
                        <span className="ml-2 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-medium bg-primary/15 text-primary border border-primary/30">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 text-foreground">{exp.title}</h3>
                    <div className="text-xs sm:text-sm md:text-base text-primary font-semibold mb-1">{exp.company}</div>
                    <div className="text-[11px] sm:text-xs md:text-sm text-muted-foreground mb-2 sm:mb-3">
                      {exp.period} &middot; {exp.location}
                    </div>
                    <ul className={`space-y-1 sm:space-y-1.5 md:space-y-2 text-left ${isLeft ? 'md:text-right' : ''}`}>
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-xs sm:text-xs md:text-sm text-foreground/75 leading-relaxed flex items-start gap-1.5">
                          <span className="text-secondary mt-0.5 flex-shrink-0">&rsaquo;</span>
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
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-display mb-4 sm:mb-6 md:mb-8 text-center">Certifications &amp; Awards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {[
              'Microsoft Certified: Azure Developer Associate (AZ-204) — renewed 2026 at 92%',
              'Microsoft Certified: Azure Data Fundamentals (DP-900)',
              'Geekulcha Top 15 AI Innovators - South Africa 2026',
              'AWS AI Practitioner Challenge - Udacity, 2026',
              'Azure DevOps Engineer Expert (AZ-400) — In Progress',
              'Hackathon Winner, AI Against Modern Slavery (AIMS) - Mila x QUT · Featured on International Tech Podcast',
              'J.P. Morgan Software Engineering Virtual Experience',
              'Programming Foundation Top Performer - CTU Training Solutions',
            ].map((cert, index) => (
              <div
                key={index}
                className="glass rounded-lg p-2.5 sm:p-3 md:p-4 hover:scale-105 transition-transform hover:glow-accent"
              >
                <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                  <CheckCircle2 className="text-primary flex-shrink-0" size={20} />
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
