import { toast } from 'sonner';

import type { CreateUserInput } from '@/schemas/userSchema';

import { apiFetchJson } from '@/lib/apiFetch';

type ActionResponse = {
  message: string;
};

export function useSignUp() {
  const handleSubmit = async (values: CreateUserInput) => {
    const rolePathUrl = values.role === 'user' ? 'users' : 'writers';

    const { message } = await apiFetchJson<ActionResponse>(`/${rolePathUrl}`, {
      method: 'POST',
      auth: false,
      body: JSON.stringify(values),
    });

    toast.success(message);
  };

  return { handleSubmit };
}
