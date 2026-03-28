import z from 'zod';

export const CreatePostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, 'Title must be at least 5 characters.')
    .max(120, 'Title must be 120 characters or fewer.'),
  content: z
    .string()
    .trim()
    .min(20, 'Content must be at least 20 characters.')
    .max(10000, 'Content must be 10000 characters or fewer.'),
});

export type CreatePostInput = z.infer<typeof CreatePostSchema>;
