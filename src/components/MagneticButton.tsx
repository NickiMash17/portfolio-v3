import { useRef, useState, type ReactNode, type MouseEvent } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

const canUseMagnetism = () =>
  typeof window !== 'undefined' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
  !window.matchMedia('(pointer: coarse)').matches;

export const MagneticButton = ({
  children,
  className = '',
  strength = 0.35,
  radius = 60,
}: MagneticButtonProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const enabledRef = useRef<boolean | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (enabledRef.current === null) {
      enabledRef.current = canUseMagnetism();
    }
    if (!enabledRef.current || !wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const pull = Math.max(0, 1 - distance / (rect.width / 2 + radius));

    setOffset({ x: dx * strength * pull, y: dy * strength * pull });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={wrapperRef}
      className={`inline-flex transition-transform duration-300 ease-out ${className}`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};
