import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms and conditions governing use of the ${siteConfig.name} website.`,
  alternates: {
    canonical: "/terms-and-conditions/",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      breadcrumb="Terms & Conditions"
      title="Terms & Conditions"
      updated="9 August 2026"
      sections={[
        {
          heading: "Acceptance of Terms",
          body: [
            `By accessing or using this website, you agree to be bound by these Terms & Conditions. ${siteConfig.name} is a ${siteConfig.legalStatus}. If you do not agree with any part of these terms, please do not use this website.`,
          ],
        },
        {
          heading: "Use of the Website",
          body: [
            "This website and its content are provided for general informational purposes and to facilitate donations, child sponsorship, and volunteering with us. You agree to use the website only for lawful purposes and not to misuse, disrupt, or attempt unauthorised access to it.",
          ],
        },
        {
          heading: "Donations & Sponsorships",
          body: [
            "All donations and sponsorship contributions made through this website are voluntary. Payments are processed securely through Razorpay. Upon successful payment, a receipt and, where applicable, an 80G tax-exemption certificate will be issued to the details provided at the time of donation.",
            "We reserve the right to use donated funds toward the programme or cause selected, or, where a specific programme is not indicated, toward our general charitable objectives.",
          ],
        },
        {
          heading: "Intellectual Property",
          body: [
            `All content on this website — including text, images, logos, and design — is the property of ${siteConfig.name} unless otherwise credited, and may not be reproduced without prior written permission.`,
          ],
        },
        {
          heading: "Third-Party Links",
          body: [
            "Our website may contain links to third-party websites, including our payment gateway and social media platforms. We are not responsible for the content or privacy practices of these external sites.",
          ],
        },
        {
          heading: "Limitation of Liability",
          body: [
            `${siteConfig.name} makes reasonable efforts to keep information on this website accurate and up to date, but does not guarantee it is free of errors. We shall not be liable for any loss or damage arising from the use of this website.`,
          ],
        },
        {
          heading: "Changes to These Terms",
          body: [
            "We may update these Terms & Conditions from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised terms.",
          ],
        },
        {
          heading: "Contact Us",
          body: [
            `For any questions regarding these Terms & Conditions, please contact us at ${siteConfig.contact.email} or call ${siteConfig.contact.phone}.`,
          ],
        },
      ]}
    />
  );
}
