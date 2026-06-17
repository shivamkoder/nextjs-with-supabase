import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { TaskForm } from "@/components/dashboard/task-form";
import { TaskList } from "@/components/dashboard/task-list";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const userId = data.claims.sub as string;

  // Fetch all tasks for this user, newest first
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("due_date", { ascending: true });

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white">My Tasks</h1>
        <p className="text-sm text-white/40 mt-1">
          Stay on top of everything that matters.
        </p>
      </div>

      {/* Add task form */}
      <TaskForm userId={userId} />

      {/* Task list */}
      <TaskList initialTasks={tasks ?? []} />
    </div>
  );
}
