import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { connectToDatabase } from "@/lib/mongodb";
import { DonationModel } from "@/lib/models/donation";
import { getRazorpayInstance } from "@/lib/razorpay";
import { createOrderSchema } from "@/lib/validations/donate-schema";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = createOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  const { amount, name, email, phone, pan, dateOfBirth, address, pincode, purpose } = parsed.data;
  const amountInPaise = amount * 100;

  const keyId = process.env.RAZORPAY_KEY_ID;
  if (!keyId || !process.env.RAZORPAY_KEY_SECRET) {
    console.error("[donate/order] Razorpay keys are not configured.");
    return NextResponse.json(
      { error: "Donations are temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  try {
    await connectToDatabase();

    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: randomUUID(),
      notes: {
        name,
        email,
        purpose: purpose || "general",
      },
    });

    await DonationModel.create({
      razorpayOrderId: order.id,
      amount: amountInPaise,
      currency: "INR",
      status: "created",
      donor: {
        name,
        email,
        phone: phone || undefined,
        pan: pan || undefined,
        dateOfBirth: dateOfBirth || undefined,
        address,
        pincode,
      },
      purpose: purpose || "general",
      ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
      userAgent: request.headers.get("user-agent") || null,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: amountInPaise,
      currency: "INR",
      keyId,
    });
  } catch (error) {
    console.error("[donate/order] failed to create order:", error);
    return NextResponse.json(
      { error: "Could not start the payment. Please try again." },
      { status: 500 },
    );
  }
}
