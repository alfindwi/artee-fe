import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
})
.required();

export type RegisterSchema = z.infer<typeof registerSchema>;
