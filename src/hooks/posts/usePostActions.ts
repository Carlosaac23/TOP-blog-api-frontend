import type { CreatePostInput } from '@/schemas/formSchema';

import { useDeletePost } from '@/hooks/posts/useDeletePost';
import { useUpdatePost } from '@/hooks/posts/useUpdatePost';

type RefetchFn = () => Promise<void>;

export function usePostActions(refetch: RefetchFn) {
  const { handleDelete } = useDeletePost();
  const { handleUpdate } = useUpdatePost();

  async function onDeletePost(postId: string) {
    const deleted = await handleDelete(postId);
    if (deleted) await refetch();
  }

  async function onUpdatePost(postId: string, values: CreatePostInput) {
    await handleUpdate(postId, values);
    await refetch();
  }

  return { onDeletePost, onUpdatePost };
}
