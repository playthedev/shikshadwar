import { NextResponse, type NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { connectToDatabase } from "@/lib/mongodb";
import { DonationModel } from "@/lib/models/donation";
import { getRazorpayInstance } from "@/lib/razorpay";
import { verifyPaymentSchema } from "@/lib/validations/donate-schema";
import { isMailConfigured, sendMail } from "@/lib/mailer";
import { donationNotificationTemplate, donationReceiptTemplate } from "@/lib/email-template";
import { siteConfig } from "@/lib/site-config";

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = verifyPaymentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    console.error("[donate/verify] RAZORPAY_KEY_SECRET is not set.");
    return NextResponse.json({ error: "Verification unavailable." }, { status: 503 });
  }

  const expectedSignature = createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (!safeEqual(expectedSignature, razorpay_signature)) {
    console.warn("[donate/verify] signature mismatch for order:", razorpay_order_id);
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const donation = await DonationModel.findOne({ razorpayOrderId: razorpay_order_id });
    if (!donation) {
      console.error("[donate/verify] no donation record for order:", razorpay_order_id);
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    // Signature is authentic, but never trust amount/status from the client —
    // pull the payment straight from Razorpay and cross-check it against what
    // we stored when the order was created.
    const razorpay = getRazorpayInstance();
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (
      payment.order_id !== razorpay_order_id ||
      Number(payment.amount) !== donation.amount ||
      payment.currency !== donation.currency
    ) {
      console.error("[donate/verify] payment/order mismatch:", {
        razorpay_order_id,
        razorpay_payment_id,
      });
      return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
    }

    if (payment.status === "captured") {
      const result = await DonationModel.updateOne(
        { razorpayOrderId: razorpay_order_id, status: { $ne: "paid" } },
        {
          $set: {
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
            status: "paid",
            method: payment.method,
          },
        },
      );

      // Only the call that actually flips created -> paid sends mail — verify
      // can be hit more than once (retry, duplicate tab), and we don't want
      // to spam the donor or the org with repeat notifications.
      if (result.modifiedCount > 0 && isMailConfigured()) {
        const receipt = donationReceiptTemplate({
          name: donation.donor.name,
          amount: donation.amount,
          purpose: donation.purpose,
          paymentId: razorpay_payment_id,
          paidAt: new Date(),
        });
        const notification = donationNotificationTemplate({
          name: donation.donor.name,
          email: donation.donor.email,
          phone: donation.donor.phone,
          amount: donation.amount,
          purpose: donation.purpose,
          method: payment.method,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
        });

        // Best-effort — the donation already landed and is recorded, so a
        // failed email shouldn't surface as an error to the donor.
        try {
          await sendMail({
            to: donation.donor.email,
            subject: receipt.subject,
            html: receipt.html,
            text: receipt.text,
          });
        } catch (error) {
          console.error("[donate/verify] receipt email failed:", error);
        }

        try {
          await sendMail({
            to: siteConfig.contact.email,
            subject: notification.subject,
            html: notification.html,
            text: notification.text,
          });
        } catch (error) {
          console.error("[donate/verify] owner notification email failed:", error);
        }
      }
    }

    return NextResponse.json({ status: payment.status === "captured" ? "paid" : "pending" });
  } catch (error) {
    console.error("[donate/verify] failed:", error);
    return NextResponse.json({ error: "Could not verify payment." }, { status: 500 });
  }
}
