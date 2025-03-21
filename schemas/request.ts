import { z } from "zod";

// Define the Request schema with Zod for validation
export const requestSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  accountNumber: z.string(),
  operationType: z.string(),
  status: z.enum(["pending", "approved", "rejected"]),
  accountManager: z.string(),
  rejectionReason: z.string().nullable(),
  requestDate: z.date(),
});

// TypeScript type for Request based on the Zod schema
export type Request = z.infer<typeof requestSchema>;

// Form schema for creating/editing requests
export const requestFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(5, { message: "Phone number must be valid" }),
  accountNumber: z.string().min(1, { message: "Account number is required" }),
  operationType: z.string().min(1, { message: "Operation type is required" }),
  accountManager: z.string().min(1, { message: "Account manager is required" }),
  rejectionReason: z.string().nullable().optional(),
});

export type RequestFormValues = z.infer<typeof requestFormSchema>;
