export const SonarBackground = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* radial gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(174_100%_50%/0.08),transparent_60%)]" />

      {/* sonar grid */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"
        width="800" height="800" viewBox="0 0 800 800"
      >
        <g fill="none" stroke="hsl(174 100% 50% / 0.4)" strokeWidth="1">
          <circle cx="400" cy="400" r="100" />
          <circle cx="400" cy="400" r="200" />
          <circle cx="400" cy="400" r="300" />
          <circle cx="400" cy="400" r="380" />
          <line x1="20" y1="400" x2="780" y2="400" />
          <line x1="400" y1="20" x2="400" y2="780" />
        </g>
      </svg>

      {/* rotating sweep */}
      <div className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 animate-sweep">
        <div
          className="h-full w-1/2 origin-right"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, hsl(174 100% 50% / 0.25) 30deg, transparent 60deg)',
            borderRadius: '100% 0 0 100%',
          }}
        />
      </div>

      {/* ping dots */}
      {[
        { top: '30%', left: '25%', delay: '0s' },
        { top: '60%', left: '70%', delay: '1s' },
        { top: '45%', left: '55%', delay: '2s' },
      ].map((p, i) => (
        <span
          key={i}
          className="absolute h-2 w-2 rounded-full bg-sonar"
          style={{ top: p.top, left: p.left }}
        >
          <span
            className="absolute inset-0 animate-sonar-ping rounded-full bg-sonar"
            style={{ animationDelay: p.delay }}
          />
        </span>
      ))}
    </div>
  );
};
