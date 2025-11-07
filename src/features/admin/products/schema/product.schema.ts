// src/features/admin/products/schema/product.schema.ts
import { z } from 'zod';

export const productSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z
    .number({ invalid_type_error: 'Price must be a number' })
    .positive('Price must be greater than zero'),
  priceAfterDiscount: z
    .number({ invalid_type_error: 'Price must be a number' })
    .positive('Price after discount must be greater than zero')
    .optional(),

  quantity: z
    .number({ invalid_type_error: 'Quantity must be a number' })
    .int()
    .nonnegative('Quantity must be 0 or more'),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().min(1, 'Brand is required'),
  colors: z.array(z.string()).nonempty('Select at least one color'),
  imageCover: z.any().refine((file) => file instanceof File || typeof file === 'string', {
    message: 'Image cover is required',
  }),
  images: z.array(z.any()).max(6, 'You can upload up to 6 images').optional(),
});

// 👇 THIS IS IMPORTANT
export type ProductFormData = z.infer<typeof productSchema>;
