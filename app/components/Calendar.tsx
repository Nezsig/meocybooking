'use client';

import { useState } from 'react';

interface BookedDate {
  booking_date: string;
  name: string;
  email: string;
}

interface CalendarProps {
  bookedDates: BookedDate[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export default function Calendar({ bookedDates, selectedDate, onSelectDate }: CalendarProps) {
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [viewYear, setViewYear] = useState(new Date().getFullYear());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const bookedDateSet = new Set(bookedDates.map(d => d.booking_date));

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDay = new Date(viewYear, viewMonth, 1);
  const lastDay = new Date(viewYear, viewMonth + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = lastDay.getDate();

  const days: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const handlePrevMonth = () => {
    if (!isCurrentMonth) {
      setViewMonth(prev => (prev === 0 ? 11 : prev - 1));
      setViewYear(prev => (viewMonth === 0 ? prev - 1 : prev));
    }
  };

  const handleNextMonth = () => {
    setViewMonth(prev => (prev === 11 ? 0 : prev + 1));
    setViewYear(prev => (viewMonth === 11 ? prev + 1 : prev));
  };

  const formatDate = (day: number) => {
    return `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getDateStatus = (day: number) => {
    const dateStr = formatDate(day);
    const cellDate = new Date(viewYear, viewMonth, day);
    cellDate.setHours(0, 0, 0, 0);

    const isBooked = bookedDateSet.has(dateStr);
    const isPast = cellDate < today;
    const isSelected = selectedDate === dateStr;
    const isAvailable = !isBooked && !isPast;

    return { isBooked, isPast, isSelected, isAvailable, dateStr };
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          disabled={isCurrentMonth}
          className="px-3 py-1 text-sm font-medium text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed hover:text-gray-900"
        >
          ← Previous
        </button>
        <h3 className="text-lg font-semibold text-gray-900">
          {monthNames[viewMonth]} {viewYear}
        </h3>
        <button
          onClick={handleNextMonth}
          className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Next →
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="h-10" />;
          }

          const { isBooked, isPast, isSelected, isAvailable, dateStr } = getDateStatus(day);

          return (
            <button
              key={dateStr}
              onClick={() => isAvailable && onSelectDate(dateStr)}
              disabled={!isAvailable}
              className={`h-10 rounded-lg font-medium text-sm transition ${
                isSelected
                  ? 'bg-gray-900 text-white'
                  : isBooked
                  ? 'bg-red-100 text-red-900 cursor-not-allowed'
                  : isPast
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-gray-400 cursor-pointer'
              }`}
              title={
                isBooked ? 'Date booked' : isPast ? 'Date has passed' : isSelected ? 'Selected' : 'Available'
              }
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-600 space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
          Available
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          Booked
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
          Past date
        </div>
      </div>
    </div>
  );
}
