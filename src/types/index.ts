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

export type AuthUser = {
  sub?: string;
  role?: AuthRole;
  [key: string]: unknown;
};

export type AuthContextType = {
  auth: AuthUser | null;
  loadingAuth: boolean;
  refreshAuth: () => Promise<void>;
  signIn: (token: string) => Promise<void>;
  logOut: () => void;
};
