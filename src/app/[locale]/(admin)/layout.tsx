import type { ReactNode } from "react";
import { CalendarDays, ChartNoAxesCombined, CreditCard, Flag, MessageCircle, ReceiptText, Star, Tags, UsersRound, Building2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireRole } from "@/lib/auth/guards";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireRole(["ADMIN"]);
  const t = await getTranslations("admin.nav");
  const items = [
    { href: "/admin", label: t("overview"), icon: ChartNoAxesCombined, exact: true },
    { href: "/admin/users", label: t("users"), icon: UsersRound },
    { href: "/admin/organizers", label: t("organizers"), icon: Building2 },
    { href: "/admin/events", label: t("events"), icon: CalendarDays },
    { href: "/admin/categories", label: t("categories"), icon: Tags },
    { href: "/admin/bookings", label: t("bookings"), icon: ReceiptText },
    { href: "/admin/payments", label: t("payments"), icon: CreditCard },
    { href: "/admin/reports", label: t("reports"), icon: Flag },
    { href: "/admin/reviews", label: t("reviews"), icon: Star },
    { href: "/admin/comments", label: t("comments"), icon: MessageCircle },
  ];
  return (
    <DashboardShell title={t("title")} items={items}>
      {children}
    </DashboardShell>
  );
}
