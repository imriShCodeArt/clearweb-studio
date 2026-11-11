import Box from "@mui/material/Box";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { servicesMotion } from "@/animations/services";
import { FadeIn } from "@/components/motion";
import { Eyebrow, MarkedHeading, Text } from "@/components/typography";

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

const line = { display: "block" } as const;

export async function HeroSection() {
  const t = await getTranslations("services.hero");
  const { hero } = servicesMotion;

  return (
    <HeroContainer id="services-hero">
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
        <Box sx={{ gridArea: "title", maxWidth: { lg: 560 }, minWidth: 0, my: "auto" }}>
          <FadeIn delay={hero.eyebrow} from="top" sx={{ mb: 2 }}>
            <Eyebrow variant="rule">{t("eyebrow")}</Eyebrow>
          </FadeIn>
          <MarkedHeading level={1} variant="compact">
            <FadeIn component="span" delay={hero.line1} from="top" sx={line}>
              <MarkedHeading.Line>{t("line1")}</MarkedHeading.Line>
            </FadeIn>
            <FadeIn component="span" delay={hero.line2} sx={line}>
              <MarkedHeading.Line>
                <MarkedHeading.Mark>{t("line2")}</MarkedHeading.Mark>
              </MarkedHeading.Line>
            </FadeIn>
          </MarkedHeading>
        </Box>
        <FadeIn delay={hero.description} sx={{ gridArea: "copy", minWidth: 0, ...headingCopy }}>
          <Text sx={{'textAlign':'center'}} tone="secondary">{t("description")}</Text>
        </FadeIn>
      </Box>
      <FadeIn
        delay={hero.art}
        from="bottom"
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
          src="/services/hero/services-hero-labtop-screens.png"
        />
      </FadeIn>
    </HeroContainer>
  );
}
