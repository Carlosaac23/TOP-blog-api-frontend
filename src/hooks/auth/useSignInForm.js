import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

import { LoginUserSchema } from '@/schemas/userSchema';

export function useSignInForm({ handleSubmit }) {
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
      role: 'user',
    },
    validators: {
      onSubmit: LoginUserSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        await handleSubmit(value);
        formApi.reset();
      } catch (error) {
        toast.error(error?.message);
      }
    },
  });

  return { form };
}
