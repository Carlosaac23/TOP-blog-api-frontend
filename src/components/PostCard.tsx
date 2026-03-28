import type { PostCardProps } from '@/types';

import { Button } from '@/components/ui/button';
import { getComments } from '@/lib/comments';

export default function PostCard({
  post,
  canManage,
  isUser,
  isCommentsOpen,
  onToggleComments,
  onDelete,
}: PostCardProps) {
  const comments = getComments(post);
  const createdAtDate = new Date(post.createdAt);
  const date = createdAtDate.toLocaleDateString('en-US', { dateStyle: 'medium' });
  const hour = createdAtDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <article className='border border-border p-6'>
      <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
        <div className='space-y-2'>
          <h2 className='font-serif text-2xl leading-tight font-semibold text-foreground'>
            {post.title}
          </h2>
          <p className='text-xs tracking-widest text-muted-foreground uppercase'>
            {post.writer?.username ?? 'unknown writer'} • {date} • {hour}
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
          <div>
            <Button type='button' variant='default'>
              Comment
            </Button>
          </div>
        ) : null}
      </div>

      <p className='mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground'>
        {post.content}
      </p>

      <button
        type='button'
        onClick={onToggleComments}
        className='text-xs tracking-widest text-foreground uppercase underline underline-offset-4 transition-opacity hover:opacity-70'
      >
        {isCommentsOpen ? 'Hide comments' : 'Comments'}
      </button>

      {isCommentsOpen && (
        <div className='mt-4 border-t border-border pt-4'>
          {comments.length === 0 ? (
            <p className='text-sm text-muted-foreground'>No comments for this post yet.</p>
          ) : (
            <ul className='space-y-3'>
              {comments.map(comment => (
                <li key={comment.id} className='border border-border p-3'>
                  <p className='text-sm leading-relaxed text-foreground'>{comment.content}</p>
                  <p className='mt-2 text-xs tracking-widest text-muted-foreground uppercase'>
                    {comment.authorName}
                    {comment.createdAt
                      ? ` • ${new Date(comment.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}`
                      : ''}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}
