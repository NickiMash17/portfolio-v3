import { cn } from '@/lib/utils';

interface SectionDividerProps {
  className?: string;
  variant?: 'default' | 'gradient' | 'dots';
}

export const SectionDivider = ({ className, variant = 'default' }: SectionDividerProps) => {
  if (variant === 'dots') {
    return (
      <div className={cn('flex justify-center py-8 sm:py-12', className)}>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/30 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div className={cn('py-8 sm:py-12', className)}>
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    );
  }

  return (
    <div className={cn('py-8 sm:py-12', className)}>
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
};
