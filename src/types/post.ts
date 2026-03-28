import type { Writer } from './user';

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
