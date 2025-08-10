import React, { useState, useEffect, ReactNode } from 'react';
import { ThemeContext } from './ThemeContextUtils';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme !== null) {
      return JSON.parse(storedTheme);
    }
    if (window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  // This first effect handles saving the theme and applying the CSS class
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // --- ADDED THIS NEW BLOCK ---
  // This new effect listens for changes in the user's OS theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // This function will be called when the OS theme changes
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    // Add the event listener
    mediaQuery.addEventListener('change', handleChange);

    // This is a cleanup function that removes the listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []); // The empty array ensures this effect only runs once on mount

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
