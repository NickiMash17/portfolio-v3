import { Github, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ScrollAnimation } from '@/components/ScrollAnimation';

const GITHUB_USER = 'NickiMash17';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface Stats {
  totalLastYear: number;
  publicRepos: number;
  followers: number;
  currentStreak: number;
}

const getLevelClass = (level: number) => {
  switch (level) {
    case 0: return 'bg-muted/30';
    case 1: return 'bg-primary/30';
    case 2: return 'bg-primary/55';
    case 3: return 'bg-primary/80';
    default: return 'bg-primary';
  }
};

const computeStreak = (days: ContributionDay[]) => {
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) streak++;
    else break;
  }
  return streak;
};

const groupByWeek = (days: ContributionDay[]) => {
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
};

export const GitHubActivity = () => {
  const [weeks, setWeeks] = useState<ContributionDay[][]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`).then((r) => {
        if (!r.ok) throw new Error('contributions fetch failed');
        return r.json();
      }),
      fetch(`https://api.github.com/users/${GITHUB_USER}`).then((r) => {
        if (!r.ok) throw new Error('profile fetch failed');
        return r.json();
      }),
    ])
      .then(([contribData, profileData]) => {
        if (cancelled) return;
        const days: ContributionDay[] = contribData.contributions ?? [];
        setWeeks(groupByWeek(days));
        setStats({
          totalLastYear: contribData.total?.lastYear ?? 0,
          publicRepos: profileData.public_repos ?? 0,
          followers: profileData.followers ?? 0,
          currentStreak: computeStreak(days),
        });
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => { cancelled = true; };
  }, []);

  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimation animation="cinematic">
          <div className="mb-12 sm:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-3 sm:mb-4">
              GitHub Activity
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">Live data from my real GitHub profile</p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="scale" delay={100}>
          <div className="glass rounded-md sm:rounded-lg p-4 sm:p-6 md:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Github className="text-primary" size={20} />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold">@{GITHUB_USER}</h3>
            </div>

            {status === 'error' && (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Couldn't load live GitHub data right now — see the real profile below.
              </p>
            )}

            {status !== 'error' && (
              <>
                <div className="overflow-x-auto -mx-2 sm:mx-0">
                  <div className="inline-flex gap-0.5 sm:gap-1 min-w-max px-2 sm:px-0">
                    {status === 'loading'
                      ? Array.from({ length: 52 }).map((_, w) => (
                          <div key={w} className="flex flex-col gap-0.5 sm:gap-1">
                            {Array.from({ length: 7 }).map((_, d) => (
                              <div key={d} className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-muted/20 animate-pulse" />
                            ))}
                          </div>
                        ))
                      : weeks.map((week, weekIndex) => (
                          <div key={weekIndex} className="flex flex-col gap-0.5 sm:gap-1">
                            {week.map((day) => (
                              <div
                                key={day.date}
                                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm ${getLevelClass(day.level)} hover:scale-125 transition-transform cursor-pointer`}
                                title={`${day.count} contributions on ${day.date}`}
                              />
                            ))}
                          </div>
                        ))}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6 text-[10px] sm:text-xs text-muted-foreground">
                  <span>Less</span>
                  <div className="flex gap-0.5 sm:gap-1">
                    {[0, 1, 2, 3, 4].map((level) => (
                      <div key={level} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm ${getLevelClass(level)}`} />
                    ))}
                  </div>
                  <span>More</span>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/60">
                  {[
                    { value: stats?.totalLastYear, label: 'Contributions (past year)' },
                    { value: stats?.publicRepos, label: 'Public Repositories' },
                    { value: stats?.followers, label: 'Followers' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-primary font-display mb-0.5 sm:mb-1 tabular-nums">
                        {status === 'loading' ? '—' : stat.value?.toLocaleString()}
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={200}>
          <div className="mt-8 sm:mt-12 text-center">
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base glass rounded-lg border border-primary/40 hover:bg-primary/10 transition-all group"
            >
              <Github size={18} />
              <span>View Full GitHub Profile</span>
              <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};
