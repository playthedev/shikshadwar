import { Schema, model, models, type InferSchemaType } from "mongoose";

export const DONATION_STATUSES = [
  "created",
  "paid",
  "failed",
  "refunded",
] as const;

const donationSchema = new Schema(
  {
    razorpayOrderId: { type: String, required: true, unique: true, index: true },
    razorpayPaymentId: { type: String, unique: true, sparse: true, index: true },
    razorpaySignature: { type: String },

    // Smallest currency unit (paise for INR) — matches what was sent to Razorpay.
    amount: { type: Number, required: true, min: 100 },
    currency: { type: String, required: true, default: "INR" },

    status: {
      type: String,
      enum: DONATION_STATUSES,
      default: "created",
      index: true,
    },

    donor: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true, lowercase: true },
      phone: { type: String, trim: true },
      pan: { type: String, trim: true, uppercase: true },
      dateOfBirth: { type: String, trim: true },
      address: { type: String, trim: true },
      pincode: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
    },

    purpose: { type: String, trim: true, default: "general" },
    method: { type: String },
    failureReason: { type: String },

    ip: { type: String },
    userAgent: { type: String },

    // Append-only audit trail of every webhook event we received for this
    // order, so a payment's history can be reconstructed if something is
    // disputed later.
    webhookEvents: {
      type: [
        new Schema(
          {
            event: { type: String, required: true },
            payload: { type: Schema.Types.Mixed },
            receivedAt: { type: Date, default: Date.now },
          },
          { _id: false },
        ),
      ],
      default: [],
    },
  },
  { timestamps: true },
);

export type Donation = InferSchemaType<typeof donationSchema>;

export const DonationModel = models.Donation || model("Donation", donationSchema);
