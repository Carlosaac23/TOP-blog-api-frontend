import { toast } from 'sonner';

import { confirm } from '@/components/ConfirmDialog';
import { apiFetchJson } from '@/lib/apiFetch';

type ActionResponse = {
  message: string;
};

export function useDeletePost() {
  async function handleDelete(postId: string) {
    const result = await confirm({ message: 'Are you sure you want to delete this post?' });

    if (result) {
      const { message } = await apiFetchJson<ActionResponse>(`/posts/${postId}`, {
        method: 'DELETE',
      });

      toast.success(message ?? 'Post deleted successfully');
    }
  }

  return { handleDelete };
}
