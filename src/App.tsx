import { Route, Routes } from 'react-router-dom';

import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';
import PrivateLayout from '@/layouts/PrivateLayout';
import PublicLayout from '@/layouts/PublicLayout';
import PublicHome from '@/pages/Home';
import PrivateHome from '@/pages/private/Home';

export default function App() {
  return (
    <main>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<PublicLayout />}>
          <Route index element={<PublicHome />} />
          <Route path='sign-up' element={<SignUpForm />} />
          <Route path='sign-in' element={<SignInForm />} />
        </Route>

        {/* Private Routes */}
        <Route path='/profile' element={<PrivateLayout />}>
          <Route index element={<PrivateHome />} />
        </Route>
      </Routes>
    </main>
  );
}
