import { apiFetchJson } from '@/lib/apiFetch';

export async function getCommentsByPost(postId) {
  return apiFetchJson(`/posts/${postId}/comments`);
}
