import { toast } from 'sonner';

import type { CreateUserInput } from '@/schemas/userSchema';

export function useSignUp() {
  const handleSubmit = async (values: CreateUserInput) => {
    const rolePathUrl = values.role === 'user' ? 'users' : 'writers';

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${rolePathUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const { message } = await res.json();
    toast.success(message);
  };

  return { handleSubmit };
}
