import { NextResponse, type NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { connectToDatabase } from "@/lib/mongodb";
import { DonationModel } from "@/lib/models/donation";
import { getRazorpayInstance } from "@/lib/razorpay";
import { verifyPaymentSchema } from "@/lib/validations/donate-schema";

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
      await DonationModel.updateOne(
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
    }

    return NextResponse.json({ status: payment.status === "captured" ? "paid" : "pending" });
  } catch (error) {
    console.error("[donate/verify] failed:", error);
    return NextResponse.json({ error: "Could not verify payment." }, { status: 500 });
  }
}
