"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <button
      onClick={logout}
      className="rounded-full border border-white/10 px-4 py-1.5 text-xs font-medium text-white/50 hover:text-white hover:border-white/30 transition-colors"
    >
      Sign out
    </button>
  );
}
