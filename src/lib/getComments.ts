import type { Comment } from '@/types';

import { getToken } from '@/helpers/getToken';

export async function getCommentsByPost(postId: string): Promise<Comment[]> {
  const token = getToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}/comments`, {
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message ?? 'Failed to load comments');
  }

  return res.json();
}
