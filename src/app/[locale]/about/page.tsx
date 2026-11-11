import Box from "@mui/material/Box";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { ApproachSection, DriveSection, HeroSection } from "@/components/sections/about";
import { AboutMotion } from "@/components/sections/about/AboutMotion";
import { AboutBackdrop } from "@/components/sections/about/AboutBackdrop";
import { routing } from "@/i18n/routing";

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <Box
      data-about-page
      sx={{
        position: "relative",
        isolation: "isolate",
        mt: { xs: "-72px", md: "-90px" },
        pt: { xs: "72px", md: "90px" },
      }}
    >
      <AboutBackdrop />
      <AboutMotion>
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <HeroSection />
          <ApproachSection />
          <DriveSection />
        </Box>
      </AboutMotion>
    </Box>
  );
}
