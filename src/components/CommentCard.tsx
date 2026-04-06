import type { CommentCardProps } from '@/types';

import CommentComposerDialog from '@/components/posts/CommentComposerDialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthProvider';
export default function CommentCard({
  postId,
  postTitle,
  commentId,
  userId,
  content,
  user,
  createdAt,
  onDelete,
  onCommentUpdated,
}: CommentCardProps) {
  const { auth } = useAuth();

  return (
    <div className='flex items-center justify-between border border-border p-3'>
      <div>
        <p className='text-sm leading-relaxed text-foreground'>{content}</p>
        <p className='mt-2 text-xs tracking-widest text-muted-foreground'>
          {user.username}
          {createdAt
            ? ` • ${new Date(createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })} ${new Date(createdAt).getHours()}:${new Date(createdAt).getMinutes().toString().padStart(2, '0')}`
            : ''}
        </p>
      </div>

      <div className='flex gap-2'>
        {auth?.id === userId ? (
          <>
            <CommentComposerDialog
              postId={postId}
              postTitle={postTitle}
              mode='edit'
              commentId={commentId}
              initialContent={content}
              onCommentCreated={onCommentUpdated}
              trigger={<Button type='button'>Edit</Button>}
            />
            <Button type='button' variant='destructive' onClick={onDelete}>
              Delete
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
}
