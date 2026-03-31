import { toast } from 'sonner';

import { confirm } from '@/components/ConfirmDialog';
import { getToken } from '@/helpers/getToken';

export function useDeletePost() {
  async function handleDelete(postId: string) {
    const result = await confirm({ message: 'Are you sure you want to delete this post?' });

    if (result) {
      const token = getToken();

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}`, {
        method: 'DELETE',
        headers,
      });

      const { message } = await res.json();
      toast.success(message ?? 'Post deleted successfully');
    }
  }

  return { handleDelete };
}
