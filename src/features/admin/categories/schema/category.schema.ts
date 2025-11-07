import { z } from 'zod';

// Reusable name rule
const nameSchema = z
  .string()
  .min(3, { message: 'Category name must be at least 3 characters long.' })
  .max(32, { message: 'Category name cannot exceed 32 characters.' });

// ✅ For CREATE: both name & image are required
export const createCategorySchema = z.object({
  name: nameSchema,
  image: z
    .any()
    .refine((files) => files && files.length > 0, 'Category image is required.')
    .refine((files) => files.length <= 1, 'Only one image file is allowed.')
    .refine(
      (files) => files && files[0]?.type?.startsWith('image/'),
      'Only image files are allowed.'
    ),
});

// ✅ For UPDATE (PATCH): both optional, validated only if present
export const updateCategorySchema = z.object({
  name: nameSchema.optional(),
  image: z
    .any()
    .optional()
    .refine((files) => !files || files.length <= 1, 'Only one image file is allowed.')
    .refine(
      (files) => !files || files.length === 0 || files[0]?.type?.startsWith('image/'),
      'Only image files are allowed.'
    ),
});

export type CategoryFormData = z.infer<typeof createCategorySchema>;
export type UpdateCategoryFormData = z.infer<typeof updateCategorySchema>;
