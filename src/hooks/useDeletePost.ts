import { toast } from 'sonner';

import { confirm } from '@/components/ConfirmDialog';
import { axiosClient } from '@/config/axios';

export function useDeletePost() {
  async function handleDelete(postId: string) {
    const result = await confirm({ message: 'Are you sure you want to delete this post?' });

    if (result) {
      const { data } = await axiosClient.delete(`/posts/${postId}`);
      toast.success(data?.message);
    }
  }

  return { handleDelete };
}
