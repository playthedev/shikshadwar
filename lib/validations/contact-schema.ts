import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  subject: z.string().trim().min(2, "Please enter a subject."),
  message: z.string().trim().optional(),
  // Honeypot — real visitors never fill this in.
  company: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
