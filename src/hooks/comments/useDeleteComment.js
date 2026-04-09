import { toast } from 'sonner';

import { confirm } from '@/components/ConfirmDialog';
import { apiFetchJson } from '@/lib/apiFetch';

export function useDeleteComment() {
  async function handleDelete(commentId) {
    const result = await confirm({ message: 'Are you sure you want to delete this comment?' });
    if (!result) return false;

    if (result) {
      const { message } = await apiFetchJson(`/comments/${commentId}`, {
        method: 'DELETE',
      });

      toast.success(message ?? 'Comment deleted successfully');
      return true;
    }
  }

  return { handleDelete };
}
