import nodemailer, { type Transporter } from "nodemailer";
import { siteConfig } from "@/lib/site-config";

// Single shared SMTP transport for the contact@shikshadwarfoundation.org
// mailbox (Hostinger). Reused across contact / newsletter / volunteer forms
// instead of each action standing up its own client.
let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  if (!transporter) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    transporter = nodemailer.createTransport({
      host,
      port,
      // Port 465 is implicit TLS; anything else (e.g. 587) uses STARTTLS.
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
      auth: { user, pass },
    });
  }

  return transporter;
}

export function isMailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

type MailPayload = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

// Throws on failure — callers decide what "best-effort" means for them
// (e.g. an auto-reply failing shouldn't fail the enquiry that already landed).
export async function sendMail(payload: MailPayload): Promise<void> {
  const client = getTransporter();
  if (!client) {
    throw new Error("SMTP is not configured — set SMTP_HOST, SMTP_USER and SMTP_PASS.");
  }

  const from = process.env.MAIL_FROM || `Shikshadwar Foundation <${siteConfig.contact.email}>`;

  await client.sendMail({
    from,
    to: payload.to,
    replyTo: payload.replyTo,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
  });
}
