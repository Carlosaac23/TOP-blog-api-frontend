import { getToken } from '@/helpers/getToken';

type ApiFetchOptions = RequestInit & {
  auth?: boolean;
};

async function getErrorMessage(res: Response) {
  const contentType = res.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const errorData = await res.json().catch(() => null);

    if (
      errorData &&
      typeof errorData === 'object' &&
      'message' in errorData &&
      typeof errorData.message === 'string'
    ) {
      return errorData.message;
    }
  }

  return res.statusText || 'Request failed';
}

export async function apiFetchJson<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers);

  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (options.auth !== false && token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return (await res.json()) as T;
}
