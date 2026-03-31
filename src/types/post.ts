import type { Writer } from './user';
import type { UserComment } from './user';
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

export type CreateCommentProps = {
  postId: string;
  onCommentCreated?: () => Promise<void> | void;
};

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: UserComment;
};

export type CommentCardProps = {
  content: string;
  user: { username: string };
  createdAt: string;
  onDelete: () => Promise<void> | void;
};
