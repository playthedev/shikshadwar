"use server";

import { volunteerSchema } from "@/lib/validations/volunteer-schema";
import { siteConfig } from "@/lib/site-config";
import { volunteerEmailTemplate } from "@/lib/email-template";

export type VolunteerActionState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

// TODO: set RESEND_API_KEY in the environment to enable real delivery.
export async function submitVolunteerForm(
  _prev: VolunteerActionState,
  formData: FormData,
): Promise<VolunteerActionState> {
  const raw = {
    name: formData.get("name"),
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[volunteer-form] RESEND_API_KEY is not set — submission was not delivered:",
      parsed.data,
    );
    return {
      status: "error",
      message: `We couldn't submit this right now. Please email us directly at ${siteConfig.contact.email}.`,
    };
  }

  const template = volunteerEmailTemplate(parsed.data);

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
        subject: template.subject,
        html: template.html,
        text: template.text,
      }),
    });

    if (!res.ok) {
      throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
    }
    return { status: "success" };
  } catch (error) {
    console.error("[volunteer-form] delivery failed:", error);
    return {
      status: "error",
      message: `We couldn't submit this right now. Please email us directly at ${siteConfig.contact.email}.`,
    };
  }
}
