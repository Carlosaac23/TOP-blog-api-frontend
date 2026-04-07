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

export type PostCardHeaderProps = {
  postId: string;
  title: string;
  writerUsername?: string;
  createdAt: string;
  canManage: boolean;
  isUser: boolean;
  onDelete: () => Promise<void> | void;
  onCommentCreated: () => Promise<void> | void;
};
