import { useEffect, useState } from 'react';

import type { Comment, Post } from '@/types';

import { getCommentsByPost } from '@/lib/getComments';

export function useComments(post: Post, enabled = false) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetchComments = async () => {
    try {
      setIsLoading(true);
      const data = await getCommentsByPost(post.id);
      setComments(data);
      setError(null);
    } catch (error: any) {
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
