import React from 'react';
import Calendar from '../components/Calendar';
import { CalendarClock, Calendar as CalendarIcon } from 'lucide-react';

const CalendarPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Calendar
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          View and manage your medication schedule
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Calendar />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg shadow-indigo-500/5">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <CalendarClock className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
            </div>
            <div className="space-y-3">
              {['8:00 AM', '2:00 PM', '8:00 PM'].map((time) => (
                <div key={time} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900 font-medium">{time}</span>
                  <span className="text-gray-500">Metformin (500mg)</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Monthly Overview</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Doses</span>
                <span className="font-semibold text-indigo-600">93</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">87</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Missed</span>
                <span className="font-semibold text-red-600">6</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;