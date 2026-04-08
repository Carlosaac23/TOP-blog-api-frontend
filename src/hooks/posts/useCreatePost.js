import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { apiFetchJson } from '@/lib/apiFetch';

export function useCreatePost() {
  const navigate = useNavigate();

  const handleCreate = async values => {
    const { message } = await apiFetchJson('/posts', {
      method: 'POST',
      body: JSON.stringify(values),
    });

    toast.success(message ?? 'Post created successfully');
    navigate('/home');
  };

  return { handleCreate };
}
