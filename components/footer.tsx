import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full flex items-center justify-between px-6 md:px-0 py-5 border-t border-white/[0.07]">
      <span className="text-xs text-white/25">
        © {new Date().getFullYear()} Taskly. All rights reserved.
      </span>
      <nav className="flex gap-5" aria-label="Footer links">
        {["Privacy", "Terms", "Contact"].map((link) => (
          <Link
            key={link}
            href={`/${link.toLowerCase()}`}
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            {link}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
