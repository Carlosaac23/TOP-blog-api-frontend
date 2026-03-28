import { useEffect, useState } from 'react';

import type { Post } from '@/types';

import { getPosts } from '@/lib/getPosts';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
      setError(null);
    } catch (error: any) {
      setError(error.response?.data?.message ?? 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refetch();
  }, []);

  return { posts, loading, error, refetch };
}
