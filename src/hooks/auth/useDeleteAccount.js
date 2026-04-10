import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { confirm } from '@/components/ConfirmDialog';
import { useAuth } from '@/context/AuthProvider';
import { apiFetchJson } from '@/lib/apiFetch';

export function useDeleteAccount() {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  async function handleDelete(role, accountId) {
    const result = await confirm({
      message: 'Are you sure you want to delete your account?',
      description: 'This action is irreversible',
    });

    if (result) {
      const path = role === 'User' ? 'users' : 'writers';
      const { message } = await apiFetchJson(`/${path}/${accountId}`, {
        method: 'DELETE',
      });

      toast.success(message ?? 'Account deleted successfully');
      logOut();
      navigate('/');
    }
  }

  return { handleDelete };
}
