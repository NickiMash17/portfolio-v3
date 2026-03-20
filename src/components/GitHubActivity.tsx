import { Github } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ScrollAnimation } from '@/components/ScrollAnimation';

export const GitHubActivity = () => {
  const [contributionData, setContributionData] = useState<{ count: number; level: number }[][]>([]);

  useEffect(() => {
    // Generate 52 weeks of contribution data (simulated)
    const weeks = 52;
    const data: { count: number; level: number }[][] = [];
    
    for (let week = 0; week < weeks; week++) {
      const weekData: { count: number; level: number }[] = [];
      for (let day = 0; day < 7; day++) {
        const count = Math.floor(Math.random() * 15);
        const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4;
        weekData.push({ count, level });
      }
      data.push(weekData);
    }
    setContributionData(data);
  }, []);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-muted/30';
      case 1:
        return 'bg-primary/30';
      case 2:
        return 'bg-primary/50';
      case 3:
        return 'bg-primary/70';
      case 4:
        return 'bg-primary';
      default:
        return 'bg-muted/30';
    }
  };

  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimation animation="fade-up">
          <div className="mb-12 sm:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 glow-text">
              <span className="text-primary font-mono">{'<'}</span>
              GitHub Contributions
              <span className="text-primary font-mono">{' />'}</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">Coding activity over the past year</p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="scale" delay={100}>
          <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:glow-primary transition-all duration-300">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Github className="text-primary" size={20} />
            <h3 className="text-base sm:text-lg md:text-xl font-semibold">@NickiMash17</h3>
          </div>

          {/* Contribution Graph */}
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <div className="inline-flex gap-0.5 sm:gap-1 min-w-max px-2 sm:px-0">
              {contributionData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-0.5 sm:gap-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm ${getLevelColor(day.level)} hover:scale-125 transition-all cursor-pointer hover:glow-primary`}
                      title={`${day.count} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6 text-[10px] sm:text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-0.5 sm:gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm ${getLevelColor(level)}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-primary/20">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-primary mb-0.5 sm:mb-1">1,962</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Total Contributions</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-primary mb-0.5 sm:mb-1">342</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Current Streak</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-primary mb-0.5 sm:mb-1">65</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Repositories</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-primary mb-0.5 sm:mb-1">156</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Stars Earned</div>
            </div>
          </div>
        </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={200}>
          <div className="mt-8 sm:mt-12 text-center">
          <a
            href="https://github.com/NickiMash17"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base glass rounded-lg border border-primary/50 hover:bg-primary/10 transition-all hover:glow-primary group"
          >
            <Github className="group-hover:rotate-12 transition-transform" size={18} />
            <span>View Full GitHub Profile</span>
          </a>
        </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};


