import { NextResponse, type NextRequest } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { ADMIN_SESSION_COOKIE, createSessionToken } from "@/lib/admin/session";
import { isRateLimited, recordFailedAttempt, clearAttempts } from "@/lib/admin/rate-limit";

function hashesMatch(a: string, b: string) {
  const bufA = createHash("sha256").update(a).digest();
  const bufB = createHash("sha256").update(b).digest();
  return timingSafeEqual(bufA, bufB);
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const password = (body as { password?: unknown })?.password;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error("[admin/login] ADMIN_PASSWORD is not set.");
    return NextResponse.json({ error: "Admin login is not configured." }, { status: 503 });
  }

  if (typeof password !== "string" || !hashesMatch(password, adminPassword)) {
    recordFailedAttempt(ip);
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  clearAttempts(ip);

  const { token, maxAge } = createSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
  return response;
}
