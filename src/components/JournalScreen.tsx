import { useMemo } from "react";
import { format } from "date-fns";
import type { Task } from "@/hooks/useTaskStore";

interface JournalScreenProps {
  tasks: Task[];
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}

const JournalScreen = ({ tasks, onRemove, onToggle }: JournalScreenProps) => {
  const completedTasks = useMemo(
    () =>
      tasks
        .filter((t) => t.completed)
        .sort((a, b) => b.createdAt - a.createdAt),
    [tasks]
  );

  const groupedByDate = useMemo(() => {
    const groups: Record<string, Task[]> = {};
    completedTasks.forEach((t) => {
      if (!groups[t.date]) groups[t.date] = [];
      groups[t.date].push(t);
    });
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
  }, [completedTasks]);

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Journal</h2>
        <p className="text-xs text-muted-foreground">
          {completedTasks.length} completed task{completedTasks.length !== 1 ? "s" : ""}
        </p>
      </div>

      {completedTasks.length === 0 ? (
        <div className="glass-panel flex flex-col items-center gap-3 rounded-2xl py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-muted-foreground">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">No completed tasks yet</p>
          <p className="text-xs text-muted-foreground/60">Complete tasks to see them here</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {groupedByDate.map(([dateKey, dateTasks], gi) => (
            <div
              key={dateKey}
              className="animate-fade-up"
              style={{ animationDelay: `${0.05 * gi}s` }}
            >
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {format(new Date(dateKey + "T12:00:00"), "EEEE, MMM d, yyyy")}
              </h3>
              <div className="flex flex-col gap-2">
                {dateTasks.map((task, i) => (
                  <div
                    key={task.id}
                    className="glass-panel group flex items-start gap-3 rounded-2xl p-4 animate-fade-up"
                    style={{ animationDelay: `${0.03 * i + 0.05 * gi}s` }}
                  >
                    <button
                      onClick={() => onToggle(task.id)}
                      className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-lg border-2 border-primary bg-primary transition-all duration-200 hover:bg-primary/80"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-muted-foreground line-through leading-snug">
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="mt-0.5 text-xs text-muted-foreground/60 line-clamp-2">
                          {task.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => onRemove(task.id)}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JournalScreen;
