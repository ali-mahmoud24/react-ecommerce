import { z } from 'zod';

export const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

// -------------------------
// Change Password Schema
// -------------------------
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Old password must be at least 6 characters'),
    password: z.string().min(6, 'New password must be at least 6 characters'),
    passwordConfirm: z.string().min(6, 'Confirm password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
