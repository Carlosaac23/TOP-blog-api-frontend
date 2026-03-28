import type { Post, PostComment } from '@/types';

export function getComments(post: Post): PostComment[] {
  const postWithComments = post as Post & { comments?: unknown };
  if (!Array.isArray(postWithComments.comments)) {
    return [];
  }

  return postWithComments.comments
    .map(comment => {
      if (!comment || typeof comment !== 'object') {
        return null;
      }

      const raw = comment as Record<string, unknown>;
      const id = typeof raw.id === 'string' ? raw.id : crypto.randomUUID();
      const content = typeof raw.content === 'string' ? raw.content : '';
      const authorName = typeof raw.authorName === 'string' ? raw.authorName : 'Anonymous';
      const createdAt = typeof raw.createdAt === 'string' ? raw.createdAt : '';

      if (!content.trim()) {
        return null;
      }

      return { id, content, authorName, createdAt };
    })
    .filter((comment): comment is PostComment => comment !== null);
}
