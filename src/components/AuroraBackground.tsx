import { useEffect, useRef } from 'react';

export const AuroraBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Theme-aware colors from CSS variables (HSL)
    const css = getComputedStyle(document.documentElement);
    const hslVar = (name: string, alpha = 1) => {
      const v = css.getPropertyValue(name).trim(); // e.g. "221 83% 53%"
      return `hsl(${v} / ${alpha})`;
    };
    const isDark = document.documentElement.classList.contains('dark');

    const aPrimary = isDark ? 0.22 : 0.06;
    const aSecondary = isDark ? 0.19 : 0.05;
    const aAccent = isDark ? 0.16 : 0.045;

    let time = 0;
    const waves = [
      { color: hslVar('--primary', aPrimary), speed: 0.002, amplitude: isDark ? 80 : 60, frequency: 0.003 },
      { color: hslVar('--secondary', aSecondary), speed: 0.0015, amplitude: isDark ? 100 : 70, frequency: 0.002 },
      { color: hslVar('--accent', aAccent), speed: 0.0025, amplitude: isDark ? 60 : 45, frequency: 0.004 },
    ];

    const drawWave = (wave: (typeof waves)[number], offset: number) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x < canvas.width; x += 2) {
        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * wave.speed + offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 0.7) * (wave.amplitude * 0.5);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, wave.color);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    let animationId: number;
    let lastFrame = 0;
    const targetFrameTime = 1000 / 24;
    const animate = () => {
      if (document.hidden) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const now = performance.now();
      if (now - lastFrame < targetFrameTime) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastFrame = now;

      ctx.fillStyle = hslVar('--background', isDark ? 0.08 : 0.06);
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave, index) => {
        drawWave(wave, index * Math.PI * 0.5);
      });

      time += 1;
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
};


