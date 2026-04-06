import { useDeletePost } from '@/hooks/posts/useDeletePost';

type RefetchFn = () => Promise<void>;
export function usePostActions(refetch: RefetchFn) {
  const { handleDelete } = useDeletePost();

  async function onDeletePost(postId: string) {
    const deleted = await handleDelete(postId);
    if (deleted) await refetch();
  }

  return { onDeletePost };
}
