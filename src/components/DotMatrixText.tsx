import { useEffect, useRef } from 'react';
import { hslStringToRgb } from '@/lib/utils';

interface DotMatrixTextProps {
  text: string;
  className?: string;
  height?: number;
  dotGap?: number;
  reducedMotion?: boolean;
}

interface Dot {
  x: number;
  y: number;
  baseAlpha: number;
  r: number;
  g: number;
  b: number;
}

export const DotMatrixText = ({ text, className = '', height = 120, dotGap = 7, reducedMotion = false }: DotMatrixTextProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let raf = 0;
    let dots: Dot[] = [];
    let width = 0;

    const styles = getComputedStyle(document.documentElement);
    const primaryRgb = hslStringToRgb(styles.getPropertyValue('--primary'));
    const secondaryRgb = hslStringToRgb(styles.getPropertyValue('--secondary'));

    const build = () => {
      width = container.clientWidth;
      if (width === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Rasterize text offscreen to sample which dot cells are "on"
      const off = document.createElement('canvas');
      off.width = width;
      off.height = height;
      const offCtx = off.getContext('2d');
      if (!offCtx) return;

      let fontSize = height * 0.62;
      offCtx.fillStyle = '#fff';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';

      // Shrink the font until the text fits the available width: prevents
      // clipping when a fixed `height` prop yields glyphs wider than the
      // container on narrow (mobile) viewports.
      const maxTextWidth = width * 0.92;
      offCtx.font = `800 ${fontSize}px "Sora", system-ui, sans-serif`;
      while (offCtx.measureText(text).width > maxTextWidth && fontSize > 8) {
        fontSize *= 0.94;
        offCtx.font = `800 ${fontSize}px "Sora", system-ui, sans-serif`;
      }

      offCtx.fillText(text, width / 2, height / 2 + height * 0.04);

      const imageData = offCtx.getImageData(0, 0, width, height).data;
      const next: Dot[] = [];

      for (let y = 0; y < height; y += dotGap) {
        for (let x = 0; x < width; x += dotGap) {
          const idx = (Math.floor(y) * width + Math.floor(x)) * 4 + 3;
          const alpha = imageData[idx] ?? 0;
          if (alpha > 80) {
            const mix = x / width;
            next.push({
              x,
              y,
              baseAlpha: alpha / 255,
              r: Math.round(primaryRgb.r + (secondaryRgb.r - primaryRgb.r) * mix),
              g: Math.round(primaryRgb.g + (secondaryRgb.g - primaryRgb.g) * mix),
              b: Math.round(primaryRgb.b + (secondaryRgb.b - primaryRgb.b) * mix),
            });
          }
        }
      }
      dots = next;
    };

    const draw = (t: number) => {
      const ctx = canvas.getContext('2d');
      if (!ctx || width === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const sweep = reducedMotion ? -1 : ((t / 1800) % (width + 200)) - 100;

      for (const dot of dots) {
        const dist = Math.abs(dot.x - sweep);
        const boost = reducedMotion ? 0 : Math.max(0, 1 - dist / 140);
        const alpha = Math.min(1, dot.baseAlpha * (1 + boost * 0.3));
        const radius = 1.9 + boost * 1.1;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${dot.r},${dot.g},${dot.b},${alpha})`;
        ctx.shadowColor = `rgba(${dot.r},${dot.g},${dot.b},${0.55 + boost * 0.4})`;
        ctx.shadowBlur = 4 + boost * 6;
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      if (!reducedMotion) raf = window.requestAnimationFrame(draw);
    };

    build();
    if (!reducedMotion) {
      raf = window.requestAnimationFrame(draw);
    } else {
      draw(0);
    }

    const onResize = () => build();
    window.addEventListener('resize', onResize);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [text, height, dotGap, reducedMotion]);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="sr-only">{text}</span>
    </div>
  );
};

