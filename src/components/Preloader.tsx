import { useState, useEffect, useMemo } from 'react';

const BOOT_LINES = [
  'Booting compliance pipeline…',
  'Syncing scheduling system…',
  'Waking executive agent…',
  'All systems nominal.',
];

const SESSION_KEY = 'preloader-shown';

const hasShownThisSession = () => {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    // Storage access can throw in some privacy modes — fail open and show it.
    return false;
  }
};

const markShownThisSession = () => {
  try {
    window.sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    // Nothing to do if storage isn't available — just won't persist the skip.
  }
};

export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [shouldShow] = useState(() => typeof window !== 'undefined' && !hasShownThisSession());
  const [isVisible, setIsVisible] = useState(shouldShow);
  const [entered, setEntered] = useState(false);

  const bootLine = useMemo(() => {
    if (progress >= 92) return BOOT_LINES[3];
    if (progress >= 62) return BOOT_LINES[2];
    if (progress >= 30) return BOOT_LINES[1];
    return BOOT_LINES[0];
  }, [progress]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!shouldShow) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 4;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsVisible(false), 500);
          markShownThisSession();
          return 100;
        }
        return newProgress;
      });
    }, 32);

    return () => clearInterval(progressInterval);
  }, [shouldShow]);

  if (!shouldShow || !isVisible) return null;

  const isDone = progress === 100;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-all duration-500 ease-out ${
        isDone ? 'opacity-0 scale-105 blur-sm pointer-events-none' : 'opacity-100 scale-100 blur-none'
      }`}
    >
      {/* Ambient gradient atmosphere */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-[480px] h-[480px] -translate-x-1/2 -translate-y-1/2 bg-primary/20 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/3 w-[480px] h-[480px] translate-x-1/2 translate-y-1/2 bg-secondary/20 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div
        className={`relative z-10 flex flex-col items-center gap-8 px-6 transition-all duration-700 ease-out ${
          entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        {/* Neural-node signature mark */}
        <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true" className="overflow-visible">
          <line x1="14" y1="14" x2="28" y2="28" stroke="hsl(var(--primary) / 0.45)" strokeWidth="1" className="line-draw" style={{ animationDelay: '0.1s' }} />
          <line x1="28" y1="28" x2="42" y2="16" stroke="hsl(var(--secondary) / 0.45)" strokeWidth="1" className="line-draw" style={{ animationDelay: '0.5s' }} />
          <line x1="28" y1="28" x2="18" y2="42" stroke="hsl(var(--accent) / 0.45)" strokeWidth="1" className="line-draw" style={{ animationDelay: '0.9s' }} />
          <circle cx="14" cy="14" r="3" className="fill-primary cube-twinkle" style={{ animationDelay: '0s' }} />
          <circle cx="28" cy="28" r="3.5" className="fill-secondary cube-twinkle" style={{ animationDelay: '0.4s' }} />
          <circle cx="42" cy="16" r="3" className="fill-accent cube-twinkle" style={{ animationDelay: '0.8s' }} />
          <circle cx="18" cy="42" r="2.5" className="fill-primary cube-twinkle" style={{ animationDelay: '1.2s' }} />
        </svg>

        <div className="text-center space-y-3">
          <h1 className="font-display font-semibold text-3xl md:text-5xl tracking-tight bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Nicolette Mashaba
          </h1>
          <p className="text-sm md:text-base text-muted-foreground tracking-[0.2em] uppercase">
            AI Engineer
          </p>
        </div>

        <div className="w-56 md:w-72 space-y-2">
          <div className="relative h-[3px] bg-muted/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] md:text-[11px] font-mono text-muted-foreground/80 truncate">
              {bootLine}
              <span className="terminal-cursor text-primary">_</span>
            </span>
            <span className="text-[11px] text-muted-foreground font-medium tabular-nums flex-shrink-0">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
