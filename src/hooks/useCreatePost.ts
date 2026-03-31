import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import type { CreatePostInput } from '@/schemas/formSchema';

import { getToken } from '@/helpers/getToken';
export function useCreatePost() {
  const navigate = useNavigate();

  const handleSubmit = async (values: CreatePostInput) => {
    const token = getToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts`, {
      method: 'POST',
      headers,
      body: JSON.stringify(values),
    });

    const { message } = await res.json();
    toast.success(message ?? 'Post created successfully');
    navigate('/home');
  };

  return { handleSubmit };
}
