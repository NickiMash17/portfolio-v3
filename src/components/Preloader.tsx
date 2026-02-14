import { useState, useEffect } from 'react';
import { Code2, Sparkles } from 'lucide-react';

export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState(0);
  const [shouldShow] = useState(() => {
    if (typeof window === 'undefined') return false;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallViewport = window.innerWidth < 768;
    const hasSeenPreloader = sessionStorage.getItem('preloader-seen') === '1';
    return !(prefersReducedMotion || isSmallViewport || hasSeenPreloader);
  });
  const [isVisible, setIsVisible] = useState(shouldShow);

  const stages = [
    { text: 'Loading assets...', icon: '📦' },
    { text: 'Initializing components...', icon: '⚙️' },
    { text: 'Preparing experience...', icon: '✨' },
    { text: 'Ready!', icon: '🚀' },
  ];

  useEffect(() => {
    if (!shouldShow || typeof window === 'undefined') return;
    sessionStorage.setItem('preloader-seen', '1');
  }, [shouldShow]);

  useEffect(() => {
    if (!shouldShow) return;

    // Simulate loading progress with stages
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 4;
        
        // Update stage based on progress
        if (newProgress < 30) {
          setLoadingStage(0);
        } else if (newProgress < 60) {
          setLoadingStage(1);
        } else if (newProgress < 90) {
          setLoadingStage(2);
        } else {
          setLoadingStage(3);
        }

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsVisible(false), 220);
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
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-600 ${
        progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Animated gradient background with more depth */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/30 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Loader Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 max-w-md">
        {/* Logo/Name with enhanced typing effect */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Code2 className="w-8 h-8 md:w-10 md:h-10 text-primary animate-pulse-glow" />
            <h1 className="text-4xl md:text-6xl font-bold font-mono text-primary glow-text">
              {'> NM_'}
            </h1>
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-accent animate-pulse" />
          </div>
          <p className="text-base md:text-lg text-muted-foreground font-mono">
            [ Initializing Portfolio ]
          </p>
        </div>

        {/* Enhanced Loading spinner with multiple layers */}
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-primary/50 border-r-accent/50 rounded-full animate-spin" style={{ animationDuration: '2s' }} />
          
          {/* Middle ring */}
          <div className="absolute inset-2 border-2 border-transparent border-b-primary/30 border-l-accent/30 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
          
          {/* Inner pulsing core */}
          <div className="absolute inset-8 md:inset-10 flex items-center justify-center">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-primary to-accent rounded-full animate-pulse-glow shadow-lg shadow-primary/50" />
          </div>
          
          {/* Orbiting dots */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute inset-0 animate-spin"
              style={{ 
                animationDuration: `${3 + i * 0.5}s`,
                animationDelay: `${i * 0.2}s`
              }}
            >
              <div 
                className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 bg-accent rounded-full glow-primary shadow-lg shadow-accent/50"
                style={{
                  transform: `translateY(-${i * 2}px)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Enhanced Progress Bar */}
        <div className="w-full max-w-sm space-y-3">
          <div className="relative h-2 bg-muted/20 rounded-full overflow-hidden border border-primary/10">
            <div 
              className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-300 glow-primary relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm font-mono text-muted-foreground">
              {Math.round(progress)}%
            </span>
            <div className="flex items-center gap-2 text-xs md:text-sm font-mono text-accent">
              <span className="animate-pulse">{stages[loadingStage].icon}</span>
              <span>{stages[loadingStage].text}</span>
            </div>
          </div>
        </div>

        {/* Loading stages with smooth transitions */}
        <div className="text-xs md:text-sm font-mono text-muted-foreground space-y-2 text-center min-h-[60px] flex flex-col justify-center">
          <div 
            key={loadingStage}
            className="animate-fade-in"
          >
            <p className="flex items-center justify-center gap-2">
              <span className="text-primary">$</span>
              <span>{stages[loadingStage].text}</span>
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="flex items-center gap-4 opacity-50">
          <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
          <div className="w-1 h-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>
      </div>
    </div>
  );
};
