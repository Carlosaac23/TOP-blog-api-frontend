import type { Post } from '@/types';

import { axiosClient } from '@/config/axios';

export async function getPosts(): Promise<Post[]> {
  const { data } = await axiosClient('/posts');
  return data;
}
