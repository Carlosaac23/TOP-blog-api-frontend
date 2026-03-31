import type { CommentCardProps } from '@/types';

import { Button } from '@/components/ui/button';

export default function Comment({ content, user, createdAt, onDelete }: CommentCardProps) {
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

      <div>
        <Button type='button' variant='destructive' onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
