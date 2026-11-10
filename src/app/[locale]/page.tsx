import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import {
  AboutSection,
  BuildSection,
  ContactSection,
  FeaturesSection,
  HeroSection,
  HomeMotion,
  ProcessSection,
} from "@/components/sections/home";
import { routing } from "@/i18n/routing";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <HomeMotion key={locale}>
      <HeroSection />
      <ProcessSection />
      <FeaturesSection />
      <BuildSection />
      <AboutSection />
      <ContactSection />
    </HomeMotion>
  );
}
