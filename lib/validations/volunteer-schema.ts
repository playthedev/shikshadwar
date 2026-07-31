import { z } from "zod";

export const volunteerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Please enter a valid phone number."),
  dateOfBirth: z.string().trim().min(1, "Please enter your date of birth."),
  address: z.string().trim().min(5, "Please enter your address."),
  occupation: z.string().trim().optional(),
  company: z.string().max(0).optional(),
});

export type VolunteerFormValues = z.infer<typeof volunteerSchema>;
