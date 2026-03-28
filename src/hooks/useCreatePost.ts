import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import type { CreatePostInput } from '@/schemas/formSchema';

import { axiosClient } from '@/config/axios';
export function useCreatePost() {
  const navigate = useNavigate();

  const handleSubmit = async (values: CreatePostInput) => {
    const { data } = await axiosClient.post('/posts', values);

    toast.success(data?.message);
    navigate('/home');
  };

  return { handleSubmit };
}
