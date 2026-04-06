import { useDeleteComment } from '@/hooks/comments/useDeleteComment';

type RefetchFn = () => Promise<void>;

export function useCommentActions(refetch: RefetchFn) {
  const { handleDelete } = useDeleteComment();

  async function onDeleteComment(commentId: string) {
    const deleted = await handleDelete(commentId);
    if (deleted) await refetch();
  }

  return { onDeleteComment };
}
