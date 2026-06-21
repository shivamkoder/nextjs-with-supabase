"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="text-center mb-2">
        <span className="text-2xl font-bold text-white tracking-tight">
          Task<span className="text-[#e8553e]">ly</span>.
        </span>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-[#161616] p-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white">Set a new password</h1>
          <p className="text-sm text-white/40 mt-1">
            Choose a new password for your account.
          </p>
        </div>

        <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-xs text-white/40">
              New password
            </label>
            <input
              id="password"
              type="password"
              placeholder="New password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#e8553e]/50 transition-colors"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-full bg-[#e8553e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d4442d] transition-colors disabled:opacity-50 mt-1"
          >
            {isLoading ? "Saving..." : "Save new password"}
          </button>
        </form>
      </div>
    </div>
  );
}
