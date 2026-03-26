import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthProvider';

export default function PrivateLayout() {
  const { auth } = useAuth();

  return (
    <main>
      {auth?.sub ? (
        <main>
          <Header />
          <Outlet />
          <Footer />
        </main>
      ) : (
        <Navigate to='/' />
      )}
    </main>
  );
}
