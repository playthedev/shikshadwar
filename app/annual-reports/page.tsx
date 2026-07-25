import type { Metadata } from "next";
import { DocumentList } from "@/components/documents/document-list";
import { annualReports } from "@/lib/documents";

export const metadata: Metadata = {
  title: "Annual Reports",
  description: "Download Shikshadwar Foundation's published annual reports.",
  alternates: {
    canonical: "/annual-reports/",
  },
};

export default function AnnualReportsPage() {
  return (
    <DocumentList
      title="Annual Reports"
      description="Every rupee we raise is accounted for. Our annual reports cover programme outcomes and finances for the year, published for donors, partners and the communities we work with."
      documents={annualReports}
    />
  );
}
