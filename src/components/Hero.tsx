import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, FileText, MapPin, Award, ShieldCheck, AudioLines, CalendarClock, Bot, Briefcase } from 'lucide-react';
import { trackExternalLink } from '@/lib/analytics';
import { CVPreviewModal } from './CVPreviewModal';
import { DotMatrixText } from './DotMatrixText';
import { TiltCard } from './TiltCard';
import { ParticleNetwork } from './ParticleNetwork';
import { MagneticButton } from './MagneticButton';
import { AnimatedCounter } from './AnimatedCounter';
import { NeuralNetworkCanvas } from './NeuralNetworkCanvas';

const SYSTEMS = [
  {
    icon: AudioLines,
    name: 'Audio Processing & Compliance Pipeline',
    detail: 'GPT-4 compliance scoring on Azure Durable Functions',
  },
  {
    icon: CalendarClock,
    name: 'Scheduling Automation System',
    detail: 'Real-time agent availability across global timezones',
  },
  {
    icon: Bot,
    name: 'Executive AI Productivity Agent',
    detail: 'Automated digests & task orchestration on Azure VM',
  },
];

// Written out as complete literal class strings (not interpolated) so
// Tailwind's static scanner actually generates them. Dynamically building
// class names like `border-${accent}/20` would silently produce no CSS.
const SYSTEM_ACCENTS = [
  { border: 'border-primary/25', iconBg: 'bg-primary/15', iconText: 'text-primary' },
  { border: 'border-secondary/25', iconBg: 'bg-secondary/15', iconText: 'text-secondary' },
  { border: 'border-accent/25', iconBg: 'bg-accent/15', iconText: 'text-accent' },
];

const StaticSystemsList = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 px-5 sm:px-6 py-4">
    {SYSTEMS.map(({ icon: Icon, name, detail }, i) => {
      const accent = SYSTEM_ACCENTS[i % SYSTEM_ACCENTS.length];
      return (
        <div key={name} className={`rounded-lg border ${accent.border} bg-card/40 p-3 flex flex-col gap-2`}>
          <div className={`w-7 h-7 rounded-md ${accent.iconBg} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-3.5 h-3.5 ${accent.iconText}`} />
          </div>
          <p className="text-xs font-semibold text-foreground leading-snug">{name}</p>
          <p className="text-[10px] text-muted-foreground leading-relaxed">{detail}</p>
        </div>
      );
    })}
  </div>
);

export const Hero = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setPrefersReducedMotion(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const iconButtonClass =
    'min-w-11 min-h-11 flex items-center justify-center bg-card border border-border/60 rounded-md transition-all duration-300 hover:border-primary/50 hover:-translate-y-0.5';

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Technical grid backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_130%_110%_at_50%_18%,black,transparent)]">
          <ParticleNetwork />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.08),transparent_55%)]" />
        {/* Guaranteed glow behind the AI ENGINEER mark: plain CSS, always visible regardless of canvas timing */}
        <div className="absolute left-1/2 top-16 sm:top-20 -translate-x-1/2 w-[90%] max-w-3xl h-40 sm:h-48 rounded-full bg-gradient-to-r from-primary/25 via-secondary/25 to-accent/25 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20">

        {/* Dot-matrix signature mark */}
        <DotMatrixText
          text="AI ENGINEER"
          height={90}
          dotGap={6}
          reducedMotion={prefersReducedMotion}
          className="w-full mb-10 sm:mb-14 flex justify-center [&>canvas]:max-w-full"
        />

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-10 items-start w-full">

          {/* Left: profile sheet */}
          <div className="w-full">
            <TiltCard tiltAmount={3} scale={1.005} glareEnabled={false} className="rounded-lg">
            <div className="rounded-lg border border-border/60 divide-y divide-border/60 overflow-hidden bg-card/60 shadow-premium">

              {/* Status strip */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-5 sm:px-6 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-full w-full rounded-full bg-primary" />
                  </span>
                  <span className="text-xs font-medium text-foreground">Open to Full-Time Roles</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  South Africa &middot; Remote &middot; Open to EU Relocation
                </div>
              </div>

              {/* Identity strip */}
              <div className="flex items-center gap-4 px-5 sm:px-6 py-5 sm:py-6">
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary via-secondary to-primary opacity-70 blur-md animate-pulse-glow" aria-hidden="true" />
                  <picture>
                    <source media="(max-width: 767px)" srcSet="/my-caricature-mobile.jpg" />
                    <img
                      src="/my-caricature.jpeg"
                      alt="Nicolette Mashaba - AI Engineer"
                      className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-primary/40"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      width={160}
                      height={160}
                      sizes="80px"
                    />
                  </picture>
                </div>
                <div className="text-left min-w-0">
                  <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground">
                    Nicolette Mashaba
                  </h1>
                  <p className="font-display text-sm sm:text-base text-primary font-medium">
                    AI Engineer
                  </p>
                </div>
              </div>

              {/* Facts strip */}
              <div className="px-5 sm:px-6 py-4 space-y-2">
                <div className="flex items-center gap-2.5 text-sm text-foreground/80">
                  <Briefcase className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>AI Engineer at Always Enough LLC</span>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed pl-[26px]">
                  Building and maintaining three live production AI systems (RAG pipelines, multi-agent orchestration, and compliance automation) on Microsoft Azure.
                </p>
              </div>

              {/* Actions strip */}
              <div className="flex flex-wrap items-center gap-3 px-5 sm:px-6 py-4">
                <MagneticButton>
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="btn-sheen px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
                  >
                    View Projects
                  </button>
                </MagneticButton>
                <CVPreviewModal
                  trigger={
                    <button className="px-6 py-2.5 rounded-md border border-primary/30 text-foreground font-semibold text-sm hover:bg-primary/10 transition-colors">
                      View CV
                    </button>
                  }
                />
                <div className="flex items-center gap-2 basis-full sm:basis-auto justify-start sm:justify-end sm:ml-auto">
                  <a
                    href="https://github.com/NickiMash17"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className={iconButtonClass}
                    onClick={() => trackExternalLink('https://github.com/NickiMash17', 'github')}
                  >
                    <Github className="w-4 h-4 text-foreground/70" />
                  </a>
                  <a
                    href="https://linkedin.com/in/nicolette-mashaba"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className={iconButtonClass}
                    onClick={() => trackExternalLink('https://linkedin.com/in/nicolette-mashaba', 'linkedin')}
                  >
                    <Linkedin className="w-4 h-4 text-foreground/70" />
                  </a>
                  <button
                    onClick={() => scrollToSection('contact')}
                    aria-label="Go to contact section"
                    className={iconButtonClass}
                  >
                    <Mail className="w-4 h-4 text-foreground/70" />
                  </button>
                  <CVPreviewModal
                    trigger={
                      <button aria-label="View CV" className={iconButtonClass}>
                        <FileText className="w-4 h-4 text-foreground/70" />
                      </button>
                    }
                  />
                </div>
              </div>

              {/* Credibility strip */}
              <div className="flex flex-wrap gap-2 px-5 sm:px-6 py-4">
                {[
                  { icon: Award, label: 'Geekulcha Top 15 AI Innovator' },
                  { icon: ShieldCheck, label: 'AZ-204 Certified · 92%' },
                  { icon: Award, label: 'Hackathon Winner: Mila x QUT' },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-primary/20 bg-primary/5 text-foreground/80"
                  >
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
            </TiltCard>
          </div>

          {/* Right: production systems panel */}
          <div className="w-full">
            <TiltCard tiltAmount={3} scale={1.005} glareEnabled={false} className="rounded-lg">
            <div className="rounded-lg border border-border/60 divide-y divide-border/60 overflow-hidden bg-card/60 shadow-premium">
                <div className="flex items-center justify-between px-5 sm:px-6 py-3.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Live Production Systems
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex h-full w-full rounded-full bg-primary" />
                    </span>
                    Active
                  </span>
                </div>

                <div className="px-3 py-3">
                  <NeuralNetworkCanvas className="h-64 sm:h-72" />
                </div>

                <StaticSystemsList />

                <div className="grid grid-cols-3 gap-3 text-center px-5 sm:px-6 py-4">
                  {[
                    { value: '3', label: 'Live AI Systems' },
                    { value: '92%', label: 'AZ-204 Score' },
                    { value: '2026', label: 'Top 15 AI Innovator' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <AnimatedCounter
                        value={stat.value}
                        className="block text-lg sm:text-xl font-bold font-display text-primary"
                      />
                      <div className="text-[10px] sm:text-[11px] text-muted-foreground leading-tight mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
            </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
