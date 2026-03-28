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

export type Writer = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  writerId: string;
  writer: Writer;
};

export type PostCardProps = {
  post: Post;
  canManage: boolean;
  isUser: boolean;
  isCommentsOpen: boolean;
  onToggleComments: () => void;
  onDelete: () => Promise<void> | void;
};

export type PostComment = {
  id: string;
  content: string;
  authorName: string;
  createdAt: string;
};
