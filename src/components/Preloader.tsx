import { useState, useEffect } from 'react';

export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(progressInterval);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${
        progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Loader Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        {/* Logo/Name with typing effect */}
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 font-mono text-primary glow-text">
            {'> Nicolette Mashaba_'}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground font-mono">
            [ Initializing Portfolio ]
          </p>
        </div>

        {/* Loading spinner with orbiting dots */}
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          {/* Center core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-primary rounded-full animate-pulse-glow" />
          </div>
          
          {/* Orbiting dots */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute inset-0 animate-spin"
              style={{ 
                animationDuration: `${2 + i}s`,
                animationDelay: `${i * 0.3}s`
              }}
            >
              <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 bg-accent rounded-full glow-primary" />
            </div>
          ))}
          
          {/* Ring */}
          <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-pulse" />
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-80">
          <div className="h-1 bg-muted/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-300 glow-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-center">
            <span className="text-xs font-mono text-muted-foreground">{progress}%</span>
          </div>
        </div>

        {/* Loading stages */}
        <div className="text-xs md:text-sm font-mono text-muted-foreground space-y-1 text-center">
          {progress < 30 && <p className="animate-pulse">$ Loading assets...</p>}
          {progress >= 30 && progress < 60 && <p className="animate-pulse">$ Initializing components...</p>}
          {progress >= 60 && progress < 90 && <p className="animate-pulse">$ Preparing experience...</p>}
          {progress >= 90 && <p className="animate-pulse text-accent">$ Ready!</p>}
        </div>
      </div>
    </div>
  );
};
