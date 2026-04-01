import CommentComposerDialog from '@/components/posts/CommentComposerDialog';
import { Button } from '@/components/ui/button';

type PostCardHeaderProps = {
  postId: string;
  title: string;
  writerUsername?: string;
  createdAt: string;
  canManage: boolean;
  isUser: boolean;
  onDelete: () => Promise<void> | void;
  onCommentCreated: () => Promise<void> | void;
};

export default function PostCardHeader({
  postId,
  title,
  writerUsername,
  createdAt,
  canManage,
  isUser,
  onDelete,
  onCommentCreated,
}: PostCardHeaderProps) {
  const createdAtDate = new Date(createdAt);
  const date = createdAtDate.toLocaleDateString('en-US', { dateStyle: 'medium' });
  const hour = createdAtDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
      <div className='space-y-2'>
        <h2 className='font-serif text-2xl leading-tight font-semibold text-foreground'>{title}</h2>
        <p className='text-xs tracking-widest text-muted-foreground uppercase'>
          {writerUsername ?? 'unknown writer'} • {date} • {hour}
        </p>
      </div>

      {canManage ? (
        <div className='flex items-center gap-2'>
          <Button type='button' variant='outline' size='sm'>
            Edit
          </Button>
          <Button type='button' variant='destructive' size='sm' onClick={onDelete}>
            Delete
          </Button>
        </div>
      ) : isUser ? (
        <CommentComposerDialog
          postId={postId}
          postTitle={title}
          onCommentCreated={onCommentCreated}
        />
      ) : null}
    </div>
  );
}
