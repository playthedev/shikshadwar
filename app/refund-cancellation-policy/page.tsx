import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: `${siteConfig.name}'s policy on refunds and cancellation of donations and sponsorships.`,
  alternates: {
    canonical: "/refund-cancellation-policy/",
  },
};

export default function RefundCancellationPolicyPage() {
  return (
    <LegalPage
      breadcrumb="Refund & Cancellation Policy"
      title="Refund & Cancellation Policy"
      updated="9 August 2026"
      sections={[
        {
          heading: "Overview",
          body: [
            `Donations made to ${siteConfig.name} are, in general, voluntary contributions towards our charitable programmes and are non-refundable. This policy explains the limited circumstances in which a refund or cancellation may be considered.`,
          ],
        },
        {
          heading: "Accidental or Duplicate Payments",
          body: [
            "If you made a donation in error — such as an incorrect amount or a duplicate transaction — please contact us within 7 days of the transaction with your payment reference number. We will verify the transaction with our payment gateway, Razorpay, and process an eligible refund to the original payment method.",
          ],
        },
        {
          heading: "Processing Time",
          body: [
            "Approved refunds are typically processed within 7–10 business days, though the exact time to reflect in your account depends on your bank or payment provider.",
          ],
        },
        {
          heading: "Recurring Sponsorships",
          body: [
            "If you have set up a recurring monthly or annual sponsorship, you may cancel future payments at any time by contacting us. Cancellation stops future charges but does not refund contributions already processed.",
          ],
        },
        {
          heading: "Non-Refundable Situations",
          body: [
            "Refunds will not be issued once funds have already been allocated or disbursed toward a programme, and cannot be provided for donations made more than 7 days prior to the refund request, except where required by law.",
          ],
        },
        {
          heading: "How to Request a Refund",
          body: [
            `To request a refund or cancel a recurring sponsorship, please email ${siteConfig.contact.email} or call ${siteConfig.contact.phone} with your name, transaction/order reference, and reason for the request.`,
          ],
        },
      ]}
    />
  );
}
