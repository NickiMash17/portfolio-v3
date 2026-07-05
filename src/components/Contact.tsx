import { Mail, ExternalLink, Eye, Briefcase, Users, GitBranch } from 'lucide-react';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { trackExternalLink } from '@/lib/analytics';
import { CVPreviewModal } from '@/components/CVPreviewModal';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12.05 2C6.522 2 2.04 6.477 2.04 12c0 1.86.508 3.688 1.472 5.284L2 22l4.834-1.489A9.96 9.96 0 0 0 12.05 22C17.578 22 22.06 17.523 22.06 12S17.578 2 12.05 2zm0 18.148a8.1 8.1 0 0 1-4.132-1.131l-.296-.176-3.06.942.972-2.995-.193-.307a8.13 8.13 0 0 1-1.253-4.33c0-4.494 3.66-8.15 8.162-8.15 4.502 0 8.162 3.656 8.162 8.15 0 4.494-3.66 8.15-8.162 8.15z"/>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.554V9h3.565v11.452z"/>
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.604-.014 2.896-.014 3.286 0 .322.216.696.825.577C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const connections = [
  {
    label: 'LinkedIn',
    value: '@nicolette-mashaba',
    href: 'https://linkedin.com/in/nicolette-mashaba',
    icon: LinkedInIcon,
    bg: '#0A66C2',
    key: 'linkedin',
    action: 'link' as const,
  },
  {
    label: 'GitHub',
    value: '@NickiMash17',
    href: 'https://github.com/NickiMash17',
    icon: GitHubIcon,
    bg: '#181717',
    key: 'github',
    action: 'link' as const,
  },
];

const openTo = [
  { icon: Briefcase, label: 'Full-Time Roles', detail: 'AI engineering, remote or EU relocation' },
  { icon: Users, label: 'Mentorship & Training', detail: 'Volunteer trainer at TechBridle Foundation' },
  { icon: GitBranch, label: 'Open Source', detail: 'Maintainer of EmpowaAI' },
];

export const Contact = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        <ScrollAnimation animation="cinematic">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-2 sm:mb-3 md:mb-4">
              Get In Touch
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg">
              Open to full-time AI engineering roles — reach me directly below
            </p>
          </div>
        </ScrollAnimation>

        {/* Connections + Resume */}
        <ScrollAnimation animation="scale" delay={50}>
          <div className="rounded-lg border border-border/60 divide-y divide-border/60 overflow-hidden bg-card/60 mb-4 sm:mb-6">
            <div className="grid sm:grid-cols-2 sm:divide-x divide-border/60">
              {connections.map(({ label, value, href, icon: Icon, bg, key }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExternalLink(href, key)}
                  className="group flex items-center justify-between gap-3 px-5 sm:px-6 py-4 hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: bg }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground">{label}</div>
                      <div className="text-xs text-muted-foreground truncate">{value}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 sm:divide-x divide-border/60">
              <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 bg-primary">
                    <Mail className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground">Email</div>
                    <div className="text-xs text-muted-foreground truncate">nene171408@gmail.com</div>
                  </div>
                </div>
                <a
                  href="mailto:nene171408@gmail.com"
                  onClick={() => trackExternalLink('mailto:nene171408@gmail.com', 'email')}
                  className="min-h-11 flex items-center px-3 rounded-md border border-primary/30 text-xs font-medium text-primary hover:bg-primary/10 transition-colors flex-shrink-0"
                >
                  Send
                </a>
              </div>
              <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#25D366' }}>
                    <WhatsAppIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground">WhatsApp</div>
                    <div className="text-xs text-muted-foreground truncate">+27 63 152 6795</div>
                  </div>
                </div>
                <a
                  href="https://wa.me/27631526795"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackExternalLink('https://wa.me/27631526795', 'whatsapp')}
                  className="min-h-11 flex items-center px-3 rounded-md border border-primary/30 text-xs font-medium text-primary hover:bg-primary/10 transition-colors flex-shrink-0"
                >
                  Chat
                </a>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 bg-secondary">
                  <Briefcase className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground">Resume</div>
                  <div className="text-xs text-muted-foreground truncate">Full CV — experience, projects, certifications</div>
                </div>
              </div>
              <CVPreviewModal
                trigger={
                  <button className="min-h-11 px-3 rounded-md border border-primary/30 text-xs font-medium text-primary hover:bg-primary/10 transition-colors flex items-center gap-1.5 flex-shrink-0">
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </button>
                }
              />
            </div>
          </div>
        </ScrollAnimation>

        {/* What I'm open to */}
        <ScrollAnimation animation="fade-up" delay={150}>
          <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
            {openTo.map(({ icon: Icon, label, detail }) => (
              <div
                key={label}
                className="flex items-start gap-3 px-4 py-4 rounded-lg border-l-2 border-primary/50 bg-card/60"
              >
                <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground">{label}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};
