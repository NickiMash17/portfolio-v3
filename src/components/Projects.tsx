import { useState, useMemo } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — Github/Linkedin/Youtube are deprecated brand icons in lucide-react but have no non-deprecated replacement yet
import {
  ExternalLink, Github, Linkedin, Youtube, Filter, X, ChevronDown, ChevronUp,
  AudioLines, Workflow, Mic, ScanSearch, Compass, CalendarClock, Bot,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TiltCard } from '@/components/TiltCard';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { AgentPipelineDiagram } from '@/components/AgentPipelineDiagram';
import { trackExternalLink, trackEvent } from '@/lib/analytics';

// Helper to check if URL is YouTube
const isYouTubeUrl = (url: string | null): boolean => {
  if (!url) return false;
  return url.includes('youtube.com') || url.includes('youtu.be');
};

const getProjectGradient = (index: number) => {
  const gradients = [
    'from-primary/50 via-accent/40 to-secondary/40',
    'from-accent/50 via-primary/40 to-secondary/40',
    'from-secondary/50 via-primary/40 to-accent/40',
    'from-primary/60 via-secondary/40 to-accent/40',
  ];

  return gradients[index % gradients.length];
};

const projectsData = [
    {
      title: 'Audio Processing & Compliance Pipeline',
      subtitle: 'Production AI Compliance Automation · Always Enough LLC',
      description:
        'Maintains an Azure Durable Functions orchestration pipeline that ingests business data, runs GPT-4-powered compliance analysis against internal guidelines, and delivers automated structured reports on a scheduled basis.',
      role: 'AI Engineer',
      scope: 'Durable Functions orchestration, GPT-4 scoring, PostgreSQL persistence',
      tech: [
        'Azure Durable Functions',
        'GPT-4',
        'Azure AI',
        'Python',
        'PostgreSQL',
        'Structured Outputs',
      ],
      categories: ['AI', 'Production', 'Compliance'],
      impact: [
        'Automated regulatory scoring pipeline for sales calls',
        'Structured, auditable violation reporting',
        'Eliminated duplicate-record crashes in the transcription pipeline',
      ],
      metrics: ['Zero-downtime scheduler migration', 'Structured JSON compliance reports'],
      highlights: [
        'Designed and implemented Azure Durable Function timer triggers replacing a Next.js heartbeat scheduler, improving pipeline reliability for a production sales call analysis system.',
        'Built a compliance pipeline using GPT-4 and Azure AI to automatically score sales calls against regulatory guidelines, delivering structured JSON reports with violation flagging and mandatory statement verification.',
        'Shipped a compliance filtering feature improving analysis precision by restricting processing to qualifying records, reducing noise in daily compliance outputs.',
        'Diagnosed and resolved a UniqueViolation production bug in PostgreSQL by replacing plain INSERT logic with upsert operations, eliminating duplicate record crashes in the transcription pipeline.',
      ],
      github: null,
      demo: null,
      linkedin: null,
      Icon: AudioLines,
      screenshot: null,
    },
    {
      title: 'Flowly Funnel Agent',
      subtitle: 'LangGraph Agent for Marketing Funnels · Always Enough LLC',
      description:
        'An AI agent that builds interactive quiz-style marketing funnels from a plain-English brief, executing real tool calls against the live Flowly MCP server rather than just describing what it would do.',
      role: 'AI Engineer',
      scope: 'Agent orchestration, MCP tool integration, skill-based architecture',
      tech: ['LangGraph', 'MCP', 'FastAPI', 'Python'],
      categories: ['AI', 'Agents', 'Production'],
      impact: [
        'One instruction triggers 5 real sequential tool calls end-to-end',
        'Zero embedded domain logic in the orchestrator itself',
        'Verified against the live server with real tool-call proof',
      ],
      metrics: ['8 auto-discovered skill modules', 'Live-verified via MCP server logs'],
      highlights: [
        'Thin-harness/fat-skills architecture: a lightweight LangGraph orchestrator with zero embedded domain logic, routing to 8 self-contained markdown skill files that hold all the intelligence.',
        'Skills are auto-discovered at import time by scanning for `type: agent` frontmatter — no hardcoded registration, versus a comparable in-house project hardcoding 17 agent nodes in a TypedDict.',
        'Two-tier audit system: a shallow 2-call pass runs before a deep pass, keeping the agent fast enough to run on every turn.',
        "Forced monetization gate — the agent won't build a funnel until a delivery path (paid report, booking link, AI report) is chosen.",
      ],
      github: null,
      demo: null,
      linkedin: null,
      Icon: Workflow,
      screenshot: null,
    },
    {
      title: 'Executive AI Productivity Agent',
      subtitle: 'Agentic Productivity System · Always Enough LLC',
      description:
        'An AI agent running on Azure VM, integrated with communication and task management platforms, providing automated daily digests and intelligent task orchestration for executive use.',
      role: 'AI Engineer',
      scope: 'Agent deployment on Azure VM, communication and task platform integration',
      tech: ['Azure VM', 'Python', 'Communication Platform APIs', 'Task Management APIs'],
      categories: ['AI', 'Agents', 'Production'],
      impact: [
        'Automated daily digests for executive use',
        'Intelligent task orchestration across platforms',
        'Mission-critical uptime ownership',
      ],
      metrics: ['Mission-critical agentic system', 'Daily automated digests'],
      highlights: [
        'Maintains and develops an AI agent running on Azure VM, integrated with communication and task management platforms, providing automated daily digests and intelligent task orchestration for executive use.',
        'Responsible for feature development, bug resolution, and uptime of a mission-critical agentic productivity system.',
      ],
      github: null,
      demo: null,
      linkedin: null,
      Icon: Bot,
      screenshot: null,
    },
    {
      title: 'Scheduling Automation System',
      subtitle: 'Real-Time Agent Availability · Always Enough LLC',
      description:
        'An Azure Functions application monitoring live agent availability across multiple global timezones in real time, automatically managing booking capacity based on availability thresholds.',
      role: 'AI Engineer',
      scope: 'Real-time availability monitoring, booking capacity automation',
      tech: ['Azure Functions', 'Python', 'Azure DevOps', 'CI/CD'],
      categories: ['AI', 'Production', 'Automation'],
      impact: [
        'Real-time availability across global timezones',
        'Automated booking capacity management',
        'End-to-end agent onboarding',
      ],
      metrics: ['Multi-timezone monitoring', 'End-to-end agent onboarding'],
      highlights: [
        'Maintains an Azure Functions application monitoring live agent availability across multiple global timezones in real time, automatically managing booking capacity based on availability thresholds.',
        'Onboards new agents end-to-end including configuration, integration testing, and live deployment.',
      ],
      github: null,
      demo: null,
      linkedin: null,
      Icon: CalendarClock,
      screenshot: null,
    },
    {
      title: 'Call Note Generator',
      subtitle: 'Automated Call Transcription & Notes · Always Enough LLC',
      description:
        "Transcribes sales call recordings, generates structured closer's-template call notes, and emails them to reps — replacing manual copy-pasting of recordings into personal AI accounts, a flagged data security and cost risk.",
      role: 'AI Engineer',
      scope: 'Transcription pipeline, structured note generation, GDPR-compliant architecture',
      tech: [
        'Whisper',
        'Azure AI Foundry',
        'FastAPI',
        'Python',
        'Azure Communication Services',
        'Google OAuth',
      ],
      categories: ['AI', 'Production', 'Compliance'],
      impact: [
        'Speaker-diarized transcription with automated note generation',
        'Zero-persistence, GDPR-compliant architecture',
        'Real production bugs found and fixed pre-rollout',
      ],
      metrics: ['No database — in-memory / guaranteed-deleted temp files only', 'In active development toward team rollout'],
      highlights: [
        'Transcribes call recordings with speaker diarization (gpt-4o-transcribe-diarize) and generates structured notes (situation, pain, cost of inaction, desire, objections, next steps) via gpt-5.4.',
        'Zero-persistence architecture — no database or file storage, everything processed in memory or via guaranteed-deleted temp files, built for GDPR compliance in a mental-health/coaching context.',
        'Automatic fallback from Azure content-filter blocks to OpenAI, plus PII-scrubbed logging.',
        'Found and fixed real issues through systematic testing before rollout: a first-person voice leak, a gender-assumption bug, and inconsistent readiness-score formatting.',
      ],
      github: null,
      demo: null,
      linkedin: null,
      Icon: Mic,
      screenshot: null,
    },
    {
      title: 'AI Against Modern Slavery (AIMS)',
      subtitle: 'Hackathon Winner · Mila–Quebec AI Institute & QUT · International Tech Podcast Feature',
      award: true,
      description:
        'Built AI-driven tools assessing corporate accountability and human rights compliance at scale, analysing large volumes of corporate modern slavery disclosures using NLP and LLMs — in partnership with Mila (Quebec AI Institute) and QUT Centre for Data Science.',
      role: 'AI Engineer (Hackathon Team)',
      scope: 'Semantic document analysis, NLP classification pipeline, explainable AI',
      tech: [
        '.NET 8',
        'React',
        'Python',
        'Flask',
        'pgvector',
        'PostgreSQL',
        'NLP',
        'Explainable AI',
      ],
      categories: ['AI', 'Civic Tech', 'Research'],
      impact: [
        'Analysed thousands of corporate disclosures for compliance signals',
        'Auditable, explainable LLM-generated compliance assessments',
        'Cross-jurisdiction regulatory impact affecting millions globally',
      ],
      metrics: ['Hackathon Winner', 'Mila x QUT Partnership', 'Featured on International Tech Podcast'],
      highlights: [
        'Shipped a semantic document analysis frontend enabling analysts to query AI-powered compliance outputs across thousands of corporate disclosures.',
        'Contributed to an NLP classification pipeline applying chunking, embeddings, and retrieval to surface compliance signals from unstructured corporate text at scale.',
        'Applied prompt engineering and structured output handling to improve consistency and explainability of LLM-generated compliance assessments.',
        'Worked within a multidisciplinary team applying Explainable AI and Responsible AI principles to a cross-jurisdiction regulatory problem affecting millions of people globally.',
      ],
      github: 'https://github.com/NickiMash17/AIMS-Firefly',
      demo: null,
      linkedin: null,
      Icon: ScanSearch,
      screenshot: '/screenshots/aims.jpg',
    },
    {
      title: 'EmpowaAI',
      subtitle: 'AI Career Platform · Sole Developer · Open Source · Active Development',
      description:
        'Open source AI platform helping South African youth navigate career paths through intelligent personalisation — sole developer and maintainer responsible for full architecture, shipping, and community.',
      role: 'Sole Developer & Open Source Maintainer',
      scope: 'Full-stack architecture, RAG-powered personalisation, agent orchestration',
      tech: [
        'React',
        'TypeScript',
        'Node.js',
        'FastAPI',
        'MongoDB Atlas',
        'OpenAI API',
        'RAG',
        'LangChain',
        'Embeddings',
      ],
      categories: ['AI', 'Open Source', 'Career Tech'],
      impact: [
        'Serves real beta users end-to-end',
        'Personalised career insights via Digital Economic Twin',
        'Community-driven open source roadmap',
      ],
      metrics: ['Sole developer & architect', 'Open source on GitHub'],
      highlights: [
        'Designed and deployed a full-stack RAG-powered platform integrating React (TypeScript), Node.js/Express, and FastAPI AI microservices, serving real beta users end-to-end.',
        'Engineered a Digital Economic Twin using user profile embeddings and LangChain to generate personalised career insights and income pathway simulations.',
        'Architected multi-step LLM workflows connecting user inputs to structured career outputs, applying agent orchestration patterns for reliable, multi-stage reasoning.',
        'Manages the open source community on GitHub, including documentation, issue tracking, and roadmap planning.',
      ],
      github: null,
      demo: 'https://www.empowa.org',
      linkedin: 'https://www.linkedin.com/company/empowaai',
      Icon: Compass,
      screenshot: '/screenshots/empowaai.jpeg',
    },
  ];

const otherProjectsData = [
    {
      title: 'LoanLife EDGE',
      description: 'Fintech platform that turns each loan into a digital twin monitored by AI, with early covenant and ESG risk warnings.',
      tech: ['Next.js', 'FastAPI', 'AI/ML', 'Solidity'],
      github: 'https://github.com/Lunga-Mashaba/LoanLife_Edge',
      demo: 'https://loan-life-edge.vercel.app/',
    },
    {
      title: 'Interview Replay',
      description: 'AI-driven mock interview tool delivering structured, actionable feedback — live in production.',
      tech: ['JavaScript', 'OpenAI API', 'Netlify'],
      github: null,
      demo: null,
    },
    {
      title: 'RealHomes',
      description: 'South African luxury real estate platform with rich search and filtering.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      github: 'https://github.com/NickiMash17/RealHomes',
      demo: 'https://real-homes.vercel.app/',
    },
    {
      title: 'BookReviewApp',
      description: 'Book review platform built with ASP.NET Core and Entity Framework Core.',
      tech: ['ASP.NET Core', 'C#', 'SQL Server'],
      github: 'https://github.com/NickiMash17/BookReviewApp',
      demo: 'https://bookreviewapp-1755367448.azurewebsites.net/',
    },
    {
      title: 'FitQuest',
      description: 'Gamified wellness app with an evolving plant companion built in Flutter.',
      tech: ['Flutter', 'Dart', 'Firebase'],
      github: 'https://github.com/NickiMash17/fitquest-app',
      demo: 'https://youtu.be/Ist1QrlhFIg?si=lv-JSEcLseUJj4h0',
    },
  ];

export const Projects = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showOtherProjects, setShowOtherProjects] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set([projectsData[0]?.title]));

  const toggleExpanded = (title: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  const projects = useMemo(() => projectsData, []);

  const allCategories = useMemo(() => {
    const categorySet = new Set<string>();
    projects.forEach(project => {
      project.categories.forEach(category => categorySet.add(category));
    });
    return Array.from(categorySet).sort();
  }, [projects]);

  // Get all unique technologies
  const allTechs = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.tech.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Filter projects by category and selected technology
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    if (selectedCategory) {
      filtered = filtered.filter(project =>
        project.categories.some(category =>
          category.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );
    }

    if (!selectedTech) return filtered;
    return filtered.filter(project =>
      project.tech.some(tech => tech.toLowerCase().includes(selectedTech.toLowerCase()))
    );
  }, [projects, selectedCategory, selectedTech]);

  const handleTechFilter = (tech: string | null) => {
    setSelectedTech(tech);
    trackEvent('Projects', { category: 'filter', tech: tech || 'all' });
  };

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    trackEvent('Projects', { category: 'category_filter', value: category || 'all' });
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.08),transparent_60%)] pointer-events-none" aria-hidden="true" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <ScrollAnimation animation="cinematic">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-2 sm:mb-3 md:mb-4">
              Featured Projects <span className="text-muted-foreground">({projectsData.length})</span>
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg">Production AI systems, shipped and running</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {['Multi-Agent Systems', 'Production LLM Pipelines', 'Azure Certified', 'Geekulcha Top 15 AI Innovator'].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-md text-[10px] sm:text-xs font-mono border border-primary/30 bg-primary/10 text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        {/* Filter Bar */}
        <ScrollAnimation animation="fade-up" delay={50}>
          <div className="mb-6 sm:mb-8 md:mb-10">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center mb-3 sm:mb-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground font-mono">
                <Filter className="w-4 h-4" />
                <span>Categories:</span>
              </div>
              <button
                onClick={() => handleCategoryFilter(null)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-mono transition-all ${
                  !selectedCategory
                    ? 'bg-primary text-primary-foreground border border-primary'
                    : 'glass border border-foreground/10 hover:border-primary/50 hover:bg-primary/10 text-foreground'
                }`}
              >
                All
              </button>
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-mono transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground border border-primary'
                      : 'glass border border-foreground/10 hover:border-primary/50 hover:bg-primary/10 text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
              {selectedCategory && (
                <button
                  onClick={() => handleCategoryFilter(null)}
                  className="p-1.5 rounded-lg glass border border-foreground/10 hover:border-destructive/50 hover:bg-destructive/10 transition-all"
                  aria-label="Clear category filter"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground font-mono">
                <Filter className="w-4 h-4" />
                <span>Tech:</span>
              </div>
              <button
                onClick={() => handleTechFilter(null)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-mono transition-all ${
                  !selectedTech
                    ? 'bg-primary text-primary-foreground border border-primary'
                    : 'glass border border-foreground/10 hover:border-primary/50 hover:bg-primary/10 text-foreground'
                }`}
              >
                All
              </button>
              {allTechs.slice(0, 8).map((tech) => (
                <button
                  key={tech}
                  onClick={() => handleTechFilter(tech)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-mono transition-all ${
                    selectedTech === tech
                      ? 'bg-primary text-primary-foreground border border-primary'
                      : 'glass border border-foreground/10 hover:border-primary/50 hover:bg-primary/10 text-foreground'
                  }`}
                >
                  {tech}
                </button>
              ))}
              {selectedTech && (
                <button
                  onClick={() => handleTechFilter(null)}
                  className="p-1.5 rounded-lg glass border border-foreground/10 hover:border-destructive/50 hover:bg-destructive/10 transition-all"
                  aria-label="Clear tech filter"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            {(selectedCategory || selectedTech) && (
              <p className="text-center mt-3 text-xs sm:text-sm text-muted-foreground">
                Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}{' '}
                {selectedCategory ? (
                  <>in <span className="text-primary font-semibold">{selectedCategory}</span></>
                ) : null}
                {selectedCategory && selectedTech ? ' and ' : null}
                {selectedTech ? (
                  <>with <span className="text-primary font-semibold">{selectedTech}</span></>
                ) : null}
              </p>
            )}
          </div>
        </ScrollAnimation>

        <div className="grid gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => {
            const isExpanded = expanded.has(project.title);
            return (
            <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
              <TiltCard tiltAmount={5} scale={1.01}>
                <div className={`glass rounded-lg sm:rounded-md md:rounded-lg p-3 sm:p-4 md:p-6 lg:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden ${
                  'award' in project && project.award
                    ? 'border border-amber-400/35 hover:border-amber-400/60 hover:shadow-amber-500/20 shadow-amber-400/10'
                    : 'hover:glow-primary'
                }`}>
                  {/* Winner ribbon */}
                  {'award' in project && project.award && (
                    <div className="absolute top-0 right-0 w-28 h-28 overflow-hidden pointer-events-none z-10">
                      <div className="absolute top-5 -right-7 rotate-45 bg-amber-500 text-black text-[9px] font-bold tracking-widest uppercase px-10 py-1 shadow-lg">
                        WINNER
                      </div>
                    </div>
                  )}
              <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6">
                {/* Project Visual with Creative Screenshot Display */}
                <div className="w-full lg:w-72 xl:w-80 aspect-[16/9] rounded-lg sm:rounded-md overflow-hidden glass group-hover:glow-primary group-hover:scale-105 transition-all duration-300 flex-shrink-0 shadow-lg shadow-black/10">
                  <div className="relative w-full h-full bg-gradient-to-br from-background/90 via-background/70 to-background/90">
                    {/* Screenshot Background */}
                    {project.title === 'Flowly Funnel Agent' ? (
                      <div className="relative w-full h-full flex flex-col items-center justify-center gap-1 p-2">
                        <AgentPipelineDiagram />
                        <p className="text-[8px] sm:text-[9px] font-mono text-muted-foreground text-center">
                          thin-harness orchestrator → 8 auto-discovered skills
                        </p>
                      </div>
                    ) : project.screenshot ? (
                      <div className="absolute inset-0">
                        <div className="absolute inset-0 flex flex-col">
                          {/* Browser chrome */}
                          <div className="h-7 sm:h-8 bg-foreground/5 border-b border-foreground/10 flex items-center gap-2 px-2 sm:px-3">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                              <span className="w-2.5 h-2.5 rounded-full bg-secondary/70" />
                              <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
                            </div>
                            <div className="ml-2 flex-1 h-3.5 rounded-full bg-foreground/10 border border-foreground/10" />
                          </div>
                          {/* Screenshot area */}
                          <div className="relative flex-1">
                            <img 
                              src={project.screenshot} 
                              alt={`${project.title} screenshot`}
                              className="w-full h-full object-contain p-2 sm:p-3"
                              loading="lazy"
                              decoding="async"
                              fetchPriority="low"
                              sizes="(max-width: 1024px) 100vw, 320px"
                              width="640"
                              height="360"
                            />
                            <div className="absolute inset-2 rounded-md sm:rounded-lg ring-1 ring-white/10 pointer-events-none" />
                            {/* Subtle Overlay for readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
                          </div>
                        </div>
                        
                        {/* Animated Border Frame */}
                        <div className="absolute inset-0 border-2 border-transparent rounded-lg">
                          <div className="absolute -top-0.5 -left-0.5 w-4 h-4 border-t-2 border-l-2 border-primary rounded-tl-full animate-pulse" />
                          <div className="absolute -top-0.5 -right-0.5 w-4 h-4 border-t-2 border-r-2 border-accent rounded-tr-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                          <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 border-b-2 border-l-2 border-accent rounded-bl-full animate-pulse" style={{ animationDelay: '1s' }} />
                          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 border-b-2 border-r-2 border-primary rounded-br-full animate-pulse" style={{ animationDelay: '1.5s' }} />
                        </div>
                        
                        {/* Project Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/20 backdrop-blur-sm">
                              <project.Icon className="w-3 h-3 text-white" />
                              <span className="text-white text-xs font-medium truncate max-w-[100px]">{project.title}</span>
                            </div>
                            <div className="flex gap-1">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Fallback to gradient design if no screenshot */
                      <div className={`relative w-full h-full bg-gradient-to-br ${getProjectGradient(index)} overflow-hidden`}>
                        {/* Soft glow + subtle grid */}
                        <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_0%_0%,white,transparent_55%),radial-gradient(circle_at_100%_100%,white,transparent_55%)] mix-blend-screen" />
                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:26px_26px]" />

                        {/* Inner card */}
                        <div className="relative z-10 m-[3px] h-[calc(100%-6px)] rounded-md bg-gradient-to-br from-background/95 to-background/80 border border-white/10 flex flex-col justify-between p-2.5 sm:p-3">
                          <div className="flex items-center justify-between gap-1.5">
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-[10px] sm:text-[11px] font-medium border border-primary/30">
                              <project.Icon className="w-3 h-3 text-primary flex-shrink-0" />
                              <span className="truncate max-w-[110px] sm:max-w-[140px]">
                                {project.title}
                              </span>
                            </div>
                            <span className="hidden sm:inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          </div>

                          <p className="mt-1 text-[9px] sm:text-[10px] text-muted-foreground line-clamp-2">
                            {project.subtitle}
                          </p>

                          <div className="mt-1 flex flex-wrap gap-1 text-[8px] sm:text-[9px] text-muted-foreground/80 font-mono">
                            {project.tech.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="px-1.5 py-0.5 rounded-full bg-primary/5 border border-primary/20"
                              >
                                {t}
                              </span>
                            ))}
                            {project.tech.length > 3 && (
                              <span className="px-1.5 py-0.5 rounded-full bg-primary/5 border border-primary/20">
                                +{project.tech.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3 sm:mb-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className={`font-mono text-xs sm:text-sm ${'award' in project && project.award ? 'text-amber-400' : 'text-accent'}`}>{project.subtitle}</p>
                      <p className="text-[11px] sm:text-xs text-foreground/70 mt-1">
                        <span className="text-primary font-mono">Role:</span> {project.role} &middot;{' '}
                        <span className="text-primary font-mono">Scope:</span> {project.scope}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 sm:p-2 glass rounded-lg hover:bg-primary/20 transition-colors"
                          onClick={() => trackExternalLink(project.github!, 'github')}
                        >
                          <Github size={16} className="sm:w-5 sm:h-5" />
                        </a>
                      )}
                      {project.linkedin && (
                        <a
                          href={project.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 sm:p-2 glass rounded-lg hover:bg-primary/20 transition-colors"
                          onClick={() => trackExternalLink(project.linkedin!, 'linkedin')}
                          title="View LinkedIn"
                        >
                          <Linkedin size={16} className="sm:w-5 sm:h-5" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 sm:p-2 glass rounded-lg hover:bg-primary/20 transition-colors"
                          title={isYouTubeUrl(project.demo) ? 'Watch demo video' : 'View live demo'}
                          onClick={() => trackExternalLink(project.demo!, isYouTubeUrl(project.demo) ? 'youtube' : 'demo')}
                        >
                          {isYouTubeUrl(project.demo) ? (
                            <Youtube size={16} className="sm:w-5 sm:h-5" />
                          ) : (
                            <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                          )}
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-foreground/80 mb-2 sm:mb-3 md:mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mb-2 sm:mb-3 md:mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] md:text-xs font-mono bg-primary/10 text-primary rounded-full border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => toggleExpanded(project.title)}
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-colors mb-2 sm:mb-3 md:mb-4"
                  >
                    {isExpanded ? (
                      <>Hide details <ChevronUp size={14} /></>
                    ) : (
                      <>Show metrics &amp; highlights <ChevronDown size={14} /></>
                    )}
                  </button>

                  {isExpanded && (
                    <div className="animate-fade-in">
                      {/* Metrics / Outcomes */}
                      <div className="mb-2 sm:mb-3 md:mb-4">
                        <p className="text-[11px] sm:text-xs font-mono text-primary mb-1">
                          {project.metrics?.length ? 'Metrics' : 'Outcomes'}
                        </p>
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                          {(project.metrics?.length ? project.metrics : project.impact).map((item) => (
                            <span
                              key={item}
                              className="px-2 py-0.5 text-[10px] sm:text-[11px] bg-secondary/20 text-foreground/80 rounded-full border border-secondary/30"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-1 sm:space-y-1.5 md:space-y-2">
                        {project.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-foreground/75 leading-relaxed">
                            <span className="text-accent mt-0.5 flex-shrink-0" aria-hidden="true">▹</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                  {/* Side decoration */}
                  <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
                </div>
              </div>
              </TiltCard>
            </ScrollAnimation>
            );})
          ) : (
            <div className="text-center py-12 glass rounded-md">
              <p className="text-muted-foreground mb-2">No projects found with this filter.</p>
              <button
                onClick={() => handleTechFilter(null)}
                className="text-primary hover:underline text-sm font-mono"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>

        {/* Other Projects (collapsed) */}
        <div className="mt-6 sm:mt-8">
          <button
            onClick={() => setShowOtherProjects((v) => !v)}
            className="mx-auto flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-mono glass border border-foreground/10 hover:border-primary/40 text-muted-foreground hover:text-foreground transition-all"
          >
            {showOtherProjects ? 'Hide' : 'Show'} Other Projects ({otherProjectsData.length})
          </button>

          {showOtherProjects && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {otherProjectsData.map((project) => (
                <div key={project.title} className="glass rounded-lg p-3 sm:p-4 border border-foreground/10">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-semibold text-sm text-foreground">{project.title}</h4>
                    <div className="flex gap-1.5 flex-shrink-0">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackExternalLink(project.github, 'github')}
                          aria-label={`${project.title} GitHub repo`}
                        >
                          <Github size={14} className="text-muted-foreground hover:text-foreground transition-colors" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackExternalLink(project.demo, isYouTubeUrl(project.demo) ? 'youtube' : 'demo')}
                          aria-label={`${project.title} demo`}
                        >
                          <ExternalLink size={14} className="text-muted-foreground hover:text-foreground transition-colors" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-1.5 py-0.5 text-[9px] font-mono bg-primary/5 text-muted-foreground rounded-full border border-primary/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* GitHub CTA */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-3 sm:mb-4">Want to see more?</p>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto glass border-primary/50 hover:bg-primary/10 group text-sm sm:text-base"
            asChild
          >
            <a 
              href="https://github.com/NickiMash17" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackExternalLink('https://github.com/NickiMash17', 'github_profile')}
            >
              <Github className="mr-2 group-hover:rotate-12 transition-transform" size={18} />
              <span className="hidden sm:inline">View All Projects on GitHub</span>
              <span className="sm:hidden">View on GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
