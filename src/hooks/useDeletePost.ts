import { toast } from 'sonner';

import { confirm } from '@/components/ConfirmDialog';
import { axiosClient } from '@/config/axios';

export function useDeletePost() {
  async function handleDelete(postId: string) {
    const result = await confirm({ message: 'Estas seguro?' });

    if (result) {
      const { data } = await axiosClient.delete(`/posts/${postId}`);
      toast.success(data?.message);
    }
  }

  return { handleDelete };
}
