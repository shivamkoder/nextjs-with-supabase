"use client";

import { useState } from "react";
import { TaskForm } from "./task-form";
import { TaskList } from "./task-list";

type TaskStatus = "pending" | "completed" | "missed";

interface Task {
  id: string;
  title: string;
  description: string | null;
  due_date: string;
  status: TaskStatus;
}

interface DashboardProps {
  userId: string;
  initialTasks: Task[];
}

export function Dashboard({ userId, initialTasks }: DashboardProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleTaskAdded = (newTask: Task) => {
    // Insert in due_date order
    setTasks((prev) => {
      const updated = [...prev, newTask];
      return updated.sort(
        (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
      );
    });
  };

  return (
    <>
      <TaskForm userId={userId} onTaskAdded={handleTaskAdded} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </>
  );
}
