import type { Comment } from '@/types';

import { axiosClient } from '@/config/axios';
export async function getComments(postId: string): Promise<Comment[]> {
  const { data } = await axiosClient(`/posts/${postId}/comments`);
  return data;
}
