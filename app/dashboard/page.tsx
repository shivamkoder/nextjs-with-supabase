import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Dashboard } from "@/components/dashboard/dashboard";

async function DashboardContent() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const userId = data.claims.sub as string;

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("due_date", { ascending: true });

  return <Dashboard userId={userId} initialTasks={tasks ?? []} />;
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">My Tasks</h1>
        <p className="text-sm text-white/40 mt-1">
          Stay on top of everything that matters.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="rounded-xl border border-white/[0.07] bg-[#161616] px-6 py-14 text-center">
            <p className="text-sm text-white/30">Loading your tasks...</p>
          </div>
        }
      >
        <DashboardContent />
      </Suspense>
    </div>
  );
}
