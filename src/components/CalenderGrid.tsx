import { isDateInRange } from '../utils/calenderHelpers';
import { isSameDay, isWeekend } from 'date-fns'; // Added isWeekend

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
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const getDateStyles = (day: CalendarDay) => {
    let styles = 'day-cell';
    
    if (!day.isCurrentMonth) {
      styles += ' other-month';
    }
    
    if (day.isToday) {
      styles += ' today';
    }
    
    if (startDate && isSameDay(day.date, startDate)) {
      styles += ' start-date';
    }
    
    if (endDate && isSameDay(day.date, endDate)) {
      styles += ' end-date';
    }
    
    if (startDate && endDate && isDateInRange(day.date, startDate, endDate)) {
      styles += ' in-range';
    }

    if (day.isCurrentMonth && (isWeekend(day.date) || day.holidayName)) {
        styles += ' !text-red-500 font-bold'; 
    }
    
    return styles;
  };
  
  return (
    <div>
      <div className="calendar-grid mb-2">
        {weekDays.map((day, i) => (
          <div 
            key={day} 
            className={`text-center text-sm font-semibold py-2 ${i >= 5 ? 'text-red-500' : 'text-stone-500'}`}
          >
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
            <span className="text-sm">
              {day.dayOfMonth}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}