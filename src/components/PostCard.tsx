import type { PostCardProps } from '@/types';

import PostCardHeader from '@/components/posts/PostCardHeader';
import PostCommentsSection from '@/components/posts/PostCommentsSection';
import { useCommentActions } from '@/hooks/comments/useCommentActions';
import { useComments } from '@/hooks/comments/useComments';

export default function PostCard({
  post,
  canManage,
  isUser,
  isCommentsOpen,
  onToggleComments,
  onDelete,
}: PostCardProps) {
  const { comments, isLoading, refetchComments } = useComments(post, isCommentsOpen);
  const { onDeleteComment } = useCommentActions(refetchComments);

  return (
    <article className='border border-border p-6'>
      <PostCardHeader
        postId={post.id}
        title={post.title}
        writerUsername={post.writer?.username}
        createdAt={post.createdAt}
        canManage={canManage}
        isUser={isUser}
        onDelete={onDelete}
        onCommentCreated={refetchComments}
      />

      <p className='mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground'>
        {post.content}
      </p>

      <PostCommentsSection
        isCommentsOpen={isCommentsOpen}
        comments={comments}
        isLoading={isLoading}
        onToggleComments={onToggleComments}
        onDeleteComment={onDeleteComment}
      />
    </article>
  );
}
