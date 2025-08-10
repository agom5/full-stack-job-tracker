import React from 'react';
import { Sun, Moon } from 'lucide-react';
// FIX: Import the hook from its proper location in the hooks directory
import { useTheme } from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleDarkMode}
        className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? (
          <Sun className="h-5 w-5 text-yellow-500" />
        ) : (
          <Moon className="h-5 w-5 text-gray-700" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
