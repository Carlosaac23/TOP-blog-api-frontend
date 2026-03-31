import { toast } from 'sonner';

import type { CreateCommentInput } from '@/schemas/formSchema';

import { axiosClient } from '@/config/axios';

export function useCreateComment(postId: string) {
  const handleSubmit = async (values: CreateCommentInput) => {
    const { data } = await axiosClient.post(`/posts/${postId}/comments`, values);

    toast.success(data?.message ?? 'Comment created successfully');
  };

  return { handleSubmit };
}
