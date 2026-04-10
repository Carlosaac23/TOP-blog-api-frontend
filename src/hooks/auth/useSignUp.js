import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { apiFetchJson } from '@/lib/apiFetch';

export function useSignUp() {
  const navigate = useNavigate();

  const handleSubmit = async values => {
    const rolePathUrl = values.role === 'user' ? 'users' : 'writers';

    const { message } = await apiFetchJson(`/${rolePathUrl}`, {
      method: 'POST',
      auth: false,
      body: JSON.stringify(values),
    });

    toast.success(message);
    navigate('/sign-in');
  };

  return { handleSubmit };
}
