"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/components/actions";
import type { Locale } from "@/i18n/routing";

const endonyms: Record<Locale, string> = {
  he: "עברית",
  en: "English",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("shell");
  const nextLocale: Locale = locale === "he" ? "en" : "he";

  return (
    <Link
      href="/"
      locale={nextLocale}
      hrefLang={nextLocale}
      lang={nextLocale}
      dir={nextLocale === "he" ? "rtl" : "ltr"}
      underline="none"
      color="inherit"
      aria-label={t("changeLanguage", { language: endonyms[nextLocale] })}
      sx={{ fontWeight: 700, unicodeBidi: "isolate" }}
    >
      {endonyms[nextLocale]}
    </Link>
  );
}
