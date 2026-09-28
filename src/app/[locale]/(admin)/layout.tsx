import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { NavItem } from "@/components/layout/nav-links";
import { requireRole } from "@/lib/auth/guards";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireRole(["ADMIN"]);
  const t = await getTranslations("admin.nav");
  const items: NavItem[] = [
    { href: "/admin", label: t("overview"), iconName: "dashboard", exact: true },
    { href: "/admin/users", label: t("users"), iconName: "users" },
    { href: "/admin/organizers", label: t("organizers"), iconName: "organizers" },
    { href: "/admin/events", label: t("events"), iconName: "events" },
    { href: "/admin/categories", label: t("categories"), iconName: "categories" },
    { href: "/admin/bookings", label: t("bookings"), iconName: "bookings" },
    { href: "/admin/payments", label: t("payments"), iconName: "payments" },
    { href: "/admin/reports", label: t("reports"), iconName: "reports" },
    { href: "/admin/reviews", label: t("reviews"), iconName: "reviews" },
    { href: "/admin/comments", label: t("comments"), iconName: "comments" },
  ];
  return (
    <DashboardShell title={t("title")} items={items}>
      {children}
    </DashboardShell>
  );
}
