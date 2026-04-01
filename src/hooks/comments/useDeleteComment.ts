import { toast } from 'sonner';

import { confirm } from '@/components/ConfirmDialog';
import { apiFetchJson } from '@/lib/apiFetch';

type ActionResponse = {
  message: string;
};

export function useDeleteComment() {
  async function handleDelete(commentId: string) {
    const result = await confirm({ message: 'Are you sure you want to delete this comment?' });

    if (result) {
      const { message } = await apiFetchJson<ActionResponse>(`/comments/${commentId}`, {
        method: 'DELETE',
      });

      toast.success(message ?? 'Comment deleted successfully');
    }
  }

  return { handleDelete };
}
