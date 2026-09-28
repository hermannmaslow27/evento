"use client";

import { useOptimistic, useTransition } from "react";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { Button, buttonClass } from "@/components/ui/button";
import { toggleFavoriteAction } from "../actions";

export function FavoriteButton({ eventId, initial, isAuthenticated }: { eventId: string; initial: boolean; isAuthenticated: boolean }) {
  const t = useTranslations("favorites");
  const te = useTranslations("errors");
  const [pending, startTransition] = useTransition();
  const [favorited, setOptimistic] = useOptimistic(initial);

  if (!isAuthenticated) {
    return (
      <Link href="/login" className={buttonClass({ variant: "outline" })}>
        <Heart aria-hidden="true" className="h-4 w-4" /> {t("add")}
      </Link>
    );
  }

  return (
    <Button
      variant="outline"
      aria-pressed={favorited}
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          setOptimistic(!favorited);
          const res = await toggleFavoriteAction(eventId);
          if (!res.ok) return void toast.error(te(res.error));
          toast.success(res.data.favorited ? t("added") : t("removed"));
        })
      }
    >
      <Heart aria-hidden="true" className={favorited ? "h-4 w-4 fill-red-500 text-red-500" : "h-4 w-4"} />
      {favorited ? t("remove") : t("add")}
    </Button>
  );
}
