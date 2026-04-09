import { useForm } from '@tanstack/react-form';
import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

import { useCreatePost } from '@/hooks/posts/useCreatePost';
import { useUpdatePost } from '@/hooks/posts/useUpdatePost';
import { CreatePostSchema } from '@/schemas/formSchema';

export function usePostForm({ mode }) {
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

  const pageTitle = mode === 'edit' ? 'Edit post' : 'Create post';
  const pageDescription =
    mode === 'edit'
      ? 'Update your post and save your changes'
      : 'Share a thoughtful story, idea, or tutorial with your readers.';

  return { form, pageTitle, pageDescription };
}
