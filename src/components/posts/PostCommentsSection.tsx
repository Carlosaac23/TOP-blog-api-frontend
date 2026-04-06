import type { PostCommentsSectionProps } from '@/types';

import Comment from '@/components/Comment';
import { Spinner } from '@/components/ui/spinner';

export default function PostCommentsSection({
  postId,
  postTitle,
  isCommentsOpen,
  comments,
  isLoading,
  onToggleComments,
  onDeleteComment,
  onCommentUpdated,
}: PostCommentsSectionProps) {
  return (
    <>
      <button
        type='button'
        onClick={onToggleComments}
        className='text-xs tracking-widest text-foreground uppercase underline underline-offset-4 transition-opacity hover:opacity-70'
      >
        {isCommentsOpen ? 'Hide comments' : 'Comments'}
      </button>

      {isCommentsOpen && (
        <div className='mt-4 border-t border-border pt-4'>
          {isLoading ? (
            <Spinner className='mt-2' />
          ) : comments.length === 0 ? (
            <p className='text-sm text-muted-foreground'>No comments for this post yet.</p>
          ) : (
            <ul className='space-y-3'>
              {comments.map(comment => (
                <Comment
                  commentId={comment.id}
                  postId={postId}
                  postTitle={postTitle}
                  key={comment.id}
                  userId={comment.userId}
                  content={comment.content}
                  createdAt={comment.createdAt}
                  user={comment.user}
                  onDelete={() => onDeleteComment(comment.id)}
                  onCommentUpdated={onCommentUpdated}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
