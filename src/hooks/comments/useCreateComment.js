import { toast } from 'sonner';

import { apiFetchJson } from '@/lib/apiFetch';

export function useCreateComment(postId) {
  const handleCreate = async values => {
    const { message } = await apiFetchJson(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify(values),
    });

    toast.success(message ?? 'Comment created successfully');
  };

  return { handleCreate };
}
