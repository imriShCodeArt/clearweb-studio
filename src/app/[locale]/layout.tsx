import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { AppProviders } from "@/components/providers";
import { AppShell } from "@/components/shell";
import { shellContent } from "@/config/site";
import { getLocaleDirection } from "@/i18n/locale";
import { routing } from "@/i18n/routing";

import "../globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "700", "800"],
  display: "swap",
  variable: "--font-heebo",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: LayoutProps<"/[locale]">,
): Promise<Metadata> {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const [t, messages] = await Promise.all([
    getTranslations("shell"),
    getMessages(),
  ]);
  const direction = getLocaleDirection(locale);
  const shell = shellContent(t);

  return (
    <html lang={locale} dir={direction} className={heebo.variable}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppProviders direction={direction}>
            <AppShell
              brand={shell.brand}
              brandHref={shell.brandHref}
              items={shell.nav}
              navLabel={shell.navLabel}
              menuLabel={shell.menuLabel}
              closeLabel={shell.closeLabel}
              talkLabel={shell.talkLabel}
              footer={shell.footer}
            >
              {children}
            </AppShell>
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
