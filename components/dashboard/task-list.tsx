"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type TaskStatus = "pending" | "completed" | "missed";

interface Task {
  id: string;
  title: string;
  description: string | null;
  due_date: string;
  status: TaskStatus;
}

interface TaskListProps {
  initialTasks: Task[];
}

function formatDueDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: TaskStatus }) {
  const styles: Record<TaskStatus, string> = {
    pending: "bg-[#efae4a]/15 text-[#efae4a]",
    completed: "bg-[#3ecfa0]/15 text-[#3ecfa0]",
    missed: "bg-red-500/15 text-red-400",
  };
  return (
    <span
      className={`text-[10px] font-semibold uppercase tracking-wide rounded-full px-2.5 py-0.5 ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export function TaskList({ initialTasks }: TaskListProps) {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Auto-mark overdue pending tasks as missed
  const autoMarkMissed = useCallback(async () => {
    const now = new Date();
    const supabase = createClient();

    const toMiss = tasks.filter(
      (t) => t.status === "pending" && new Date(t.due_date) < now
    );

    if (toMiss.length === 0) return;

    const ids = toMiss.map((t) => t.id);
    const { error } = await supabase
      .from("tasks")
      .update({ status: "missed" })
      .in("id", ids);

    if (!error) {
      setTasks((prev) =>
        prev.map((t) => (ids.includes(t.id) ? { ...t, status: "missed" } : t))
      );
    }
  }, [tasks]);

  // Run on mount and every 60 seconds
  useEffect(() => {
    autoMarkMissed();
    const interval = setInterval(autoMarkMissed, 60_000);
    return () => clearInterval(interval);
  }, [autoMarkMissed]);

  const updateStatus = async (id: string, status: TaskStatus) => {
    setLoadingId(id);
    const supabase = createClient();
    const { error } = await supabase
      .from("tasks")
      .update({ status })
      .eq("id", id);

    if (!error) {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status } : t))
      );
    }
    setLoadingId(null);
  };

  const deleteTask = async (id: string) => {
    setLoadingId(id);
    const supabase = createClient();
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (!error) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
    setLoadingId(null);
    router.refresh();
  };

  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-[#161616] px-6 py-14 text-center">
        <p className="text-3xl mb-3">📋</p>
        <p className="text-sm text-white/40">No tasks yet. Add one above!</p>
      </div>
    );
  }

  // Group by status
  const pending = tasks.filter((t) => t.status === "pending");
  const completed = tasks.filter((t) => t.status === "completed");
  const missed = tasks.filter((t) => t.status === "missed");
  const ordered = [...pending, ...missed, ...completed];

  return (
    <div className="flex flex-col gap-2">
      {/* Summary row */}
      <div className="flex items-center gap-4 mb-2 text-xs text-white/35">
        <span>{pending.length} pending</span>
        <span className="text-white/15">•</span>
        <span className="text-[#3ecfa0]">{completed.length} completed</span>
        <span className="text-white/15">•</span>
        <span className="text-red-400">{missed.length} missed</span>
      </div>

      {/* Task rows */}
      {ordered.map((task) => {
        const isLoading = loadingId === task.id;
        const isPending = task.status === "pending";
        const isCompleted = task.status === "completed";

        return (
          <div
            key={task.id}
            className={`flex items-start gap-4 rounded-xl border px-4 py-3.5 transition-colors ${
              isCompleted
                ? "border-[#3ecfa0]/10 bg-[#3ecfa0]/[0.03]"
                : task.status === "missed"
                ? "border-red-500/10 bg-red-500/[0.03]"
                : "border-white/[0.07] bg-[#161616]"
            }`}
          >
            {/* Complete toggle circle */}
            <button
              onClick={() =>
                isPending
                  ? updateStatus(task.id, "completed")
                  : isCompleted
                  ? updateStatus(task.id, "pending")
                  : undefined
              }
              disabled={isLoading || task.status === "missed"}
              title={isPending ? "Mark complete" : isCompleted ? "Mark pending" : "Missed"}
              className={`mt-0.5 w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors ${
                isCompleted
                  ? "bg-[#3ecfa0] border-[#3ecfa0]"
                  : task.status === "missed"
                  ? "border-red-400/40 cursor-not-allowed"
                  : "border-white/20 hover:border-[#e8553e] cursor-pointer"
              }`}
            >
              {isCompleted && (
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="#0f0f0f"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {task.status === "missed" && (
                <svg width="8" height="8" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M2 2l8 8M10 2l-8 8"
                    stroke="#f87171"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <span
                  className={`text-sm font-medium ${
                    isCompleted
                      ? "line-through text-white/30"
                      : task.status === "missed"
                      ? "text-white/40"
                      : "text-white"
                  }`}
                >
                  {task.title}
                </span>
                <StatusBadge status={task.status} />
              </div>

              {task.description && (
                <p className="text-xs text-white/35 mt-0.5 truncate">
                  {task.description}
                </p>
              )}

              <div className="flex items-center gap-3 mt-2">
                <span className="flex items-center gap-1 text-[11px] text-white/30">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  {formatDueDate(task.due_date)}
                </span>

                {/* Action buttons */}
                <div className="flex items-center gap-2 ml-auto">
                  {isPending && (
                    <button
                      onClick={() => updateStatus(task.id, "missed")}
                      disabled={isLoading}
                      className="text-[11px] text-red-400/60 hover:text-red-400 transition-colors"
                    >
                      Mark missed
                    </button>
                  )}
                  {task.status === "missed" && (
                    <button
                      onClick={() => updateStatus(task.id, "pending")}
                      disabled={isLoading}
                      className="text-[11px] text-[#efae4a]/60 hover:text-[#efae4a] transition-colors"
                    >
                      Reopen
                    </button>
                  )}
                  <button
                    onClick={() => deleteTask(task.id)}
                    disabled={isLoading}
                    className="text-[11px] text-white/20 hover:text-red-400 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
