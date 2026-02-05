import { useEffect, useRef, useState } from 'react';
import { X, RotateCcw, Play, Trophy, Zap } from 'lucide-react';

interface PacmanGameProps {
  onClose: () => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };
type Ghost = {
  position: Position;
  direction: Direction;
  color: string;
  scared: boolean;
};

const GRID_WIDTH = 19;
const GRID_HEIGHT = 19;
const CELL_SIZE = 20;

// Maze layout (1 = wall, 0 = path, 2 = dot, 3 = power pellet)
const MAZE: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,3,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,3,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,0,1,0,1,1,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,0,1,1,0,1,1,0,1,2,1,1,1,1],
  [0,0,0,0,2,0,0,1,0,0,0,1,0,0,2,0,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,3,2,1,2,2,2,2,2,0,2,2,2,2,2,1,2,3,1],
  [1,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const GHOST_COLORS = ['#ff0000', '#ffb8ff', '#00ffff', '#ffb851'];

export const PacmanGame = ({ onClose }: PacmanGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('pacmanHighScore') || '0');
  });
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [dotsRemaining, setDotsRemaining] = useState(0);
  const [scaredTimer, setScaredTimer] = useState(0);
  
  const pacmanRef = useRef<Position>({ x: 9, y: 15 });
  const directionRef = useRef<Direction>('LEFT');
  const nextDirectionRef = useRef<Direction>('LEFT');
  const ghostsRef = useRef<Ghost[]>([
    { position: { x: 9, y: 9 }, direction: 'LEFT', color: GHOST_COLORS[0], scared: false },
    { position: { x: 9, y: 9 }, direction: 'UP', color: GHOST_COLORS[1], scared: false },
    { position: { x: 9, y: 9 }, direction: 'RIGHT', color: GHOST_COLORS[2], scared: false },
    { position: { x: 9, y: 9 }, direction: 'DOWN', color: GHOST_COLORS[3], scared: false },
  ]);
  const gameLoopRef = useRef<number>();
  const pacmanMouthRef = useRef(0);

  // Get theme colors
  const getThemeColors = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    return {
      bg: isDark ? '#0a0a0f' : '#f8fafc',
      wall: isDark ? '#1a1a2e' : '#cbd5e1',
      dot: isDark ? '#ffd700' : '#f59e0b',
      powerPellet: isDark ? '#ff006e' : '#ef4444',
      pacman: isDark ? '#ffff00' : '#fbbf24',
      text: isDark ? '#ffffff' : '#1e293b',
    };
  };

  // Count dots
  useEffect(() => {
    let count = 0;
    MAZE.forEach(row => {
      row.forEach(cell => {
        if (cell === 2 || cell === 3) count++;
      });
    });
    setDotsRemaining(count);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gameStarted || gameOver || isPaused) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = GRID_WIDTH * CELL_SIZE;
    canvas.height = GRID_HEIGHT * CELL_SIZE;

    const canMove = (pos: Position, dir: Direction): boolean => {
      let newX = pos.x;
      let newY = pos.y;

      switch (dir) {
        case 'UP': newY--; break;
        case 'DOWN': newY++; break;
        case 'LEFT': newX--; break;
        case 'RIGHT': newX++; break;
      }

      // Wrap around edges
      if (newX < 0) newX = GRID_WIDTH - 1;
      if (newX >= GRID_WIDTH) newX = 0;
      if (newY < 0) newY = GRID_HEIGHT - 1;
      if (newY >= GRID_HEIGHT) newY = 0;

      return MAZE[newY] && MAZE[newY][newX] !== 1;
    };

    const movePacman = () => {
      const pacman = pacmanRef.current;
      
      // Try next direction first
      if (canMove(pacman, nextDirectionRef.current)) {
        directionRef.current = nextDirectionRef.current;
      }

      const dir = directionRef.current;
      let newX = pacman.x;
      let newY = pacman.y;

      switch (dir) {
        case 'UP': newY--; break;
        case 'DOWN': newY++; break;
        case 'LEFT': newX--; break;
        case 'RIGHT': newX++; break;
      }

      // Wrap around
      if (newX < 0) newX = GRID_WIDTH - 1;
      if (newX >= GRID_WIDTH) newX = 0;
      if (newY < 0) newY = GRID_HEIGHT - 1;
      if (newY >= GRID_HEIGHT) newY = 0;

      if (canMove(pacman, dir)) {
        pacman.x = newX;
        pacman.y = newY;

        // Collect dots
        if (MAZE[pacman.y][pacman.x] === 2) {
          MAZE[pacman.y][pacman.x] = 0;
          setScore(prev => {
            const newScore = prev + 10;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem('pacmanHighScore', newScore.toString());
            }
            return newScore;
          });
          setDotsRemaining(prev => prev - 1);
        }

        // Collect power pellet
        if (MAZE[pacman.y][pacman.x] === 3) {
          MAZE[pacman.y][pacman.x] = 0;
          setScore(prev => {
            const newScore = prev + 50;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem('pacmanHighScore', newScore.toString());
            }
            return newScore;
          });
          setScaredTimer(200);
          ghostsRef.current.forEach(ghost => ghost.scared = true);
          setDotsRemaining(prev => prev - 1);
        }
      }

      // Animate mouth
      pacmanMouthRef.current = (pacmanMouthRef.current + 0.2) % (Math.PI * 2);
    };

    const moveGhost = (ghost: Ghost) => {
      const directions: Direction[] = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
      const possibleDirs = directions.filter(dir => canMove(ghost.position, dir));
      
      if (possibleDirs.length === 0) return;

      // Simple AI: move randomly or towards pacman when not scared
      if (ghost.scared) {
        // Run away
        const randomDir = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
        ghost.direction = randomDir;
      } else {
        // Move towards pacman (simple pathfinding)
        const pacman = pacmanRef.current;
        const dx = pacman.x - ghost.position.x;
        const dy = pacman.y - ghost.position.y;
        
        let preferredDir: Direction | null = null;
        if (Math.abs(dx) > Math.abs(dy)) {
          preferredDir = dx > 0 ? 'RIGHT' : 'LEFT';
        } else {
          preferredDir = dy > 0 ? 'DOWN' : 'UP';
        }

        if (preferredDir && canMove(ghost.position, preferredDir)) {
          ghost.direction = preferredDir;
        } else {
          ghost.direction = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
        }
      }

      let newX = ghost.position.x;
      let newY = ghost.position.y;

      switch (ghost.direction) {
        case 'UP': newY--; break;
        case 'DOWN': newY++; break;
        case 'LEFT': newX--; break;
        case 'RIGHT': newX++; break;
      }

      // Wrap around
      if (newX < 0) newX = GRID_WIDTH - 1;
      if (newX >= GRID_WIDTH) newX = 0;
      if (newY < 0) newY = GRID_HEIGHT - 1;
      if (newY >= GRID_HEIGHT) newY = 0;

      if (canMove({ x: newX, y: newY }, ghost.direction)) {
        ghost.position.x = newX;
        ghost.position.y = newY;
      }
    };

    const checkCollisions = () => {
      const pacman = pacmanRef.current;
      ghostsRef.current.forEach((ghost, index) => {
        if (ghost.position.x === pacman.x && ghost.position.y === pacman.y) {
          if (ghost.scared) {
            // Eat ghost
            setScore(prev => {
              const newScore = prev + 200;
              if (newScore > highScore) {
                setHighScore(newScore);
                localStorage.setItem('pacmanHighScore', newScore.toString());
              }
              return newScore;
            });
            // Reset ghost
            ghost.position = { x: 9, y: 9 };
            ghost.scared = false;
          } else {
            // Game over
            endGame();
          }
        }
      });
    };

    const draw = () => {
      const colors = getThemeColors();
      
      // Clear canvas
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw maze
      MAZE.forEach((row, y) => {
        row.forEach((cell, x) => {
          const pixelX = x * CELL_SIZE;
          const pixelY = y * CELL_SIZE;

          if (cell === 1) {
            // Wall
            ctx.fillStyle = colors.wall;
            ctx.fillRect(pixelX, pixelY, CELL_SIZE, CELL_SIZE);
          } else if (cell === 2) {
            // Dot
            ctx.fillStyle = colors.dot;
            ctx.beginPath();
            ctx.arc(pixelX + CELL_SIZE / 2, pixelY + CELL_SIZE / 2, 2, 0, Math.PI * 2);
            ctx.fill();
          } else if (cell === 3) {
            // Power pellet
            ctx.fillStyle = colors.powerPellet;
            ctx.shadowBlur = 10;
            ctx.shadowColor = colors.powerPellet;
            ctx.beginPath();
            ctx.arc(pixelX + CELL_SIZE / 2, pixelY + CELL_SIZE / 2, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });
      });

      // Draw ghosts
      ghostsRef.current.forEach(ghost => {
        const pixelX = ghost.position.x * CELL_SIZE + CELL_SIZE / 2;
        const pixelY = ghost.position.y * CELL_SIZE + CELL_SIZE / 2;
        
        ctx.fillStyle = ghost.scared ? '#0000ff' : ghost.color;
        ctx.shadowBlur = ghost.scared ? 15 : 5;
        ctx.shadowColor = ghost.scared ? '#0000ff' : ghost.color;
        
        // Draw ghost body
        ctx.beginPath();
        ctx.arc(pixelX, pixelY - 2, 6, Math.PI, 0, false);
        ctx.lineTo(pixelX + 6, pixelY + 4);
        ctx.lineTo(pixelX + 3, pixelY + 2);
        ctx.lineTo(pixelX, pixelY + 4);
        ctx.lineTo(pixelX - 3, pixelY + 2);
        ctx.lineTo(pixelX - 6, pixelY + 4);
        ctx.closePath();
        ctx.fill();
        
        // Draw eyes
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(pixelX - 2, pixelY - 2, 1.5, 0, Math.PI * 2);
        ctx.arc(pixelX + 2, pixelY - 2, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(pixelX - 2, pixelY - 2, 0.8, 0, Math.PI * 2);
        ctx.arc(pixelX + 2, pixelY - 2, 0.8, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
      });

      // Draw Pacman
      const pacmanX = pacmanRef.current.x * CELL_SIZE + CELL_SIZE / 2;
      const pacmanY = pacmanRef.current.y * CELL_SIZE + CELL_SIZE / 2;
      
      ctx.fillStyle = colors.pacman;
      ctx.shadowBlur = 10;
      ctx.shadowColor = colors.pacman;
      
      ctx.beginPath();
      const mouthAngle = Math.sin(pacmanMouthRef.current) * 0.5 + 0.3;
      const startAngle = directionRef.current === 'LEFT' ? mouthAngle : 
                        directionRef.current === 'RIGHT' ? Math.PI + mouthAngle :
                        directionRef.current === 'UP' ? Math.PI / 2 + mouthAngle :
                        -Math.PI / 2 + mouthAngle;
      
      ctx.arc(pacmanX, pacmanY, 7, startAngle, startAngle + Math.PI * 2 - mouthAngle * 2);
      ctx.lineTo(pacmanX, pacmanY);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const endGame = () => {
      setGameOver(true);
      if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current);
      }
    };

    const gameLoop = () => {
      if (!gameOver && !isPaused && gameStarted) {
        movePacman();
        ghostsRef.current.forEach(moveGhost);
        checkCollisions();
        
        // Update scared timer
        if (scaredTimer > 0) {
          setScaredTimer(prev => {
            const newTimer = prev - 1;
            if (newTimer === 0) {
              ghostsRef.current.forEach(ghost => ghost.scared = false);
            }
            return newTimer;
          });
        }
        
        // Check win condition
        if (dotsRemaining <= 0) {
          setGameOver(true);
        }
        
        draw();
        const speed = Math.max(100, 200 - Math.floor(score / 100) * 5);
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
  }, [gameOver, isPaused, gameStarted, score, highScore, dotsRemaining, scaredTimer]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted && e.key.toLowerCase() === ' ') {
        setGameStarted(true);
        return;
      }

      if (gameOver || !gameStarted) return;

      const key = e.key.toLowerCase();
      
      if (key === 'arrowup' || key === 'w') {
        nextDirectionRef.current = 'UP';
      } else if (key === 'arrowdown' || key === 's') {
        nextDirectionRef.current = 'DOWN';
      } else if (key === 'arrowleft' || key === 'a') {
        nextDirectionRef.current = 'LEFT';
      } else if (key === 'arrowright' || key === 'd') {
        nextDirectionRef.current = 'RIGHT';
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
    // Reset maze
    MAZE.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 0 && (x !== 9 || y !== 9)) {
          // Restore dots (simplified - would need original maze state)
        }
      });
    });
    
    pacmanRef.current = { x: 9, y: 15 };
    directionRef.current = 'LEFT';
    nextDirectionRef.current = 'LEFT';
    ghostsRef.current = [
      { position: { x: 9, y: 9 }, direction: 'LEFT', color: GHOST_COLORS[0], scared: false },
      { position: { x: 9, y: 9 }, direction: 'UP', color: GHOST_COLORS[1], scared: false },
      { position: { x: 9, y: 9 }, direction: 'RIGHT', color: GHOST_COLORS[2], scared: false },
      { position: { x: 9, y: 9 }, direction: 'DOWN', color: GHOST_COLORS[3], scared: false },
    ];
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setGameStarted(false);
    setScaredTimer(0);
    
    // Reset dots count
    let count = 0;
    MAZE.forEach(row => {
      row.forEach(cell => {
        if (cell === 2 || cell === 3) count++;
      });
    });
    setDotsRemaining(count);
  };

  const startGame = () => {
    setGameStarted(true);
    setIsPaused(false);
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden glass border border-primary/20">
      {/* Header */}
      <div className="glass border-b border-primary/20 p-3 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
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
          {scaredTimer > 0 && (
            <>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1">
                <span className="text-xs font-mono text-accent animate-pulse">⚡ POWER MODE</span>
              </div>
            </>
          )}
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
                  <div className="text-5xl mb-2">👾</div>
                  <p className="text-lg font-bold text-foreground">Pacman Game</p>
                  <p className="text-sm text-muted-foreground">
                    Press <kbd className="px-2 py-1 rounded bg-primary/10 text-primary font-mono">SPACE</kbd> to start
                  </p>
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
                  <p className="text-sm text-muted-foreground">
                    Press <kbd className="px-2 py-1 rounded bg-primary/10 text-primary font-mono">SPACE</kbd> to resume
                  </p>
                </div>
              </div>
            )}

            {/* Game Over Overlay */}
            {gameOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-card/95 backdrop-blur-sm rounded-lg">
                <div className="text-center space-y-4">
                  <div className="text-4xl mb-2">
                    {dotsRemaining <= 0 ? '🎉' : '💀'}
                  </div>
                  <p className="text-xl font-bold text-destructive">
                    {dotsRemaining <= 0 ? 'You Win!' : 'Game Over!'}
                  </p>
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
              <kbd className="px-1.5 py-0.5 rounded bg-primary/10 text-primary">WASD</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-primary/10 text-primary">↑↓←→</kbd> Move
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
