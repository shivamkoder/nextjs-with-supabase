const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
    iconColor: "text-[#e8553e] bg-[#e8553e]/15",
    title: "Smart scheduling",
    desc: "Tasks auto-sort by due date and priority so the right work is always first.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <circle cx="7" cy="7" r="1" fill="currentColor" />
      </svg>
    ),
    iconColor: "text-[#9b93f0] bg-[#9b93f0]/15",
    title: "Labels & filters",
    desc: "Tag by project, context, or energy level. Filter to exactly what matters now.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    iconColor: "text-[#3ecfa0] bg-[#3ecfa0]/15",
    title: "Smart reminders",
    desc: "Get nudged at the right moment — not just at deadline time.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 px-6 md:px-0">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#e8553e] mb-2">
        Why Taskly
      </p>
      <h2 className="text-2xl font-bold text-white mb-8">
        Everything you need, nothing you don&apos;t
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-white/[0.07] bg-[#161616] p-5"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${f.iconColor}`}>
              {f.icon}
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
            <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
