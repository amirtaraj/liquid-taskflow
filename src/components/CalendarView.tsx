import { useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";

interface CalendarViewProps {
  currentMonth: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  taskCountByDate: Record<string, number>;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarView = ({
  currentMonth,
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  taskCountByDate,
}: CalendarViewProps) => {
  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const result: Date[] = [];
    let day = calStart;
    while (day <= calEnd) {
      result.push(day);
      day = addDays(day, 1);
    }
    return result;
  }, [currentMonth]);

  return (
    <div className="glass-panel rounded-2xl p-5 animate-fade-up" style={{ animationDelay: "0.1s" }}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={onPrevMonth}
          className="glass-button flex h-9 w-9 items-center justify-center rounded-xl text-foreground"
          aria-label="Previous month"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h2 className="text-base font-semibold text-foreground">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          onClick={onNextMonth}
          className="glass-button flex h-9 w-9 items-center justify-center rounded-xl text-foreground"
          aria-label="Next month"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Weekday headers */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1 text-center text-xs font-medium text-muted-foreground">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const inMonth = isSameMonth(day, currentMonth);
          const selected = isSameDay(day, selectedDate);
          const today = isToday(day);
          const taskCount = taskCountByDate[dateKey] || 0;

          return (
            <button
              key={dateKey}
              onClick={() => onSelectDate(day)}
              className={`
                relative flex h-10 w-full flex-col items-center justify-center rounded-xl text-sm transition-all duration-200
                ${!inMonth ? "text-muted-foreground/30" : "text-foreground"}
                ${selected ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : ""}
                ${!selected && today ? "bg-primary/10 font-semibold" : ""}
                ${!selected && inMonth ? "hover:bg-secondary active:scale-95" : ""}
              `}
            >
              {format(day, "d")}
              {taskCount > 0 && !selected && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary" />
              )}
              {taskCount > 0 && selected && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary-foreground/70" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
