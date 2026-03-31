import { toast } from 'sonner';

import { confirm } from '@/components/ConfirmDialog';
import { axiosClient } from '@/config/axios';

export function useDeleteComment() {
  async function handleDelete(commentId: string) {
    const result = await confirm({ message: 'Are you sure you want to delete this comment?' });

    if (result) {
      const { data } = await axiosClient.delete(`/comments/${commentId}`);
      toast.success(data?.message);
    }
  }

  return { handleDelete };
}
