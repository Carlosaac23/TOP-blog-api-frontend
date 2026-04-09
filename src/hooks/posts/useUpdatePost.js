import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { apiFetchJson } from '@/lib/apiFetch';

export function useUpdatePost() {
  const navigate = useNavigate();

  async function handleUpdate(postId, values) {
    const { message } = await apiFetchJson(`/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(values),
    });

    toast.success(message ?? 'Post updated successfully');
    navigate('/home', { replace: true });
  }

  return { handleUpdate };
}
