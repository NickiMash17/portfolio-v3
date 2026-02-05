import reactLogo from '@/assets/logos/react.svg';
import typescriptLogo from '@/assets/logos/typescript.svg';
import nodejsLogo from '@/assets/logos/nodejs.svg';
import dotnetLogo from '@/assets/logos/dotnet.svg';
import csharpLogo from '@/assets/logos/csharp.svg';
import flutterLogo from '@/assets/logos/flutter.svg';
import azureLogo from '@/assets/logos/azure.svg';
import mongodbLogo from '@/assets/logos/mongodb.svg';
import sqlLogo from '@/assets/logos/sql.svg';
import pythonLogo from '@/assets/logos/python.svg';
import tailwindLogo from '@/assets/logos/tailwind.svg';
import dockerLogo from '@/assets/logos/docker.svg';
import gitLogo from '@/assets/logos/git.svg';
import javascriptLogo from '@/assets/logos/javascript.svg';
import { ScrollAnimation } from '@/hooks/useScrollAnimation';

export const Skills = () => {
  const skills = [
    { name: 'React.js', category: 'Frontend', logo: reactLogo },
    { name: 'TypeScript', category: 'Languages', logo: typescriptLogo },
    { name: 'Node.js', category: 'Backend', logo: nodejsLogo },
    { name: '.NET / C#', category: 'Backend', logo: dotnetLogo },
    { name: 'Flutter', category: 'Mobile', logo: flutterLogo },
    { name: 'Microsoft Azure', category: 'Cloud', logo: azureLogo },
    { name: 'MongoDB', category: 'Database', logo: mongodbLogo },
    { name: 'SQL', category: 'Database', logo: sqlLogo },
    { name: 'Python', category: 'Languages', logo: pythonLogo },
    { name: 'Tailwind CSS', category: 'Frontend', logo: tailwindLogo },
    { name: 'Docker', category: 'DevOps', logo: dockerLogo },
    { name: 'Git', category: 'DevOps', logo: gitLogo },
  ];

  const techStack = [
    { name: 'JavaScript', logo: javascriptLogo },
    { name: 'TypeScript', logo: typescriptLogo },
    { name: 'React', logo: reactLogo },
    { name: 'Node.js', logo: nodejsLogo },
    { name: 'Flutter', logo: flutterLogo },
    { name: '.NET', logo: dotnetLogo },
    { name: 'Azure', logo: azureLogo },
    { name: 'MongoDB', logo: mongodbLogo },
    { name: 'SQL', logo: sqlLogo },
    { name: 'Python', logo: pythonLogo },
    { name: 'Docker', logo: dockerLogo },
    { name: 'Git', logo: gitLogo },
  ];

  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <section id="skills" className="relative py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimation animation="fade-up">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 glow-text">
              <span className="text-primary font-mono">{'<'}</span>
              Tech Stack
              <span className="text-primary font-mono">{' />'}</span>
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg">Technologies I work with</p>
          </div>
        </ScrollAnimation>

        {/* Tech Stack Showcase */}
        <ScrollAnimation animation="scale" delay={100}>
          <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">Key Technologies</h3>

          {/* Mobile: Crisp Grid (no 3D to avoid blur and improve performance) */}
          <div className="sm:hidden">
            <div className="grid grid-cols-3 gap-4">
              {techStack.map((tech) => (
                <div key={tech.name} className="flex flex-col items-center gap-2">
                  <img
                    src={tech.logo}
                    alt={`${tech.name} logo`}
                    loading="lazy"
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-foreground font-mono text-[11px] font-medium text-center leading-tight">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tablet/Desktop: 3D Carousel */}
          <div className="hidden sm:block">
            <div className="relative h-56 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] perspective-1000">
              <div
                className="tech-carousel"
                style={{
                  transform: 'translateZ(-200px) rotateY(0deg)',
                }}
              >
                {techStack.map((tech, index) => (
                  <div
                    key={tech.name}
                    className="tech-card glass will-change-transform [backface-visibility:hidden]"
                    style={{
                      transform: `rotateY(${(index * 360) / techStack.length}deg) translateZ(200px)`,
                    }}
                  >
                    <div className="flex flex-col items-center justify-center h-full gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6">
                      <img
                        src={tech.logo}
                        alt={`${tech.name} logo`}
                        loading="lazy"
                        decoding="async"
                        loading="lazy"
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                      />
                      <span className="text-foreground font-mono font-semibold text-xs sm:text-sm md:text-base text-center">
                        {tech.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center text-muted-foreground text-[10px] sm:text-xs md:text-sm mt-3 sm:mt-4 md:mt-6 font-mono">
              [ Hover to pause • Auto-rotating 3D showcase ]
            </p>
          </div>
        </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

