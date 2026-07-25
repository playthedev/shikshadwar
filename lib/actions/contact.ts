"use server";

import { contactSchema } from "@/lib/validations/contact-schema";
import { siteConfig } from "@/lib/site-config";

export type ContactActionState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

// TODO: set RESEND_API_KEY in the environment to enable real delivery.
// Until then this fails loudly (not a fake "success") so a submitted
// enquiry is never silently lost.
export async function submitContactForm(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    company: formData.get("company"),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  // Honeypot tripped — pretend success so bots don't learn anything.
  if (parsed.data.company) {
    return { status: "success" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[contact-form] RESEND_API_KEY is not set — enquiry was not delivered:",
      parsed.data,
    );
    return {
      status: "error",
      message: `We couldn't send your message right now. Please email us directly at ${siteConfig.contact.email}.`,
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Shikshadwar Website <onboarding@resend.dev>`,
        to: siteConfig.contact.email,
        reply_to: parsed.data.email,
        subject: `[Website] ${parsed.data.subject}`,
        text: `From: ${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message ?? "(no message)"}`,
      }),
    });

    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return { status: "success" };
  } catch (error) {
    console.error("[contact-form] delivery failed:", error);
    return {
      status: "error",
      message: `We couldn't send your message right now. Please email us directly at ${siteConfig.contact.email}.`,
    };
  }
}
