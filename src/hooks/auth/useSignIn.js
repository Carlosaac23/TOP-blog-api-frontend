import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/context/AuthProvider';
import { apiFetchJson } from '@/lib/apiFetch';

export function useSignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async values => {
    const { token } = await apiFetchJson('/', {
      method: 'POST',
      auth: false,
      body: JSON.stringify(values),
    });

    await signIn(token);
    navigate('/home');
  };

  return { handleSubmit };
}
