import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-[#0f0f0f] p-6 md:p-10">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="text-center mb-2">
          <Link href="/" className="text-2xl font-bold text-white tracking-tight">
            Task<span className="text-[#e8553e]">ly</span>.
          </Link>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#161616] p-6 text-center">
          <h1 className="text-xl font-bold text-white mb-1">Thank you for signing up!</h1>
          <p className="text-sm text-white/40 mb-4">Check your email to confirm</p>
          <p className="text-sm text-white/50">
            You&apos;ve successfully signed up. Please check your email to confirm
            your account before signing in.
          </p>
        </div>
      </div>
    </div>
  );
}
