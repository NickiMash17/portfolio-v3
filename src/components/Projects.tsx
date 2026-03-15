import { useState, useMemo } from 'react';
import { ExternalLink, Github, Linkedin, Youtube, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TiltCard } from '@/components/TiltCard';
import { ScrollAnimation } from '@/hooks/useScrollAnimation';
import { trackProjectView, trackExternalLink, trackEvent } from '@/lib/analytics';

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

export const Projects = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const projectsData = [
    {
      title: 'EmpowaAI',
      subtitle: 'AI-Powered Career & Economic Guidance Platform',
      description:
        'AI-powered career and economic guidance platform that builds a Digital Economic Twin to help youth make smarter career decisions.',
      role: 'Full-Stack & AI Systems',
      scope: 'AI career guidance, digital twin, simulations',
      tech: [
        'AI/ML',
        'NLP',
        'Career Analytics',
        'Digital Twin',
        'Simulation',
        'Interview Coaching',
      ],
      categories: ['AI', 'Career Tech', 'Web App'],
      impact: [
        '3, 6, and 12-month career path simulations',
        'Clear pathways from skills to industry fit',
        'Decision support for employment, learnership, or entrepreneurship',
      ],
      highlights: [
        'Creates a Digital Economic Twin to model skills, strengths, and potential',
        'Analyzes CVs, identifies strongest skills, and matches users to suited industries',
        'Simulates 3, 6, and 12-month career paths with actionable guidance',
        'Provides interview prep with AI coaching and pathways for employment, learnership, or entrepreneurship',
        'Designed to evolve into a talent and opportunity ecosystem',
      ],
      demo: 'https://www.empowa.org',
      linkedin: 'https://www.linkedin.com/company/empowaai',
      emoji: 'AI',
      screenshot: '/screenshots/emoowaai.jpeg',
    },
    {
      title: 'AI Compliance Interrogator',
      subtitle: 'AIMS Hackathon 2025 Winner • Team Firefly',
      description:
        'Hackathon-winning AI tool that helps organizations detect and prevent human trafficking using intelligent data analysis and pattern recognition.',
      role: 'Team Project (Hackathon)',
      scope: 'AI analysis, dashboard, real-time alerts',
      tech: [
        'React',
        'TypeScript',
        '.NET Core',
        'Azure Functions',
        'OpenAI API',
        'Tailwind CSS',
        'Docker',
        'Kubernetes',
      ],
      categories: ['AI', 'Civic Tech', 'Full-Stack'],
      impact: [
        'Hackathon winner with real-time AI alerts',
        'Actionable intelligence for compliance teams',
        'Cloud-native, scalable deployment',
      ],
      highlights: [
        '🏆 1st Place at AIMS Hackathon 2025 for AI Compliance Interrogator',
        'Real-time data processing with NLP and OpenAI-powered analysis',
        'Interactive React dashboard with live analytics and alerting',
        'Deployed on Azure with a scalable, cloud-native architecture',
      ],
      github: 'https://github.com/NickiMash17/AIMS-Firefly',
      demo: null,
      linkedin: null,
      emoji: '🧠',
      screenshot: '/screenshots/aims.jpg',
    },
    {
      title: 'LoanLife EDGE',
      subtitle: 'AI-Powered Loan Risk & Compliance Platform',
      description:
        'Fintech platform that turns each loan into a digital twin, monitored by AI with early covenant and ESG risk warnings.',
      role: 'Backend & AI Integration Lead',
      scope: 'Ingestion, predictions, ESG, audit trails',
      tech: [
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Electron',
        'Python',
        'FastAPI',
        'AI/ML',
        'Hardhat',
        'Solidity',
      ],
      categories: ['Fintech', 'AI', 'Full-Stack'],
      impact: [
        '30-90 day early warning on covenant and ESG risks',
        'Transparent audit trails for governance',
        'Improved decision-making for loan portfolios',
      ],
      highlights: [
        'Backend & AI Integration Lead for ingestion, digital twin, prediction, ESG and audit services in FastAPI.',
        'Predicts covenant breaches and ESG issues 30–90 days ahead for proactive risk management.',
        'Uses blockchain-style audit trails and smart-contract logic for transparent governance.',
      ],
      github: 'https://github.com/Lunga-Mashaba/LoanLife_Edge',
      demo: 'https://loan-life-edge.vercel.app/',
      linkedin: null,
      emoji: '📈',
      screenshot: '/screenshots/loanlife.jpg',
    },
    {
      title: 'RealHomes',
      subtitle: 'South African Luxury Real Estate Platform',
      description:
        'A modern, responsive real estate platform showcasing premium properties across South Africa, with rich search and filtering.',
      role: 'Full-Stack Developer',
      scope: 'Listings, search, auth, responsive UI',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT'],
      categories: ['Full-Stack', 'Web App'],
      impact: [
        'Streamlined property discovery experience',
        'Secure access with role-based authentication',
        'Scalable architecture for growing inventory',
      ],
      highlights: [
        'Built end-to-end MERN stack application for property listing and discovery',
        'Responsive UI optimized for both mobile and desktop viewing',
        'Secure authentication and role-based access using JWT',
        'Designed to scale with growing property inventory and traffic',
      ],
      github: 'https://github.com/NickiMash17/RealHomes',
      demo: 'https://real-homes.vercel.app/',
      linkedin: null,
      emoji: '🏠',
      screenshot: '/screenshots/realhomes.jpeg',
    },
    {
      title: 'BookReviewApp',
      subtitle: 'Advanced Book Review Application',
      description:
        'Full-featured book review platform built with ASP.NET Core and Entity Framework Core, focused on clean architecture and performance.',
      role: 'Full-Stack Developer',
      scope: 'Clean architecture, reviews, persistence',
      tech: ['ASP.NET Core', 'C#', 'Entity Framework Core', 'SQL Server'],
      categories: ['Backend', 'Web App'],
      impact: [
        'Structured, maintainable domain architecture',
        'Rich review workflow and user interactions',
        'Efficient data access and persistence',
      ],
      highlights: [
        'Implements clean architecture with separation of concerns',
        'Supports rich review features and user interactions',
        'Uses EF Core for efficient data access and persistence',
        'Built to demonstrate strong backend and .NET skills',
      ],
      github: 'https://github.com/NickiMash17/BookReviewApp',
      demo: 'https://bookreviewapp-1755367448.azurewebsites.net/',
      linkedin: null,
      emoji: '📚',
      screenshot: '/screenshots/bookreviewapp.jpeg',
    },
    {
      title: 'FitQuest',
      subtitle: 'Gamified Wellness Companion',
      description:
        'A gamified wellness application with an evolving plant companion. Track activities, earn XP, and watch your companion grow.',
      role: 'Mobile Developer',
      scope: 'Gamification, XP system, real-time sync',
      tech: ['Flutter', 'Dart', 'Firebase'],
      categories: ['Mobile', 'Health'],
      impact: [
        'Motivates habit formation with gamified rewards',
        'Cross-platform experience with smooth UX',
        'Real-time sync across devices',
      ],
      highlights: [
        'Built with Flutter for smooth cross-platform mobile experiences',
        'Gamified system that rewards healthy habits with XP and growth',
        'Real-time data sync and auth powered by Firebase',
        'Shows strong mobile UI/UX and state management skills',
      ],
      github: 'https://github.com/NickiMash17/fitquest-app',
      demo: 'https://youtu.be/Ist1QrlhFIg?si=lv-JSEcLseUJj4h0',
      linkedin: null,
      emoji: '🌱',
      screenshot: '/screenshots/fitquest.jpeg',
    },
  ];

  const projects = useMemo(() => projectsData, [projectsData]);

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
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimation animation="fade-up">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 glow-text">
              <span className="text-primary font-mono">{'<'}</span>
              Featured Projects
              <span className="text-primary font-mono">{' />'}</span>
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg">Building solutions that make an impact</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {['AIMS Hackathon Winner 2025', 'Azure Certified', '1000+ Commits', 'Full-Stack & AI'].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono border border-primary/30 bg-primary/10 text-primary"
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
            filteredProjects.map((project, index) => (
            <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
              <TiltCard tiltAmount={5} scale={1.01}>
                <div className="glass rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 transition-all duration-300 hover:glow-primary hover:shadow-xl hover:-translate-y-1 group cursor-pointer">
              <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6">
                {/* Project Visual with Creative Screenshot Display */}
                <div className="w-full lg:w-72 xl:w-80 aspect-[16/9] rounded-lg sm:rounded-xl overflow-hidden glass group-hover:glow-primary group-hover:scale-105 transition-all duration-300 flex-shrink-0">
                  <div className="relative w-full h-full bg-gradient-to-br from-background/90 via-background/70 to-background/90">
                    {/* Screenshot Background */}
                    {project.screenshot ? (
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
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 backdrop-blur-sm">
                              <span className="text-white text-xs font-bold">{project.emoji ?? '💡'}</span>
                              <span className="text-white text-xs font-mono truncate max-w-[100px]">{project.title}</span>
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
                        <div className="relative z-10 m-[3px] h-[calc(100%-6px)] rounded-xl bg-gradient-to-br from-background/95 to-background/80 border border-white/10 flex flex-col justify-between p-2.5 sm:p-3">
                          <div className="flex items-center justify-between gap-1.5">
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-[10px] sm:text-[11px] font-mono border border-primary/30">
                              <span>{project.emoji ?? '💡'}</span>
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
                      <p className="text-accent font-mono text-xs sm:text-sm">{project.subtitle}</p>
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

                  <p className="text-sm sm:text-base text-foreground/80 mb-2 sm:mb-3 md:mb-4 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Impact */}
                  <div className="mb-2 sm:mb-3 md:mb-4">
                    <p className="text-[11px] sm:text-xs font-mono text-primary mb-1">Impact</p>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {project.impact.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 text-[10px] sm:text-[11px] bg-secondary/20 text-foreground/80 rounded-full border border-secondary/30"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

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

                  {/* Highlights */}
                  <ul className="space-y-1 sm:space-y-1.5 md:space-y-2">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-foreground/75 leading-relaxed">
                        <span className="text-accent mt-0.5 flex-shrink-0">▹</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                  {/* Side decoration */}
                  <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
                </div>
              </div>
              </TiltCard>
            </ScrollAnimation>
            ))
          ) : (
            <div className="text-center py-12 glass rounded-xl">
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
