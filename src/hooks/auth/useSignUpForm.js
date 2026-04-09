import { useForm } from '@tanstack/react-form';

import { CreateUserSchema } from '@/schemas/userSchema';

export function useSignUpForm({ handleSubmit }) {
  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: CreateUserSchema,
      onBlur: CreateUserSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        await handleSubmit(value);
        formApi.reset();
      } catch {
        // Keep value so user can fix and retry
      }
    },
  });

  return { form };
}
