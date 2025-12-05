import { useState, useRef, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glareEnabled?: boolean;
  scale?: number;
}

export const TiltCard = ({
  children,
  className = '',
  tiltAmount = 10,
  glareEnabled = true,
  scale = 1.02,
}: TiltCardProps) => {
  const [transform, setTransform] = useState('');
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltAmount;
    const rotateY = ((x - centerX) / centerX) * tiltAmount;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTransform('');
  };

  return (
    <div
      ref={cardRef}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      style={{ transform: isHovering ? transform : '' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Glare effect */}
      {glareEnabled && isHovering && (
        <div
          className="absolute inset-0 pointer-events-none rounded-inherit overflow-hidden"
          style={{ borderRadius: 'inherit' }}
        >
          <div
            className="absolute w-full h-full"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            }}
          />
        </div>
      )}
      
      {/* Edge glow on hover */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none rounded-inherit"
          style={{
            borderRadius: 'inherit',
            boxShadow: `
              0 0 20px rgba(var(--primary-rgb, 0, 230, 230), 0.3),
              inset 0 0 20px rgba(var(--primary-rgb, 0, 230, 230), 0.05)
            `,
          }}
        />
      )}
    </div>
  );
};
