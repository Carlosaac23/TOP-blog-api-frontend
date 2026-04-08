import { useState } from 'react';

export function useExpandedPost() {
  const [expandedPostId, setExpandedPostId] = useState(null);

  function toggleComments(postId) {
    setExpandedPostId(current => (current === postId ? null : postId));
  }

  return { expandedPostId, toggleComments };
}
