import { toast } from 'sonner';

import type { CreatePostInput } from '@/schemas/formSchema';

import { apiFetchJson } from '@/lib/apiFetch';

type ActionResponse = { message: string };

export function useUpdatePost() {
  async function handleUpdate(postId: string, values: CreatePostInput) {
    const { message } = await apiFetchJson<ActionResponse>(`/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(values),
    });

    toast.success(message ?? 'Post updated successfully');
  }

  return { handleUpdate };
}
