import type { Comment as CommentType } from '@/types';

import Comment from '@/components/Comment';
import { Spinner } from '@/components/ui/spinner';

type PostCommentsSectionProps = {
  isCommentsOpen: boolean;
  comments: CommentType[];
  isLoading: boolean;
  onToggleComments: () => void;
  onDeleteComment: (commentId: string) => Promise<void> | void;
};

export default function PostCommentsSection({
  isCommentsOpen,
  comments,
  isLoading,
  onToggleComments,
  onDeleteComment,
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
                  key={comment.id}
                  content={comment.content}
                  createdAt={comment.createdAt}
                  user={comment.user}
                  onDelete={() => onDeleteComment(comment.id)}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
