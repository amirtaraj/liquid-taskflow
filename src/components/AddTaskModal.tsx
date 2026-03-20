import { useState } from "react";
import { format } from "date-fns";

import type { Task } from "@/hooks/useTaskStore";

interface AddTaskModalProps {
  selectedDate: Date;
  onAdd: (title: string, description: string, date: string) => void;
  onEdit?: (id: string, title: string, description: string) => void;
  onClose: () => void;
  task?: Task | null;
}


const AddTaskModal = ({ selectedDate, onAdd, onEdit, onClose, task }: AddTaskModalProps) => {
  const isEditing = !!task;
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description || "" : "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (isEditing && onEdit && task) {
      onEdit(task.id, title.trim(), description.trim());
    } else {
      onAdd(title.trim(), description.trim(), format(selectedDate, "yyyy-MM-dd"));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/10 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="glass-panel-strong relative z-10 mx-4 mb-4 w-full max-w-md rounded-2xl p-6 sm:mb-0 animate-slide-up">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">{isEditing ? "Edit Task" : "New Task"}</h3>
          <button
            onClick={onClose}
            className="glass-button flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="mb-4 text-xs text-muted-foreground">
          {format(selectedDate, "EEEE, MMMM d, yyyy")}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="task-title" className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Title
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="glass-input w-full rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="task-desc" className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Description (optional)
            </label>
            <textarea
              id="task-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add some details..."
              rows={3}
              className="glass-input w-full resize-none rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={!title.trim()}
            className="mt-1 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-40 disabled:shadow-none"
          >
            {isEditing ? "Save" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
