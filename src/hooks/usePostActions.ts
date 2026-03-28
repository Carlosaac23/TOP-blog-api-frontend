import { useDeletePost } from '@/hooks/useDeletePost';

type RefetchFn = () => Promise<void>;
export function usePostActions(refetch: RefetchFn) {
  const { handleDelete } = useDeletePost();

  async function onDelete(postId: string) {
    await handleDelete(postId);
    await refetch();
  }

  return { onDelete };
}
