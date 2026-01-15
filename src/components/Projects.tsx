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
        'Hackathon-winning AI tool that helps organizations detect and prevent human trafficking using intelligent data analysis and pattern recognition.',
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
        'Fintech platform that turns each loan into a digital twin, monitored by AI with early covenant and ESG risk warnings.',
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
      highlights: [
        'Backend & AI Integration Lead for ingestion, digital twin, prediction, ESG and audit services in FastAPI.',
        'Predicts covenant breaches and ESG issues 30–90 days ahead for proactive risk management.',
        'Uses blockchain-style audit trails and smart-contract logic for transparent governance.',
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
                  {/* Different visual language per project so each feels unique */}
                  {index === 0 && (
                    // AI Compliance: neural / circuit vibes
                    <div
                      className={`relative w-full h-full bg-gradient-to-br ${getProjectGradient(
                        index
                      )} overflow-hidden`}
                    >
                      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_10%_0%,white,transparent_60%),radial-gradient(circle_at_90%_100%,white,transparent_55%)] mix-blend-screen" />
                      <div className="absolute inset-6 rounded-2xl border border-white/20 bg-black/10 backdrop-blur-md" />
                      <div className="absolute inset-8 rounded-2xl border border-dashed border-white/20" />
                      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_50%,transparent_0,transparent_40%,rgba(255,255,255,0.6)_41%,transparent_55%)] animate-[pulse-glow_6s_ease-in-out_infinite]" />
                      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                        <span className="text-3xl sm:text-4xl mb-1">{project.emoji ?? '🧠'}</span>
                        <p className="text-[10px] sm:text-xs text-white/85 font-mono uppercase tracking-wide">
                          Neural Risk Monitor
                        </p>
                        <p className="mt-1 text-[9px] sm:text-[10px] text-white/70 line-clamp-2">
                          AI digital twins • human trafficking compliance
                        </p>
                      </div>
                    </div>
                  )}

                  {index === 1 && (
                    // RealHomes: map / city grid
                    <div
                      className={`relative w-full h-full bg-gradient-to-br ${getProjectGradient(
                        index
                      )} overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[length:22px_22px] opacity-40" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.4),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.45),transparent_55%)] opacity-40" />
                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                        <div className="flex items-center gap-1 mb-1.5">
                          <span className="text-2xl sm:text-3xl">{project.emoji ?? '🏠'}</span>
                          <span className="text-[10px] sm:text-xs font-mono bg-black/30 px-2 py-0.5 rounded-full border border-white/20">
                            SA Real Estate
                          </span>
                        </div>
                        <p className="text-[9px] sm:text-[10px] text-white/80 line-clamp-2">
                          Luxury property search • rich filters • modern UI
                        </p>
                      </div>
                    </div>
                  )}

                  {index === 2 && (
                    // BookReviewApp: bookshelf / cards
                    <div
                      className={`relative w-full h-full bg-gradient-to-br ${getProjectGradient(
                        index
                      )} overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.35),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.35),transparent_55%)] opacity-60" />
                      <div className="absolute inset-x-4 bottom-3 h-1 rounded-full bg-black/30 blur-md" />
                      <div className="relative z-10 h-full flex items-center justify-center gap-2 sm:gap-3 px-4">
                        <div className="w-8 sm:w-9 h-16 sm:h-18 rounded-md bg-white/90 shadow-md rotate-[-4deg]" />
                        <div className="w-8 sm:w-9 h-18 sm:h-20 rounded-md bg-amber-100/90 shadow-md rotate-[3deg]" />
                        <div className="w-8 sm:w-9 h-14 sm:h-16 rounded-md bg-rose-100/90 shadow-md rotate-[-2deg]" />
                      </div>
                      <div className="absolute top-2 left-2 text-[10px] sm:text-xs font-mono bg-black/35 text-white px-2 py-0.5 rounded-full border border-white/15 flex items-center gap-1">
                        <span>{project.emoji ?? '📚'}</span>
                        <span>Book Review App</span>
                      </div>
                    </div>
                  )}

                  {index === 3 && (
                    // FitQuest: wellness / growth rings
                    <div
                      className={`relative w-full h-full bg-gradient-to-br ${getProjectGradient(
                        index
                      )} overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_110%,rgba(255,255,255,0.5),transparent_60%)] opacity-70" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/40 flex items-center justify-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/60 flex items-center justify-center">
                            <span className="text-2xl sm:text-3xl">{project.emoji ?? '🌱'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 text-[9px] sm:text-[10px] font-mono bg-black/35 text-white px-2 py-0.5 rounded-full border border-white/15">
                        Gamified wellness • Flutter + Firebase
                      </div>
                    </div>
                  )}
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

                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-2 sm:mb-3 md:mb-4 leading-relaxed line-clamp-2">
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
