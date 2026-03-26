import { Route, Routes } from 'react-router-dom';

import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';
import PublicLayout from '@/layouts/PublicLayout';
import Hero from '@/pages/Home';

export default function App() {
  return (
    <main>
      <Routes>
        <Route path='/' element={<PublicLayout />}>
          <Route index element={<Hero />} />
          <Route path='sign-up' element={<SignUpForm />} />
          <Route path='sign-in' element={<SignInForm />} />
        </Route>
      </Routes>
    </main>
  );
}
