import { useEffect, useState } from 'react';
import { GitCommitHorizontal } from 'lucide-react';

const GITHUB_USER = 'NickiMash17';

const formatAgo = (iso: string) => {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export const LiveStatusBar = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [lastActivity, setLastActivity] = useState<{ repo: string; createdAt: string } | null>(null);
  const [, forceTick] = useState(0);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-ZA', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      timeZone: 'Africa/Johannesburg',
    });
    const dateFormatter = new Intl.DateTimeFormat('en-ZA', {
      weekday: 'short', day: '2-digit', month: 'short',
      timeZone: 'Africa/Johannesburg',
    });

    const tick = () => {
      const now = new Date();
      setTime(`${formatter.format(now)} SAST`);
      setDate(dateFormatter.format(now));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=1`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((events) => {
        const latest = events?.[0];
        if (latest?.created_at) {
          setLastActivity({ repo: latest.repo?.name ?? GITHUB_USER, createdAt: latest.created_at });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => forceTick((n) => n + 1), 60000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="hidden sm:flex items-center justify-between px-4 sm:px-6 h-7 text-[11px] text-muted-foreground border-b border-border/60 bg-background/95 tabular-nums">
      <div className="flex items-center gap-2">
        <span>{date}</span>
        <span className="text-border">|</span>
        <span>{time}</span>
      </div>
      {lastActivity && (
        <a
          href={`https://github.com/${lastActivity.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-primary transition-colors"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-full w-full rounded-full bg-primary" />
          </span>
          <GitCommitHorizontal className="w-3 h-3" />
          <span>Last commit &middot; {lastActivity.repo} &middot; {formatAgo(lastActivity.createdAt)}</span>
        </a>
      )}
    </div>
  );
};
