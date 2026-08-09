import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects your personal information.`,
  alternates: {
    canonical: "/privacy-policy/",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      breadcrumb="Privacy Policy"
      title="Privacy Policy"
      updated="9 August 2026"
      sections={[
        {
          heading: "Introduction",
          body: [
            `${siteConfig.name} ("we", "us", "our") is committed to protecting the privacy of everyone who visits our website, donates, sponsors a child, volunteers with us, or otherwise interacts with us. This Privacy Policy explains what information we collect, how we use it, and the choices you have.`,
          ],
        },
        {
          heading: "Information We Collect",
          body: [
            "We may collect personal information such as your name, email address, phone number, postal address, and payment details when you make a donation, sponsor a child, sign up for our newsletter, apply to volunteer, or contact us through the website.",
            "We also automatically collect limited technical information, such as browser type, device information, and pages visited, to help us improve the website's performance and user experience.",
          ],
        },
        {
          heading: "How We Use Your Information",
          body: [
            "We use the information we collect to process donations and sponsorships, issue tax-exemption receipts, respond to enquiries, send updates about our programmes, and comply with legal and regulatory requirements applicable to a registered charitable trust.",
            "We do not sell or rent your personal information to third parties.",
          ],
        },
        {
          heading: "Payment Information",
          body: [
            "Donations made through our website are processed by Razorpay, a PCI-DSS compliant payment gateway. We do not store your card, UPI, or net-banking credentials on our servers — these are handled directly by our payment partner.",
          ],
        },
        {
          heading: "Data Sharing",
          body: [
            "We may share information with trusted service providers who help us operate the website, process payments, or send communications, solely for the purposes described in this policy. We may also disclose information where required by law.",
          ],
        },
        {
          heading: "Data Security",
          body: [
            "We take reasonable technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.",
          ],
        },
        {
          heading: "Your Choices",
          body: [
            "You may opt out of our newsletter or promotional communications at any time. To access, correct, or request deletion of your personal information, please contact us using the details below.",
          ],
        },
        {
          heading: "Contact Us",
          body: [
            `If you have any questions about this Privacy Policy, please write to us at ${siteConfig.contact.email} or call ${siteConfig.contact.phone}.`,
          ],
        },
      ]}
    />
  );
}
