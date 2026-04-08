import { useDeletePost } from '@/hooks/posts/useDeletePost';
import { useUpdatePost } from '@/hooks/posts/useUpdatePost';

export function usePostActions(refetch) {
  const { handleDelete } = useDeletePost();
  const { handleUpdate } = useUpdatePost();

  async function onDeletePost(postId) {
    const deleted = await handleDelete(postId);
    if (deleted) await refetch();
  }

  async function onUpdatePost(postId, values) {
    await handleUpdate(postId, values);
    await refetch();
  }

  return { onDeletePost, onUpdatePost };
}
