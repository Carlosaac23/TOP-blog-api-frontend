import { useForm } from '@tanstack/react-form';
import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

import { FormInputField, FormTextareaField } from '@/components/forms/FormFields';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useCreatePost } from '@/hooks/posts/useCreatePost';
import { useUpdatePost } from '@/hooks/posts/useUpdatePost';
import { CreatePostSchema } from '@/schemas/formSchema';

export default function CreatePost({ mode = 'create' }) {
  const { handleCreate } = useCreatePost();
  const { handleUpdate } = useUpdatePost();
  const { postId } = useParams();
  const { state } = useLocation();

  const stateValues = state?.post;

  const form = useForm({
    defaultValues: {
      title: mode === 'edit' ? (stateValues?.title ?? '') : '',
      content: mode === 'edit' ? (stateValues?.content ?? '') : '',
    },
    validators: {
      onSubmit: CreatePostSchema,
      onBlur: CreatePostSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        if (mode === 'edit') {
          await handleUpdate(postId, value);
        } else {
          await handleCreate(value);
        }

        formApi.reset();
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    },
  });

  useEffect(() => {
    if (mode !== 'edit' || !stateValues) return;

    form.reset({
      title: stateValues.title ?? '',
      content: stateValues.content ?? '',
    });
  }, [mode, stateValues, form]);

  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <div className='flex flex-1 items-start justify-center px-6 py-16 md:py-14'>
        <div className='w-full max-w-3xl'>
          <div className='mb-12 flex items-center gap-4'>
            <span className='text-xs tracking-widest text-muted-foreground uppercase'>
              Write a post
            </span>
            <span className='h-px flex-1 bg-border' />
          </div>

          <h1 className='mb-4 font-serif text-5xl leading-tight font-semibold text-balance text-foreground md:text-6xl'>
            Create Post
          </h1>
          <p className='mb-12 text-base leading-relaxed text-muted-foreground'>
            Share a thoughtful story, idea, or tutorial with your readers.
          </p>

          <form
            onSubmit={e => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className='flex flex-col gap-8'
          >
            <FieldGroup>
              <div className='flex flex-col gap-2'>
                <form.Field name='title'>
                  {field => (
                    <FormInputField
                      field={field}
                      label='Title'
                      type='text'
                      placeholder='How I redesigned my writing workflow'
                    />
                  )}
                </form.Field>
              </div>

              <div className='flex flex-col gap-2'>
                <form.Field name='content'>
                  {field => (
                    <FormTextareaField
                      field={field}
                      label='Content'
                      placeholder='Start writing your post here...'
                      rows={10}
                    />
                  )}
                </form.Field>
              </div>
            </FieldGroup>

            <div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center'>
              <form.Subscribe selector={state => state.isSubmitting}>
                {isSubmitting => (
                  <Button
                    type='submit'
                    className='inline-flex items-center gap-2 bg-foreground px-8 py-4 text-xs tracking-widest text-primary-foreground uppercase transition-opacity hover:opacity-80'
                    disabled={isSubmitting}
                  >
                    {mode === 'edit'
                      ? isSubmitting
                        ? 'Updating post...'
                        : 'Update post'
                      : isSubmitting
                        ? 'Publishing'
                        : 'Publish post'}
                    <span aria-hidden='true'>&rarr;</span>
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
