const entries = [
  { date: '2025-04-20', text: 'Shipping AIMS Hackathon prototype to v1.' },
  { date: '2025-04-12', text: 'Deep-diving on Azure Functions + RAG pipelines.' },
  { date: '2025-04-01', text: 'Open to mid-level Software Engineer roles (remote / Jhb).' },
];

export const CaptainsLog = () => (
  <aside className="rounded-xl border border-sonar/30 bg-hull/60 p-6 font-mono text-sm">
    <header className="mb-4 flex items-center justify-between text-xs uppercase tracking-widest text-sonar">
      <span>Captain's Log</span>
      <span className="opacity-60">stardate {new Date().toISOString().slice(0,10)}</span>
    </header>
    <ul className="space-y-3">
      {entries.map(e => (
        <li key={e.date} className="flex gap-3">
          <span className="text-sonar">›</span>
          <div>
            <div className="text-xs opacity-60">{e.date}</div>
            <div className="text-foreground">{e.text}</div>
          </div>
        </li>
      ))}
    </ul>
  </aside>
);
