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
import { lazy, Suspense } from 'react';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import {
  Workflow, Timer, Library, Mic, FlaskConical, Braces, ArrowUpRight, type LucideIcon,
} from 'lucide-react';

const TechSnakeGame = lazy(async () => {
  const mod = await import('@/components/TechSnakeGame');
  return { default: mod.TechSnakeGame };
});

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
  'Sentence Transformers',
];

export type Tier = 'Expert' | 'Proficient' | 'Familiar';

export const TIER_META: Record<Tier, { fill: number; accent: string; description: string }> = {
  Expert: { fill: 100, accent: 'text-accent', description: 'Daily driver' },
  Proficient: { fill: 72, accent: 'text-primary', description: 'Production-ready' },
  Familiar: { fill: 42, accent: 'text-muted-foreground', description: 'Working knowledge' },
};

export const TIER_ORDER: Tier[] = ['Expert', 'Proficient', 'Familiar'];

export interface TechStackItem {
  name: string;
  logo: string;
  tier: Tier;
}

export const techStack: TechStackItem[] = [
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

const byTier = TIER_ORDER.map((tier) => ({ tier, items: techStack.filter((t) => t.tier === tier) }));

export const Skills = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.08),transparent_60%)] pointer-events-none" aria-hidden="true" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <ScrollAnimation animation="cinematic">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <h2 className="heading-fluid-lg font-bold font-display mb-2 sm:mb-3 md:mb-4">
              Tech Stack
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg">
              AI + full-stack engineering, shipped
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="scale" delay={50}>
          <div className="glass shadow-premium rounded-md sm:rounded-lg p-4 sm:p-6 md:p-8 mb-6 border border-primary/20">
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 md:mb-8">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-center">
                AI &amp; Agent Engineering
              </h3>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-full w-full rounded-full bg-primary"></span>
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-6 items-start mb-6">
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
                <p className="eyebrow-label text-primary mb-4">
                  Skills in Production
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
          <div className="glass shadow-premium rounded-md sm:rounded-lg p-4 sm:p-6 md:p-8 mb-6">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 text-center">
              Full-Stack Foundations
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm text-center mb-6">
              Play the snake &mdash; it eats the stack
            </p>

            <Suspense
              fallback={<div className="h-[360px] rounded-lg border border-border/40 bg-card/40 animate-pulse" aria-hidden="true" />}
            >
              <TechSnakeGame techStack={techStack} />
            </Suspense>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-5">
              {byTier.map(({ tier, items }) => (
                <div key={tier}>
                  <div className="flex items-baseline justify-between mb-2.5 px-1">
                    <span className={`eyebrow-label ${TIER_META[tier].accent}`}>{tier}</span>
                    <span className="text-[10px] text-muted-foreground">{TIER_META[tier].description}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((tech) => (
                      <span
                        key={tech.name}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-border/50 bg-card/60 text-foreground/80"
                      >
                        <img src={tech.logo} alt="" aria-hidden="true" loading="lazy" className="w-3.5 h-3.5 object-contain" />
                        {tech.name}
                      </span>
                    ))}
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
