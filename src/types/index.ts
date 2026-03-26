export interface User {
  id: string;
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  birthDate: Date;
}

export type AuthRole = 'user' | 'writer';

export type AuthContextType = {
  auth: Record<string, unknown>;
  logOut: () => void;
};
