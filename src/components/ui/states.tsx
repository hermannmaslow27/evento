import type { ReactNode } from "react";
import { CircleAlert, Sparkles, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Spinner } from "./spinner";

export function EmptyState({ title, description, action, icon: Icon = Sparkles }: { title: string; description?: string; action?: ReactNode; icon?: LucideIcon }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white/80 px-6 py-14 text-center shadow-sm backdrop-blur">
      <span aria-hidden="true" className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 shadow-sm">
        <Icon className="h-7 w-7" strokeWidth={1.8} />
      </span>
      <h2 className="mt-4 text-lg font-semibold text-gray-900">{title}</h2>
      {description && <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({ title, description, action }: { title?: string; description?: string; action?: ReactNode }) {
  const t = useTranslations("states");
  return (
    <div role="alert" className="flex flex-col items-center justify-center rounded-3xl border border-red-200 bg-red-50 px-6 py-14 text-center">
      <span aria-hidden="true" className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-700">
        <CircleAlert className="h-7 w-7" strokeWidth={1.8} />
      </span>
      <h2 className="mt-4 text-lg font-semibold text-red-800">{title ?? t("errorTitle")}</h2>
      <p className="mt-1 max-w-md text-sm text-red-700">{description ?? t("errorDescription")}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function LoadingState({ label }: { label?: string }) {
  const t = useTranslations("states");
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-brand-600">
      <Spinner size="lg" label={label ?? t("loading")} />
      <p className="text-sm text-gray-500">{label ?? t("loading")}</p>
    </div>
  );
}
