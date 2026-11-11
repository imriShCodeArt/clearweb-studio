import Box from "@mui/material/Box";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import {
  HeroSection,
  OfferingsSection,
  WorkSection,
} from "@/components/sections/services";
import { ServicesBackdrop } from "@/components/sections/services/ServicesBackdrop";
import { ServicesMotion } from "@/components/sections/services/ServicesMotion";
import { routing } from "@/i18n/routing";

export default async function ServicesPage({
  params,
}: PageProps<"/[locale]/services">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <Box
      data-services-page
      sx={{
        position: "relative",
        mt: { xs: "-72px", md: "-90px" },
        pt: { xs: "72px", md: "90px" },
      }}
    >
      <ServicesBackdrop />
      <ServicesMotion>
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <HeroSection />
          <OfferingsSection />
          <WorkSection />
        </Box>
      </ServicesMotion>
    </Box>
  );
}
