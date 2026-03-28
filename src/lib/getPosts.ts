import { axiosClient } from '@/config/axios';

export async function getPosts() {
  const { data } = await axiosClient('/posts');
  return data;
}
