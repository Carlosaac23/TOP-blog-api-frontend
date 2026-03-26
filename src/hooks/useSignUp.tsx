import { useState } from 'react';
import { toast } from 'sonner';

import type { AuthRole } from '@/types';

import { axiosClient } from '@/config/axios';
import { CreateUserSchema } from '@/schemas/userSchema';
export function useSignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [role, setRole] = useState<AuthRole>('user');

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
  };

  const handleRoleChange = (checked: boolean) => {
    setRole(checked ? 'writer' : 'user');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([firstName, lastName, username, email, password].includes('')) {
      console.log('Todos los campos son obligatorios');
      return;
    }

    const newUser = CreateUserSchema.safeParse({
      firstName,
      lastName,
      username,
      email,
      password,
      birthDate,
      role,
    });
    // const newUser = {
    //   firstName,
    //   lastName,
    //   username,
    //   email,
    //   password,
    //   birthDate,
    //   role,
    // };

    if (!newUser.success) {
      console.error(newUser.error.issues.map(error => error.message));
      return;
    }

    try {
      const rolePathUrl = role === 'user' ? 'users' : 'writers';
      const { data } = await axiosClient.post(`/${rolePathUrl}`, newUser.data);

      setFirstName('');
      setLastName('');
      setUsername('');
      setEmail('');
      setPassword('');
      setBirthDate('');

      toast.success(data?.message);
    } catch (error: any) {
      console.error(error.response.status);
      console.error(error.response.data);
    }
  };

  return {
    handleFirstNameChange,
    handleLastNameChange,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleBirthDateChange,
    role,
    handleRoleChange,
    handleSubmit,
  };
}
