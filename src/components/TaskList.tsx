import { format } from "date-fns";
import type { Task } from "@/hooks/useTaskStore";

interface TaskListProps {
  tasks: Task[];
  selectedDate: Date;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onAddClick: () => void;
  onEditClick: (task: Task) => void;
}

const TaskList = ({ tasks, selectedDate, onToggle, onRemove, onAddClick, onEditClick }: TaskListProps) => {
  const isToday = format(new Date(), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
  const dateLabel = isToday ? "Today" : format(selectedDate, "EEEE, MMM d");

  return (
    <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{dateLabel}</h2>
          <p className="text-xs text-muted-foreground">
            {tasks.length === 0 ? "No tasks" : `${tasks.length} task${tasks.length > 1 ? "s" : ""}`}
          </p>
        </div>
        <button
          onClick={onAddClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 active:scale-95"
          aria-label="Add task"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="glass-panel flex flex-col items-center gap-3 rounded-2xl py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-muted-foreground">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">No tasks for this day</p>
          <button
            onClick={onAddClick}
            className="mt-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Add your first task
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {tasks.map((task, i) => (
            <div
              key={task._id}
              className="glass-panel group flex items-start gap-3 rounded-2xl p-4 transition-all duration-200 hover:shadow-lg animate-fade-up"
              style={{ animationDelay: `${0.05 * i}s` }}
            >
              <button
                onClick={() => onToggle(task._id)}
                className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-200 ${
                  task.completed
                    ? "border-primary bg-primary"
                    : "border-muted-foreground/30 hover:border-primary/50"
                }`}
              >
                {task.completed && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                )}
              </button>

              <div
                className="min-w-0 flex-1 cursor-pointer"
                onClick={() => onEditClick(task)}
                title="Edit task"
              >
                <p className={`text-sm font-medium leading-snug transition-all ${task.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>
                  {task.title}
                </p>
                {task.description && (
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                    {task.description}
                  </p>
                )}
                {/* Timestamps only shown in modal */}
              </div>
              <button
                onClick={() => onRemove(task._id)}
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-muted-foreground/0 transition-all duration-200 group-hover:text-destructive group-hover:bg-destructive/10 active:scale-90"
                aria-label="Remove task"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
