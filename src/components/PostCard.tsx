import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { toast } from 'sonner';

import type { PostCardProps } from '@/types';

import Comment from '@/components/Comment';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { useCommentActions } from '@/hooks/comments/useCommentActions';
import { useComments } from '@/hooks/comments/useComments';
import { useCreateComment } from '@/hooks/comments/useCreateComment';
import { CreateCommentSchema, type CreateCommentInput } from '@/schemas/formSchema';

export default function PostCard({
  post,
  canManage,
  isUser,
  isCommentsOpen,
  onToggleComments,
  onDelete,
}: PostCardProps) {
  const { comments, isLoading, refetchComments } = useComments(post, isCommentsOpen);
  const { handleSubmit } = useCreateComment(post.id);
  const { onDeleteComment } = useCommentActions(refetchComments);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);

  const createdAtDate = new Date(post.createdAt);
  const date = createdAtDate.toLocaleDateString('en-US', { dateStyle: 'medium' });
  const hour = createdAtDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const form = useForm({
    defaultValues: {
      content: '',
    } satisfies CreateCommentInput,
    validators: {
      onSubmit: CreateCommentSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        await handleSubmit(value);
        await refetchComments();
        formApi.reset();
        setIsCommentDialogOpen(false);
      } catch (error: any) {
        toast.error(error.response?.data?.message ?? 'Failed to create comment');
      }
    },
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
            <Dialog open={isCommentDialogOpen} onOpenChange={setIsCommentDialogOpen}>
              <DialogTrigger asChild>
                <Button type='button' variant='default'>
                  Comment
                </Button>
              </DialogTrigger>

              <DialogContent className='rounded-none border-border bg-background p-6 sm:max-w-xl'>
                <DialogHeader className='gap-3'>
                  <p className='text-xs tracking-widest text-muted-foreground uppercase'>
                    Add comment
                  </p>
                  <DialogTitle className='font-serif text-3xl font-semibold text-foreground'>
                    Comment on this post
                  </DialogTitle>
                  <DialogDescription className='text-sm leading-relaxed text-muted-foreground'>
                    Share your thoughts on {post.title}.
                  </DialogDescription>
                </DialogHeader>

                <form
                  onSubmit={e => {
                    e.preventDefault();
                    form.handleSubmit();
                  }}
                  className='flex flex-col gap-6'
                >
                  <FieldGroup>
                    <form.Field
                      name='content'
                      children={field => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel
                              htmlFor={field.name}
                              className='text-xs font-normal tracking-widest text-muted-foreground uppercase'
                            >
                              Comment
                            </FieldLabel>
                            <Textarea
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={e => field.handleChange(e.target.value)}
                              aria-invalid={isInvalid}
                              placeholder='Write a thoughtful comment...'
                              rows={6}
                              className='min-h-36 rounded-none border-x-0 border-t-0 border-b border-border bg-transparent px-0 py-2 text-base leading-relaxed text-foreground shadow-none outline-none placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:ring-0'
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        );
                      }}
                    />
                  </FieldGroup>

                  <DialogFooter className='gap-3 sm:gap-2'>
                    <DialogClose asChild>
                      <Button type='button' variant='outline'>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type='submit'
                      className='inline-flex items-center gap-2 bg-foreground px-6 py-3 text-xs tracking-widest text-primary-foreground uppercase transition-opacity hover:opacity-80'
                    >
                      Publish comment &rarr;
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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
    </article>
  );
}
