import React from 'react';
import { Calendar, Layout, PlusCircle, User, Settings, Bell, PieChart, LogOut } from 'lucide-react';

interface SidebarProps {
  onAddMedicine: () => void;
  onPageChange: (page: string) => void;
  currentPage: string;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onAddMedicine, onPageChange, currentPage, onLogout }) => {
  const userName = localStorage.getItem('userName') || 'User';
  const userEmail = localStorage.getItem('userEmail') || '';

  const NavButton = ({ id, icon: Icon, label }: { id: string; icon: any; label: string }) => (
    <button
      onClick={() => onPageChange(id)}
      className={`flex items-center space-x-3 w-full px-4 py-3 text-gray-700 rounded-xl transition-all ${
        currentPage === id
          ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100'
          : 'hover:bg-gray-50'
      }`}
    >
      <Icon className={`w-5 h-5 ${currentPage === id ? 'text-indigo-600' : 'text-gray-500'}`} />
      <span className={currentPage === id ? 'font-medium' : ''}>{label}</span>
    </button>
  );

  return (
    <aside className="w-72 bg-white shadow-xl shadow-indigo-500/5 p-6">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{userName}</h2>
          <p className="text-sm text-gray-500">{userEmail}</p>
        </div>
      </div>

      <nav className="space-y-2">
        <NavButton id="dashboard" icon={Layout} label="Dashboard" />
        <NavButton id="calendar" icon={Calendar} label="Calendar" />
        <NavButton id="reminders" icon={Bell} label="Reminders" />
        <NavButton id="reports" icon={PieChart} label="Reports" />
        <NavButton id="settings" icon={Settings} label="Settings" />
      </nav>

      <div className="mt-8">
        <button
          onClick={onAddMedicine}
          className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Medicine
        </button>
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Quick Stats</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Medicines</span>
            <span className="text-sm font-semibold text-indigo-600">6</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Today's Doses</span>
            <span className="text-sm font-semibold text-indigo-600">4/8</span>
          </div>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="mt-8 w-full flex items-center justify-center px-4 py-3 text-gray-700 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Sign Out
      </button>
    </aside>
  );
};

export default Sidebar;