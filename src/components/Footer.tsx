import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative py-8 sm:py-10 md:py-12 px-4 sm:px-6 border-t border-border/30">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <div className="text-muted-foreground font-mono text-xs sm:text-sm">
            <span className="text-primary">{'>'}</span> Nicolette Mashaba © 2026
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
            Built with <Heart className="text-primary w-3 h-3 sm:w-4 sm:h-4 animate-pulse" fill="currentColor" aria-hidden="true" /> and React
          </div>
          
          <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm">
            <a 
              href="https://github.com/NickiMash17" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/nicolette-mashaba" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-7 md:mt-8 text-center">
          <p className="text-[10px] sm:text-xs text-muted-foreground font-mono px-2">
            [ From Navigation Officer to AI Software Engineer - Charting a new course in technology ]
          </p>
        </div>
      </div>
    </footer>
  );
};
