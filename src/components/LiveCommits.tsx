import { useEffect, useState } from 'react';

export const LiveCommits = ({ user = 'NickiMash17' }: { user?: string }) => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/search/commits?q=author:${user}`, {
      headers: { Accept: 'application/vnd.github.cloak-preview+json' },
    })
      .then(r => r.json())
      .then(d => setCount(d.total_count ?? null))
      .catch(() => setCount(null));
  }, [user]);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-sonar/40 bg-hull/60 px-4 py-1.5 font-mono text-sm">
      <span className="h-2 w-2 animate-pulse rounded-full bg-sonar" />
      <span className="text-sonar">
        {count?.toLocaleString() ?? '2,448'}
      </span>
      <span className="text-muted-foreground">commits · live</span>
    </div>
  );
};
