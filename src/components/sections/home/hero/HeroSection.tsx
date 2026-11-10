import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { getTranslations } from "next-intl/server";

import { homeMotion } from "@/animations/home";
import { PlayLink, PrimaryButton } from "@/components/actions";
import { FadeIn, HingeDrop, ReelText, Slide } from "@/components/motion";
import { Eyebrow, MarkedHeading, Text } from "@/components/typography";

import { HeroContainer } from "./HeroContainer";

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
  const { eyebrow, line1, line2, description, start, process } = homeMotion.hero;

  return (
    <HeroContainer>
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            pb: { xs: 8, md: 12 },
          }}
        >
          <Slide from="top" trigger="load" sx={slideSX}>
            <FadeIn delay={eyebrow.at} from="top">
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </FadeIn>
            <MarkedHeading level={1}>
              <MarkedHeading.Line tilt>
                <ReelText text={t("line1")} delay={line1.at} />
              </MarkedHeading.Line>
              <MarkedHeading.Line>
                <MarkedHeading.Mark>
                  <ReelText text={t("line2")} delay={line2.at} />
                </MarkedHeading.Mark>
              </MarkedHeading.Line>
            </MarkedHeading>
            <HingeDrop
              delay={description.at}
              transition={description.hinge}
              sx={{ display: "block", maxWidth: 360 }}
            >
              <Text tone="secondary">{t("description")}</Text>
            </HingeDrop>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <HingeDrop
                delay={start.at}
                transition={start.hinge}
                sx={{ display: "inline-flex" }}
              >
                <PrimaryButton>{t("start")}</PrimaryButton>
              </HingeDrop>
              <HingeDrop
                delay={process.at}
                transition={process.hinge}
                sx={{ display: "inline-flex" }}
              >
                <PlayLink href="#process">{t("process")}</PlayLink>
              </HingeDrop>
            </Stack>
          </Slide>
        </Box>
    </HeroContainer>
  );
}
