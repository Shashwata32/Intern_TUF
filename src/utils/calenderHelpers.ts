import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  format,
  isWithinInterval,
  isToday
} from 'date-fns';

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  dayOfMonth: number;
  holidayName?: string;
}

// Common holidays (month-day mapping as strings)
const HOLIDAYS: Record<string, string> = {
  '1-1': "New Year's Day",
  '1-26': "Republic Day",
  '3-8': "International Women's Day",
  '3-29': "Holi (Dates may vary)",
  '4-10': "Mahavir Jayanti (Dates may vary)",
  '4-14': "Ambedkar Jayanti",
  '4-21': "Ram Navami (Dates may vary)",
  '5-1': "Labour Day",
  '6-17': "Eid al-Adha (Bakrid) (Dates may vary)",
  '7-17': "Muharram (Dates may vary)",
  '8-15': "Independence Day",
  '8-19': "Raksha Bandhan (Dates may vary)",
  '8-26': "Janmashtami (Dates may vary)",
  '10-2': "Gandhi Jayanti",
  '10-12': "Dussehra (Dates may vary)",
  '11-1': "Diwali (Dates may vary)",
  '11-15': "Guru Nanak Jayanti (Dates may vary)",
  '12-25': "Christmas Day"
};

export function getHolidayName(date: Date): string | undefined {
  const key = `${date.getMonth() + 1}-${date.getDate()}`;
  return HOLIDAYS[key];
}

export function generateMonthDays(currentDate: Date): CalendarDay[] {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  
  return days.map(date => ({
    date,
    isCurrentMonth: isSameMonth(date, currentDate),
    isToday: isToday(date),
    dayOfMonth: date.getDate(),
    holidayName: getHolidayName(date)
  }));
}

export function isDateInRange(date: Date, startDate: Date | null, endDate: Date | null): boolean {
  if (!startDate || !endDate) return false;
  return isWithinInterval(date, { start: startDate, end: endDate });
}

export function formatDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function getMonthYearKey(date: Date): string {
  return format(date, 'yyyy-MM');
}

export function getRangeKey(startDate: Date, endDate: Date): string {
  return `range_${formatDateKey(startDate)}_to_${formatDateKey(endDate)}`;
}

export function getSingleDateKey(date: Date): string {
  return `date_${formatDateKey(date)}`;
}

export function getGeneralMonthKey(date: Date): string {
  return `general_${getMonthYearKey(date)}`;
}

export function getNoteContext(
  startDate: Date | null,
  endDate: Date | null,
  currentMonth: Date
): { key: string; label: string } {
  if (startDate && endDate) {
    if (isSameDay(startDate, endDate)) {
      return {
        key: getSingleDateKey(startDate),
        label: `Note for ${format(startDate, 'MMMM d, yyyy')}`
      };
    }
    return {
      key: getRangeKey(startDate, endDate),
      label: `Note for range: ${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`
    };
  }
  
  if (startDate && !endDate) {
    return {
      key: getSingleDateKey(startDate),
      label: `Note for ${format(startDate, 'MMMM d, yyyy')} (single date)`
    };
  }
  
  return {
    key: getGeneralMonthKey(currentMonth),
    label: `General Notes for ${format(currentMonth, 'MMMM yyyy')}`
  };
}