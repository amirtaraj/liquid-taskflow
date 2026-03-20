import { useState, useCallback } from "react";

export interface Task {
  id: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
  createdAt: number;
}

const STORAGE_KEY = "amirtask-tasks";

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function useTaskStore() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  const addTask = useCallback((title: string, description: string, date: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      date,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => {
      const next = [...prev, newTask];
      saveTasks(next);
      return next;
    });
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => {
      const next = prev.filter((t) => t.id !== id);
      saveTasks(next);
      return next;
    });
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
      saveTasks(next);
      return next;
    });
  }, []);

  const getTasksForDate = useCallback(
    (date: string) => tasks.filter((t) => t.date === date),
    [tasks]
  );

  return { tasks, addTask, removeTask, toggleTask, getTasksForDate };
}
