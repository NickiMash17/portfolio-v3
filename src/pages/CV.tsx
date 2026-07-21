import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Download, Printer, Mail, Phone, MapPin, Github, Linkedin, Globe,
  Briefcase, GraduationCap, CheckCircle2, ExternalLink,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ScrollProgress } from '@/components/ScrollProgress';
import { AuroraBackground } from '@/components/AuroraBackground';
import { Footer } from '@/components/Footer';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { TiltCard } from '@/components/TiltCard';
import { MagneticButton } from '@/components/MagneticButton';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { trackDownload, trackEvent, trackExternalLink } from '@/lib/analytics';
import {
  cvHeader, cvSummary, cvStats, cvSkillGroups, cvProjects, cvExperience,
  cvCertifications, cvEducation,
} from '@/lib/cvData';

const CV_PATH = '/Nicolette_Mashaba_CV.pdf';

const CV = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <SEO
        title="Nicolette Mashaba — Interactive CV"
        description="AI Engineer CV: production LLM systems, RAG pipelines, multi-agent architectures on Azure. AZ-204 certified, Geekulcha Top 15 AI Innovator."
      />
      <div className="cv-page relative min-h-screen bg-background overflow-x-hidden">
        <ScrollProgress />
        <AuroraBackground />

        {/* Sticky header */}
        <header
          className={`no-print fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'glass border-b border-primary/20 shadow-lg backdrop-blur-xl' : 'bg-transparent'
          }`}
        >
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link
              to="/"
              className="min-h-11 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Portfolio</span>
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="min-h-11 min-w-11 flex items-center justify-center rounded-md border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                aria-label="Print CV"
                title="Print"
              >
                <Printer className="w-4 h-4" />
              </button>
              <MagneticButton>
                <a
                  href={CV_PATH}
                  download="Nicolette_Mashaba_CV.pdf"
                  onClick={() => trackDownload('Nicolette_Mashaba_CV.pdf', 'pdf')}
                  className="min-h-11 flex items-center gap-1.5 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download PDF</span>
                </a>
              </MagneticButton>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="relative z-10 pt-24 pb-16 sm:pb-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-4xl">
            {/* Header block */}
            <ScrollAnimation animation="cinematic">
              <div className="text-center mb-10 sm:mb-14">
                <h1 className="heading-fluid-lg font-bold font-display mb-2">{cvHeader.name}</h1>
                <p className="text-primary font-medium text-sm sm:text-base mb-4 max-w-2xl mx-auto">
                  {cvHeader.title}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-muted-foreground mb-5">
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-primary" /> {cvHeader.email}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-primary" /> {cvHeader.phone}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" /> {cvHeader.location}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  {[
                    { icon: Linkedin, href: cvHeader.links.linkedin, label: 'LinkedIn' },
                    { icon: Github, href: cvHeader.links.github, label: 'GitHub' },
                    { icon: Globe, href: cvHeader.links.portfolio, label: 'Portfolio' },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackExternalLink(href, label.toLowerCase())}
                      aria-label={label}
                      className="min-w-11 min-h-11 flex items-center justify-center bg-card border border-border/60 rounded-md hover:border-primary/50 hover:-translate-y-0.5 transition-all"
                    >
                      <Icon className="w-4 h-4 text-foreground/70" />
                    </a>
                  ))}
                </div>
              </div>
            </ScrollAnimation>

            {/* Stats */}
            <ScrollAnimation animation="fade-up" delay={50}>
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-14">
                {cvStats.map((stat) => (
                  <div key={stat.label} className="glass shadow-premium rounded-lg p-3 sm:p-4 text-center">
                    <AnimatedCounter
                      value={stat.value}
                      className="block text-xl sm:text-2xl font-bold font-display text-primary"
                    />
                    <div className="text-[10px] sm:text-xs text-muted-foreground leading-tight mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollAnimation>

            {/* Summary */}
            <ScrollAnimation animation="fade-up" delay={100}>
              <div className="glass shadow-premium rounded-lg p-5 sm:p-8 mb-10 sm:mb-14 border-l-2 border-primary/50">
                <p className="eyebrow-label text-primary mb-3">Professional Summary</p>
                <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">{cvSummary}</p>
              </div>
            </ScrollAnimation>

            {/* Skills */}
            <section className="mb-10 sm:mb-14">
              <ScrollAnimation animation="fade-up">
                <h2 className="heading-fluid-md font-bold font-display mb-6 text-center">
                  Technical Skills
                </h2>
              </ScrollAnimation>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {cvSkillGroups.map((group, i) => (
                  <ScrollAnimation key={group.category} animation="scale" delay={i * 40}>
                    <div className="glass shadow-premium rounded-lg p-4 sm:p-5 h-full">
                      <p className="eyebrow-label text-secondary mb-3">{group.category}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {group.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-md text-[11px] font-medium border border-primary/25 bg-primary/5 text-foreground/85"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </section>

            {/* AI Projects */}
            <section className="mb-10 sm:mb-14">
              <ScrollAnimation animation="fade-up">
                <h2 className="heading-fluid-md font-bold font-display mb-6 text-center">AI Projects</h2>
              </ScrollAnimation>
              <div className="space-y-4 sm:space-y-6">
                {cvProjects.map((project, i) => (
                  <ScrollAnimation key={project.title} animation="fade-up" delay={i * 60}>
                    <TiltCard tiltAmount={3} scale={1.01} glareEnabled={false} spotlightEnabled className="rounded-lg block">
                      <div className="glass shadow-premium rounded-lg p-5 sm:p-8 h-full">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-foreground">{project.title}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{project.org}</p>
                          </div>
                          {project.badge && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-semibold bg-accent/15 text-accent border border-accent/30 flex-shrink-0">
                              {project.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-foreground/80 mb-3">{project.description}</p>
                        <ul className="space-y-1.5 mb-4">
                          {project.bullets.map((bullet, j) => (
                            <li key={j} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/75 leading-relaxed">
                              <span className="text-accent mt-0.5 flex-shrink-0" aria-hidden="true">▹</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {project.tech.map((t) => (
                            <span key={t} className="px-2 py-0.5 text-[10px] font-mono bg-primary/10 text-primary rounded-full border border-primary/30">
                              {t}
                            </span>
                          ))}
                        </div>
                        {project.link && (
                          <a
                            href={project.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackExternalLink(project.link!.href, 'cv_project')}
                            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                          >
                            {project.link.label}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </TiltCard>
                  </ScrollAnimation>
                ))}
              </div>
            </section>

            {/* Experience timeline */}
            <section className="mb-10 sm:mb-14">
              <ScrollAnimation animation="fade-up">
                <h2 className="heading-fluid-md font-bold font-display mb-6 text-center">
                  Professional Experience
                </h2>
              </ScrollAnimation>
              <div className="space-y-4 sm:space-y-6">
                {cvExperience.map((role, i) => (
                  <ScrollAnimation key={`${role.title}-${role.company}`} animation="fade-up" delay={i * 40}>
                    <TiltCard tiltAmount={2} scale={1.008} glareEnabled={false} spotlightEnabled className="rounded-lg block">
                      <div
                        className={`glass shadow-premium rounded-lg p-5 sm:p-8 h-full ${
                          role.current ? 'border border-primary/40' : ''
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Briefcase className="w-4 h-4 text-secondary flex-shrink-0" />
                          <h3 className="text-base sm:text-lg font-bold text-foreground">{role.title}</h3>
                          {role.current && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-primary/15 text-primary border border-primary/30">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-primary font-semibold">{role.company}</p>
                        <p className="text-xs text-muted-foreground mb-3">
                          {role.period} &middot; {role.location}
                        </p>

                        {role.intro && (
                          <p className="text-xs sm:text-sm text-foreground/70 mb-4 leading-relaxed">{role.intro}</p>
                        )}

                        {role.achievements && (
                          <div className="mb-4">
                            <p className="eyebrow-label text-accent mb-2">{role.achievements.heading}</p>
                            <ul className="space-y-1.5">
                              {role.achievements.bullets.map((b, j) => (
                                <li key={j} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/75 leading-relaxed">
                                  <span className="text-accent mt-0.5 flex-shrink-0" aria-hidden="true">▹</span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {role.systems && (
                          <div className="grid sm:grid-cols-3 gap-3 mb-4">
                            {role.systems.map((system) => (
                              <div key={system.name} className="rounded-md border border-border/50 bg-card/40 p-3">
                                <p className="text-xs font-semibold text-foreground mb-1.5">{system.name}</p>
                                <ul className="space-y-1">
                                  {system.bullets.map((b, j) => (
                                    <li key={j} className="text-[11px] text-muted-foreground leading-relaxed">
                                      {b}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}

                        {role.practices && (
                          <div className="mb-1">
                            <p className="eyebrow-label text-secondary mb-2">{role.practices.heading}</p>
                            <ul className="space-y-1.5">
                              {role.practices.bullets.map((b, j) => (
                                <li key={j} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/75 leading-relaxed">
                                  <span className="text-secondary mt-0.5 flex-shrink-0" aria-hidden="true">▹</span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {role.bullets && (
                          <ul className="space-y-1.5">
                            {role.bullets.map((b, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/75 leading-relaxed">
                                <span className="text-secondary mt-0.5 flex-shrink-0" aria-hidden="true">▹</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </TiltCard>
                  </ScrollAnimation>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section className="mb-10 sm:mb-14">
              <ScrollAnimation animation="fade-up">
                <h2 className="heading-fluid-md font-bold font-display mb-6 text-center">
                  Certifications &amp; Recognition
                </h2>
              </ScrollAnimation>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {cvCertifications.map((cert, i) => (
                  <ScrollAnimation key={cert} animation="scale" delay={i * 30}>
                    <TiltCard tiltAmount={3} scale={1.015} glareEnabled={false} spotlightEnabled className="rounded-lg block">
                      <div className="glass shadow-premium rounded-lg p-3 sm:p-4 h-full">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="text-primary flex-shrink-0" size={18} />
                          <p className="text-xs sm:text-sm text-foreground leading-relaxed">{cert}</p>
                        </div>
                      </div>
                    </TiltCard>
                  </ScrollAnimation>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="mb-4">
              <ScrollAnimation animation="fade-up">
                <h2 className="heading-fluid-md font-bold font-display mb-6 text-center">Education</h2>
              </ScrollAnimation>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {cvEducation.map((edu) => (
                  <div key={edu.title} className="glass shadow-premium rounded-lg p-4 flex items-start gap-3">
                    <GraduationCap className="text-secondary flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-foreground leading-snug">{edu.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {edu.org} &middot; {edu.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="no-print text-center mt-14">
              <MagneticButton>
                <a
                  href="/#contact"
                  onClick={() => trackEvent('cv_page_contact_cta', { category: 'cv' })}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
                >
                  Let's Talk
                </a>
              </MagneticButton>
            </div>
          </div>
        </main>

        <div className="no-print">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default CV;
