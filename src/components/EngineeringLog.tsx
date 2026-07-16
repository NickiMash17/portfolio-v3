const entries = [
  {
    date: 'Jun 2026',
    text: 'Diagnosed a UniqueViolation crash in the transcription pipeline: root cause was a plain INSERT racing on duplicate keys. Fixed with PostgreSQL upsert logic.',
  },
  {
    date: 'May 2026',
    text: 'Migrated the compliance pipeline off a Next.js heartbeat scheduler onto Azure Durable Function timer triggers: zero-downtime, more reliable retries.',
  },
  {
    date: 'May 2026',
    text: 'Designed structured JSON output for the GPT-4 compliance scorer: auditable violation flags instead of free-text summaries the team had to re-read by hand.',
  },
  {
    date: 'Apr 2026',
    text: 'Prototyped DSPy + LangChain for a multi-agent copywriting system: working modules for landing pages and email sequences.',
  },
];

export const EngineeringLog = () => (
  <aside className="rounded-lg border border-border/60 bg-card/60 shadow-premium p-6 sm:p-8">
    <header className="mb-6">
      <p className="eyebrow-label text-primary">Engineering Notes</p>
      <p className="text-sm text-muted-foreground mt-1">Recent decisions and fixes, straight from the changelog</p>
    </header>
    <ul className="space-y-5">
      {entries.map((e, i) => (
        <li key={`${e.date}-${i}`} className="relative pl-5">
          <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <div className="text-[11px] font-medium text-muted-foreground mb-1">{e.date}</div>
          <div className="text-sm text-foreground/85 leading-relaxed">{e.text}</div>
        </li>
      ))}
    </ul>
  </aside>
);
