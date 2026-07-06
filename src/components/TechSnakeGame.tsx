import { useEffect, useRef, useState, useCallback } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import type { TechStackItem } from './Skills';

interface TechSnakeGameProps {
  techStack: TechStackItem[];
}

interface Cell {
  x: number;
  y: number;
}

const GRID_SIZE = 14;
const TICK_MS = 170;

const shuffledIndices = (length: number) => {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const opposite = (a: Cell, b: Cell) => a.x === -b.x && a.y === -b.y;

type GameState = 'idle' | 'playing' | 'won' | 'gameover';

export const TechSnakeGame = ({ techStack }: TechSnakeGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesReady, setImagesReady] = useState(false);

  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [caption, setCaption] = useState<{ name: string; tier: string } | null>(null);

  const snakeRef = useRef<Cell[]>([{ x: 6, y: 7 }, { x: 5, y: 7 }, { x: 4, y: 7 }]);
  const directionRef = useRef<Cell>({ x: 1, y: 0 });
  const nextDirectionRef = useRef<Cell>({ x: 1, y: 0 });
  const orderRef = useRef<number[]>(shuffledIndices(techStack.length));
  const foodOrderPosRef = useRef(0);
  const foodCellRef = useRef<Cell>({ x: 10, y: 7 });
  const captionTimerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Preload tech logo images once
  useEffect(() => {
    let loaded = 0;
    const imgs = techStack.map((tech) => {
      const img = new Image();
      img.onload = () => {
        loaded += 1;
        if (loaded === techStack.length) setImagesReady(true);
      };
      img.src = tech.logo;
      return img;
    });
    imagesRef.current = imgs;
  }, [techStack]);

  const placeFood = useCallback(() => {
    const techIndex = orderRef.current[foodOrderPosRef.current % orderRef.current.length];
    let cell: Cell;
    do {
      cell = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
    } while (snakeRef.current.some((s) => s.x === cell.x && s.y === cell.y));
    foodCellRef.current = cell;
    return techIndex;
  }, []);

  const currentFoodTechIndexRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.clientWidth;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== size * dpr) {
      canvas.width = size * dpr;
      canvas.height = size * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cellSize = size / GRID_SIZE;

    const css = getComputedStyle(document.documentElement);
    const primary = `hsl(${css.getPropertyValue('--primary').trim()})`;
    const secondary = `hsl(${css.getPropertyValue('--secondary').trim()})`;
    const border = `hsl(${css.getPropertyValue('--border').trim()} / 0.4)`;

    ctx.clearRect(0, 0, size, size);

    // Grid
    ctx.strokeStyle = border;
    ctx.lineWidth = 1;
    for (let i = 1; i < GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(size, i * cellSize);
      ctx.stroke();
    }

    // Food (tech logo)
    const foodImg = imagesRef.current[currentFoodTechIndexRef.current];
    const fx = foodCellRef.current.x * cellSize;
    const fy = foodCellRef.current.y * cellSize;
    ctx.save();
    ctx.beginPath();
    ctx.arc(fx + cellSize / 2, fy + cellSize / 2, cellSize * 0.55, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${css.getPropertyValue('--accent').trim()} / 0.18)`;
    ctx.fill();
    ctx.restore();
    if (foodImg && foodImg.complete && foodImg.naturalWidth > 0) {
      const pad = cellSize * 0.18;
      ctx.drawImage(foodImg, fx + pad, fy + pad, cellSize - pad * 2, cellSize - pad * 2);
    }

    // Snake
    snakeRef.current.forEach((segment, i) => {
      const isHead = i === 0;
      const x = segment.x * cellSize;
      const y = segment.y * cellSize;
      const inset = isHead ? 1 : 2;
      ctx.fillStyle = isHead ? primary : secondary;
      ctx.globalAlpha = isHead ? 1 : 0.85 - Math.min(i * 0.02, 0.35);
      const radius = cellSize * 0.28;
      const w = cellSize - inset * 2;
      const h = cellSize - inset * 2;
      ctx.beginPath();
      ctx.roundRect(x + inset, y + inset, w, h, radius);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  }, []);

  const endGame = useCallback((won: boolean) => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setGameState(won ? 'won' : 'gameover');
  }, []);

  const tick = useCallback(() => {
    directionRef.current = nextDirectionRef.current;
    const head = snakeRef.current[0];
    const newHead: Cell = { x: head.x + directionRef.current.x, y: head.y + directionRef.current.y };

    if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
      endGame(false);
      return;
    }
    if (snakeRef.current.some((s) => s.x === newHead.x && s.y === newHead.y)) {
      endGame(false);
      return;
    }

    const ateFood = newHead.x === foodCellRef.current.x && newHead.y === foodCellRef.current.y;
    snakeRef.current = [newHead, ...snakeRef.current];
    if (!ateFood) {
      snakeRef.current.pop();
    } else {
      const eaten = techStack[currentFoodTechIndexRef.current];
      setScore((s) => s + 1);
      setCaption({ name: eaten.name, tier: eaten.tier });
      if (captionTimerRef.current !== null) window.clearTimeout(captionTimerRef.current);
      captionTimerRef.current = window.setTimeout(() => setCaption(null), 1600);

      foodOrderPosRef.current += 1;
      if (foodOrderPosRef.current >= orderRef.current.length) {
        draw();
        endGame(true);
        return;
      }
      currentFoodTechIndexRef.current = placeFood();
    }

    draw();
  }, [draw, endGame, placeFood, techStack]);

  const startGame = useCallback(() => {
    snakeRef.current = [{ x: 6, y: 7 }, { x: 5, y: 7 }, { x: 4, y: 7 }];
    directionRef.current = { x: 1, y: 0 };
    nextDirectionRef.current = { x: 1, y: 0 };
    orderRef.current = shuffledIndices(techStack.length);
    foodOrderPosRef.current = 0;
    currentFoodTechIndexRef.current = placeFood();
    setScore(0);
    setCaption(null);
    setGameState('playing');
    draw();

    if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(tick, TICK_MS);
  }, [draw, placeFood, tick, techStack.length]);

  // Keyboard controls — only active while playing
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      let dir: Cell | null = null;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') dir = { x: 0, y: -1 };
      else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') dir = { x: 0, y: 1 };
      else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') dir = { x: -1, y: 0 };
      else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') dir = { x: 1, y: 0 };
      if (!dir) return;

      e.preventDefault();
      if (opposite(dir, directionRef.current)) return;
      nextDirectionRef.current = dir;
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Pause when tab hidden; cleanup on unmount
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      } else if (!document.hidden && gameState === 'playing' && intervalRef.current === null) {
        intervalRef.current = window.setInterval(tick, TICK_MS);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [gameState, tick]);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
      if (captionTimerRef.current !== null) window.clearTimeout(captionTimerRef.current);
    };
  }, []);

  // Redraw idle preview once images finish loading, and on resize
  useEffect(() => {
    draw();
    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [draw, imagesReady]);

  const setDPadDirection = (dir: Cell) => {
    if (gameState !== 'playing') return;
    if (opposite(dir, directionRef.current)) return;
    nextDirectionRef.current = dir;
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-xs font-mono text-muted-foreground">
          Score: <span className="text-primary font-semibold tabular-nums">{score}</span> / {techStack.length}
        </span>
        <span className="h-4 text-xs font-medium text-accent truncate max-w-[60%] text-right">
          {caption ? `${caption.name} — ${caption.tier}` : ''}
        </span>
      </div>

      <div className="relative aspect-square rounded-lg border border-border/60 bg-card/40 overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />

        {gameState !== 'playing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-sm">
            {gameState === 'won' && (
              <p className="text-sm font-semibold text-accent">You caught the whole stack!</p>
            )}
            {gameState === 'gameover' && (
              <p className="text-sm font-semibold text-foreground">Game over &mdash; score {score}</p>
            )}
            <button
              type="button"
              onClick={startGame}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all"
            >
              {gameState === 'idle' ? <Play className="w-4 h-4" /> : <RotateCcw className="w-4 h-4" />}
              {gameState === 'idle' ? 'Play' : 'Play again'}
            </button>
            {gameState === 'idle' && (
              <p className="text-[11px] text-muted-foreground">Arrow keys / WASD, or the pad below</p>
            )}
          </div>
        )}
      </div>

      {/* On-screen D-pad */}
      <div className="mt-4 grid grid-cols-3 gap-1.5 w-36 mx-auto">
        <span />
        <button
          type="button"
          aria-label="Move up"
          disabled={gameState !== 'playing'}
          onClick={() => setDPadDirection({ x: 0, y: -1 })}
          className="min-h-11 min-w-11 rounded-md border border-border/60 bg-card/60 text-foreground/70 hover:text-primary hover:border-primary/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          &uarr;
        </button>
        <span />
        <button
          type="button"
          aria-label="Move left"
          disabled={gameState !== 'playing'}
          onClick={() => setDPadDirection({ x: -1, y: 0 })}
          className="min-h-11 min-w-11 rounded-md border border-border/60 bg-card/60 text-foreground/70 hover:text-primary hover:border-primary/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          &larr;
        </button>
        <button
          type="button"
          aria-label="Move down"
          disabled={gameState !== 'playing'}
          onClick={() => setDPadDirection({ x: 0, y: 1 })}
          className="min-h-11 min-w-11 rounded-md border border-border/60 bg-card/60 text-foreground/70 hover:text-primary hover:border-primary/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          &darr;
        </button>
        <button
          type="button"
          aria-label="Move right"
          disabled={gameState !== 'playing'}
          onClick={() => setDPadDirection({ x: 1, y: 0 })}
          className="min-h-11 min-w-11 rounded-md border border-border/60 bg-card/60 text-foreground/70 hover:text-primary hover:border-primary/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};
