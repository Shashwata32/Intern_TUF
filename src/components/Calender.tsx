import { useState, useEffect, useCallback } from 'react';
import { addMonths, subMonths, format } from 'date-fns';
import { generateMonthDays } from '../utils/calenderHelpers';
import CalendarGrid from './CalenderGrid';
import NotesPanel from './NotesPanel';
import HeroImage from './HeroImage';

// Theme background images
const monthBackgrounds = [
  { image: "../public/assets/bg/Array.png", opacity: 0.9 },
  { image: "../public/assets/bg/2pointers.png", opacity: 0.9 },
  { image: "../public/assets/bg/SlidingWindow.png", opacity: 0.9 },
  { image: "../public/assets/bg/BinarySearch.png", opacity: 0.9 },
  { image: "../public/assets/bg/Stack.png", opacity: 0.9 },
  { image: "../public/assets/bg/LinkedList.png", opacity: 0.9 },
  { image: "../public/assets/bg/Tree.png", opacity: 0.9 },
  { image: "../public/assets/bg/Bit.png", opacity: 0.9 },
  { image: "../public/assets/bg/Heap.png", opacity: 0.9 },
  { image: "../public/assets/bg/Trie.png", opacity: 0.9 },
  { image: "../public/assets/bg/DynammicProgramming.png", opacity: 0.9 },
  { image: "../public/assets/bg/Graph.png", opacity: 0.9 },
];

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bgMonth, setBgMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [days, setDays] = useState(() => generateMonthDays(currentMonth));
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  
  const monthIndex = bgMonth.getMonth();
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
    const prevMonth = subMonths(currentMonth, 1);
    
    setBgMonth(prevMonth);
    setFlipDirection('prev');
    setIsFlipping(true);
    
    setTimeout(() => {
      setCurrentMonth(prevMonth);
      clearSelection();
    }, 750); 

    setTimeout(() => {
      setIsFlipping(false);
      setFlipDirection(null);
    }, 1500); 
  };

  const goNextMonth = () => {
    if (isFlipping) return;
    const nextMonth = addMonths(currentMonth, 1);
    
    setBgMonth(nextMonth);
    setFlipDirection('next');
    setIsFlipping(true);
    
    setTimeout(() => {
      setCurrentMonth(nextMonth);
      clearSelection();
    }, 750); 
    
    setTimeout(() => {
      setIsFlipping(false);
      setFlipDirection(null);
    }, 1500); 
  };

  return (
    // Changed min-h-screen to min-h-[100dvh], overflow-hidden to overflow-x-hidden, and added items-start for mobile scrolling
    <div className="min-h-dvh p-4 py-8 md:p-12 relative overflow-x-hidden flex items-start md:items-center justify-center">
      
      {/* Background elements */}
      <div 
        className="fixed inset-0 bg-cover bg-center md:bg-top bg-no-repeat transition-all duration-700"
        style={{ backgroundImage: `url(${currentBg.image})`, opacity: currentBg.opacity }}
      />
      <div className="fixed inset-0 bg-stone-100 -z-10" />
      <div className="fixed inset-0 bg-white/30 backdrop-blur-[1px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-5xl w-full mx-auto relative z-10 mt-2 md:mt-8">
        
        {/* Click zones */}
        <div className="page-flip-zone top-left" onClick={goPrevMonth} />
        <div className="page-flip-zone bottom-right" onClick={goNextMonth} />

        <div className={`calendar-flip ${isFlipping ? `flipping-${flipDirection}` : ''}`}>
          
          <div className="bg-white rounded-2xl shadow-2xl relative border border-stone-200 overflow-hidden">
            
            {/* Realistic Spiral Binding Effect */}
            <div className="absolute -top-4 left-0 right-0 flex justify-evenly px-4 md:px-6 z-30 pointer-events-none">
              {[...Array(24)].map((_, i) => (
                <div key={`spiral-${i}`} className="relative hidden sm:block">
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-stone-900 shadow-inner" />
                  <div className="w-3 h-10 rounded-full bg-linear-to-b from-stone-300 via-stone-100 to-stone-400 shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-stone-400/50" />
                </div>
              ))}
              {/* Reduced spirals for mobile view */}
              {[...Array(12)].map((_, i) => (
                <div key={`spiral-mob-${i}`} className="relative sm:hidden">
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-stone-900 shadow-inner" />
                  <div className="w-2 h-8 rounded-full bg-linear-to-b from-stone-300 via-stone-100 to-stone-400 shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-stone-400/50" />
                </div>
              ))}
            </div>

            <HeroImage currentMonth={currentMonth} />

            <div className="p-4 md:p-8">
              <div className="fontchange flex flex-col sm:flex-row justify-between items-center sm:items-end gap-2 mb-6 mt-2">
                <div className="flex flex-col items-center sm:items-start gap-1">
                  <h2 className="text-3xl font-bold text-stone-800 tracking-tight text-center sm:text-left">
                    {format(currentMonth, 'MMMM yyyy')}
                  </h2>
                </div>
                <div className="flex flex-col text-2xl sm:text-3xl sm:items-end text-stone-600">
                  <span className="font-bold">
                    {format(new Date(), 'EEEE')}
                  </span>
                </div>
              </div>

              {/* Stack vertically on mobile (flex-col), side-by-side on desktop (lg:flex-row) */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                <div className="w-full lg:w-[55%]">
                  <CalendarGrid days={days} startDate={startDate} endDate={endDate} onDateClick={handleDateClick} />
                </div>
                <div className="w-full lg:w-[45%]">
                  <NotesPanel
                    startDate={startDate}
                    endDate={endDate}
                    currentMonth={currentMonth}
                    days={days}
                    onSave={saveNote}
                    loadNote={loadNote}
                    onSelectionChange={() => {}}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}