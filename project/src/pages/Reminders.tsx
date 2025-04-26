import React from 'react';
import { Bell, Clock, Calendar, Repeat, Settings } from 'lucide-react';

const ReminderCard = ({ time, medicine, type, status }: { time: string; medicine: string; type: string; status: string }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg shadow-indigo-500/5 hover:shadow-xl transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <Bell className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{time}</h3>
          <p className="text-gray-500">{medicine}</p>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {status}
      </span>
    </div>
    <div className="flex items-center space-x-4 text-sm text-gray-500">
      <div className="flex items-center">
        <Clock className="w-4 h-4 mr-1" />
        Daily
      </div>
      <div className="flex items-center">
        <Calendar className="w-4 h-4 mr-1" />
        All days
      </div>
    </div>
  </div>
);

const Reminders = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Reminders
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Manage your medication reminders and notifications
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ReminderCard
            time="8:00 AM"
            medicine="Metformin (500mg)"
            type="Daily"
            status="Active"
          />
          <ReminderCard
            time="2:00 PM"
            medicine="Vitamin D3 (2000 IU)"
            type="Daily"
            status="Active"
          />
          <ReminderCard
            time="8:00 PM"
            medicine="Metformin (500mg)"
            type="Daily"
            status="Active"
          />
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg shadow-indigo-500/5">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-indigo-600" />
                  Add New Reminder
                </span>
                <span className="text-gray-400">+</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="flex items-center">
                  <Repeat className="w-5 h-5 mr-2 text-indigo-600" />
                  Manage Schedule
                </span>
                <span className="text-gray-400">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-indigo-600" />
                  Notification Settings
                </span>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Statistics</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Reminders</span>
                <span className="font-semibold text-indigo-600">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Today's Remaining</span>
                <span className="font-semibold text-amber-600">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Completed Today</span>
                <span className="font-semibold text-green-600">5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;