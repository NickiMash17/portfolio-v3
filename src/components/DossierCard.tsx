export const DossierCard = () => (
  <article className="relative max-w-2xl rounded-sm border border-brass/40 bg-[hsl(40_30%_92%)] p-8 text-[hsl(200_40%_10%)] shadow-2xl">
    {/* CLASSIFIED stamp */}
    <span className="absolute -right-4 top-6 rotate-12 rounded border-2 border-rust px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-rust">
      Classified
    </span>

    <header className="mb-6 border-b border-brass/40 pb-4 font-mono text-xs uppercase tracking-widest">
      <div>Personnel File: N. Mashaba</div>
      <div>Service No. SAN-2019-0047</div>
      <div>Status: Active Duty // Tech Transition</div>
    </header>

    <h3 className="mb-3 font-display text-2xl">Mission Briefing</h3>
    <p className="mb-4 leading-relaxed">
      Software Engineer Graduate transitioning from the South African Navy to
      technology. Naval discipline applied to building AI-driven web applications
      that turn complex data into clear decisions.
    </p>

    <pre className="overflow-x-auto rounded bg-[hsl(200_40%_10%)] p-4 font-mono text-xs text-sonar">
{`const mission = {
  objective: "Build innovative software solutions",
  strategy: ["Precision", "Leadership", "Curiosity"],
  status:   "Charting a new course in tech",
};`}
    </pre>

    <footer className="mt-6 flex items-center justify-between text-xs font-mono opacity-70">
      <span>FILED: {new Date().getFullYear()}</span>
      <span>AUTHORIZED ✓</span>
    </footer>
  </article>
);
