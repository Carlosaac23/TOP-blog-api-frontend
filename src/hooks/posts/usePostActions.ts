import { useDeletePost } from '@/hooks/posts/useDeletePost';

type RefetchFn = () => Promise<void>;
export function usePostActions(refetch: RefetchFn) {
  const { handleDelete } = useDeletePost();

  async function onDeletePost(postId: string) {
    await handleDelete(postId);
    await refetch();
  }

  return { onDeletePost };
}
