import { useDeleteComment } from '@/hooks/comments/useDeleteComment';

export function useCommentActions(refetch) {
  const { handleDelete } = useDeleteComment();

  async function onDeleteComment(commentId) {
    const deleted = await handleDelete(commentId);
    if (deleted) await refetch();
  }

  return { onDeleteComment };
}
