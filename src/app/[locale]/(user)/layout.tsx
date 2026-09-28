import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NavLinks, type NavItem } from "@/components/layout/nav-links";
import { requireUser } from "@/lib/auth/guards";

export default async function UserLayout({ children }: { children: ReactNode }) {
  await requireUser();
  const t = await getTranslations("nav");
  const items: NavItem[] = [
    { href: "/profile", label: t("profile"), iconName: "profile" },
    { href: "/tickets", label: t("tickets"), iconName: "tickets" },
    { href: "/bookings", label: t("bookings"), iconName: "bookings" },
    { href: "/favorites", label: t("favorites"), iconName: "favorites" },
    { href: "/notifications", label: t("notifications"), iconName: "notifications" },
  ];
  return (
    <>
      <Header />
      <div className="border-b border-gray-200 bg-white">
        <div className="container-page py-2">
          <NavLinks items={items} label={t("account")} orientation="horizontal" />
        </div>
      </div>
      <main id="main" className="container-page py-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
