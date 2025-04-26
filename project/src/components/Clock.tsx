import React, { useState, useEffect } from 'react';
import { Clock as ClockIcon, Bell } from 'lucide-react';
import { useMedicineContext } from '../context/MedicineContext';
import { format, formatDistanceToNow } from 'date-fns';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const { getNextReminder } = useMedicineContext();
  const nextReminder = getNextReminder();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeDistance = (reminderTime: string) => {
    const [hours, minutes] = reminderTime.split(':');
    const [period] = reminderTime.split(' ');
    const hour = parseInt(hours) + (period === 'PM' && hours !== '12' ? 12 : 0);
    const reminderDate = new Date();
    reminderDate.setHours(hour, parseInt(minutes), 0);
    return formatDistanceToNow(reminderDate, { addSuffix: true });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-indigo-500/5 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <ClockIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 font-mono tracking-tight">
              {format(time, 'hh:mm a')}
            </h2>
            <p className="text-gray-500 text-lg">
              {format(time, 'EEEE, MMMM d')}
            </p>
          </div>
        </div>
        {nextReminder && (
          <div className="bg-indigo-50 p-4 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <Bell className="w-5 h-5 text-indigo-600" />
              <p className="text-lg font-semibold text-indigo-600">Next Reminder</p>
            </div>
            <p className="text-gray-600">{nextReminder.medicineName} - {nextReminder.time}</p>
            <p className="text-sm text-gray-500">{getTimeDistance(nextReminder.time)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clock;