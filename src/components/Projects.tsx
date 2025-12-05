import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TiltCard } from '@/components/TiltCard';
import { ScrollAnimation } from '@/hooks/useScrollAnimation';

export const Projects = () => {
  const projects = [
    {
      title: 'AI Compliance Interrogator',
      subtitle: 'AIMS Hackathon 2025 Winner',
      description:
        'AI-powered tool to help organizations identify and prevent human trafficking through automated data analysis and NLP.',
      tech: ['React', 'TypeScript', '.NET', 'SQL', 'Python', 'OpenAI API', 'Azure'],
      highlights: [
        'Won "Best Team" at AIMS Hackathon 2025',
        'Automated data analysis with NLP using OpenAI API',
        'Interactive React dashboard with real-time notifications',
        'Scalable backend with .NET and SQL hosted on Azure',
      ],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
      github: 'https://github.com/NickiMash17',
      demo: 'https://demo.example.com/ai-compliance',
    },
    {
      title: 'Full-Stack Web Applications',
      subtitle: 'CodeCatalyst Internship',
      description:
        'Built multiple full-stack applications with JWT authentication, responsive UIs, and efficient backend systems.',
      tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'JWT'],
      highlights: [
        'Implemented JWT authentication system',
        'Reduced report generation time by 20%',
        'Delivered responsive UIs with Tailwind CSS',
        'RESTful API design and implementation',
      ],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      github: 'https://github.com/NickiMash17',
      demo: null,
    },
    {
      title: 'Mobile Applications',
      subtitle: 'Flutter Development',
      description:
        'Cross-platform mobile applications using Flutter, focusing on performance and user experience.',
      tech: ['Flutter', 'Dart', 'Firebase', 'REST APIs'],
      highlights: [
        'Cross-platform deployment (iOS & Android)',
        'Clean architecture and state management',
        'Integration with backend APIs',
        'Focus on performance optimization',
      ],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop',
      github: 'https://github.com/NickiMash17',
      demo: 'https://demo.example.com/mobile-app',
    },
    {
      title: 'Smart Task Manager',
      subtitle: 'Demo Project - AI-Powered Productivity',
      description:
        'Intelligent task management system with AI-powered suggestions and priority optimization.',
      tech: ['React', 'TypeScript', 'Lovable AI', 'Tailwind CSS'],
      highlights: [
        'AI-powered task suggestions and categorization',
        'Smart priority detection and scheduling',
        'Beautiful, responsive interface',
        'Real-time updates and notifications',
      ],
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop',
      github: 'https://github.com/NickiMash17',
      demo: 'https://demo.example.com/task-manager',
    },
    {
      title: 'Portfolio Analytics Dashboard',
      subtitle: 'Demo Project - Data Visualization',
      description:
        'Interactive analytics dashboard showcasing data visualization and real-time metrics.',
      tech: ['React', 'TypeScript', 'Recharts', 'Lovable Cloud'],
      highlights: [
        'Real-time data updates and visualizations',
        'Interactive charts and graphs',
        'Responsive design for all devices',
        'Performance-optimized rendering',
      ],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
      github: 'https://github.com/NickiMash17',
      demo: 'https://demo.example.com/analytics',
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
                {/* Project Image */}
                <div className="lg:w-72 xl:w-80 h-32 sm:h-40 md:h-48 lg:h-auto rounded-lg sm:rounded-xl overflow-hidden glass group-hover:glow-primary transition-all flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
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
