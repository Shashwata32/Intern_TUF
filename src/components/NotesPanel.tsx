import { useState, useEffect } from 'react';
import { getNoteContext } from '../utils/calenderHelpers';
import { isSameDay } from 'date-fns';

// Added CalendarDay interface to type the days prop properly
interface CalendarDay {
  date: Date;
  holidayName?: string;
  [key: string]: any;
}

interface NotesPanelProps {
  startDate: Date | null;
  endDate: Date | null;
  currentMonth: Date;
  days: CalendarDay[]; // NEW: Accept days array from parent
  onSave: (key: string, note: string) => void;
  loadNote: (key: string) => string | null;
  onSelectionChange: () => void;
}

export default function NotesPanel({ startDate, endDate, currentMonth, days, onSave, loadNote, onSelectionChange }: NotesPanelProps) {
  const [noteText, setNoteText] = useState('');
  const [context, setContext] = useState({ key: '', label: '' });
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    const newContext = getNoteContext(startDate, endDate, currentMonth);
    setContext(newContext);
    const savedNote = loadNote(newContext.key);
    setNoteText(savedNote || '');
    setIsSaved(false);
    onSelectionChange();
  }, [startDate, endDate, currentMonth, loadNote, onSelectionChange]);
  
  const handleSave = () => {
    onSave(context.key, noteText);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };
  
  const handleClear = () => {
    setNoteText('');
    onSave(context.key, '');
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Safely find the selected day to check if it's a holiday
  const selectedDayData = days.find(d => startDate && isSameDay(d.date, startDate));
  const holidayReason = selectedDayData?.holidayName;
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-5 border border-stone-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-black-700 flex items-center gap-2">
          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Notes
        </h3>
        {isSaved && <span className="text-xs text-green-600 animate-pulse">✓ Saved</span>}
      </div>
      
      <div className="mb-3">
        <p className="text-xs text-stone-500 bg-stone-50 p-2 rounded-md">{context.label}</p>
      </div>

      {/* NEW: Read-only un-deletable holiday banner */}
      {holidayReason && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm font-medium">
          Holiday: {holidayReason}
        </div>
      )}
      
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write your notes here... (memos, reminders, or event details)"
        className="w-full h-32 p-3 text-sm border border-stone-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none resize-none bg-stone-50"
      />
      
      <div className="flex gap-2 mt-3">
        <button onClick={handleSave} className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
          Save Note
        </button>
        <button onClick={handleClear} className="px-4 py-2 bg-stone-200 text-stone-600 rounded-lg text-sm font-medium hover:bg-stone-300 transition-colors">
          Clear
        </button>
      </div>
      
    </div>
  );
}