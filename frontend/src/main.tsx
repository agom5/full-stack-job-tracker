import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// FIX: Change the import to a relative path
import './styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
