import type { Metadata } from "next";
import { DocumentList } from "@/components/documents/document-list";
import { statutoryDocuments } from "@/lib/documents";

export const metadata: Metadata = {
  title: "Statutory Documents",
  description:
    "Shikshadwar Foundation's registration, 12A and 80G certificates for donors and partners who need to verify our statutory status.",
  alternates: {
    canonical: "/statutory-documents/",
  },
};

export default function StatutoryDocumentsPage() {
  return (
    <DocumentList
      title="Statutory Documents"
      description="Our registration and tax-exemption certificates, available for donors and partners who need to verify our statutory status."
      documents={statutoryDocuments}
    />
  );
}
