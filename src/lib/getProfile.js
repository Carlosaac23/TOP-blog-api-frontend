import { apiFetchJson } from '@/lib/apiFetch';

export async function getProfile() {
  const { profile } = await apiFetchJson('/', { auth: true });
  return profile;
}
