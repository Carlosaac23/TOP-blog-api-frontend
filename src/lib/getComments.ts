import type { Comment } from '@/types';

import { apiFetchJson } from '@/lib/apiFetch';

export async function getCommentsByPost(postId: string): Promise<{ comments: Comment[] }> {
  return apiFetchJson<{ comments: Comment[] }>(`/posts/${postId}/comments`);
}
