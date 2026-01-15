import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TiltCard } from '@/components/TiltCard';
import { ScrollAnimation } from '@/hooks/useScrollAnimation';

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
  const projects = [
    {
      title: 'AI Compliance Interrogator',
      subtitle: 'AIMS Hackathon 2025 Winner • Team Firefly',
      description:
        'Hackathon-winning AI tool that helps organizations detect and prevent human trafficking through intelligent data analysis and pattern recognition.',
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
      highlights: [
        '🏆 1st Place at AIMS Hackathon 2025 for AI Compliance Interrogator',
        'Real-time data processing with NLP and OpenAI-powered analysis',
        'Interactive React dashboard with live analytics and alerting',
        'Deployed on Azure with a scalable, cloud-native architecture',
      ],
      github: 'https://github.com/NickiMash17/AIMS-Firefly',
      demo: null,
      emoji: '🧠',
    },
    {
      title: 'LoanLife EDGE',
      subtitle: 'AI-Powered Loan Risk & Compliance Platform',
      description:
        'Collaborative fintech platform for real-time loan health monitoring, predictive risk analytics, ESG compliance, and auditable document trails.',
      tech: [
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Supabase',
        'PostgreSQL',
        'AI/ML',
      ],
      highlights: [
        'Built interactive dashboards for portfolio health and risk analytics',
        'Designed offline-first UX with synced blockchain-inspired audit logs',
        'Implemented secure document upload and AI-powered insight workflows',
        'Collaborated in a multi-dev team on architecture, UI, and data flows',
      ],
      github: 'https://github.com/Lunga-Mashaba/LoanLife_Edge',
      demo: 'https://loan-life-edge.vercel.app/',
      emoji: '📈',
    },
    {
      title: 'RealHomes',
      subtitle: 'South African Luxury Real Estate Platform',
      description:
        'A modern, responsive real estate platform showcasing premium properties across South Africa, with rich search and filtering.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT'],
      highlights: [
        'Built end-to-end MERN stack application for property listing and discovery',
        'Responsive UI optimized for both mobile and desktop viewing',
        'Secure authentication and role-based access using JWT',
        'Designed to scale with growing property inventory and traffic',
      ],
      github: 'https://github.com/NickiMash17/RealHomes',
      demo: 'https://real-homes.vercel.app/',
      emoji: '🏠',
    },
    {
      title: 'BookReviewApp',
      subtitle: 'Advanced Book Review Application',
      description:
        'Full-featured book review platform built with ASP.NET Core and Entity Framework Core, focused on clean architecture and performance.',
      tech: ['ASP.NET Core', 'C#', 'Entity Framework Core', 'SQL Server'],
      highlights: [
        'Implements clean architecture with separation of concerns',
        'Supports rich review features and user interactions',
        'Uses EF Core for efficient data access and persistence',
        'Built to demonstrate strong backend and .NET skills',
      ],
      github: 'https://github.com/NickiMash17/BookReviewApp',
      demo: 'https://bookreviewapp-1755367448.azurewebsites.net/',
      emoji: '📚',
    },
    {
      title: 'FitQuest',
      subtitle: 'Gamified Wellness Companion',
      description:
        'A gamified wellness application with an evolving plant companion. Track activities, earn XP, and watch your companion grow.',
      tech: ['Flutter', 'Dart', 'Firebase'],
      highlights: [
        'Built with Flutter for smooth cross-platform mobile experiences',
        'Gamified system that rewards healthy habits with XP and growth',
        'Real-time data sync and auth powered by Firebase',
        'Shows strong mobile UI/UX and state management skills',
      ],
      github: 'https://github.com/NickiMash17/fitquest-app',
      demo: null,
      emoji: '🌱',
    },
  ];

  return (
    <section id="projects" className="relative py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimation animation="fade-up">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 glow-text">
              <span className="text-primary font-mono">{'<'}</span>
              Featured Projects
              <span className="text-primary font-mono">{' />'}</span>
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg">Building solutions that make an impact</p>
          </div>
        </ScrollAnimation>

        <div className="grid gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ScrollAnimation key={index} animation="fade-up" delay={index * 100}>
              <TiltCard tiltAmount={5} scale={1.01}>
                <div className="glass rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 transition-all duration-300 hover:glow-primary group">
              <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6">
                {/* Project Visual / Creative Placeholder */}
                <div className="lg:w-72 xl:w-80 h-32 sm:h-40 md:h-48 lg:h-auto rounded-lg sm:rounded-xl overflow-hidden glass group-hover:glow-primary transition-all flex-shrink-0">
                  <div
                    className={`relative w-full h-full bg-gradient-to-br ${getProjectGradient(
                      index
                    )} overflow-hidden`}
                  >
                    {/* Animated holographic overlay */}
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_10%_0%,white,transparent_55%),radial-gradient(circle_at_90%_100%,white,transparent_55%)] mix-blend-screen" />
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(120deg,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(210deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[length:40px_40px]" />

                    {/* Animated scan line */}
                    <div className="absolute inset-x-0 -top-full h-1/2 bg-gradient-to-b from-white/20 via-white/5 to-transparent animate-[scan_6s_linear_infinite]" />

                    {/* Center content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                      <div className="mb-1.5 sm:mb-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/20 text-[10px] sm:text-[11px] font-mono uppercase tracking-wide border border-white/20">
                        <span className="opacity-80">
                          {project.emoji ?? '💡'}
                        </span>
                        <span className="truncate max-w-[120px] sm:max-w-[160px]">
                          {project.title}
                        </span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-white/85 leading-snug line-clamp-2">
                        {project.subtitle}
                      </p>

                      <div className="mt-2 flex items-center gap-1.5 text-[9px] sm:text-[10px] text-white/70 font-mono">
                        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                        <span className="uppercase tracking-wide">
                          {index === 0
                            ? 'AI • CLOUD • HACKATHON'
                            : index === 1
                            ? 'FULL-STACK • REAL ESTATE'
                            : index === 2
                            ? 'DOTNET • CLEAN ARCH'
                            : 'MOBILE • FLUTTER • WELLNESS'}
                        </span>
                      </div>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-black/20 border border-white/10 blur-2xl" />
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
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 sm:p-2 glass rounded-lg hover:bg-primary/20 transition-colors"
                        >
                          <Github size={16} className="sm:w-5 sm:h-5" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 sm:p-2 glass rounded-lg hover:bg-primary/20 transition-colors"
                        >
                          <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-2 sm:mb-3 md:mb-4 leading-relaxed">{project.description}</p>

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
                      <li key={i} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed">
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
          ))}
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
            <a href="https://github.com/NickiMash17" target="_blank" rel="noopener noreferrer">
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
