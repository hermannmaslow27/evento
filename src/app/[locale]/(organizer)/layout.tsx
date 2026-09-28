import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { NavItem } from "@/components/layout/nav-links";
import { requireRole } from "@/lib/auth/guards";

export default async function OrganizerLayout({ children }: { children: ReactNode }) {
  await requireRole(["ORGANIZER", "ADMIN"]);
  const t = await getTranslations("organizer.nav");
  const items: NavItem[] = [
    { href: "/organizer", label: t("dashboard"), iconName: "dashboard", exact: true },
    { href: "/organizer/events", label: t("events"), iconName: "events" },
    { href: "/organizer/events/new", label: t("create"), iconName: "create", exact: true },
    { href: "/organizer/bookings", label: t("bookings"), iconName: "bookings" },
    { href: "/organizer/profile", label: t("profile"), iconName: "organizers" },
  ];
  return (
    <DashboardShell title={t("title")} items={items}>
      {children}
    </DashboardShell>
  );
}
