import { z } from 'zod';

export const userSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: 'First name must be at least 2 characters long.' })
      .max(50, { message: 'First name cannot exceed 50 characters.' }),
    lastName: z
      .string()
      .min(2, { message: 'Last name must be at least 2 characters long.' })
      .max(50, { message: 'Last name cannot exceed 50 characters.' }),
    email: z.email({ message: 'Invalid email address' }),
    phone: z.string().optional(),
    profileImage: z.any().optional(),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    passwordConfirm: z
      .string()
      .min(6, { message: 'Confirm password must be at least 6 characters' }),
    role: z.enum(['user', 'admin']),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  });

export type UserFormData = z.infer<typeof userSchema>;
