import type { AuthUser } from '@/types';

import { apiFetchJson } from '@/lib/apiFetch';

type GetProfileResponse = {
  profile: AuthUser;
};
export async function getProfile(): Promise<AuthUser> {
  const { profile } = await apiFetchJson<GetProfileResponse>('/', { auth: true });
  return profile;
}
