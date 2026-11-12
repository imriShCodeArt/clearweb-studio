import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { getTranslations } from "next-intl/server";

import { PlayLink, PrimaryButton } from "@/components/actions";
import { Motion, ReelText } from "@/components/motion";
import { Eyebrow, MarkedHeading, Text } from "@/components/typography";

import { HeroContainer } from "./HeroContainer";
import { HeroMotion } from "./HeroMotion";

const slideSX = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  alignItems: "flex-start",
  maxWidth: { md: 460, lg: 540 },
  backgroundImage:
    "radial-gradient(ellipse 130% 55% at 50% 100%," +
    "rgba(11, 12, 13, 0.70) 100%," +
    " rgba(11, 12, 13, 0.70) 100%)",
  pt: { xs: "104px", md: "132px" },
  pb: "32px",
  paddingLeft: { xs: 1, md: "43px" },
  borderRadius: "0 0 50px 50px",
};

export async function HeroSection() {
  const t = await getTranslations("home.hero");

  return (
    <HeroMotion>
      <HeroContainer>
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            pb: { xs: 8, md: 12 },
          }}
        >
          <Motion motion="panel" sx={slideSX}>
            <Motion motion="eyebrow">
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </Motion>
            <MarkedHeading level={1}>
              <MarkedHeading.Line tilt>
                <ReelText text={t("line1")} motion="line1" />
              </MarkedHeading.Line>
              <MarkedHeading.Line>
                <MarkedHeading.Mark>
                  <ReelText text={t("line2")} motion="line2" />
                </MarkedHeading.Mark>
              </MarkedHeading.Line>
            </MarkedHeading>
            <Motion
              motion="description"
              sx={{ display: "block", maxWidth: 360 }}
            >
              <Text tone="secondary">{t("description")}</Text>
            </Motion>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Motion motion="start" sx={{ display: "inline-flex" }}>
                <PrimaryButton>{t("start")}</PrimaryButton>
              </Motion>
              <Motion motion="process" sx={{ display: "inline-flex" }}>
                <PlayLink href="#process">{t("process")}</PlayLink>
              </Motion>
            </Stack>
          </Motion>
        </Box>
      </HeroContainer>
    </HeroMotion>
  );
}
