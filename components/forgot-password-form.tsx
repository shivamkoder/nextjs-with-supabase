"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="text-center mb-2">
        <Link href="/" className="text-2xl font-bold text-white tracking-tight">
          Task<span className="text-[#e8553e]">ly</span>.
        </Link>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-[#161616] p-6">
        {success ? (
          <>
            <h1 className="text-xl font-bold text-white mb-1">Check your email</h1>
            <p className="text-sm text-white/40 mb-4">
              Password reset instructions sent
            </p>
            <p className="text-sm text-white/50">
              If you registered using your email and password, you&apos;ll receive
              a password reset email shortly.
            </p>
          </>
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-xl font-bold text-white">Reset your password</h1>
              <p className="text-sm text-white/40 mt-1">
                Enter your email and we&apos;ll send you a reset link.
              </p>
            </div>

            <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-xs text-white/40">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#e8553e]/50 transition-colors"
                />
              </div>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="rounded-full bg-[#e8553e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d4442d] transition-colors disabled:opacity-50 mt-1"
              >
                {isLoading ? "Sending..." : "Send reset email"}
              </button>
            </form>

            <p className="text-center text-sm text-white/40 mt-6">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-[#e8553e] hover:text-[#d4442d] font-medium transition-colors"
              >
                Log in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
