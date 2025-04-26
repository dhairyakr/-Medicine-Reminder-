import React, { useState, useEffect } from 'react';
import { MedicineProvider } from './context/MedicineContext';
import Sidebar from './components/Sidebar';
import AddMedicineModal from './components/AddMedicineModal';
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/CalendarPage';
import Reminders from './pages/Reminders';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  const renderPage = () => {
    if (!isAuthenticated) {
      if (showRegister) {
        return (
          <RegisterPage
            onRegister={handleLogin}
            onBack={() => setShowRegister(false)}
          />
        );
      }
      return (
        <LoginPage
          onLogin={handleLogin}
          onRegister={() => setShowRegister(true)}
        />
      );
    }

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
        {isAuthenticated && (
          <Sidebar 
            onAddMedicine={() => setIsModalOpen(true)} 
            onPageChange={setCurrentPage}
            currentPage={currentPage}
            onLogout={handleLogout}
          />
        )}

        <main className={`flex-1 ${isAuthenticated ? 'p-8' : ''} overflow-auto`}>
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>

        {isAuthenticated && (
          <AddMedicineModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </MedicineProvider>
  );
}

export default App;