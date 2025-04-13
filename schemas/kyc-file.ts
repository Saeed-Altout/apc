import { z } from "zod";

// Define the KYC file schema with Zod for validation
export const kycFileSchema = z.object({
  id: z.string(),
  name: z.string(),
  accountId: z.string(),
  type: z.string(),
  dateTime: z.date(),
  procedures: z.string(),
  status: z.enum(["pending", "approved", "rejected"]),
  rejectionReason: z.string().nullable(),
});

// TypeScript type for KYC File based on the Zod schema
export type KycFile = z.infer<typeof kycFileSchema>;

// Form schema for creating/editing KYC files
export const kycFileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  accountId: z.string().min(1, { message: "Account ID is required" }),
  type: z.string().min(1, { message: "File type is required" }),
  procedures: z.string().min(1, { message: "Procedures are required" }),
  file: z.instanceof(File).nullable().optional(),
});

export type KycFileFormValues = z.infer<typeof kycFileFormSchema>;
