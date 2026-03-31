import type { AuthUser } from '@/types';

import { getToken } from '@/helpers/getToken';
export async function getProfile(): Promise<AuthUser> {
  const token = getToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/`, { headers });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message ?? 'Failed to load comments');
  }

  const { profile } = await res.json();
  return profile;
}
