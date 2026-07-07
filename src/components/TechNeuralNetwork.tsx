import { useEffect, useRef } from 'react';
import { hslStringToRgb } from '@/lib/utils';
import type { TechStackItem, Tier } from './Skills';

interface TechNeuralNetworkProps {
  techStack: TechStackItem[];
  className?: string;
}

interface TechNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  colorIndex: number;
  image: HTMLImageElement;
}

interface Edge {
  a: number;
  b: number;
  colorIndex: number;
  pulseOffset: number;
  pulseSpeed: number;
}

const TIER_RADIUS: Record<Tier, number> = { Expert: 24, Proficient: 20, Familiar: 16 };
const TIER_COLOR_INDEX: Record<Tier, number> = { Expert: 2, Proficient: 0, Familiar: 1 };

/**
 * Tech stack shown as a neural-network / knowledge graph — each logo is a
 * node, wired to its nearest neighbors, with light pulses traveling along
 * the connections. Plain canvas 2D, the same technique proven to render
 * reliably elsewhere in this app (Hero's NeuralNetworkCanvas, ParticleNetwork).
 * No text baked into the canvas — names/tiers stay in the real DOM list
 * rendered underneath.
 */
export const TechNeuralNetwork = ({ techStack, className = '' }: TechNeuralNetworkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const css = getComputedStyle(document.documentElement);
    const colors = ['--primary', '--secondary', '--accent'].map((name) => {
      const { r, g, b } = hslStringToRgb(css.getPropertyValue(name));
      return `${r}, ${g}, ${b}`;
    });

    const w = () => canvas.clientWidth;
    const h = () => canvas.clientHeight;

    // Grid-with-jitter layout — organic scatter without heavy overlap
    const cols = techStack.length <= 8 ? 4 : 4;
    const rows = Math.ceil(techStack.length / cols);
    const nodes: TechNode[] = techStack.map((tech, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cellW = w() / cols;
      const cellH = h() / rows;
      const jitterX = (Math.random() - 0.5) * cellW * 0.35;
      const jitterY = (Math.random() - 0.5) * cellH * 0.35;

      const img = new Image();
      img.src = tech.logo;

      return {
        x: cellW * (col + 0.5) + jitterX,
        y: cellH * (row + 0.5) + jitterY,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        radius: TIER_RADIUS[tech.tier],
        colorIndex: TIER_COLOR_INDEX[tech.tier],
        image: img,
      };
    });

    // Connect each node to its 2 nearest neighbors (deduped)
    const edgeKeys = new Set<string>();
    const edges: Edge[] = [];
    nodes.forEach((node, i) => {
      const distances = nodes
        .map((other, j) => ({ j, d: (other.x - node.x) ** 2 + (other.y - node.y) ** 2 }))
        .filter((entry) => entry.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);

      distances.forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (edgeKeys.has(key)) return;
        edgeKeys.add(key);
        edges.push({
          a: i,
          b: j,
          colorIndex: node.colorIndex,
          pulseOffset: Math.random(),
          pulseSpeed: 0.12 + Math.random() * 0.15,
        });
      });
    });

    let raf = 0;
    let lastFrame = 0;
    const targetFrameTime = 1000 / 36;

    const draw = (t: number) => {
      if (document.hidden) {
        raf = requestAnimationFrame(draw);
        return;
      }
      if (t - lastFrame < targetFrameTime) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastFrame = t;

      const width = w();
      const height = h();
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        nodes.forEach((node) => {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < node.radius || node.x > width - node.radius) node.vx *= -1;
          if (node.y < node.radius || node.y > height - node.radius) node.vy *= -1;
        });
      }

      const time = t / 1000;

      // Edges + traveling pulses
      edges.forEach((edge) => {
        const a = nodes[edge.a];
        const b = nodes[edge.b];
        const color = colors[edge.colorIndex];

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${color}, 0.2)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (!prefersReducedMotion) {
          const progress = (time * edge.pulseSpeed + edge.pulseOffset) % 1;
          const px = a.x + (b.x - a.x) * progress;
          const py = a.y + (b.y - a.y) * progress;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, 0.9)`;
          ctx.fill();
        }
      });

      // Nodes — glow + light backdrop chip + logo
      nodes.forEach((node) => {
        const color = colors[node.colorIndex];
        const pulse = prefersReducedMotion ? 1 : 0.9 + Math.sin(time * 1.4 + node.x) * 0.1;

        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 2.4 * pulse);
        glow.addColorStop(0, `rgba(${color}, 0.35)`);
        glow.addColorStop(1, `rgba(${color}, 0)`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.4 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Light backdrop so logos with dark strokes stay legible on a dark canvas
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(248, 250, 252, 0.95)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${color}, 0.6)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (node.image.complete && node.image.naturalWidth > 0) {
          const logoSize = node.radius * pulse * 1.15;
          ctx.drawImage(node.image, node.x - logoSize / 2, node.y - logoSize / 2, logoSize, logoSize);
        }
      });

      if (!prefersReducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    };

    if (prefersReducedMotion) {
      // Draw once immediately, then once more shortly after in case logo
      // images are still loading (drawImage on an incomplete image is a no-op).
      draw(0);
      const settleTimer = window.setTimeout(() => draw(0), 300);
      return () => {
        window.removeEventListener('resize', resize);
        window.clearTimeout(settleTimer);
      };
    }

    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, [techStack]);

  return <canvas ref={canvasRef} className={`w-full ${className}`} aria-hidden="true" />;
};
