import { useEffect, useState } from 'react';

import { getPosts } from '@/lib/getPosts';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data.posts);
      setError(null);
    } catch (error) {
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
