import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

interface MatrixRainProps {
  onClose: () => void;
}

export const MatrixRain = ({ onClose }: MatrixRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [intensity, setIntensity] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Get theme colors from CSS variables
    const getThemeColor = () => {
      const root = document.documentElement;
      const isDark = root.classList.contains('dark');
      return {
        bg: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)',
        primary: isDark ? '#00d9ff' : '#3b82f6',
        accent: isDark ? '#00ff88' : '#06b6d4',
        text: isDark ? '#00ff41' : '#10b981',
      };
    };

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: Array<{ y: number; speed: number; opacity: number }> = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = {
        y: Math.random() * -100,
        speed: 0.5 + Math.random() * 2,
        opacity: Math.random(),
      };
    }

    let animationId: number;
    const draw = () => {
      const colors = getThemeColor();
      
      // Fade effect with theme-aware background
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw characters with varying opacity and colors
      ctx.font = `${fontSize}px 'Courier New', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drop.y * fontSize;

        // Gradient effect - brighter at top, dimmer at bottom
        const opacity = Math.max(0.1, 1 - (y / canvas.height));
        const charOpacity = drop.opacity * opacity * intensity;

        // Alternate between primary and accent colors
        const colorIndex = Math.floor(y / (fontSize * 3)) % 2;
        ctx.fillStyle = colorIndex === 0 
          ? colors.primary.replace(')', `, ${charOpacity})`).replace('rgb', 'rgba')
          : colors.accent.replace(')', `, ${charOpacity})`).replace('rgb', 'rgba');

        ctx.fillText(text, x, y);

        // Reset drop when it reaches bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drop.y = 0;
          drop.speed = 0.5 + Math.random() * 2;
          drop.opacity = Math.random();
        }
        drop.y += drop.speed;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [intensity]);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden glass border border-primary/20">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 glass border-b border-primary/20 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-mono text-foreground/80">Matrix Rain Effect</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg glass hover:bg-destructive/20 hover:border-destructive/50 border border-foreground/10 transition-all group"
          title="Exit (ESC)"
        >
          <X className="w-4 h-4 text-foreground/70 group-hover:text-destructive transition-colors" />
        </button>
      </div>

      {/* Canvas */}
      <div className="w-full h-full pt-12">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ imageRendering: 'crisp-edges' }}
        />
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-20 glass border-t border-primary/20 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span>Intensity:</span>
            <input
              type="range"
              min="0.3"
              max="1"
              step="0.1"
              value={intensity}
              onChange={(e) => setIntensity(parseFloat(e.target.value))}
              className="w-24 h-1 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <span className="text-primary">{Math.round(intensity * 100)}%</span>
          </div>
          <p className="text-xs font-mono text-muted-foreground">
            Press <kbd className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono">ESC</kbd> to exit
          </p>
        </div>
      </div>
    </div>
  );
};
