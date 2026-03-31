import type { UserComment } from './user';

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
