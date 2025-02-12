import { z } from "zod";

export const urlSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

export const authSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type AuthSchema = z.infer<typeof authSchema>;
export type UrlSchema = z.infer<typeof urlSchema>;
