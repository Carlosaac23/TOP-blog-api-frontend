import { toast } from 'sonner';

import type { CreateCommentInput } from '@/schemas/formSchema';

import { apiFetchJson } from '@/lib/apiFetch';

type ActionResponse = {
  message: string;
};

export function useCreateComment(postId: string) {
  const handleSubmit = async (values: CreateCommentInput) => {
    const { message } = await apiFetchJson<ActionResponse>(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify(values),
    });

    toast.success(message ?? 'Comment created successfully');
  };

  return { handleSubmit };
}
