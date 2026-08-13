"use server";

import { volunteerSchema } from "@/lib/validations/volunteer-schema";
import { siteConfig } from "@/lib/site-config";
import { volunteerEmailTemplate } from "@/lib/email-template";
import { isMailConfigured, sendMail } from "@/lib/mailer";

export type VolunteerActionState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

// TODO: set SMTP_HOST / SMTP_USER / SMTP_PASS in the environment to enable real delivery.
export async function submitVolunteerForm(
  _prev: VolunteerActionState,
  formData: FormData,
): Promise<VolunteerActionState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    dateOfBirth: formData.get("dateOfBirth"),
    address: formData.get("address"),
    occupation: formData.get("occupation"),
    company: formData.get("company"),
  };

  const parsed = volunteerSchema.safeParse(raw);
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
      "[volunteer-form] SMTP is not configured — submission was not delivered:",
      parsed.data,
    );
    return {
      status: "error",
      message: `We couldn't submit this right now. Please email us directly at ${siteConfig.contact.email}.`,
    };
  }

  const template = volunteerEmailTemplate(parsed.data);

  try {
    await sendMail({
      to: siteConfig.contact.email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
    return { status: "success" };
  } catch (error) {
    console.error("[volunteer-form] delivery failed:", error);
    return {
      status: "error",
      message: `We couldn't submit this right now. Please email us directly at ${siteConfig.contact.email}.`,
    };
  }
}
