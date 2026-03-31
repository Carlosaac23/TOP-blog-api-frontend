export type AuthRole = 'user' | 'writer';

export type AuthUser = {
  id?: string;
  firstName: string;
  lastName: string;
  username?: string;
  email?: string;
  role?: AuthRole;
  createdAt?: string;
  bio: string;
  birthDate: string;
};

export type AuthContextType = {
  auth: AuthUser | null;
  loadingAuth: boolean;
  refreshAuth: () => Promise<void>;
  signIn: (token: string) => Promise<void>;
  logOut: () => void;
};
