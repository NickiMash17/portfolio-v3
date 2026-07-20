import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

const parseValue = (value: string) => {
  const match = value.match(/^(\D*?)(\d+(?:\.\d+)?)(\D*)$/);
  if (!match) return null;
  const [, prefix, numberStr, suffix] = match;
  return { prefix, target: parseFloat(numberStr), suffix, decimals: numberStr.includes('.') ? numberStr.split('.')[1].length : 0 };
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const AnimatedCounter = ({ value, duration = 1400, className = '' }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [display, setDisplay] = useState(value);
  const [justCompleted, setJustCompleted] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const parsed = parseValue(value);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!parsed || prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    const { prefix, target, suffix, decimals } = parsed;
    const start = performance.now();

    let frameId: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = target * easeOutCubic(progress);
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
        setJustCompleted(true);
        window.setTimeout(() => setJustCompleted(false), 600);
      }
    };
    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [isVisible, value, duration]);

  return (
    <span
      ref={ref}
      className={`tabular-nums ${className} ${justCompleted ? 'animate-counter-flash' : ''}`}
    >
      {display}
    </span>
  );
};
