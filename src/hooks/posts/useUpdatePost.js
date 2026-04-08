import { toast } from 'sonner';

import { apiFetchJson } from '@/lib/apiFetch';

export function useUpdatePost() {
  async function handleUpdate(postId, values) {
    const { message } = await apiFetchJson(`/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(values),
    });

    toast.success(message ?? 'Post updated successfully');
  }

  return { handleUpdate };
}
