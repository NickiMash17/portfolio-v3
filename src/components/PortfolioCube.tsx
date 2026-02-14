import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Award, Briefcase, Code2, FolderOpen, Github, User } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface CubeFace {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: string[];
  gradient: string;
  glow: string;
}

const FACE_ROTATIONS = [
  { x: 0, y: 0 },      // front
  { x: 0, y: -90 },    // right
  { x: 0, y: -180 },   // back
  { x: 0, y: 90 },     // left
  { x: -90, y: 0 },    // top
  { x: 90, y: 0 },     // bottom
];

export const PortfolioCube = () => {
  const [faceIndex, setFaceIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [faceFlash, setFaceFlash] = useState(false);
  const cubeRef = useRef<HTMLDivElement>(null);

  const faces = useMemo<CubeFace[]>(
    () => [
      {
        icon: Code2,
        title: 'Skills',
        items: ['React', 'TypeScript', 'Node.js'],
        gradient: 'from-[#0D1B3F] via-[#123A8A] to-[#22D3EE]',
        glow: 'shadow-cyan-400/25',
      },
      {
        icon: Briefcase,
        title: 'Experience',
        items: ['TechBridle', 'Coast IT', 'Navy'],
        gradient: 'from-[#0A1633] via-[#0E2D6D] to-[#38BDF8]',
        glow: 'shadow-sky-400/25',
      },
      {
        icon: FolderOpen,
        title: 'Projects',
        items: ['AIMS', 'FitQuest', 'LoanLife'],
        gradient: 'from-[#0B1430] via-[#102A63] to-[#60A5FA]',
        glow: 'shadow-blue-400/25',
      },
      {
        icon: User,
        title: 'About',
        items: ['Software Engineer', 'AZ-204', 'Trainer'],
        gradient: 'from-[#0D1A3A] via-[#163E8C] to-[#22D3EE]',
        glow: 'shadow-cyan-300/25',
      },
      {
        icon: Github,
        title: 'GitHub',
        items: ['1,962 Commits', '#1 Female', '65 Repos'],
        gradient: 'from-[#0A132D] via-[#123479] to-[#38BDF8]',
        glow: 'shadow-sky-300/25',
      },
      {
        icon: Award,
        title: 'Wins',
        items: ['Hackathon', 'Certified', 'Top Performer'],
        gradient: 'from-[#0B1633] via-[#18479E] to-[#7DD3FC]',
        glow: 'shadow-blue-300/25',
      },
    ],
    []
  );

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none), (pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    setFaceFlash(true);
    const timer = window.setTimeout(() => setFaceFlash(false), 340);
    return () => window.clearTimeout(timer);
  }, [faceIndex]);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setFaceIndex((prev) => (prev + 1) % faces.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [faces.length, isPaused]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setFaceIndex((prev) => (prev - 1 + faces.length) % faces.length);
        trackEvent('cube_interaction', { action: 'rotate_left' });
      } else if (e.key === 'ArrowRight') {
        setFaceIndex((prev) => (prev + 1) % faces.length);
        trackEvent('cube_interaction', { action: 'rotate_right' });
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsSpinning(true);
        window.setTimeout(() => setIsSpinning(false), 700);
        trackEvent('cube_interaction', { action: 'spin' });
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [faces.length]);

  useEffect(() => {
    let startX = 0;

    const onStart = (e: TouchEvent) => {
      startX = e.touches[0]?.clientX ?? 0;
    };

    const onEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0]?.clientX ?? 0;
      const delta = startX - endX;
      if (Math.abs(delta) < 40) return;

      if (delta > 0) {
        setFaceIndex((prev) => (prev + 1) % faces.length);
      } else {
        setFaceIndex((prev) => (prev - 1 + faces.length) % faces.length);
      }
    };

    const cube = cubeRef.current;
    if (!cube) return;

    cube.addEventListener('touchstart', onStart, { passive: true });
    cube.addEventListener('touchend', onEnd, { passive: true });

    return () => {
      cube.removeEventListener('touchstart', onStart);
      cube.removeEventListener('touchend', onEnd);
    };
  }, [faces.length]);

  const view = FACE_ROTATIONS[faceIndex];
  const frontFace = faces[faceIndex];
  const tiltMax = isTouchDevice ? 3 : 7;
  const lightX = 50 + (tilt.y / tiltMax) * 14;
  const lightY = 36 - (tilt.x / tiltMax) * 12;
  const cubeRootStyle = { '--cube-size': 'clamp(176px, 58vw, 260px)' } as CSSProperties;
  const cubeDepth = 'calc(var(--cube-size) / 2 - 2px)';

  return (
    <div className="relative w-full max-w-xl flex flex-col items-center justify-center py-6" style={cubeRootStyle}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 w-[clamp(180px,62vw,300px)] h-[clamp(180px,62vw,300px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute left-1/2 top-1/2 w-[clamp(140px,48vw,240px)] h-[clamp(140px,48vw,240px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/60 cube-twinkle hidden sm:block"
            style={{
              left: `${20 + (i * 7)}%`,
              top: `${18 + ((i * 13) % 60)}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 perspective-1000">
        <div className="absolute inset-0 translate-y-10 bg-primary/20 blur-2xl rounded-full pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 w-[calc(var(--cube-size)_+_90px)] h-[calc(var(--cube-size)_+_90px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 cube-orbit pointer-events-none" />
        <div
          className={`absolute left-1/2 top-1/2 w-[calc(var(--cube-size)_+_130px)] h-[calc(var(--cube-size)_+_130px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35 pointer-events-none transition-all duration-300 ${
            faceFlash ? 'opacity-85 scale-100' : 'opacity-0 scale-90'
          }`}
        />
        <div className={faceFlash ? 'cube-impact' : ''}>
          <div
            ref={cubeRef}
            className={`relative transition-transform duration-700 ${isSpinning ? 'animate-spin' : ''}`}
            style={{
              width: 'var(--cube-size)',
              height: 'var(--cube-size)',
              transformStyle: 'preserve-3d',
              transform: `rotateX(${view.x + tilt.x}deg) rotateY(${view.y + tilt.y}deg)`,
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseMove={(e) => {
              if (isTouchDevice) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const px = (e.clientX - rect.left) / rect.width;
              const py = (e.clientY - rect.top) / rect.height;
              setTilt({
                x: (0.5 - py) * tiltMax,
                y: (px - 0.5) * tiltMax,
              });
            }}
            onMouseLeave={() => {
              setIsPaused(false);
              setTilt({ x: 0, y: 0 });
            }}
          >
          <div
            className={`absolute inset-0 rounded-2xl border border-white/35 shadow-2xl ${faces[0].glow} overflow-hidden transition-all duration-500 ${faceIndex === 0 ? 'brightness-110 saturate-125' : ''}`}
            style={{ transform: `rotateY(0deg) translateZ(${cubeDepth})`, backfaceVisibility: 'hidden' }}
          >
            <FaceContent face={faces[0]} isActive={faceIndex === 0} flash={faceFlash && faceIndex === 0} />
          </div>
          <div
            className={`absolute inset-0 rounded-2xl border border-white/35 shadow-2xl ${faces[1].glow} overflow-hidden transition-all duration-500 ${faceIndex === 1 ? 'brightness-110 saturate-125' : ''}`}
            style={{ transform: `rotateY(90deg) translateZ(${cubeDepth})`, backfaceVisibility: 'hidden' }}
          >
            <FaceContent face={faces[1]} isActive={faceIndex === 1} flash={faceFlash && faceIndex === 1} />
          </div>
          <div
            className={`absolute inset-0 rounded-2xl border border-white/35 shadow-2xl ${faces[2].glow} overflow-hidden transition-all duration-500 ${faceIndex === 2 ? 'brightness-110 saturate-125' : ''}`}
            style={{ transform: `rotateY(180deg) translateZ(${cubeDepth})`, backfaceVisibility: 'hidden' }}
          >
            <FaceContent face={faces[2]} isActive={faceIndex === 2} flash={faceFlash && faceIndex === 2} />
          </div>
          <div
            className={`absolute inset-0 rounded-2xl border border-white/35 shadow-2xl ${faces[3].glow} overflow-hidden transition-all duration-500 ${faceIndex === 3 ? 'brightness-110 saturate-125' : ''}`}
            style={{ transform: `rotateY(-90deg) translateZ(${cubeDepth})`, backfaceVisibility: 'hidden' }}
          >
            <FaceContent face={faces[3]} isActive={faceIndex === 3} flash={faceFlash && faceIndex === 3} />
          </div>
          <div
            className={`absolute inset-0 rounded-2xl border border-white/35 shadow-2xl ${faces[4].glow} overflow-hidden transition-all duration-500 ${faceIndex === 4 ? 'brightness-110 saturate-125' : ''}`}
            style={{ transform: `rotateX(90deg) translateZ(${cubeDepth})`, backfaceVisibility: 'hidden' }}
          >
            <FaceContent face={faces[4]} isActive={faceIndex === 4} flash={faceFlash && faceIndex === 4} />
          </div>
          <div
            className={`absolute inset-0 rounded-2xl border border-white/35 shadow-2xl ${faces[5].glow} overflow-hidden transition-all duration-500 ${faceIndex === 5 ? 'brightness-110 saturate-125' : ''}`}
            style={{ transform: `rotateX(-90deg) translateZ(${cubeDepth})`, backfaceVisibility: 'hidden' }}
          >
            <FaceContent face={faces[5]} isActive={faceIndex === 5} flash={faceFlash && faceIndex === 5} />
          </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 transition-all duration-500">
          <div
            className={`absolute left-1/2 top-1/2 w-[calc(var(--cube-size)_+_110px)] h-[calc(var(--cube-size)_+_110px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-all duration-500 ${frontFace.glow} ${faceFlash ? 'opacity-85 scale-105' : 'opacity-55 scale-100'}`}
          />
          <div
            className="absolute left-1/2 top-1/2 w-[calc(var(--cube-size)_+_40px)] h-[calc(var(--cube-size)_+_40px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.34), rgba(255,255,255,0) 52%)`,
            }}
          />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 w-[calc(var(--cube-size)_+_14px)] h-[calc(var(--cube-size)_+_14px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/20 opacity-70 transition-all duration-500" />
      </div>

      <div className="mt-6 flex items-center gap-2">
        {faces.map((face, idx) => (
          <button
            key={face.title}
            onClick={() => setFaceIndex(idx)}
            className={`h-2.5 rounded-full transition-all ${
              idx === faceIndex ? 'w-8 bg-primary shadow-lg shadow-primary/40' : 'w-2.5 bg-primary/30 hover:bg-primary/50'
            }`}
            aria-label={`Show ${face.title}`}
          />
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground text-center">
        <span className="sm:hidden">Swipe and tap dots to rotate</span>
        <span className="hidden sm:inline">Swipe, tap dots, or use arrow keys to rotate</span>
      </p>
    </div>
  );
};

const FaceContent = ({ face, isActive, flash }: { face: CubeFace; isActive: boolean; flash: boolean }) => {
  const Icon = face.icon;

  return (
    <div
      className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${face.gradient} p-4 text-white flex flex-col items-center justify-center text-center transition-transform duration-500 ${isActive ? 'scale-[1.02]' : 'scale-100'}`}
      style={{ backfaceVisibility: 'hidden' }}
    >
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_45%)]" />
      <div
        className={`absolute inset-y-0 -left-1/3 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-12 transition-transform duration-500 ${flash ? 'translate-x-[320%] opacity-100' : 'translate-x-0 opacity-0'}`}
      />
      <div className="relative z-10">
        <Icon className="w-8 h-8 mb-2 mx-auto" />
        <h3 className="text-base font-bold">{face.title}</h3>
      </div>
      <div className="relative z-10 mt-2 space-y-1 text-xs">
        {face.items.map((item) => (
          <p key={item} className="leading-tight">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};
