import { z } from "zod";

// Define the User schema with Zod for validation
export const userSchema = z.object({
  id: z.string().or(z.number()),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  user: z.object({
    phoneNumber: z.string(),
    role: z.object({
      id: z.number(),
      name: z.string(),
    }),
    status: z.string(),
    telegramUsername: z.string().optional(),
  }),
  timeCreated: z.string().or(z.date()),
  timeUpdated: z.string().or(z.date()),
});

// TypeScript type for User based on the Zod schema
export type User = z.infer<typeof userSchema>;

// Form schema for creating/editing users
export const userFormSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phonenumber: z
    .string()
    .min(6, { message: "Phone number must be at least 6 characters" }),
  roleId: z.string({ required_error: "Role is required" }),
  addressLine: z
    .string()
    .min(5, { message: "Address line must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters" }),
  state: z.string().min(2, { message: "State must be at least 2 characters" }),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
