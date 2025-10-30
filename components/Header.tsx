import React from 'react';
import { UserRole } from '../types';
import { SunIcon, MoonIcon, TrendingUpIcon, UserIcon } from './icons';

interface HeaderProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onSignUpClick: () => void;
  onProfileClick: () => void;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, setUserRole, theme, toggleTheme, onSignUpClick, onProfileClick, onLogoClick }) => {
  const roles = Object.values(UserRole);

  const getRoleButtonStyle = (role: UserRole) => {
    return userRole === role
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

        <div className="flex items-center space-x-2">
           <button className="hidden sm:block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                Log In
            </button>
            <button 
              onClick={onSignUpClick}
              className="hidden sm:block px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-colors duration-200">
                Sign Up
            </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
          </button>
          <button
            onClick={onProfileClick}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800"
            aria-label="Open user profile"
          >
            <UserIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
