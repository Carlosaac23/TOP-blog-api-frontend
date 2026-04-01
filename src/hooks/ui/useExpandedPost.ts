import { useState } from 'react';

export function useExpandedPost() {
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  function toggleComments(postId: string) {
    setExpandedPostId(current => (current === postId ? null : postId));
  }

  return { expandedPostId, toggleComments };
}
