import { useEffect, useRef, useState } from 'react';

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
  const [gameOver, setGameOver] = useState(false);
  const directionRef = useRef<Direction>('RIGHT');
  const snakeRef = useRef<Position[]>([{ x: 10, y: 10 }]);
  const foodRef = useRef<Position>({ x: 15, y: 15 });
  const gameLoopRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE;

    const generateFood = (): Position => {
      return {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    };

    const draw = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw food
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(
        foodRef.current.x * CELL_SIZE,
        foodRef.current.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );

      // Draw snake
      ctx.fillStyle = '#00ff41';
      snakeRef.current.forEach((segment, index) => {
        if (index === 0) {
          ctx.fillStyle = '#00ff88';
        } else {
          ctx.fillStyle = '#00ff41';
        }
        ctx.fillRect(
          segment.x * CELL_SIZE,
          segment.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
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
        setGameOver(true);
        return;
      }

      // Check self collision
      if (snakeRef.current.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return;
      }

      snakeRef.current.unshift(head);

      // Check food collision
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore(prev => prev + 10);
        foodRef.current = generateFood();
      } else {
        snakeRef.current.pop();
      }
    };

    const gameLoop = () => {
      if (!gameOver) {
        moveSnake();
        draw();
        gameLoopRef.current = setTimeout(gameLoop, 150);
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

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
      } else if (key === 'escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current);
      }
    };
  }, [gameOver, onClose]);

  const resetGame = () => {
    snakeRef.current = [{ x: 10, y: 10 }];
    directionRef.current = 'RIGHT';
    foodRef.current = { x: 15, y: 15 };
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="relative w-full bg-black rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-green-400 font-mono text-sm">
          Score: <span className="text-white">{score}</span>
        </div>
        <button
          onClick={onClose}
          className="px-2 py-1 bg-red-500/80 hover:bg-red-500 text-white text-xs rounded"
        >
          Exit (ESC)
        </button>
      </div>
      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="text-center">
            <p className="text-red-500 font-mono text-xl mb-2">Game Over!</p>
            <p className="text-white font-mono mb-4">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <canvas ref={canvasRef} className="border border-green-500/50" />
      </div>
      <p className="text-green-400/70 font-mono text-xs mt-2 text-center">
        Use Arrow Keys to play • ESC to exit
      </p>
    </div>
  );
};
