import { NextResponse, type NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { connectToDatabase } from "@/lib/mongodb";
import { DonationModel } from "@/lib/models/donation";

// This is the source of truth for marking a donation "paid" — it doesn't
// depend on the donor's browser staying open after payment, and Razorpay
// retries delivery, so it's more reliable than the client-side verify call.
// Client verification (app/api/donate/verify) still runs for a fast UI
// response, but this handler is what ultimately reconciles the ledger.

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

type RazorpayWebhookPayment = {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
  method?: string;
  error_description?: string | null;
};

export async function POST(request: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[razorpay/webhook] RAZORPAY_WEBHOOK_SECRET is not set.");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const expectedSignature = createHmac("sha256", secret).update(rawBody).digest("hex");
  if (!safeEqual(expectedSignature, signature)) {
    console.warn("[razorpay/webhook] invalid signature.");
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let event: {
    event: string;
    payload?: { payment?: { entity?: RazorpayWebhookPayment } };
  };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const payment = event.payload?.payment?.entity;

  try {
    await connectToDatabase();

    if (!payment?.order_id) {
      // Events we don't act on (e.g. refund.*) — acknowledge so Razorpay
      // stops retrying.
      return NextResponse.json({ received: true });
    }

    const donation = await DonationModel.findOne({ razorpayOrderId: payment.order_id });
    if (!donation) {
      console.error("[razorpay/webhook] no donation for order:", payment.order_id);
      return NextResponse.json({ received: true });
    }

    // Always record the raw event for audit purposes.
    await DonationModel.updateOne(
      { razorpayOrderId: payment.order_id },
      { $push: { webhookEvents: { event: event.event, payload: payment } } },
    );

    if (payment.amount !== donation.amount || payment.currency !== donation.currency) {
      console.error("[razorpay/webhook] amount/currency mismatch for order:", payment.order_id);
      return NextResponse.json({ received: true });
    }

    if (event.event === "payment.captured") {
      await DonationModel.updateOne(
        { razorpayOrderId: payment.order_id, status: { $ne: "paid" } },
        {
          $set: {
            razorpayPaymentId: payment.id,
            status: "paid",
            method: payment.method,
          },
        },
      );
    } else if (event.event === "payment.failed") {
      await DonationModel.updateOne(
        { razorpayOrderId: payment.order_id, status: { $eq: "created" } },
        {
          $set: {
            status: "failed",
            failureReason: payment.error_description || "Payment failed",
          },
        },
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[razorpay/webhook] failed to process event:", error);
    // 500 so Razorpay retries delivery.
    return NextResponse.json({ error: "Processing failed." }, { status: 500 });
  }
}
