import type { Comment } from '@/types';

import { apiFetchJson } from '@/lib/apiFetch';

export async function getCommentsByPost(postId: string): Promise<Comment[]> {
  return apiFetchJson<Comment[]>(`/posts/${postId}/comments`);
}
