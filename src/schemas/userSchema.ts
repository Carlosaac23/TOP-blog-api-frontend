import z from 'zod';

export const CreateUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.email('Invalid email address'),
  password: z.string().min(12, 'Password must be at least 12 characters long'),
  birthDate: z.string().refine(date => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, 'Invalid date format'),
  role: z.enum(['user', 'writer']),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
