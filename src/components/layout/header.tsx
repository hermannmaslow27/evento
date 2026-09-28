import { getLocale, getTranslations } from "next-intl/server";
import { Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getCurrentUser } from "@/lib/auth/guards";
import { buttonClass } from "@/components/ui/button";
import { NotificationBell } from "@/features/notifications/components/notification-bell";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileMenu } from "./mobile-menu";
import { UserMenu } from "./user-menu";
import type { NavItem } from "./nav-links";

export async function Header() {
  const [user, t, locale] = await Promise.all([getCurrentUser(), getTranslations("nav"), getLocale()]);
  const canOrganize = user?.role === "ORGANIZER" || user?.role === "ADMIN";

  const mobileItems: NavItem[] = [
    { href: "/", label: t("home"), exact: true },
    { href: "/discover", label: t("discover") },
    { href: "/search", label: t("search") },
    ...(user
      ? [
          { href: "/tickets", label: t("tickets") },
          { href: "/favorites", label: t("favorites") },
          { href: "/notifications", label: t("notifications") },
        ]
      : [
          { href: "/login", label: t("login") },
          { href: "/register", label: t("register") },
        ]),
    ...(canOrganize ? [{ href: "/organizer/events/new", label: t("createEvent") }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/85 backdrop-blur-xl">
      <div className="container-page relative flex h-16 items-center gap-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-brand-700">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-600 text-sm text-white shadow-sm">E</span>
          Evento
        </Link>
        <nav aria-label={t("main")} className="ml-4 hidden items-center gap-1 md:flex">
          <Link href="/discover" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
            {t("discover")}
          </Link>
          {user && (
            <Link href="/tickets" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              {t("tickets")}
            </Link>
          )}
        </nav>

        <form action={`/${locale}/search`} method="get" role="search" className="ml-auto hidden max-w-xs flex-1 lg:block">
          <label htmlFor="header-search" className="sr-only">
            {t("searchLabel")}
          </label>
          <div className="relative">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            id="header-search"
            name="q"
            type="search"
            placeholder={t("searchPlaceholder")}
            className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm transition focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-100"
          />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <Link href="/search" className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-100 lg:hidden" aria-label={t("search")}>
            <Search aria-hidden="true" className="h-4 w-4" />
          </Link>
          {canOrganize && (
            <Link href="/organizer/events/new" className={buttonClass({ size: "sm", className: "hidden md:inline-flex" })}>
              {t("createEvent")}
            </Link>
          )}
          <div className="hidden sm:block">
            <LocaleSwitcher />
          </div>
          {user ? (
            <>
              <NotificationBell />
              <UserMenu user={user} />
            </>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/login" className={buttonClass({ variant: "ghost", size: "sm" })}>
                {t("login")}
              </Link>
              <Link href="/register" className={buttonClass({ size: "sm" })}>
                {t("register")}
              </Link>
            </div>
          )}
          <MobileMenu items={mobileItems} />
        </div>
      </div>
    </header>
  );
}
