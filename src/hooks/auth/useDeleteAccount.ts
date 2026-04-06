import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { confirm } from '@/components/ConfirmDialog';
import { apiFetchJson } from '@/lib/apiFetch';

type ActionResponse = {
  message: string;
};

export function useDeleteAccount() {
  const navigate = useNavigate();

  async function handleDelete(role: string, accountId: string) {
    const result = await confirm({
      message: 'Are you sure you want to delete your account?',
      description: 'This action is ireversible',
    });

    if (result) {
      const path = role === 'User' ? 'users' : 'writers';
      const { message } = await apiFetchJson<ActionResponse>(`/${path}/${accountId}`, {
        method: 'DELETE',
      });

      toast.success(message ?? 'Account delete successfully');
      navigate('/');
    }
  }

  return { handleDelete };
}
