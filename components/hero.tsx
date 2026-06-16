import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between gap-10 py-20 px-6 md:px-0 overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute right-[-40px] bottom-[-60px] w-64 h-64 rounded-full bg-[#e8553e] opacity-10" />
      <div className="pointer-events-none absolute left-[30%] top-0 w-20 h-20 rounded-full bg-[#534AB7] opacity-15" />

      {/* Left — copy */}
      <div className="relative z-10 flex-1 max-w-lg">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#e8553e]/30 bg-[#e8553e]/10 px-3 py-1 text-xs font-medium text-[#e8553e] mb-6">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          Now with AI prioritization
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white mb-4">
          Organize Tasks,{" "}
          <em className="not-italic text-[#e8553e]">Own Your Day.</em>
        </h1>

        <p className="text-sm text-white/45 leading-relaxed mb-8 max-w-sm">
          Stop juggling sticky notes and scattered lists. Taskly keeps
          everything you need to do in one focused, beautiful space.
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/auth/sign-up"
            className="rounded-full bg-[#e8553e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#d4442d] transition-colors"
          >
            Start for free
          </Link>
          <Link
            href="#features"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/60 hover:text-white hover:border-white/40 transition-colors"
          >
            See how it works
          </Link>
        </div>
      </div>

      {/* Right — app card mockup */}
      <div className="relative z-10 flex-1 flex justify-center">
        <div className="w-72 rounded-2xl border border-white/10 bg-[#1a1a1a] p-5">
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm font-semibold text-white">Today&apos;s tasks</span>
            <span className="text-xs text-white/35">
              Jun 16, 2026
            </span>
          </div>

          {[
            { label: "Review design mockups", done: true, tag: "Work", tagColor: "text-[#e8553e] bg-[#e8553e]/15" },
            { label: "Finish project proposal", done: false, tag: "Urgent", tagColor: "text-[#efae4a] bg-[#efae4a]/15" },
            { label: "Call with team at 3 pm", done: true, tag: "Work", tagColor: "text-[#e8553e] bg-[#e8553e]/15" },
            { label: "Buy groceries", done: false, tag: "Personal", tagColor: "text-[#9b93f0] bg-[#9b93f0]/15" },
            { label: "Read 20 pages", done: false, tag: "Personal", tagColor: "text-[#9b93f0] bg-[#9b93f0]/15" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 py-2.5 border-b border-white/[0.06] last:border-none"
            >
              <div
                className={`w-[18px] h-[18px] rounded-full border flex-shrink-0 flex items-center justify-center ${
                  item.done
                    ? "bg-[#e8553e] border-[#e8553e]"
                    : "border-white/20"
                }`}
              >
                {item.done && (
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className={`flex-1 text-xs ${item.done ? "line-through text-white/30" : "text-white/70"}`}>
                {item.label}
              </span>
              <span className={`text-[10px] font-medium rounded-full px-2 py-0.5 ${item.tagColor}`}>
                {item.tag}
              </span>
            </div>
          ))}

          {/* Progress bar */}
          <div className="mt-4 flex items-center gap-3 rounded-lg bg-[#111] px-3 py-2">
            <span className="text-[11px] text-white/30 whitespace-nowrap">2 of 5 done</span>
            <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[40%] rounded-full bg-[#e8553e]" />
            </div>
            <span className="text-[11px] font-semibold text-[#e8553e]">40%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
