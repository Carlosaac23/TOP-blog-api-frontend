import z from 'zod';

export const CreateUserSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'Please enter your first name.')
    .max(50, 'First name must be 50 characters or fewer.'),
  lastName: z.string().trim().max(50, 'Last name must be 50 characters or fewer.').optional(),
  username: z
    .string()
    .trim()
    .min(6, 'Username must be at least 6 characters.')
    .max(20, 'Username must be 20 characters or fewer.')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores.'),
  email: z.email('Please enter a valid email address.'),
  password: z
    .string()
    .min(12, 'Password must be at least 12 characters long.')
    .regex(/[A-Z]/, 'Password must include at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must include at least one lowercase letter.')
    .regex(/[0-9]/, 'Password must include at least one number.'),
  birthDate: z.string().refine(date => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, 'Please enter a valid birth date.'),
  role: z.enum(['user', 'writer'], {
    error: () => 'Please choose a valid role.',
  }),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export const LoginUserSchema = z.object({
  identifier: z.string().min(1, 'Please enter your username or email.'),
  password: z.string().min(1, 'Please enter your password.'),
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;
