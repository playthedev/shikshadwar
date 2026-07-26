import { z } from "zod";

// Amounts are collected from the client in whole rupees and converted to
// paise server-side. Bounds guard against fat-finger and abuse amounts.
export const MIN_DONATION_INR = 50;
export const MAX_DONATION_INR = 500_000;

export const createOrderSchema = z.object({
  amount: z
    .number({ error: "Enter an amount." })
    .int("Amount must be a whole number of rupees.")
    .min(MIN_DONATION_INR, `Minimum donation is ₹${MIN_DONATION_INR}.`)
    .max(MAX_DONATION_INR, `For donations above ₹${MAX_DONATION_INR}, please contact us directly.`),
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Please enter a valid phone number.")
    .optional()
    .or(z.literal("")),
  pan: z
    .string()
    .trim()
    .regex(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/, "Please enter a valid PAN.")
    .optional()
    .or(z.literal("")),
  purpose: z.string().trim().max(120).optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
