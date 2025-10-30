import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CreatorDashboard from './components/CreatorDashboard';
import EngagerDashboard from './components/EngagerDashboard';
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';
import { UserRole } from './types';
import Chatbot from './components/Chatbot';
import SignUpModal from './components/SignUpModal';
import { ChatIcon } from './components/icons';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.Engager);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isChatOpen, setChatOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'profile'>('dashboard');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const renderCurrentPage = () => {
    if (currentPage === 'profile') {
        return <UserProfile userRole={userRole} onNavigateBack={() => setCurrentPage('dashboard')} />;
    }

    switch (userRole) {
      case UserRole.Creator:
        return <CreatorDashboard />;
      case UserRole.Engager:
        return <EngagerDashboard />;
      case UserRole.Admin:
        return <AdminDashboard />;
      default:
        return <EngagerDashboard />;
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <Header
        userRole={userRole}
        setUserRole={(role) => {
            setUserRole(role);
            setCurrentPage('dashboard'); // Switch back to dashboard when role changes
        }}
        theme={theme}
        toggleTheme={toggleTheme}
        onSignUpClick={() => setSignUpModalOpen(true)}
        onProfileClick={() => setCurrentPage('profile')}
        onLogoClick={() => setCurrentPage('dashboard')}
      />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {renderCurrentPage()}
      </main>
      
      <SignUpModal isOpen={isSignUpModalOpen} onClose={() => setSignUpModalOpen(false)} />
      <Chatbot isOpen={isChatOpen} onClose={() => setChatOpen(false)} />

      <button
        onClick={() => setChatOpen(true)}
        className={`fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${isChatOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
        aria-label="Open chat"
      >
        <ChatIcon className="h-8 w-8" />
      </button>
    </div>
  );
};

export default App;
