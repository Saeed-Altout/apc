import { z } from "zod";

export const accountSchema = z.object({
  id: z.string().or(z.number()),
  balance: z.string(),
  login: z.string(),
  marginFree: z.string(),
  timeCreated: z.string().or(z.date()),
  timeUpdated: z.string().or(z.date()),
  type: z.enum(["TRADING", "DEMO"]),
});

export type Account = z.infer<typeof accountSchema>;
