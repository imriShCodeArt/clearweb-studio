import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import {
  AboutSection,
  BuildSection,
  ContactSection,
  FeaturesSection,
  HeroSection,
  ProcessSection,
} from "@/components/sections/home";
import { MotionPage } from "@/components/motion";
import { routing } from "@/i18n/routing";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <MotionPage>
      <HeroSection />
      <ProcessSection />
      <FeaturesSection />
      <BuildSection />
      <AboutSection />
      <ContactSection />
    </MotionPage>
  );
}
