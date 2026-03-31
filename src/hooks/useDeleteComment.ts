import { toast } from 'sonner';

import { confirm } from '@/components/ConfirmDialog';
import { getToken } from '@/helpers/getToken';

export function useDeleteComment() {
  async function handleDelete(commentId: string) {
    const result = await confirm({ message: 'Are you sure you want to delete this comment?' });

    if (result) {
      const token = getToken();

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comments/${commentId}`, {
        method: 'DELETE',
        headers,
      });

      const { message } = await res.json();
      toast.success(message ?? 'Comment deleted successfully');
    }
  }

  return { handleDelete };
}
