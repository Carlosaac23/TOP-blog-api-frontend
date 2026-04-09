import { useForm } from '@tanstack/react-form';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { useCreateComment } from '@/hooks/comments/useCreateComment';
import { useUpdateComment } from '@/hooks/comments/useUpdateComment';
import { CreateCommentSchema } from '@/schemas/formSchema';

export function useCommentForm({ postId, onCommentCreated, mode, commentId, initialContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const { handleCreate } = useCreateComment(postId);
  const { handleUpdate } = useUpdateComment();

  const submitLabel = mode === 'create' ? 'Publish comment' : 'Update comment';

  const form = useForm({
    defaultValues: { content: '' },
    validators: { onSubmit: CreateCommentSchema },
    onSubmit: async ({ value, formApi }) => {
      try {
        if (mode === 'edit' && commentId) {
          handleUpdate(commentId, value);
        } else {
          await handleCreate(value);
        }

        await onCommentCreated();
        formApi.reset();
        setIsOpen(false);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to create comment');
      }
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.setFieldValue('content', initialContent ?? '');
    }
  }, [isOpen, initialContent, form]);

  return { submitLabel, form, isOpen, setIsOpen };
}
