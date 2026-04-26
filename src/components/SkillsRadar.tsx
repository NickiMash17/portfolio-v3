import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { skill: 'Frontend',   level: 92 },
  { skill: 'Backend',    level: 80 },
  { skill: 'Cloud',      level: 85 },
  { skill: 'AI / ML',    level: 75 },
  { skill: 'Database',   level: 78 },
  { skill: 'Architecture', level: 70 },
];

export const SkillsRadar = () => (
  <div className="rounded-2xl border border-sonar/30 bg-hull/60 p-6 backdrop-blur">
    <header className="mb-4 flex items-center justify-between font-mono text-xs text-sonar">
      <span>// TACTICAL LOADOUT</span>
      <span className="animate-flicker">● LIVE</span>
    </header>
    <ResponsiveContainer width="100%" height={360}>
      <RadarChart data={data}>
        <PolarGrid stroke="hsl(174 100% 50% / 0.25)" />
        <PolarAngleAxis
          dataKey="skill"
          tick={{ fill: 'hsl(174 100% 70%)', fontFamily: 'JetBrains Mono', fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fill: 'hsl(174 100% 70% / 0.5)', fontSize: 10 }}
          stroke="hsl(174 100% 50% / 0.2)"
        />
        <Radar
          dataKey="level"
          stroke="hsl(174 100% 50%)"
          fill="hsl(174 100% 50%)"
          fillOpacity={0.35}
        />
      </RadarChart>
    </ResponsiveContainer>
  </div>
);
