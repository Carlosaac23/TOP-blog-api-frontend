import { useNavigate } from 'react-router-dom';

import type { LoginUserInput } from '@/schemas/userSchema';

import { axiosClient } from '@/config/axios';
import { useAuth } from '@/context/AuthProvider';
export function useSignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (values: LoginUserInput) => {
    const { data } = await axiosClient.post('/', values);
    const { token } = data;

    await signIn(token);
    navigate('/home');
  };

  return { handleSubmit };
}
