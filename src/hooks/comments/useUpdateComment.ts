import { toast } from 'sonner';

import type { CreateCommentInput } from '@/schemas/formSchema';

import { apiFetchJson } from '@/lib/apiFetch';

type ActionResponse = { message: string };

export function useUpdateComment() {
  async function handleUpdate(commentId: string, values: CreateCommentInput) {
    const { message } = await apiFetchJson<ActionResponse>(`/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify(values),
    });

    toast.success(message ?? 'Comment updated successfully');
  }

  return { handleUpdate };
}
