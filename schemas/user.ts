import { z } from "zod";

// Define the User schema with Zod for validation
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  accountManager: z.string().optional(),
  status: z.enum(["active", "inactive", "blocked", "pending"]),
  role: z.enum(["admin", "manager", "user"]),
  telegram: z.string().optional(),
  tradingAccounts: z.array(z.string()).optional(),
  wallets: z.array(z.string()).optional(),
  country: z.string().optional(),
  createdAt: z.date(),
});

// TypeScript type for User based on the Zod schema
export type User = z.infer<typeof userSchema>;

// Form schema for creating/editing users
export const userFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  accountManager: z.string().optional(),
  status: z.enum(["active", "inactive", "blocked", "pending"]),
  role: z.enum(["admin", "manager", "user"]),
  telegram: z.string().optional(),
  country: z.string().optional(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
