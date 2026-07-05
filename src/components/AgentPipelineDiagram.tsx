const SKILL_COUNT = 8;

export const AgentPipelineDiagram = () => {
  const nodes = Array.from({ length: SKILL_COUNT }, (_, i) => {
    const angle = (i / SKILL_COUNT) * 2 * Math.PI - Math.PI / 2;
    const radius = 42;
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    return { x, y, delay: `${i * 0.5}s` };
  });

  return (
    <div className="relative w-full aspect-square max-w-[220px] mx-auto" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        {/* connecting lines */}
        {nodes.map((n, i) => (
          <line
            key={`line-${i}`}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="hsl(var(--primary) / 0.25)"
            strokeWidth="0.6"
          />
        ))}

        {/* orchestrator (thin harness) */}
        <circle cx="50" cy="50" r="9" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1" />
        <circle cx="50" cy="50" r="9" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" className="animate-pulse-glow" />

        {/* skill nodes (fat skills) */}
        {nodes.map((n, i) => (
          <circle
            key={`node-${i}`}
            cx={n.x}
            cy={n.y}
            r="4"
            fill="hsl(var(--secondary) / 0.25)"
            stroke="hsl(var(--secondary))"
            strokeWidth="0.8"
            className="animate-flicker"
            style={{ animationDelay: n.delay, animationDuration: `${SKILL_COUNT * 0.5}s` }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[8px] font-mono text-primary text-center leading-tight">
          orchestrator
        </span>
      </div>
    </div>
  );
};
