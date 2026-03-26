import { useNavigate } from 'react-router-dom';

import type { LoginUserInput } from '@/schemas/userSchema';

import { axiosClient } from '@/config/axios';
export function useSignIn() {
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginUserInput) => {
    const { data } = await axiosClient.post('/', values);
    const { token } = data;

    localStorage.setItem('bloggering_token', token);
    navigate('/profile');
  };

  return { handleSubmit };
}
