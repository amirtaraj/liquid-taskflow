import { useState, useMemo, useCallback } from "react";
import { format, addMonths, subMonths } from "date-fns";
import LoginScreen from "@/components/LoginScreen";
import CalendarView from "@/components/CalendarView";
import TaskList from "@/components/TaskList";
import AddTaskModal from "@/components/AddTaskModal";
import { useTaskStore } from "@/hooks/useTaskStore";
import loginBg from "@/assets/login-bg.jpg";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);

  const { tasks, addTask, removeTask, toggleTask, getTasksForDate } = useTaskStore();

  const selectedDateKey = format(selectedDate, "yyyy-MM-dd");
  const tasksForDate = useMemo(() => getTasksForDate(selectedDateKey), [getTasksForDate, selectedDateKey]);

  const taskCountByDate = useMemo(() => {
    const counts: Record<string, number> = {};
    tasks.forEach((t) => {
      counts[t.date] = (counts[t.date] || 0) + 1;
    });
    return counts;
  }, [tasks]);

  const handlePrevMonth = useCallback(() => setCurrentMonth((m) => subMonths(m, 1)), []);
  const handleNextMonth = useCallback(() => setCurrentMonth((m) => addMonths(m, 1)), []);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <img src={loginBg} alt="" className="fixed inset-0 h-full w-full object-cover opacity-40" />
      <div className="fixed inset-0 bg-background/60 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-md px-4 pb-8 pt-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between animate-fade-up">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">AmirTask</h1>
            <p className="text-xs text-muted-foreground">Stay on track</p>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="glass-button flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground"
            aria-label="Sign out"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>

        {/* Calendar */}
        <CalendarView
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          taskCountByDate={taskCountByDate}
        />

        {/* Tasks */}
        <div className="mt-6">
          <TaskList
            tasks={tasksForDate}
            selectedDate={selectedDate}
            onToggle={toggleTask}
            onRemove={removeTask}
            onAddClick={() => setShowAddModal(true)}
          />
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <AddTaskModal
          selectedDate={selectedDate}
          onAdd={addTask}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

export default Index;
