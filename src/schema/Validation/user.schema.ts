import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format")
});

export const UpdateUserSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email format").optional()
});
