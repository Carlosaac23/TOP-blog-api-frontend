import { toast } from 'sonner';

import type { CreateUserInput } from '@/schemas/userSchema';

import { axiosClient } from '@/config/axios';
export function useSignUp() {
  const handleSubmit = async (values: CreateUserInput) => {
    const rolePathUrl = values.role === 'user' ? 'users' : 'writers';
    const { data } = await axiosClient.post(`/${rolePathUrl}`, values);

    toast.success(data?.message);
  };

  return { handleSubmit };
}
