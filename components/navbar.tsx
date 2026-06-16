import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 md:px-0 h-16 border-b border-white/[0.08]">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-white tracking-tight">
        Task<span className="text-[#e8553e]">ly</span>.
      </Link>
      // after the nav links list, before the CTA button
      

      {/* Links */}
      <ul className="hidden md:flex items-center gap-7 list-none">
        {["Home", "Features"].map((item) => (
          <li key={item}>
            <Link
              href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      // after the nav links list, before the CTA button
      <div className="flex items-center gap-4">
      <Link
        href="/auth/login"
        className="text-sm text-white/50 hover:text-white transition-colors"
      >
        Sign in
      </Link>
      {  

      }

      <Link
        href="/auth/sign-up"
        className="rounded-full bg-[#e8553e] px-5 py-2 text-sm font-medium text-white hover:bg-[#d4442d] transition-colors"
      >
        Get started free
      </Link>
      </div>
    </nav>
  );
}
