import { useEffect, useRef } from 'react';
import { hslStringToRgb } from '@/lib/utils';

interface NeuralNetworkCanvasProps {
  hubCount?: number;
  nodeCount?: number;
  className?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isHub: boolean;
  colorIndex: number;
}

interface Edge {
  a: number;
  b: number;
  colorIndex: number;
  pulseOffset: number;
  pulseSpeed: number;
}

/**
 * Dense node-and-edge "neural network / knowledge graph" visualization:
 * many small nodes wired to a few larger hub nodes, with animated light
 * pulses traveling along the connections. Plain canvas 2D (same proven
 * technique as ParticleNetwork/AuroraBackground elsewhere in this app), not
 * WebGL (deliberately), since that's the technique that has reliably
 * rendered in this codebase.
 */
export const NeuralNetworkCanvas = ({ hubCount = 3, nodeCount = 34, className = '' }: NeuralNetworkCanvasProps) => {
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

    // Fewer nodes on narrow viewports: keeps the graph readable instead of
    // a dense tangle when squeezed into a phone-width panel, and cheaper to
    // animate on lower-powered devices.
    const isNarrow = window.innerWidth < 640;
    const effectiveNodeCount = isNarrow ? Math.round(nodeCount * 0.5) : nodeCount;

    // Hub nodes: evenly spaced anchors, one per production system
    const hubs: Node[] = Array.from({ length: hubCount }, (_, i) => ({
      x: w() * ((i + 1) / (hubCount + 1)),
      y: h() * (0.35 + (i % 2 === 0 ? -0.08 : 0.08)),
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.06,
      radius: 7,
      isHub: true,
      colorIndex: i % colors.length,
    }));

    // Minor nodes: scattered, drifting
    const minors: Node[] = Array.from({ length: effectiveNodeCount }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      radius: Math.random() * 1.4 + 1.2,
      isHub: false,
      colorIndex: Math.floor(Math.random() * colors.length),
    }));

    const nodes = [...hubs, ...minors];

    // Wire each minor node to its nearest hub, plus a few nearest-neighbor
    // links between minors so it reads as a mesh, not a strict tree.
    const edges: Edge[] = [];
    minors.forEach((minor, minorIdx) => {
      const nodeIdx = hubCount + minorIdx;
      let nearestHub = 0;
      let nearestDist = Infinity;
      hubs.forEach((hub, hubIdx) => {
        const d = (hub.x - minor.x) ** 2 + (hub.y - minor.y) ** 2;
        if (d < nearestDist) {
          nearestDist = d;
          nearestHub = hubIdx;
        }
      });
      edges.push({
        a: nearestHub,
        b: nodeIdx,
        colorIndex: hubs[nearestHub].colorIndex,
        pulseOffset: Math.random(),
        pulseSpeed: 0.15 + Math.random() * 0.2,
      });
    });

    // Sparse minor-to-minor links for mesh texture
    for (let i = 0; i < minors.length; i++) {
      for (let j = i + 1; j < minors.length; j++) {
        const dx = minors[i].x - minors[j].x;
        const dy = minors[i].y - minors[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < Math.min(w(), h()) * 0.16 && Math.random() < 0.12) {
          edges.push({
            a: hubCount + i,
            b: hubCount + j,
            colorIndex: minors[i].colorIndex,
            pulseOffset: Math.random(),
            pulseSpeed: 0.1 + Math.random() * 0.15,
          });
        }
      }
    }

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
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
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
        ctx.strokeStyle = `rgba(${color}, 0.16)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        if (!prefersReducedMotion) {
          const progress = (time * edge.pulseSpeed + edge.pulseOffset) % 1;
          const px = a.x + (b.x - a.x) * progress;
          const py = a.y + (b.y - a.y) * progress;
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, 0.9)`;
          ctx.fill();
        }
      });

      // Minor nodes
      minors.forEach((node) => {
        const color = colors[node.colorIndex];
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.75)`;
        ctx.fill();
      });

      // Hub nodes: bigger, glowing, gently pulsing
      hubs.forEach((hub) => {
        const color = colors[hub.colorIndex];
        const pulse = prefersReducedMotion ? 1 : 0.85 + Math.sin(time * 1.6 + hub.colorIndex) * 0.15;
        const glowRadius = hub.radius * 3.2 * pulse;

        const gradient = ctx.createRadialGradient(hub.x, hub.y, 0, hub.x, hub.y, glowRadius);
        gradient.addColorStop(0, `rgba(${color}, 0.5)`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(hub.x, hub.y, hub.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 1)`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, hub.radius * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      if (!prefersReducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    };

    if (prefersReducedMotion) {
      draw(0);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, [hubCount, nodeCount]);

  return <canvas ref={canvasRef} className={`w-full ${className}`} aria-hidden="true" />;
};
