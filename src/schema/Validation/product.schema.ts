import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().regex(/^\$\d+(\.\d{2})?$/, {
    message: "Price must be in the format $12.99"
  })
});

export const UpdateProductSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  price: z.string().regex(/^\$\d+(\.\d{2})?$/, {
    message: "Price must be in the format $12.99"
  }).optional()
});





