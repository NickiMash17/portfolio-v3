import { Suspense, useMemo, useRef, Component, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, RoundedBox } from '@react-three/drei';
import type { LucideIcon } from 'lucide-react';
import * as THREE from 'three';
import { hslStringToRgb } from '@/lib/utils';

interface SystemItem {
  icon: LucideIcon;
  name: string;
  detail: string;
}

interface ProductionSystemsSceneProps {
  systems: SystemItem[];
}

class WebglErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const CARD_POSITIONS: [number, number, number][] = [
  [-1.4, 0.55, 0.1],
  [0, -0.1, 0.35],
  [1.4, -0.6, 0],
];

const SystemCard = ({
  item,
  position,
  color,
}: {
  item: SystemItem;
  position: [number, number, number];
  color: THREE.Color;
}) => {
  const Icon = item.icon;
  return (
    <Float speed={1.3} floatIntensity={0.7} rotationIntensity={0.35}>
      <group position={position}>
        <RoundedBox args={[2.5, 1, 0.12]} radius={0.12} smoothness={4}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.55}
            metalness={0.25}
            roughness={0.4}
            transparent
            opacity={0.32}
          />
        </RoundedBox>
        <Html center distanceFactor={6.2} style={{ pointerEvents: 'none', width: '220px' }}>
          <div className="flex items-start gap-2.5 text-left">
            <div className="p-1.5 rounded-md bg-primary/15 flex-shrink-0 mt-0.5">
              <Icon className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-foreground leading-snug">{item.name}</p>
              <p className="text-[9px] text-muted-foreground leading-relaxed mt-0.5">{item.detail}</p>
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
};

const PointerParallaxRig = ({ children }: { children: ReactNode }) => {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const { pointer } = state;
    group.current.rotation.y += (pointer.x * 0.22 - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (-pointer.y * 0.14 - group.current.rotation.x) * 0.04;
  });
  return <group ref={group}>{children}</group>;
};

const SceneContents = ({ systems }: { systems: SystemItem[] }) => {
  const colors = useMemo(() => {
    const css = getComputedStyle(document.documentElement);
    return ['--primary', '--secondary', '--accent'].map((name) => {
      const { r, g, b } = hslStringToRgb(css.getPropertyValue(name));
      return new THREE.Color(r / 255, g / 255, b / 255);
    });
  }, []);

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 3, 4]} intensity={0.6} />
      <PointerParallaxRig>
        {systems.map((item, i) => (
          <SystemCard
            key={item.name}
            item={item}
            position={CARD_POSITIONS[i] ?? [0, 0, 0]}
            color={colors[i % colors.length]}
          />
        ))}
      </PointerParallaxRig>
    </>
  );
};

export const ProductionSystemsScene = ({ systems }: ProductionSystemsSceneProps) => {
  return (
    <WebglErrorBoundary>
      <div className="relative h-56 sm:h-60 w-full">
        <Canvas
          className="absolute inset-0"
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [0, 0, 5], fov: 38 }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <SceneContents systems={systems} />
          </Suspense>
        </Canvas>
      </div>
    </WebglErrorBoundary>
  );
};
