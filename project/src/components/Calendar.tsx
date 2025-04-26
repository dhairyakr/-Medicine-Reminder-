import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import { useMedicineContext } from '../context/MedicineContext';
import { Reminder } from '../types';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const { getRemindersForDate } = useMedicineContext();

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const ReminderBadge: React.FC<{ reminder: Reminder }> = ({ reminder }) => (
    <div
      className={`
        text-xs p-1.5 rounded-lg flex items-center justify-between
        ${reminder.completed ? 'bg-opacity-20' : 'bg-opacity-30'}
        transition-all duration-200 hover:scale-105
      `}
      style={{ backgroundColor: reminder.color }}
    >
      <span className="flex-1 truncate text-gray-900">{reminder.medicineName}</span>
      <span className="ml-2">
        {reminder.completed ? (
          <CheckCircle2 className="w-4 h-4 text-green-600" />
        ) : (
          <XCircle className="w-4 h-4 text-amber-600" />
        )}
      </span>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg shadow-indigo-500/5 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-indigo-600" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-indigo-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}

        {days.map((day, dayIdx) => {
          const reminders = getRemindersForDate(day);
          const hasUncompletedReminders = reminders.some(r => !r.completed);
          
          return (
            <div
              key={day.toString()}
              className={`
                min-h-[120px] p-2 border border-gray-100 relative group
                ${isToday(day) ? 'bg-indigo-50 ring-2 ring-indigo-200' : 'hover:bg-gray-50'}
                ${dayIdx === 0 ? `col-start-${day.getDay() + 1}` : ''}
                transition-all duration-200
              `}
            >
              <span
                className={`
                  inline-flex w-7 h-7 items-center justify-center rounded-full text-sm
                  ${isToday(day) ? 'bg-indigo-600 text-white' : 'text-gray-700'}
                  group-hover:scale-110 transition-transform duration-200
                `}
              >
                {format(day, 'd')}
              </span>
              
              {reminders.length > 0 && (
                <div className="mt-2 space-y-1">
                  {reminders.map((reminder) => (
                    <ReminderBadge key={reminder.id} reminder={reminder} />
                  ))}
                </div>
              )}

              {hasUncompletedReminders && (
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;