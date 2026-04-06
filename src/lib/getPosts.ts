import type { Post } from '@/types';

import { apiFetchJson } from '@/lib/apiFetch';

export async function getPosts(): Promise<{ posts: Post[] }> {
  return apiFetchJson<{ posts: Post[] }>('/posts');
}
