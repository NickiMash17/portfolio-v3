import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({ 
  className, 
  variant = 'rectangular',
  width,
  height 
}: SkeletonProps) => {
  const baseStyles = 'animate-pulse bg-muted rounded';
  
  const variantStyles = {
    text: 'h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'w-full',
    card: 'w-full h-full',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      style={style}
      aria-label="Loading..."
      role="status"
    />
  );
};

// Pre-built skeleton components
export const SkeletonCard = () => (
  <div className="glass rounded-xl p-6 space-y-4">
    <Skeleton variant="rectangular" height={200} className="rounded-lg" />
    <div className="space-y-2">
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="40%" />
    </div>
    <div className="flex gap-2">
      <Skeleton variant="rectangular" width={60} height={24} className="rounded-full" />
      <Skeleton variant="rectangular" width={60} height={24} className="rounded-full" />
      <Skeleton variant="rectangular" width={60} height={24} className="rounded-full" />
    </div>
  </div>
);

export const SkeletonProjectCard = () => (
  <div className="glass rounded-xl overflow-hidden">
    <Skeleton variant="rectangular" height={180} />
    <div className="p-4 space-y-3">
      <Skeleton variant="text" width="70%" height={24} />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="90%" />
      <div className="flex gap-2 mt-4">
        <Skeleton variant="rectangular" width={80} height={20} className="rounded-full" />
        <Skeleton variant="rectangular" width={80} height={20} className="rounded-full" />
        <Skeleton variant="rectangular" width={80} height={20} className="rounded-full" />
      </div>
    </div>
  </div>
);

export const SkeletonTestimonial = () => (
  <div className="glass rounded-2xl p-8 space-y-4">
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" width={64} height={64} />
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="text" width="30%" height={16} />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="95%" />
      <Skeleton variant="text" width="85%" />
    </div>
  </div>
);

export const SkeletonSkillCard = () => (
  <div className="glass rounded-lg p-4 flex items-center gap-3">
    <Skeleton variant="rectangular" width={48} height={48} className="rounded-lg" />
    <div className="space-y-2 flex-1">
      <Skeleton variant="text" width="60%" height={18} />
      <Skeleton variant="text" width="40%" height={14} />
    </div>
  </div>
);
