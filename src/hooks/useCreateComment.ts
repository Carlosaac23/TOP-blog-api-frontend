import { toast } from 'sonner';

import type { CreateCommentInput } from '@/schemas/formSchema';

import { getToken } from '@/helpers/getToken';
export function useCreateComment(postId: string) {
  const handleSubmit = async (values: CreateCommentInput) => {
    const token = getToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}/comments`, {
      method: 'POST',
      headers,
      body: JSON.stringify(values),
    });

    const { message } = await res.json();
    toast.success(message ?? 'Comment created successfully');
  };

  return { handleSubmit };
}
