import { useEffect, useRef, useState } from 'react';
import { X, RotateCcw, Play, Trophy } from 'lucide-react';

interface SnakeGameProps {
  onClose: () => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20;

export const SnakeGame = ({ onClose }: SnakeGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('snakeHighScore') || '0');
  });
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const directionRef = useRef<Direction>('RIGHT');
  const snakeRef = useRef<Position[]>([{ x: 10, y: 10 }]);
  const foodRef = useRef<Position>({ x: 15, y: 15 });
  const gameLoopRef = useRef<number>();

  // Get theme colors
  const getThemeColors = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    return {
      bg: isDark ? '#0a0a0f' : '#f8fafc',
      grid: isDark ? 'rgba(0, 217, 255, 0.1)' : 'rgba(59, 130, 246, 0.1)',
      snake: isDark ? '#00d9ff' : '#3b82f6',
      snakeHead: isDark ? '#00ff88' : '#06b6d4',
      food: isDark ? '#ff006e' : '#ef4444',
      border: isDark ? 'rgba(0, 217, 255, 0.3)' : 'rgba(59, 130, 246, 0.3)',
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gameStarted || gameOver || isPaused) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE;

    const generateFood = (): Position => {
      let newFood: Position;
      do {
        newFood = {
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        };
      } while (snakeRef.current.some(segment => segment.x === newFood.x && segment.y === newFood.y));
      return newFood;
    };

    const draw = () => {
      const colors = getThemeColors();
      
      // Clear canvas
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(canvas.width, i * CELL_SIZE);
        ctx.stroke();
      }

      // Draw food with glow effect
      const foodX = foodRef.current.x * CELL_SIZE;
      const foodY = foodRef.current.y * CELL_SIZE;
      
      // Glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = colors.food;
      ctx.fillStyle = colors.food;
      ctx.beginPath();
      ctx.arc(foodX + CELL_SIZE / 2, foodY + CELL_SIZE / 2, CELL_SIZE / 2 - 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw snake with gradient
      snakeRef.current.forEach((segment, index) => {
        const segX = segment.x * CELL_SIZE;
        const segY = segment.y * CELL_SIZE;
        
        if (index === 0) {
          // Head with glow
          ctx.shadowBlur = 8;
          ctx.shadowColor = colors.snakeHead;
          ctx.fillStyle = colors.snakeHead;
        } else {
          // Body with opacity gradient
          const opacity = Math.max(0.5, 1 - (index / snakeRef.current.length) * 0.3);
          ctx.fillStyle = colors.snake.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
        }
        
        ctx.fillRect(segX + 1, segY + 1, CELL_SIZE - 2, CELL_SIZE - 2);
        ctx.shadowBlur = 0;
      });
    };

    const moveSnake = () => {
      const head = { ...snakeRef.current[0] };
      const direction = directionRef.current;

      switch (direction) {
        case 'UP':
          head.y--;
          break;
        case 'DOWN':
          head.y++;
          break;
        case 'LEFT':
          head.x--;
          break;
        case 'RIGHT':
          head.x++;
          break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        endGame();
        return;
      }

      // Check self collision
      if (snakeRef.current.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
      }

      snakeRef.current.unshift(head);

      // Check food collision
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        const newScore = score + 10;
        setScore(newScore);
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem('snakeHighScore', newScore.toString());
        }
        foodRef.current = generateFood();
      } else {
        snakeRef.current.pop();
      }
    };

    const endGame = () => {
      setGameOver(true);
      if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current);
      }
    };

    const gameLoop = () => {
      if (!gameOver && !isPaused && gameStarted) {
        moveSnake();
        draw();
        const speed = Math.max(80, 150 - Math.floor(score / 50) * 5);
        gameLoopRef.current = setTimeout(gameLoop, speed);
      }
    };

    draw();
    gameLoop();

    return () => {
      if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current);
      }
    };
  }, [gameOver, isPaused, gameStarted, score, highScore]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted && e.key.toLowerCase() === ' ') {
        setGameStarted(true);
        return;
      }

      if (gameOver || !gameStarted) return;

      const key = e.key.toLowerCase();
      const currentDir = directionRef.current;

      if (key === 'arrowup' && currentDir !== 'DOWN') {
        directionRef.current = 'UP';
      } else if (key === 'arrowdown' && currentDir !== 'UP') {
        directionRef.current = 'DOWN';
      } else if (key === 'arrowleft' && currentDir !== 'RIGHT') {
        directionRef.current = 'LEFT';
      } else if (key === 'arrowright' && currentDir !== 'LEFT') {
        directionRef.current = 'RIGHT';
      } else if (key === ' ') {
        setIsPaused(prev => !prev);
      } else if (key === 'escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, gameStarted, onClose]);

  const resetGame = () => {
    snakeRef.current = [{ x: 10, y: 10 }];
    directionRef.current = 'RIGHT';
    foodRef.current = { x: 15, y: 15 };
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setGameStarted(false);
  };

  const startGame = () => {
    setGameStarted(true);
    setIsPaused(false);
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden glass border border-primary/20">
      {/* Header */}
      <div className="glass border-b border-primary/20 p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-accent" />
            <span className="text-sm font-mono text-foreground">
              Score: <span className="text-primary font-bold">{score}</span>
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono text-muted-foreground">
              Best: <span className="text-primary">{highScore}</span>
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg glass hover:bg-destructive/20 hover:border-destructive/50 border border-foreground/10 transition-all group"
          title="Exit (ESC)"
        >
          <X className="w-4 h-4 text-foreground/70 group-hover:text-destructive transition-colors" />
        </button>
      </div>

      {/* Game Canvas */}
      <div className="p-4 bg-card/30">
        <div className="flex justify-center">
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="rounded-lg border-2 border-primary/30 shadow-lg"
              style={{ 
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
              }}
            />
            
            {/* Start Screen */}
            {!gameStarted && (
              <div className="absolute inset-0 flex items-center justify-center bg-card/95 backdrop-blur-sm rounded-lg">
                <div className="text-center space-y-4">
                  <Play className="w-12 h-12 text-primary mx-auto animate-pulse" />
                  <p className="text-lg font-bold text-foreground">Snake Game</p>
                  <p className="text-sm text-muted-foreground">Press <kbd className="px-2 py-1 rounded bg-primary/10 text-primary font-mono">SPACE</kbd> to start</p>
                  <button
                    onClick={startGame}
                    className="px-4 py-2 glass border border-primary/30 hover:border-primary hover:bg-primary/10 rounded-lg text-sm font-medium text-foreground transition-all"
                  >
                    Start Game
                  </button>
                </div>
              </div>
            )}

            {/* Pause Overlay */}
            {isPaused && gameStarted && !gameOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm rounded-lg">
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground mb-2">Paused</p>
                  <p className="text-sm text-muted-foreground">Press <kbd className="px-2 py-1 rounded bg-primary/10 text-primary font-mono">SPACE</kbd> to resume</p>
                </div>
              </div>
            )}

            {/* Game Over Overlay */}
            {gameOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-card/95 backdrop-blur-sm rounded-lg">
                <div className="text-center space-y-4">
                  <div className="text-4xl mb-2">🐍</div>
                  <p className="text-xl font-bold text-destructive">Game Over!</p>
                  <p className="text-sm text-muted-foreground">
                    Final Score: <span className="text-primary font-bold">{score}</span>
                  </p>
                  {score === highScore && score > 0 && (
                    <p className="text-xs text-accent font-mono">🎉 New High Score!</p>
                  )}
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={resetGame}
                      className="px-4 py-2 glass border border-primary/30 hover:border-primary hover:bg-primary/10 rounded-lg text-sm font-medium text-foreground transition-all flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Play Again
                    </button>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 glass border border-foreground/10 hover:border-destructive/50 hover:bg-destructive/10 rounded-lg text-sm font-medium text-foreground transition-all"
                    >
                      Exit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls Footer */}
      <div className="glass border-t border-primary/20 p-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-primary/10 text-primary">↑↓←→</kbd> Move
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-primary/10 text-primary">SPACE</kbd> Pause
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-primary/10 text-primary">ESC</kbd> Exit
            </span>
          </div>
          {gameStarted && !gameOver && (
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-3 py-1 glass border border-primary/20 hover:border-primary/50 rounded text-xs font-mono text-foreground transition-all"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
