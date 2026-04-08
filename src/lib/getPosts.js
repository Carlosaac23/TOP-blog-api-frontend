import { apiFetchJson } from '@/lib/apiFetch';

export async function getPosts() {
  return apiFetchJson('/posts');
}
