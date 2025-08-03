import React, { useState, useEffect } from 'react';
import { MedicineProvider } from './context/MedicineContext';
import Sidebar from './components/Sidebar';
import AddMedicineModal from './components/AddMedicineModal';
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/CalendarPage';
import Reminders from './pages/Reminders';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'calendar':
        return <CalendarPage />;
      case 'reminders':
        return <Reminders />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <MedicineProvider>
      <div className="min-h-screen flex bg-transparent">
        <Sidebar 
          onAddMedicine={() => setIsModalOpen(true)} 
          onPageChange={setCurrentPage}
          currentPage={currentPage}
        />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>

        <AddMedicineModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </MedicineProvider>
  );
}

export default App;