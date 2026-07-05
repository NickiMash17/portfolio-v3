import { useState } from 'react';
import {
  Code2,
  Cloud,
  Anchor,
  Trophy,
  Users,
  Download,
  Eye,
  Database,
  Server,
  Cpu,
  Globe,
  Layers
} from 'lucide-react';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { trackDownload } from '@/lib/analytics';
import { CVPreviewModal } from '@/components/CVPreviewModal';

export const About = () => {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  const toolkit = [
    { icon: Cpu, label: 'AI/ML', level: 88, color: 'from-accent to-secondary' },
    { icon: Code2, label: 'Frontend', level: 95, color: 'from-primary to-accent' },
    { icon: Server, label: 'Backend', level: 90, color: 'from-accent to-primary' },
    { icon: Cloud, label: 'Cloud', level: 80, color: 'from-secondary to-accent' },
    { icon: Database, label: 'Database', level: 85, color: 'from-primary to-secondary' },
    { icon: Globe, label: 'Web', level: 95, color: 'from-primary to-accent' },
    { icon: Layers, label: 'Architecture', level: 80, color: 'from-secondary to-primary' }
  ];

  const highlights = [
    {
      icon: Cpu,
      title: 'AI & Agent Engineering',
      description: 'Production LLM pipelines, multi-agent orchestration (LangGraph, DSPy), and RAG systems on Azure',
    },
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
      description: 'AI Against Modern Slavery (AIMS) — built in partnership with Mila (Quebec AI Institute) and QUT',
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
        <ScrollAnimation animation="cinematic">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-2 sm:mb-3 md:mb-4">
              About Me
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg">From Naval Officer to AI Engineer</p>
          </div>
        </ScrollAnimation>

        {/* Bio Card with Image */}
        <ScrollAnimation animation="fade-up" delay={100}>
          <div className="glass rounded-md sm:rounded-lg p-4 sm:p-6 md:p-8 lg:p-12 mb-8 sm:mb-10 md:mb-12 glow-primary">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] xl:grid-cols-[380px_1fr] gap-10 md:gap-12 items-start">
            {/* Profile Image */}
            <div className="relative group mx-auto md:mx-0 w-full max-w-[260px] sm:max-w-[300px] md:max-w-none">
              <div className="absolute -inset-2 bg-gradient-to-br from-primary via-secondary to-primary rounded-[2rem] opacity-60 blur-md group-hover:opacity-90 transition-opacity duration-500" />

              <div className="relative aspect-[3/4] w-full rounded-[1.75rem] overflow-hidden border border-primary/20 shadow-2xl">
                <img
                  src="/Nico.jpeg"
                  alt="Nicolette Mashaba - AI Engineer"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  sizes="(max-width: 768px) 260px, 400px"
                  width="400"
                  height="400"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              </div>
            </div>

            {/* Bio Text */}
            <div className="space-y-6 md:pt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-[0.14em]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-full w-full rounded-full bg-primary"></span>
                </span>
                AI Engineer &middot; Always Enough LLC
              </div>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-balance md:text-left">
                I'm an <span className="text-primary font-semibold">AI Engineer</span> building and maintaining three live production AI systems — compliance automation, real-time scheduling, and an executive productivity agent — remotely from South Africa for Always Enough LLC, the company behind Marisa Peer's Rapid Transformational Therapy® (RTT) brand. My journey from the South African Navy taught me precision, leadership, and strategic thinking, which I apply daily in production software.
              </p>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground text-balance md:text-left">
                Recognised as a <span className="text-secondary font-semibold">Geekulcha Top 15 AI Innovator</span> (South Africa 2026), AZ-204 renewed at <span className="text-secondary font-semibold">92%</span>, and hackathon winner with <span className="text-accent">Mila (Quebec AI Institute) and QUT</span>. Sole developer and open source maintainer of EmpowaAI. Open to relocation in Europe.
              </p>

              {/* Mission Statement */}
              <div className="relative w-full max-w-md pt-2 mx-auto md:mx-0 pl-5 border-l-2 border-primary/40">
                <p className="text-sm sm:text-base italic text-foreground/85 leading-relaxed">
                  "I ship production AI systems that hold up — precision and leadership from the Navy, applied to engineering agentic systems at scale."
                </p>
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
                        className={`relative p-3 sm:p-2.5 rounded-lg glass border transition-all duration-300 hover:-translate-y-1 ${activeSkill === i ? 'border-primary bg-primary/10 shadow-[0_0_15px_hsl(var(--primary)/0.25)]' : 'border-primary/10 hover:border-primary/40'}`}
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
                          className={`h-full bg-gradient-to-r ${toolkit[activeSkill].color} transition-all duration-1000 ease-out shadow-[0_0_10px_hsl(var(--primary)/0.35)]`}
                          style={{ width: `${toolkit[activeSkill].level}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CV Actions — Preview + Download */}
              <div className="pt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                <CVPreviewModal
                  trigger={
                    <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-bold transition-all hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--primary)/0.45)] shadow-lg shadow-primary/20 group text-sm sm:text-base">
                      <Eye size={18} className="group-hover:scale-110 transition-transform" />
                      <span>Preview CV</span>
                    </button>
                  }
                />
                <a
                  href="/Nicolette_Mashaba_CV.pdf"
                  download="Nicolette_Mashaba_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackDownload('Nicolette_Mashaba_CV.pdf', 'pdf')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-primary/40 text-primary font-bold transition-all hover:scale-105 hover:bg-primary/10 group text-sm sm:text-base"
                >
                  <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                  <span>Download</span>
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
                className="glass rounded-lg sm:rounded-md p-3 sm:p-4 md:p-6 hover:bg-card/60 transition-all duration-300 hover:scale-105 group"
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
            { value: '3', label: 'Live Production AI Systems' },
            { value: '92%', label: 'AZ-204 Certification Score' },
            { value: '2448', label: 'GitHub Commits' },
            { value: '#1', label: 'Female Most Active GitHub User' },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass rounded-lg sm:rounded-md p-3 sm:p-4 md:p-6 text-center hover:scale-105 transition-transform"
            >
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary glow-text mb-1">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-[10px] sm:text-xs md:text-sm">{stat.label}</div>
            </div>
          ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};
