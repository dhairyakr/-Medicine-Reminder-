import React from 'react';
import Clock from '../components/Clock';
import Calendar from '../components/Calendar';
import MedicineList from '../components/MedicineList';
import { PlusCircle, TrendingUp, Users, Pill, AlertCircle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg shadow-indigo-500/5">
    <div className="flex items-center space-x-4">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shadow-lg shadow-indigo-500/20`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Medicine Dashboard
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Track and manage your medications with ease
        </p>
      </div>

      <Clock />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Medicines"
          value="12"
          icon={Pill}
          color="bg-gradient-to-br from-indigo-500 to-indigo-600"
        />
        <StatCard
          title="Active Prescriptions"
          value="8"
          icon={TrendingUp}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          title="Upcoming Refills"
          value="3"
          icon={AlertCircle}
          color="bg-gradient-to-br from-amber-500 to-amber-600"
        />
        <StatCard
          title="Healthcare Providers"
          value="2"
          icon={Users}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>

      <Calendar />
      <MedicineList />
    </div>
  );
};

export default Dashboard;