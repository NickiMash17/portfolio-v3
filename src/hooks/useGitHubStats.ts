import { useEffect, useState } from 'react';

const GITHUB_USER = 'NickiMash17';

export interface GitHubStats {
  contributionsLastYear: number;
  publicRepos: number;
  followers: number;
}

// Module-level cache + in-flight promise so every consumer (About,
// GitHubActivity, anywhere else) shares one real fetch instead of each
// hardcoding its own guess at these numbers — that mismatch is exactly what
// produced the stale "2448 commits" claim this hook replaces.
let cachedStats: GitHubStats | null = null;
let inflight: Promise<GitHubStats> | null = null;

const fetchStats = async (): Promise<GitHubStats> => {
  const [contribRes, profileRes] = await Promise.all([
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`),
    fetch(`https://api.github.com/users/${GITHUB_USER}`),
  ]);
  if (!contribRes.ok || !profileRes.ok) throw new Error('GitHub fetch failed');

  const [contribData, profileData] = await Promise.all([contribRes.json(), profileRes.json()]);

  return {
    contributionsLastYear: contribData?.total?.lastYear ?? 0,
    publicRepos: profileData?.public_repos ?? 0,
    followers: profileData?.followers ?? 0,
  };
};

export const useGitHubStats = () => {
  const [stats, setStats] = useState<GitHubStats | null>(cachedStats);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(cachedStats ? 'ready' : 'loading');

  useEffect(() => {
    if (cachedStats) {
      setStats(cachedStats);
      setStatus('ready');
      return;
    }

    if (!inflight) {
      inflight = fetchStats();
    }

    let cancelled = false;
    inflight
      .then((data) => {
        cachedStats = data;
        if (!cancelled) {
          setStats(data);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, status };
};
