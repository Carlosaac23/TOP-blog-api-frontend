import { useEffect, useState } from 'react';

import { getCommentsByPost } from '@/lib/getComments';

export function useComments(post, enabled = false) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetchComments = async () => {
    try {
      setIsLoading(true);
      const data = await getCommentsByPost(post.id);
      setComments(data.comments);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message ?? 'Failed to load comments');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    void refetchComments();
  }, [enabled, post.id]);

  return { comments, isLoading, error, refetchComments };
}
