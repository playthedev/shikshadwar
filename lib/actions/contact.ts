"use server";

import { contactSchema } from "@/lib/validations/contact-schema";
import { siteConfig } from "@/lib/site-config";
import { contactEmailTemplate, contactAutoReplyTemplate } from "@/lib/email-template";

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

  const template = contactEmailTemplate(parsed.data);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Shikshadwar Website <onboarding@resend.dev>`,
        // TODO: verify shikshadwarfoundation.org in Resend, then switch back to siteConfig.contact.email.
        to: "arishkhan3312@gmail.com",
        reply_to: parsed.data.email,
        subject: template.subject,
        html: template.html,
        text: template.text,
      }),
    });

    if (!res.ok) {
      throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
    }

    // Best-effort — the enquiry already landed, so a failed auto-reply
    // (e.g. sandbox mode blocking sends to non-owner addresses) shouldn't
    // surface as an error to the visitor. Awaited so serverless runtimes
    // don't freeze the function before the request actually goes out.
    try {
      const autoReply = contactAutoReplyTemplate(parsed.data);
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Shikshadwar Foundation <onboarding@resend.dev>`,
          to: parsed.data.email,
          subject: autoReply.subject,
          html: autoReply.html,
          text: autoReply.text,
        }),
      });
    } catch (error) {
      console.error("[contact-form] auto-reply failed:", error);
    }

    return { status: "success" };
  } catch (error) {
    console.error("[contact-form] delivery failed:", error);
    return {
      status: "error",
      message: `We couldn't send your message right now. Please email us directly at ${siteConfig.contact.email}.`,
    };
  }
}
