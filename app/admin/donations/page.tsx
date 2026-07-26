import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session";
import { connectToDatabase } from "@/lib/mongodb";
import { DonationModel } from "@/lib/models/donation";
import { LogoutButton } from "@/components/admin/logout-button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type DonationRow = {
  _id: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  amount: number;
  currency: string;
  status: string;
  donor: { name: string; email: string; phone?: string };
  purpose?: string;
  method?: string;
  createdAt: string;
};

function formatInr(paise: number) {
  return (paise / 100).toLocaleString("en-IN", { style: "currency", currency: "INR" });
}

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-pine/10 text-pine",
  created: "bg-muted text-muted-foreground",
  failed: "bg-destructive/10 text-destructive",
  refunded: "bg-amber-500/10 text-amber-600",
};

export default async function AdminDonationsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!verifySessionToken(session)) {
    redirect("/admin/login");
  }

  await connectToDatabase();

  const [donations, totals] = await Promise.all([
    DonationModel.find({}).sort({ createdAt: -1 }).limit(200).lean<DonationRow[]>(),
    DonationModel.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } },
    ]),
  ]);

  const totalRaised = totals[0]?.total ?? 0;
  const paidCount = totals[0]?.count ?? 0;

  return (
    <div className="min-h-svh bg-background px-6 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-heading text-2xl text-ink">Donations</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {paidCount} successful donation{paidCount === 1 ? "" : "s"} · {formatInr(totalRaised)} raised
            </p>
          </div>
          <LogoutButton />
        </div>

        <div className="mt-8 overflow-x-auto rounded-(--radius) border border-border">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Donor</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Purpose</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment ID</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation._id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 whitespace-nowrap text-ink">
                    {new Date(donation.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-ink">{donation.donor?.name}</p>
                    <p className="text-xs text-muted-foreground">{donation.donor?.email}</p>
                  </td>
                  <td className="px-4 py-3 font-medium text-ink">
                    {formatInr(donation.amount)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{donation.purpose || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{donation.method || "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium capitalize",
                        STATUS_STYLES[donation.status] ?? "bg-muted text-muted-foreground",
                      )}
                    >
                      {donation.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {donation.razorpayPaymentId || "—"}
                  </td>
                </tr>
              ))}
              {donations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                    No donations yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
