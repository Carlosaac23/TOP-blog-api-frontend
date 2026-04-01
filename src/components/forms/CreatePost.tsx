import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

import type { CreatePostInput } from '@/schemas/formSchema';

import { FormInputField, FormTextareaField } from '@/components/forms/FormFields';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useCreatePost } from '@/hooks/posts/useCreatePost';
import { CreatePostSchema } from '@/schemas/formSchema';

const defaultValues: CreatePostInput = {
  title: '',
  content: '',
};

export default function CreatePost() {
  const { handleSubmit } = useCreatePost();

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: CreatePostSchema,
      onBlur: CreatePostSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        await handleSubmit(value);
        formApi.reset();
      } catch (error: any) {
        toast.error(error.response?.data?.message);
      }
    },
  });

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

            <span className='h-px bg-border' />

            <div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center'>
              <Button
                type='submit'
                className='inline-flex items-center gap-2 bg-foreground px-8 py-4 text-xs tracking-widest text-primary-foreground uppercase transition-opacity hover:opacity-80'
              >
                Publish post &rarr;
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
