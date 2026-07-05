import { useState, useEffect } from 'react';

export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [shouldShow] = useState(() => typeof window !== 'undefined');
  const [isVisible, setIsVisible] = useState(shouldShow);

  useEffect(() => {
    if (!shouldShow) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 4;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsVisible(false), 260);
          return 100;
        }
        return newProgress;
      });
    }, 32);

    return () => clearInterval(progressInterval);
  }, [shouldShow]);

  if (!shouldShow || !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-700 ${
        progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient gradient atmosphere */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-[480px] h-[480px] -translate-x-1/2 -translate-y-1/2 bg-primary/20 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/3 w-[480px] h-[480px] translate-x-1/2 translate-y-1/2 bg-secondary/20 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 px-6">
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
          <div className="flex justify-end">
            <span className="text-[11px] text-muted-foreground font-medium tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
