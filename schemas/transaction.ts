import { z } from "zod";

// Define the Transaction schema with Zod for validation
export const transactionSchema = z.object({
  id: z.string(),
  processId: z.string(),
  date: z.date(),
  name: z.string(),
  phoneNumber: z.string(),
  accountNumber: z.string(),
  amount: z.number(),
  withdrawalMethod: z.string(),
  address: z.string().optional().nullable(),
  status: z.enum(["pending", "approved", "rejected"]),
  rejectionReason: z.string().nullable(),
});

// TypeScript type for Transaction based on the Zod schema
export type Transaction = z.infer<typeof transactionSchema>;

// Form schema for creating/editing transactions
export const transactionFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phoneNumber: z.string().min(5, { message: "Phone number must be valid" }),
  accountNumber: z.string().min(1, { message: "Account number is required" }),
  amount: z.coerce
    .number()
    .min(1, { message: "Amount must be greater than 0" }),
  withdrawalMethod: z
    .string()
    .min(1, { message: "Withdrawal method is required" }),
  address: z.string().optional(),
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;
