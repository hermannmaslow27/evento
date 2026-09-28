"use client";

import {
  Bell,
  Building2,
  CalendarDays,
  ChartNoAxesCombined,
  CirclePlus,
  CreditCard,
  Flag,
  Heart,
  Home,
  MessageCircle,
  ReceiptText,
  Search,
  Settings,
  Star,
  Tags,
  Ticket,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type NavIconName =
  | "profile"
  | "tickets"
  | "bookings"
  | "favorites"
  | "notifications"
  | "dashboard"
  | "events"
  | "create"
  | "organizers"
  | "users"
  | "categories"
  | "payments"
  | "reports"
  | "reviews"
  | "comments"
  | "settings"
  | "search"
  | "home";

const ICON_MAP: Record<NavIconName, LucideIcon> = {
  profile: UserRound,
  tickets: Ticket,
  bookings: ReceiptText,
  favorites: Heart,
  notifications: Bell,
  dashboard: ChartNoAxesCombined,
  events: CalendarDays,
  create: CirclePlus,
  organizers: Building2,
  users: UsersRound,
  categories: Tags,
  payments: CreditCard,
  reports: Flag,
  reviews: Star,
  comments: MessageCircle,
  settings: Settings,
  search: Search,
  home: Home,
};

export type NavItem = {
  href: string;
  label: string;
  iconName?: NavIconName;
  exact?: boolean;
};

export function NavLinks({
  items,
  label,
  orientation = "vertical",
}: {
  items: NavItem[];
  label: string;
  orientation?: "vertical" | "horizontal";
}) {
  const pathname = usePathname();
  return (
    <nav aria-label={label}>
      <ul className={cn(orientation === "vertical" ? "space-y-1" : "flex gap-1 overflow-x-auto")}>
        {items.map((item) => {
          const active = item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.iconName ? ICON_MAP[item.iconName] : undefined;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition",
                  active ? "bg-brand-50 text-brand-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                {Icon && <Icon aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={1.9} />}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
