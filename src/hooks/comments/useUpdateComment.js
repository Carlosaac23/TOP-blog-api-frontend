import { toast } from 'sonner';

import { apiFetchJson } from '@/lib/apiFetch';

export function useUpdateComment() {
  async function handleUpdate(commentId, values) {
    const { message } = await apiFetchJson(`/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify(values),
    });

    toast.success(message ?? 'Comment updated successfully');
  }

  return { handleUpdate };
}
