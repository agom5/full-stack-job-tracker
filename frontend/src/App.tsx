import React from 'react';
import { Loader2 } from 'lucide-react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAuth } from './hooks/useAuth';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import ThemeToggle from './components/ThemeToggle';

const AppContent: React.FC = () => {
  const { token, isLoading } = useAuth();
  // The darkMode logic is now handled globally by the ThemeProvider

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  // FIX: We remove the `className` logic from this div.
  return (
    <div>
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 min-h-screen font-sans text-gray-900 dark:text-white transition-colors duration-300">
        <ThemeToggle />
        {token ? <Dashboard /> : <AuthForm />}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
