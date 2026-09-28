import type { ReactNode } from "react";
import { Building2, CalendarDays, ChartNoAxesCombined, CirclePlus, ReceiptText } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireRole } from "@/lib/auth/guards";

export default async function OrganizerLayout({ children }: { children: ReactNode }) {
  await requireRole(["ORGANIZER", "ADMIN"]);
  const t = await getTranslations("organizer.nav");
  const items = [
    { href: "/organizer", label: t("dashboard"), icon: ChartNoAxesCombined, exact: true },
    { href: "/organizer/events", label: t("events"), icon: CalendarDays },
    { href: "/organizer/events/new", label: t("create"), icon: CirclePlus, exact: true },
    { href: "/organizer/bookings", label: t("bookings"), icon: ReceiptText },
    { href: "/organizer/profile", label: t("profile"), icon: Building2 },
  ];
  return (
    <DashboardShell title={t("title")} items={items}>
      {children}
    </DashboardShell>
  );
}
