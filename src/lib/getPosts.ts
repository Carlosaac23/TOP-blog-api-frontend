import type { Post } from '@/types';

import { apiFetchJson } from '@/lib/apiFetch';

export async function getPosts(): Promise<Post[]> {
  return apiFetchJson<Post[]>('/posts');
}
