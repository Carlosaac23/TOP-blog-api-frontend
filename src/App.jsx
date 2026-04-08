import { Route, Routes } from 'react-router-dom';

import CreatePost from '@/components/forms/CreatePost';
import SignIn from '@/components/forms/SignIn';
import SignUp from '@/components/forms/SignUp';
import PrivateLayout from '@/layouts/PrivateLayout';
import PublicLayout from '@/layouts/PublicLayout';
import PublicHome from '@/pages/Home';
import PrivateHome from '@/pages/private/Home';
import PrivateProfile from '@/pages/private/Profile';

export default function App() {
  return (
    <main>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<PublicLayout />}>
          <Route index element={<PublicHome />} />
          <Route path='sign-up' element={<SignUp />} />
          <Route path='sign-in' element={<SignIn />} />
        </Route>

        {/* Private Routes */}
        <Route path='/home' element={<PrivateLayout />}>
          <Route index element={<PrivateHome />} />
          <Route path='profile' element={<PrivateProfile />} />
          <Route path='create-post' element={<CreatePost />} />
        </Route>
      </Routes>
    </main>
  );
}
