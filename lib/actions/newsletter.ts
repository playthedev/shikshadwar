"use server";

import { newsletterSchema } from "@/lib/validations/newsletter-schema";
import { siteConfig } from "@/lib/site-config";
import { newsletterEmailTemplate, newsletterWelcomeTemplate } from "@/lib/email-template";
import { isMailConfigured, sendMail } from "@/lib/mailer";

export type NewsletterActionState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

// TODO: set SMTP_HOST / SMTP_USER / SMTP_PASS in the environment to enable real delivery.
export async function submitNewsletterSignup(
  _prev: NewsletterActionState,
  formData: FormData,
): Promise<NewsletterActionState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
  };

  const parsed = newsletterSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  if (parsed.data.company) {
    return { status: "success" };
  }

  if (!isMailConfigured()) {
    console.error(
      "[newsletter-signup] SMTP is not configured — submission was not delivered:",
      parsed.data,
    );
    return {
      status: "error",
      message: `We couldn't sign you up right now. Please email us directly at ${siteConfig.contact.email}.`,
    };
  }

  const notification = newsletterEmailTemplate(parsed.data);
  const welcome = newsletterWelcomeTemplate(parsed.data);

  try {
    await sendMail({
      to: siteConfig.contact.email,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
    });

    // Best-effort welcome email to the subscriber — a failure here shouldn't
    // fail the sign-up, since the admin notification above already landed.
    try {
      await sendMail({
        to: parsed.data.email,
        subject: welcome.subject,
        html: welcome.html,
        text: welcome.text,
      });
    } catch (welcomeError) {
      console.error("[newsletter-signup] welcome email failed:", welcomeError);
    }

    return { status: "success" };
  } catch (error) {
    console.error("[newsletter-signup] delivery failed:", error);
    return {
      status: "error",
      message: `We couldn't sign you up right now. Please email us directly at ${siteConfig.contact.email}.`,
    };
  }
}
