import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),

  description: z.string().trim().min(1, "Product description is required"),

  price: z.number().nonnegative("Price cannot be negative"),

  category: z.string().trim().min(1, "Product category is required"),

  quantity: z
    .number()
    .int("Quantity must be an integer")
    .nonnegative("Quantity cannot be negative"),
});

export const updateProductSchema = createProductSchema.partial();
