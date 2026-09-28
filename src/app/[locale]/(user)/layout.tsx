import type { ReactNode } from "react";
import { Bell, Heart, ReceiptText, Ticket, UserRound } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NavLinks } from "@/components/layout/nav-links";
import { requireUser } from "@/lib/auth/guards";

export default async function UserLayout({ children }: { children: ReactNode }) {
  await requireUser();
  const t = await getTranslations("nav");
  const items = [
    { href: "/profile", label: t("profile"), icon: UserRound },
    { href: "/tickets", label: t("tickets"), icon: Ticket },
    { href: "/bookings", label: t("bookings"), icon: ReceiptText },
    { href: "/favorites", label: t("favorites"), icon: Heart },
    { href: "/notifications", label: t("notifications"), icon: Bell },
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
