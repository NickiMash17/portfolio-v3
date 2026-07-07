import { useEffect, useRef } from 'react';
import { hslStringToRgb } from '@/lib/utils';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  twinkleOffset: number;
  r: number;
  g: number;
  b: number;
}

export const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Theme-aware colors, matching the AuroraBackground / DotMatrixText convention
    const css = getComputedStyle(document.documentElement);
    const isDark = document.documentElement.classList.contains('dark');
    const primaryRgb = hslStringToRgb(css.getPropertyValue('--primary'));
    const secondaryRgb = hslStringToRgb(css.getPropertyValue('--secondary'));

    const particleAlpha = isDark ? 1 : 0.75;
    const lineAlpha = isDark ? 0.36 : 0.22;

    const width = () => canvas.clientWidth;
    const height = () => canvas.clientHeight;

    const isNarrow = window.innerWidth < 768;
    const particleCount = isNarrow ? 34 : 64;
    const connectionDistance = isNarrow ? 110 : 150;
    particlesRef.current = Array.from({ length: particleCount }, () => {
      const mix = Math.random();
      return {
        x: Math.random() * width(),
        y: Math.random() * height(),
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.8 + 1.5,
        twinkleOffset: Math.random() * Math.PI * 2,
        r: Math.round(primaryRgb.r + (secondaryRgb.r - primaryRgb.r) * mix),
        g: Math.round(primaryRgb.g + (secondaryRgb.g - primaryRgb.g) * mix),
        b: Math.round(primaryRgb.b + (secondaryRgb.b - primaryRgb.b) * mix),
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    let lastFrame = 0;
    const targetFrameTime = 1000 / 30;

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

      const w = width();
      const h = height();
      ctx.clearRect(0, 0, w, h);

      const canvasRect = canvas.getBoundingClientRect();
      const localMouseX = mouseRef.current.x - canvasRect.left;
      const localMouseY = mouseRef.current.y - canvasRect.top;

      const particles = particlesRef.current;

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        const dx = localMouseX - particle.x;
        const dy = localMouseY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          particle.x -= dx * 0.006;
          particle.y -= dy * 0.006;
        }

        if (particle.x < 0 || particle.x > w) particle.vx *= -1;
        if (particle.y < 0 || particle.y > h) particle.vy *= -1;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const midR = Math.round((particles[i].r + particles[j].r) / 2);
            const midG = Math.round((particles[i].g + particles[j].g) / 2);
            const midB = Math.round((particles[i].b + particles[j].b) / 2);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${midR},${midG},${midB},${lineAlpha * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      particles.forEach((particle) => {
        const twinkle = 0.75 + 0.25 * Math.sin(now * 0.0012 + particle.twinkleOffset);
        const alpha = particleAlpha * twinkle;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${particle.r},${particle.g},${particle.b},${alpha})`;
        ctx.shadowColor = `rgba(${particle.r},${particle.g},${particle.b},${alpha * 0.7})`;
        ctx.shadowBlur = 4;
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 1 }}
      aria-hidden="true"
    />
  );
};
