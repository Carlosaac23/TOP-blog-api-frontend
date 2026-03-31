import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/context/AuthProvider';

export default function PrivateLayout() {
  const { auth, loadingAuth } = useAuth();

  if (loadingAuth) {
    return (
      <main className='flex min-h-screen flex-col items-center justify-center'>
        <Spinner />
      </main>
    );
  }

  if (!auth?.id) {
    return <Navigate to='/' replace />;
  }

  return (
    <main className='flex min-h-screen flex-col'>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
