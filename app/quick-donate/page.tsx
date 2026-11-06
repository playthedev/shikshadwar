import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import { DonateForm } from "@/components/forms/donate-form";
import { siteConfig } from "@/lib/site-config";

import { QUICK_DONATION_INR, QUICK_DONATION_PURPOSE } from "@/lib/validations/donate-schema";

export const metadata: Metadata = {
  title: "Donate ₹251",
  description: `Support ${siteConfig.name} with a ₹${QUICK_DONATION_INR} donation.`,
  alternates: {
    canonical: "/quick-donate/",
  },
  // A link meant for WhatsApp / QR sharing — no need for it in search results.
  robots: { index: false, follow: false },
};

export default function QuickDonatePage() {
  return (
    <section className="py-[clamp(2.5rem,5vw,5rem)]">
      <Container>
        <div className="mx-auto max-w-xl rounded-(--radius) border border-border bg-surface p-6 md:p-9">
          <Image
            src="/logo.png"
            alt={siteConfig.name}
            width={160}
            height={64}
            className="mx-auto h-14 w-auto"
          />
          <h1 className="mt-6 text-center font-heading text-h3 text-balance text-ink">
            Donate ₹{QUICK_DONATION_INR} to support a child&apos;s education
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Share your details and complete the payment securely with Razorpay.
          </p>
          <div className="mt-8">
            <DonateForm
              minimal
              lockAmount
              defaultAmount={QUICK_DONATION_INR}
              defaultPurpose={QUICK_DONATION_PURPOSE}
              submitLabel={`Donate ₹${QUICK_DONATION_INR}`}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
