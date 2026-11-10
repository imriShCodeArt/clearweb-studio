import Box from "@mui/material/Box";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { CompactHeading, Text } from "@/components/typography";

import { HeroContainer } from "./HeroContainer";

const headingCopy = {
  my: "auto",
  color: "text.secondary",
  "& .MuiTypography-root": {
    lineHeight: 1.65,
  },
  pt: { lg: "1rem" },
};

const imageProps = {
  width: 1286,
  height: 826,
  sizes: "(max-width: 1199px) 100vw, 900px",
  loading: "eager",
  style: {
    display: "block",
    width: "100%",
    maxWidth: "min(350px, 100%)",
    height: "auto",
  },
} as const;

export async function HeroSection() {
  const t = await getTranslations("services.hero");

  return (
    <HeroContainer>
      <Box
        sx={{
          display: { xs: "contents", sm: "flex", lg: "contents" },
          flexDirection: "column",
          justifyContent: "center",
          gap: { sm: 3, md: 4 },
          gridArea: "copy",
          minWidth: 0,
        }}
      >
        <CompactHeading
          eyebrow={t("eyebrow")}
          line1={t("line1")}
          line2={t("line2")}
          level={1}
          sx={{ gridArea: "title", maxWidth: { lg: 560 }, minWidth: 0, my: "auto" }}
        />
        <Box sx={{ gridArea: "copy", minWidth: 0, ...headingCopy }}>
          <Text tone="secondary">{t("description")}</Text>
        </Box>
      </Box>
      <Box
        sx={{
          gridArea: "art",
          minWidth: 0,
          justifySelf: "end",
          width: "100%",
          "& img": { marginInlineStart: "auto" },
          '[dir="rtl"] & img': { transform: "scaleX(-1)" },
        }}
      >
        <Image
          alt=""
          {...imageProps}
          src="/services/services-hero-labtop-screens.png"
        />
      </Box>
    </HeroContainer>
  );
}
