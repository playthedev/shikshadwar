import { z } from "zod";

export const volunteerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  dateOfBirth: z.string().trim().min(1, "Please enter your date of birth."),
  address: z.string().trim().min(5, "Please enter your address."),
  occupation: z.string().trim().optional(),
  company: z.string().max(0).optional(),
});

export type VolunteerFormValues = z.infer<typeof volunteerSchema>;
