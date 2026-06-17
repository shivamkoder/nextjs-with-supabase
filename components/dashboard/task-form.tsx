"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface TaskFormProps {
  userId: string;
}

export function TaskForm({ userId }: TaskFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !dueDate || !dueTime) {
      setError("Title, date and time are required.");
      return;
    }

    const dueDatetime = new Date(`${dueDate}T${dueTime}`);
    if (isNaN(dueDatetime.getTime())) {
      setError("Invalid date or time.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error: insertError } = await supabase.from("tasks").insert({
      user_id: userId,
      title,
      description: description || null,
      due_date: dueDatetime.toISOString(),
      status: "pending",
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    // Reset form
    setTitle("");
    setDescription("");
    setDueDate("");
    setDueTime("");
    setOpen(false);
    router.refresh();
  };

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#161616] p-5">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
        >
          <span className="w-6 h-6 rounded-full bg-[#e8553e] flex items-center justify-center text-white font-bold text-lg leading-none">
            +
          </span>
          Add a new task
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-white">New Task</h2>

          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white/40">
              Title <span className="text-[#e8553e]">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Submit assignment"
              className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#e8553e]/50 transition-colors"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white/40">
              Description{" "}
              <span className="text-white/25">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details..."
              rows={2}
              className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#e8553e]/50 transition-colors resize-none"
            />
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-white/40">
                Date <span className="text-[#e8553e]">*</span>
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e8553e]/50 transition-colors [color-scheme:dark]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-white/40">
                Time <span className="text-[#e8553e]">*</span>
              </label>
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e8553e]/50 transition-colors [color-scheme:dark]"
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#e8553e] px-5 py-2 text-sm font-semibold text-white hover:bg-[#d4442d] transition-colors disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Task"}
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setError(null);
              }}
              className="text-sm text-white/40 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
