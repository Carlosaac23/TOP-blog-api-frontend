export type AuthRole = 'user' | 'writer';

export type AuthUser = {
  sub?: string;
  role?: AuthRole;
  name?: string;
  username?: string;
  email?: string;
  createdAt?: string;
  [key: string]: unknown;
};

export type AuthContextType = {
  auth: AuthUser | null;
  loadingAuth: boolean;
  refreshAuth: () => Promise<void>;
  signIn: (token: string) => Promise<void>;
  logOut: () => void;
};
