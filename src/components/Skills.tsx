import reactLogo from '@/assets/logos/react.svg';
import typescriptLogo from '@/assets/logos/typescript.svg';
import nodejsLogo from '@/assets/logos/nodejs.svg';
import dotnetLogo from '@/assets/logos/dotnet.svg';
import flutterLogo from '@/assets/logos/flutter.svg';
import azureLogo from '@/assets/logos/azure.svg';
import mongodbLogo from '@/assets/logos/mongodb.svg';
import sqlLogo from '@/assets/logos/sql.svg';
import pythonLogo from '@/assets/logos/python.svg';
import dockerLogo from '@/assets/logos/docker.svg';
import gitLogo from '@/assets/logos/git.svg';
import javascriptLogo from '@/assets/logos/javascript.svg';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { useMemo, useState } from 'react';
import {
  Workflow, Timer, Library, Mic, FlaskConical, Braces, ArrowUpRight, type LucideIcon,
} from 'lucide-react';

const skillsInProduction: { name: string; icon: LucideIcon; project: string }[] = [
  { name: 'LangGraph', icon: Workflow, project: 'Flowly Funnel Agent' },
  { name: 'Azure Durable Functions', icon: Timer, project: 'Audio Processing & Compliance Pipeline' },
  { name: 'RAG & Embeddings', icon: Library, project: 'EmpowaAI' },
  { name: 'Whisper', icon: Mic, project: 'Call Note Generator' },
  { name: 'DSPy + LangChain', icon: FlaskConical, project: 'Multi-agent copywriting prototype' },
  { name: 'GPT-4 + Structured Outputs', icon: Braces, project: 'Compliance scoring pipeline' },
];

const aiSkills = [
  'OpenAI API', 'GPT-4', 'LangGraph', 'LangChain', 'DSPy', 'RAG', 'MCP', 'Azure Durable Functions',
];

export const Skills = () => {
  type Tier = 'Expert' | 'Proficient' | 'Familiar';

  const tierStyle: Record<Tier, string> = {
    Expert: 'text-accent border-accent/40 bg-accent/10',
    Proficient: 'text-primary border-primary/40 bg-primary/10',
    Familiar: 'text-muted-foreground border-border bg-muted/20',
  };

  const techStack: { name: string; logo: string; tier: Tier }[] = [
    { name: 'JavaScript', logo: javascriptLogo, tier: 'Expert' },
    { name: 'TypeScript', logo: typescriptLogo, tier: 'Expert' },
    { name: 'React', logo: reactLogo, tier: 'Expert' },
    { name: 'Git', logo: gitLogo, tier: 'Expert' },
    { name: 'Node.js', logo: nodejsLogo, tier: 'Proficient' },
    { name: 'Python', logo: pythonLogo, tier: 'Proficient' },
    { name: 'Azure', logo: azureLogo, tier: 'Proficient' },
    { name: 'SQL', logo: sqlLogo, tier: 'Proficient' },
    { name: 'MongoDB', logo: mongodbLogo, tier: 'Proficient' },
    { name: '.NET', logo: dotnetLogo, tier: 'Proficient' },
    { name: 'Flutter', logo: flutterLogo, tier: 'Familiar' },
    { name: 'Docker', logo: dockerLogo, tier: 'Familiar' },
  ];

  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const carouselLabel = useMemo(
    () => (isCarouselPaused ? 'Resume rotating carousel' : 'Pause rotating carousel'),
    [isCarouselPaused],
  );

  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.08),transparent_60%)] pointer-events-none" aria-hidden="true" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <ScrollAnimation animation="cinematic">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-2 sm:mb-3 md:mb-4">
              Tech Stack
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg">
              AI + full-stack engineering, shipped
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="scale" delay={50}>
          <div className="glass rounded-md sm:rounded-lg p-4 sm:p-6 md:p-8 mb-6 border border-primary/20">
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 md:mb-8">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-center">
                AI &amp; Agent Engineering
              </h3>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-full w-full rounded-full bg-primary"></span>
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start mb-6">
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 content-start">
                {aiSkills.map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center px-3 py-1.5 rounded-md text-[10px] sm:text-xs font-medium border border-primary/30 bg-primary/10 text-foreground leading-none"
                  >
                    {name}
                  </span>
                ))}
              </div>

              <div className="rounded-lg border border-border/60 bg-card/80 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-4">
                  Skills in Production
                </p>
                <div className="space-y-3.5">
                  {skillsInProduction.map(({ name, icon: Icon, project }) => (
                    <div key={name} className="flex items-start gap-3">
                      <div className="p-1.5 rounded-lg bg-primary/10 flex-shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground leading-tight">{name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{project}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="scale" delay={100}>
          <div className="glass rounded-md sm:rounded-lg p-4 sm:p-6 md:p-8 overflow-hidden mb-6">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">
              Full-Stack Foundations
            </h3>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              {(['Expert', 'Proficient', 'Familiar'] as Tier[]).map((tier) => (
                <span key={tier} className={`px-2.5 py-0.5 rounded-md text-[10px] font-medium border ${tierStyle[tier]}`}>
                  {tier}
                </span>
              ))}
            </div>

            <div className="md:hidden">
              <div className="grid grid-cols-3 gap-4">
                {techStack.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center gap-2">
                    <img src={tech.logo} alt={`${tech.name} logo`} loading="lazy" className="w-12 h-12 object-contain" />
                    <span className="text-foreground text-[11px] font-medium text-center leading-tight">{tech.name}</span>
                    <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-medium border ${tierStyle[tech.tier]}`}>
                      {tech.tier}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <div className="relative h-56 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] perspective-1000">
                <div
                  className={`tech-carousel${isCarouselPaused ? ' is-paused' : ''}`}
                  onMouseEnter={() => setIsCarouselPaused(true)}
                  onMouseLeave={() => setIsCarouselPaused(false)}
                >
                  {techStack.map((tech, index) => (
                    <div
                      key={tech.name}
                      className="tech-card glass will-change-transform [backface-visibility:hidden]"
                      style={{
                        transform: `rotateY(${(index * 360) / techStack.length}deg) translateZ(var(--carousel-radius))`,
                      }}
                    >
                      <div className="flex flex-col items-center justify-center h-full gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6">
                        <img
                          src={tech.logo}
                          alt={`${tech.name} logo`}
                          loading="lazy"
                          decoding="async"
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                        />
                        <span className="text-foreground font-semibold text-xs sm:text-sm md:text-base text-center">{tech.name}</span>
                        <span className={`px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-medium border ${tierStyle[tech.tier]}`}>
                          {tech.tier}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 sm:mt-4 md:mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  aria-label={carouselLabel}
                  onClick={() => setIsCarouselPaused((v) => !v)}
                  className="min-h-11 px-4 py-2 rounded-md text-[10px] sm:text-xs font-medium border border-border/60 bg-muted/20 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                >
                  {isCarouselPaused ? 'Resume' : 'Pause'}
                </button>
                <p className="text-center text-muted-foreground text-[10px] sm:text-xs md:text-sm">
                  Auto-rotating showcase
                </p>
              </div>
            </div>

          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};
