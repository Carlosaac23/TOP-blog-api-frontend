import type { Post } from '@/types';

import { getToken } from '@/helpers/getToken';

export async function getPosts(): Promise<Post[]> {
  const token = getToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts`, { headers });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message ?? 'Failed to load comments');
  }

  return await res.json();
}
