import { useState, useCallback, useEffect } from "react";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  date?: string; // YYYY-MM-DD (optional, backend may not have it)
  completed: boolean;
  createdAt: string;
}

// Set your backend API base URL here
const API_BASE =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://your-backend-url/api");

export function useTaskStore() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch all tasks on mount
  useEffect(() => {
    fetch(`${API_BASE}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch(() => setTasks([]));
  }, []);

  // Add a new task
  const addTask = useCallback(
    async (title: string, description: string, date: string) => {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, date }),
      });
      if (res.ok) {
        const newTask = await res.json();
        setTasks((prev) => [...prev, newTask]);
      }
    },
    []
  );

  // Remove a task
  const removeTask = useCallback(async (id: string) => {
    const res = await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
    if (res.ok) {
      setTasks((prev) => prev.filter((t) => t._id !== id));
    }
  }, []);

  // Toggle task completion
  const toggleTask = useCallback(async (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    });
    if (res.ok) {
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    }
  }, [tasks]);

  // Edit a task
  const editTask = useCallback(
    async (id: string, title: string, description: string) => {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        const updated = await res.json();
        setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
      }
    },
    []
  );

  // Get tasks for a specific date (if date is used)
  const getTasksForDate = useCallback(
    (date: string) => tasks.filter((t) => t.date === date),
    [tasks]
  );

  return { tasks, addTask, removeTask, toggleTask, getTasksForDate, editTask };
}
