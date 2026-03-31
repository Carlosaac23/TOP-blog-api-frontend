import { useNavigate } from 'react-router-dom';

import type { LoginUserInput } from '@/schemas/userSchema';

import { useAuth } from '@/context/AuthProvider';
export function useSignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (values: LoginUserInput) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const { token } = await res.json();

    await signIn(token);
    navigate('/home');
  };

  return { handleSubmit };
}
