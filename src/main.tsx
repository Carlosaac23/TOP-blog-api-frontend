import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App.tsx';
import { Toaster } from '@/components/ui/sonner';
import '@/index.css';
import { AuthProvider } from '@/context/AuthProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
