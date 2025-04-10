import { z } from "zod";

export const step1Schema = z.object({
  fullName: z.string().min(3).max(50),
  email: z.string().email("invalid email"),
  phone: z.string().min(10, "At least 10 digits"),
});

export const step2Schema = z.object({
  street: z.string().min(1, "Street field is required"),
  city: z.string().min(1, "City field is required"),
  zipcode: z.string().min(5, "Minimum 5 digits").regex(/^\d+$/, "Numbers only"),
});

export const step3Schema = z.object({
  username: z.string().min(4, "Minimum 4 characters"),
  password: z.string().min(6, "Minimum 6 characters"),
  confirmPassword: z.string().min(6, "Minimum 6 characters"),
});
