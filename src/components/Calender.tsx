// src/components/Calendar.tsx
import { useState, useEffect, useCallback } from 'react';
import { addMonths, subMonths, isSameDay, format } from 'date-fns';
import { generateMonthDays } from '../utils/calenderHelpers';
import CalendarGrid from './CalenderGrid';
import NotesPanel from './NotesPanel';
import HeroImage from './HeroImage';

// Theme background images (subtle, low opacity)
const monthBackgrounds = [
  { image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&h=900&fit=crop", opacity: 0.9 },
  { image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1600&h=900&fit=crop", opacity: 0.9 },
  { image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a6?w=1600&h=900&fit=crop", opacity: 0.9 },
  { image: "https://images.unsplash.com/photo-1470071459604-3b5ec3f7a73f?w=1600&h=900&fit=crop", opacity: 0.9 },
  { image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&h=900&fit=crop", opacity: 0.9 },
  { image: "https://images.unsplash.com/photo-1566410822511-4e69f5b4acd2?w=1600&h=900&fit=crop", opacity: 0.9 },
  { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=900&fit=crop", opacity: 0.9 },
  { image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1600&h=900&fit=crop", opacity: 0.9 },
  { image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&h=900&fit=crop", opacity: 0.9 },
  { image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&h=900&fit=crop", opacity: 0.9 },
  { image: "https://images.unsplash.com/photo-1506368249639-73a05a6d6484?w=1600&h=900&fit=crop", opacity: 0.9 },
  { image: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=1600&h=900&fit=crop", opacity: 0.9 },
];

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [days, setDays] = useState(() => generateMonthDays(currentMonth));
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  
  const monthIndex = currentMonth.getMonth();
  const currentBg = monthBackgrounds[monthIndex];

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
    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
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

  const goPrevMonth = () => {
    if (isFlipping) return;
    setFlipDirection('prev');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentMonth(prev => subMonths(prev, 1));
      clearSelection();
      setIsFlipping(false);
      setFlipDirection(null);
    }, 300);
  };

  const goNextMonth = () => {
    if (isFlipping) return;
    setFlipDirection('next');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentMonth(prev => addMonths(prev, 1));
      clearSelection();
      setIsFlipping(false);
      setFlipDirection(null);
    }, 300);
  };

  const goToToday = () => {
    if (isFlipping) return;
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
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      {/* Thematic background image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{ 
          backgroundImage: `url(${currentBg.image})`,
          opacity: currentBg.opacity,
        }}
      />
      <div className="fixed inset-0 bg-stone-100 -z-10" />
      <div className="fixed inset-0 bg-white/30 backdrop-blur-[1px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Page-flipping zones */}
        <div className="page-flip-zone top-left" onClick={goPrevMonth} />
        <div className="page-flip-zone bottom-right" onClick={goNextMonth} />

        {/* Wall Calendar Card - Rectangular shape */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 transition-all duration-300">
          {/* Spiral binding effect at top */}
          <div className="h-3 " />
          
          <div className="p-6 md:p-8">
            {/* Hero Image - Prominent at top */}
            <div className="mb-6">
              <HeroImage currentMonth={currentMonth} />
            </div>

            {/* Month Title & Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold text-stone-800">
                  {format(currentMonth, 'MMMM yyyy')}
                </h2>
                <p className="text-sm text-stone-500 mt-1">{getSelectionText()}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={goToToday} className="px-3 py-1.5 text-sm bg-stone-100 text-stone-600 rounded-lg hover:bg-stone-200">Today</button>
                <button onClick={clearSelection} className="px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">Clear</button>
              </div>
            </div>

            {/* Two-column layout: Calendar (left) + Notes (right) */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Calendar Grid */}
              <div className="md:w-2/3">
                <div className={`calendar-flip ${isFlipping ? `flipping-${flipDirection}` : ''}`}>
                  <CalendarGrid days={days} startDate={startDate} endDate={endDate} onDateClick={handleDateClick} />
                </div>
              </div>

              {/* Notes Panel - Side panel like a tear-off pad */}
              <div className="md:w-1/3">
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

            {/* Legend */}
            <div className="mt-8 pt-4 border-t border-stone-100 flex flex-wrap gap-4 text-xs text-stone-500">
              <div className="flex items-center gap-1"><div className="w-4 h-4 bg-indigo-600 rounded"></div><span>Start/End Date</span></div>
              <div className="flex items-center gap-1"><div className="w-4 h-4 bg-indigo-100 rounded"></div><span>Selected Range</span></div>
              <div className="flex items-center gap-1"><div className="w-4 h-4 border-2 border-amber-400 rounded"></div><span>Today</span></div>
              <div className="flex items-center gap-1"><span>🎉</span><span>Holiday</span></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}