import { useNavigate } from 'react-router-dom';

import type { LoginUserInput } from '@/schemas/userSchema';

import { useAuth } from '@/context/AuthProvider';
import { apiFetchJson } from '@/lib/apiFetch';

type LoginResponse = {
  token: string;
};

export function useSignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (values: LoginUserInput) => {
    const { token } = await apiFetchJson<LoginResponse>('/', {
      method: 'POST',
      auth: false,
      body: JSON.stringify(values),
    });

    await signIn(token);
    navigate('/home');
  };

  return { handleSubmit };
}
