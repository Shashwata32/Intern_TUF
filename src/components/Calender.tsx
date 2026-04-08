// src/components/Calendar.tsx
import { useState, useEffect, useCallback } from 'react';
import { addMonths, subMonths, isSameDay, format } from 'date-fns';
import { generateMonthDays } from '../utils/calenderHelpers';
import CalendarGrid from './CalenderGrid';
import NotesPanel from './NotesPanel';
import HeroImage from './HeroImage';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [days, setDays] = useState(() => generateMonthDays(currentMonth));
  
  useEffect(() => {
    setDays(generateMonthDays(currentMonth));
  }, [currentMonth]);
  
  const loadNote = useCallback((key: string) => {
    try {
      return localStorage.getItem(`calendar_note_${key}`);
    } catch {
      return null;
    }
  }, []);
  
  const saveNote = useCallback((key: string, note: string) => {
    try {
      if (note.trim() === '') {
        localStorage.removeItem(`calendar_note_${key}`);
      } else {
        localStorage.setItem(`calendar_note_${key}`, note);
      }
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  }, []);
  
  const handleDateClick = (clickedDate: Date) => {
    // If no start date, or both start and end are set, start new selection
    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
    } 
    // If start date exists but no end date
    else if (startDate && !endDate) {
      // If clicked date is before start date, swap them
      if (clickedDate < startDate) {
        setEndDate(startDate);
        setStartDate(clickedDate);
      } else {
        setEndDate(clickedDate);
      }
    }
  };
  
  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
  };
  
  const prevMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
    clearSelection();
  };
  
  const nextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
    clearSelection();
  };
  
  const goToToday = () => {
    setCurrentMonth(new Date());
    clearSelection();
  };
  
  const getSelectionText = () => {
    if (startDate && endDate) {
      if (isSameDay(startDate, endDate)) {
        return `Selected: ${format(startDate, 'MMMM d, yyyy')}`;
      }
      return `Selected: ${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
    }
    if (startDate && !endDate) {
      return `Selected start: ${format(startDate, 'MMMM d, yyyy')} (click end date)`;
    }
    return 'No dates selected';
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200">
          <div className="h-2 bg-gradient-to-r from-rose-300 via-indigo-300 to-amber-300" />
          
          <div className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/5 order-1 lg:order-1">
                <HeroImage currentMonth={currentMonth} />
                <div className="mt-6">
                  <NotesPanel
                    startDate={startDate}
                    endDate={endDate}
                    currentMonth={currentMonth}
                    onSave={saveNote}
                    loadNote={loadNote}
                    onSelectionChange={() => {}}
                  />
                </div>
              </div>
              
              <div className="lg:w-3/5 order-2 lg:order-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-stone-800">{format(currentMonth, 'MMMM yyyy')}</h2>
                    <p className="text-sm text-stone-500 mt-1">{getSelectionText()}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button onClick={goToToday} className="px-3 py-1.5 text-sm bg-stone-100 text-stone-600 rounded-lg hover:bg-stone-200 transition-colors">Today</button>
                    <button onClick={prevMonth} className="px-3 py-1.5 text-sm bg-stone-100 text-stone-600 rounded-lg hover:bg-stone-200 transition-colors">←</button>
                    <button onClick={nextMonth} className="px-3 py-1.5 text-sm bg-stone-100 text-stone-600 rounded-lg hover:bg-stone-200 transition-colors">→</button>
                    <button onClick={clearSelection} className="px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">Clear</button>
                  </div>
                </div>
                
                <CalendarGrid
                  days={days}
                  startDate={startDate}
                  endDate={endDate}
                  onDateClick={handleDateClick}
                />
                
                <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap gap-4 text-xs text-stone-400">
                  <div className="flex items-center gap-1"><div className="w-4 h-4 bg-indigo-600 rounded"></div><span>Start/End Date</span></div>
                  <div className="flex items-center gap-1"><div className="w-4 h-4 bg-indigo-100 rounded"></div><span>Selected Range</span></div>
                  <div className="flex items-center gap-1"><div className="w-4 h-4 border-2 border-amber-400 rounded"></div><span>Today</span></div>
                  <div className="flex items-center gap-1"><span>🎉</span><span>Holiday</span></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-stone-50 px-6 py-3 border-t border-stone-100 text-center text-xs text-stone-400">
            Click on any date to start selection • Click second date to complete range • Notes persist locally
          </div>
        </div>
      </div>
    </div>
  );
}