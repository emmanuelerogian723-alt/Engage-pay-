import React, { useState } from 'react';
import { User, UserRole, Notification } from '../types';
import { SunIcon, MoonIcon, TrendingUpIcon, BellIcon, LogoutIcon } from './icons';

interface HeaderProps {
  currentUser: User | null;
  viewRole: UserRole; // This is the role the admin is currently viewing as
  setUserRole: (role: UserRole) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onAuthClick: () => void;
  onProfileClick: () => void;
  onLogoClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, viewRole, setUserRole, theme, toggleTheme, onAuthClick, onProfileClick, onLogoClick, onLogout }) => {
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const roles = Object.values(UserRole);

  const mockNotifications: Notification[] = [
      { id: '1', message: 'New campaign "Summer Fun" is now available!', read: false, createdAt: new Date().toISOString() },
      { id: '2', message: 'Your task submission was approved.', read: true, createdAt: new Date().toISOString() },
  ];

  const getRoleButtonStyle = (role: UserRole) => {
    return viewRole === role
      ? 'bg-primary-500 text-white'
      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600';
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button onClick={onLogoClick} className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-lg p-1 -ml-1">
          <TrendingUpIcon className="w-8 h-8 text-primary-500" />
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">EngagePay</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Grow your influence. Earn while you engage.</p>
          </div>
        </button>
        
        {currentUser && currentUser.role === UserRole.Admin && (
            <div className="flex-1 flex justify-center px-4">
                <div className="bg-gray-100 dark:bg-gray-900 p-1 rounded-full flex items-center space-x-1">
                    {roles.map((role) => (
                    <button
                        key={role}
                        onClick={() => setUserRole(role)}
                        className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200 ${getRoleButtonStyle(role)}`}
                    >
                        {role}
                    </button>
                    ))}
                </div>
            </div>
        )}

        <div className="flex items-center space-x-2">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800"
                aria-label="Toggle theme"
            >
                {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
            </button>
          
            {currentUser ? (
                <>
                    <div className="relative">
                         <button
                            onClick={() => setNotificationsOpen(!isNotificationsOpen)}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            aria-label="Toggle notifications"
                        >
                            <BellIcon className="h-6 w-6" />
                            {mockNotifications.some(n => !n.read) && <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>}
                        </button>
                        {isNotificationsOpen && (
                             <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700">
                                <div className="p-3 font-bold border-b dark:border-gray-700">Notifications</div>
                                <ul className="py-1 max-h-96 overflow-y-auto">
                                    {mockNotifications.map(n => (
                                        <li key={n.id} className={`px-4 py-2 text-sm ${!n.read ? 'font-semibold' : ''} text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}>{n.message}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={onProfileClick}
                        className="flex items-center space-x-2 p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        aria-label="Open user profile"
                    >
                        <img src={currentUser.avatar} alt="User Avatar" className="h-8 w-8 rounded-full" />
                        <span className="hidden sm:inline font-semibold text-sm pr-2">{currentUser.name}</span>
                    </button>
                     <button
                        onClick={onLogout}
                        className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        aria-label="Logout"
                    >
                        <LogoutIcon className="h-6 w-6" />
                    </button>
                </>
            ) : (
                <button 
                    onClick={onAuthClick}
                    className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-colors duration-200">
                        Login / Sign Up
                </button>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;