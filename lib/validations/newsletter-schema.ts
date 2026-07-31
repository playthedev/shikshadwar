import { z } from "zod";

export const newsletterSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email address."),
  // Honeypot — real visitors never fill this in.
  company: z.string().max(0).optional(),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
