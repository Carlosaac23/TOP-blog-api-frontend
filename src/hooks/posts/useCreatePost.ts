import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import type { CreatePostInput } from '@/schemas/formSchema';

import { apiFetchJson } from '@/lib/apiFetch';

type ActionResponse = {
  message: string;
};

export function useCreatePost() {
  const navigate = useNavigate();

  const handleSubmit = async (values: CreatePostInput) => {
    const { message } = await apiFetchJson<ActionResponse>('/posts', {
      method: 'POST',
      body: JSON.stringify(values),
    });

    toast.success(message ?? 'Post created successfully');
    navigate('/home');
  };

  return { handleSubmit };
}
