import { useState, useEffect, useCallback } from 'react';
import { addMonths, subMonths, isSameDay, format } from 'date-fns';
import { generateMonthDays } from '../utils/calenderHelpers';
import CalendarGrid from './CalenderGrid';
import NotesPanel from './NotesPanel';
import HeroImage from './HeroImage';

// Theme background images (subtle, low opacity)
const monthBackgrounds = [
  { image: "../assets/bg/Array.png", opacity: 0.9 },
  { image: "../assets/bg/2pointers.png", opacity: 0.9 },
  { image: "../assets/bg/SlidingWindow.png", opacity: 0.9 },
  { image: "../assets/bg/BinarySearch.png", opacity: 0.9 },
  { image: "../assets/bg/Stack.png", opacity: 0.9 },
  { image: "../assets/bg/LinkedList.png", opacity: 0.9 },
  { image: "../assets/bg/Tree.png", opacity: 0.9 },
  { image: "../assets/bg/Bit.png", opacity: 0.9 },
  { image: "../assets/bg/Heap.png", opacity: 0.9 },
  { image: "../assets/bg/Trie.png", opacity: 0.9 },
  { image: "../assets/bg/DynammicProgramming.png", opacity: 0.9 },
  { image: "../assets/bg/Graph.png", opacity: 0.9 },
];

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bgMonth, setBgMonth] = useState(new Date()); // Controls background instantly
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
    <div className="min-h-screen p-4 md:p-12 relative overflow-hidden flex items-center justify-center">
      {/* Background elements (these stay fixed and fade instantly) */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{ backgroundImage: `url(${currentBg.image})`, opacity: currentBg.opacity }}
      />
      <div className="fixed inset-0 bg-stone-100 -z-10" />
      <div className="fixed inset-0 bg-white/30 backdrop-blur-[1px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-4xl w-full mx-auto relative z-10 mt-8">
        
        {/* Click zones stay fixed so they don't swipe away */}
        <div className="page-flip-zone top-left" onClick={goPrevMonth} />
        <div className="page-flip-zone bottom-right" onClick={goNextMonth} />

        {/* 1.5s Swipe Container wrapping the ENTIRE Wall Calendar Card */}
        <div className={`calendar-flip ${isFlipping ? `flipping-${flipDirection}` : ''}`}>
          
          <div className="bg-white rounded-2xl shadow-2xl relative border border-stone-200 overflow-hidden">
            
            {/* Realistic Spiral Binding Effect */}
            <div className="absolute -top-4 left-0 right-0 flex justify-evenly px-6 z-30 pointer-events-none">
              {[...Array(24)].map((_, i) => (
                <div key={`spiral-${i}`} className="relative">
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-stone-900 shadow-inner" />
                  <div className="w-3 h-10 rounded-full bg-gradient-to-b from-stone-300 via-stone-100 to-stone-400 shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-stone-400/50" />
                </div>
              ))}
            </div>

            {/* Hero Image */}
            <HeroImage currentMonth={currentMonth} />

            {/* Rest of the UI (Padded) */}
            <div className="p-6 md:p-8">

              {/* Status & Controls Bar */}
              <div className="fontchange flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
                
                <div className="flex flex-col items-start gap-2">
                  <h2 className="text-3xl font-bold text-stone-800 tracking-tight">
                    {format(currentMonth, 'MMMM yyyy')}
                  </h2>
                </div>

                {/* Current Day Display */}
                <div className="flex flex-col text-3xl sm:items-end">
                  <span className="font-bold">
                    {format(new Date(), 'EEEE')}
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-55/100">
                  {/* Grid is no longer the ONLY thing swiping */}
                  <CalendarGrid days={days} startDate={startDate} endDate={endDate} onDateClick={handleDateClick} />
                </div>
                <div className="md:w-45/100">
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
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}