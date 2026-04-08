// src/components/CalendarGrid.tsx
import { isDateInRange } from '../utils/calenderHelpers';
import { isSameDay } from 'date-fns';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  dayOfMonth: number;
  holidayName?: string;
}

interface CalendarGridProps {
  days: CalendarDay[];
  startDate: Date | null;
  endDate: Date | null;
  onDateClick: (date: Date) => void;
}

export default function CalendarGrid({ days, startDate, endDate, onDateClick }: CalendarGridProps) {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const getDateStyles = (day: CalendarDay) => {
    let styles = 'day-cell';
    
    if (!day.isCurrentMonth) {
      styles += ' other-month';  // Added space before class
    }
    
    if (day.isToday) {
      styles += ' today';        // Added space
    }
    
    if (startDate && isSameDay(day.date, startDate)) {
      styles += ' start-date';   // Added space
    }
    
    if (endDate && isSameDay(day.date, endDate)) {
      styles += ' end-date';     // Added space
    }
    
    if (startDate && endDate && isDateInRange(day.date, startDate, endDate)) {
      styles += ' in-range';     // Added space
    }
    
    return styles;
  };
  
  return (
    <div>
      <div className="calendar-grid mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-semibold text-stone-500 py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="calendar-grid">
        {days.map((day, idx) => (
          <button
            key={idx}
            onClick={() => day.isCurrentMonth && onDateClick(day.date)}
            className={getDateStyles(day)}
            disabled={!day.isCurrentMonth}
          >
            <span className={`text-sm font-medium ${!day.isCurrentMonth ? 'text-stone-300' : 'text-stone-700'}`}>
              {day.dayOfMonth}
            </span>
            {day.holidayName && day.isCurrentMonth && (
              <span className="holiday-marker">🎉</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}