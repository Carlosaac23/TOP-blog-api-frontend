import { useDeleteComment } from '@/hooks/useDeleteComment';

type RefetchFn = () => Promise<void>;

export function useCommentActions(refetch: RefetchFn) {
  const { handleDelete } = useDeleteComment();

  async function onDeleteComment(commentId: string) {
    await handleDelete(commentId);
    await refetch();
  }

  return { onDeleteComment };
}
