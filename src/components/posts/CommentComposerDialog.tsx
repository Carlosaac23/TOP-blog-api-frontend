import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { useCreateComment } from '@/hooks/comments/useCreateComment';
import { CreateCommentSchema, type CreateCommentInput } from '@/schemas/formSchema';

type CommentComposerDialogProps = {
  postId: string;
  postTitle: string;
  onCommentCreated: () => Promise<void> | void;
};

export default function CommentComposerDialog({
  postId,
  postTitle,
  onCommentCreated,
}: CommentComposerDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit } = useCreateComment(postId);

  const form = useForm({
    defaultValues: { content: '' } satisfies CreateCommentInput,
    validators: { onSubmit: CreateCommentSchema },
    onSubmit: async ({ value, formApi }) => {
      try {
        await handleSubmit(value);
        await onCommentCreated();
        formApi.reset();
        setIsOpen(false);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to created comment');
      }
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type='button' variant='default'>
          Comment
        </Button>
      </DialogTrigger>

      <DialogContent className='rounded-none border-border bg-background p-6 sm:max-w-xl'>
        <DialogHeader className='gap-3'>
          <p className='text-xs tracking-widest text-muted-foreground uppercase'>Add comment</p>
          <DialogTitle className='font-serif text-3xl font-semibold text-foreground'>
            Comment on this post
          </DialogTitle>
          <DialogDescription className='text-sm leading-relaxed text-muted-foreground'>
            Share your thoughts on {postTitle}.
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
  );
}
