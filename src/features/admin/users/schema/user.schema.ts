import { z } from 'zod';

export const userSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email(),
  password: z.string().min(6),
  passwordConfirm: z.string().min(6),
  role: z.string(),

  profileImage: z.any().optional(),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export type UserFormData = z.infer<typeof userSchema>;
