import type { Comment as CommentType } from '.';
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
  commentId: string;
  postId: string;
  postTitle: string;
  userId: string;
  content: string;
  user: { username: string };
  createdAt: string;
  onDelete: () => Promise<void> | void;
  onCommentUpdated: () => Promise<void> | void;
};

export type PostCommentsSectionProps = {
  postId: string;
  postTitle: string;
  isCommentsOpen: boolean;
  comments: CommentType[];
  isLoading: boolean;
  onToggleComments: () => void;
  onDeleteComment: (commentId: string) => Promise<void> | void;
  onCommentUpdated: () => Promise<void> | void;
};

export type CommentComposerDialogProps = {
  postId: string;
  postTitle: string;
  onCommentCreated: () => Promise<void> | void;
  mode?: 'create' | 'edit';
  commentId?: string;
  initialContent?: string;
  trigger?: React.ReactNode;
};
