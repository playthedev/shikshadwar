import { siteConfig } from "@/lib/site-config";

const siteConfigEmail = siteConfig.contact.email;
const sitePhone = siteConfig.contact.phone;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type Row = { label: string; value: string };

function wrapEmail(heading: string, rows: Row[]): string {
  const rowsHtml = rows
    .map(
      (row) => `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #ece5db;">
          <p style="margin:0 0 4px;font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#a83a2b;">${escapeHtml(row.label)}</p>
          <p style="margin:0;font-size:15px;line-height:1.5;color:#211b15;white-space:pre-wrap;">${escapeHtml(row.value)}</p>
        </td>
      </tr>`,
    )
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4efe6;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4efe6;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #ece5db;">
            <tr>
              <td style="background:#211b15;padding:24px 28px;">
                <p style="margin:0;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#f4efe6;opacity:.7;">Shikshadwar Foundation</p>
                <h1 style="margin:6px 0 0;font-size:20px;color:#ffffff;">${escapeHtml(heading)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 28px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rowsHtml}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;background:#f4efe6;">
                <p style="margin:0;font-size:12px;color:#6b6259;">Sent automatically from the Shikshadwar Foundation website.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function contactEmailTemplate(data: {
  name: string;
  email: string;
  subject: string;
  message?: string;
}): { subject: string; html: string; text: string } {
  return {
    subject: `[Website] ${data.subject}`,
    html: wrapEmail("New contact enquiry", [
      { label: "Name", value: data.name },
      { label: "Email", value: data.email },
      { label: "Subject", value: data.subject },
      { label: "Message", value: data.message?.trim() || "(no message)" },
    ]),
    text: `New contact enquiry\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message?.trim() || "(no message)"}`,
  };
}

export function contactAutoReplyTemplate(data: {
  name: string;
  subject: string;
}): { subject: string; html: string; text: string } {
  const firstName = data.name.trim().split(/\s+/)[0] || data.name;

  return {
    subject: `We've received your message — Shikshadwar Foundation`,
    html: `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4efe6;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4efe6;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #ece5db;">
            <tr>
              <td style="background:#211b15;padding:32px 28px;text-align:center;">
                <p style="margin:0;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#f4efe6;opacity:.7;">Shikshadwar Foundation</p>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px 8px;text-align:center;">
                <div style="width:56px;height:56px;line-height:56px;border-radius:50%;background:#fbeee9;color:#a83a2b;font-size:26px;margin:0 auto 20px;">&#10003;</div>
                <h1 style="margin:0 0 12px;font-size:22px;color:#211b15;">Thank you, ${escapeHtml(firstName)}!</h1>
                <p style="margin:0;font-size:15px;line-height:1.6;color:#4a423a;">
                  We've received your message about <strong style="color:#211b15;">&ldquo;${escapeHtml(data.subject)}&rdquo;</strong>.
                  Our team will reach out to you shortly &mdash; usually within a couple of business days.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 36px;text-align:center;">
                <p style="margin:0;font-size:13px;color:#6b6259;">
                  In the meantime, feel free to reach us at
                  <a href="mailto:${siteConfigEmail}" style="color:#a83a2b;text-decoration:none;">${siteConfigEmail}</a>
                  or call ${escapeHtml(sitePhone)}.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;background:#f4efe6;">
                <p style="margin:0;font-size:12px;color:#6b6259;text-align:center;">
                  Shikshadwar Foundation &middot; Delhi, India
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    text: `Thank you, ${firstName}!\n\nWe've received your message about "${data.subject}". Our team will reach out to you shortly — usually within a couple of business days.\n\nIn the meantime, reach us at ${siteConfigEmail} or call ${sitePhone}.\n\nShikshadwar Foundation`,
  };
}

export function newsletterEmailTemplate(data: {
  name?: string;
  email: string;
}): { subject: string; html: string; text: string } {
  const label = data.name?.trim() || data.email;
  return {
    subject: `[Website] New newsletter sign-up: ${label}`,
    html: wrapEmail("New newsletter sign-up", [
      { label: "Name", value: data.name?.trim() || "—" },
      { label: "Email", value: data.email },
    ]),
    text: `New newsletter sign-up\n\nName: ${data.name?.trim() || "—"}\nEmail: ${data.email}`,
  };
}

export function newsletterWelcomeTemplate(data: {
  name?: string;
}): { subject: string; html: string; text: string } {
  const firstName = data.name?.trim().split(/\s+/)[0];
  const greeting = firstName ? `Welcome, ${escapeHtml(firstName)}!` : "Welcome!";

  return {
    subject: "You're on the list — Shikshadwar Foundation",
    html: `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4efe6;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4efe6;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #ece5db;">
            <tr>
              <td style="background:#211b15;padding:32px 28px;text-align:center;">
                <p style="margin:0;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#f4efe6;opacity:.7;">Shikshadwar Foundation</p>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px 8px;text-align:center;">
                <div style="width:56px;height:56px;line-height:56px;border-radius:50%;background:#fbeee9;color:#a83a2b;font-size:26px;margin:0 auto 20px;">&#9993;</div>
                <h1 style="margin:0 0 12px;font-size:22px;color:#211b15;">${greeting}</h1>
                <p style="margin:0;font-size:15px;line-height:1.6;color:#4a423a;">
                  Thanks for signing up. We'll send the occasional email when a programme reaches a
                  new milestone &mdash; a centre opens, a cohort finishes training, a season's health
                  camps wrap up. No spam, and you can unsubscribe from any email we send.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 36px;text-align:center;">
                <a
                  href="${siteConfig.url}/donate/"
                  style="display:inline-block;margin-top:8px;padding:12px 28px;border-radius:8px;background:#a83a2b;color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;"
                >
                  See where your support goes
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;background:#f4efe6;">
                <p style="margin:0;font-size:12px;color:#6b6259;text-align:center;">
                  Shikshadwar Foundation &middot; Delhi, India &middot;
                  <a href="mailto:${siteConfigEmail}" style="color:#a83a2b;text-decoration:none;">${siteConfigEmail}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    text: `${firstName ? `Welcome, ${firstName}!` : "Welcome!"}\n\nThanks for signing up. We'll send the occasional email when a programme reaches a new milestone — a centre opens, a cohort finishes training, a season's health camps wrap up. No spam, and you can unsubscribe from any email we send.\n\nSee where your support goes: ${siteConfig.url}/donate/\n\nShikshadwar Foundation · Delhi, India · ${siteConfigEmail}`,
  };
}

export function volunteerEmailTemplate(data: {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  occupation?: string;
}): { subject: string; html: string; text: string } {
  return {
    subject: `[Website] New volunteer sign-up: ${data.name}`,
    html: wrapEmail("New volunteer sign-up", [
      { label: "Name", value: data.name },
      { label: "Email", value: data.email },
      { label: "Phone", value: data.phone },
      { label: "Date of birth", value: data.dateOfBirth },
      { label: "Address", value: data.address },
      { label: "Occupation", value: data.occupation?.trim() || "—" },
    ]),
    text: `New volunteer sign-up\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nDate of birth: ${data.dateOfBirth}\nAddress: ${data.address}\nOccupation: ${data.occupation?.trim() || "—"}`,
  };
}
