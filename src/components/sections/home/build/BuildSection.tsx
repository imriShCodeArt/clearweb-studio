import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import { getTranslations } from "next-intl/server";

import { beats } from "@/animations/home";
import { Columns, Section } from "@/components/layout";
import { Reveal, Sequence } from "@/components/motion";
import { Eyebrow, MarkedHeading, Text } from "@/components/typography";

import { BuildCard } from "./BuildCard";
import { offerings } from "./offerings";

function BuildIntro({ children }: { children: ReactNode }) {
  return <Box sx={{ minWidth: 0 }}>{children}</Box>;
}

function BuildSummary({ children }: { children: ReactNode }) {
  return <Reveal sx={{ maxWidth: 300, flexShrink: 0, mt:{xs:2, md: 0} }}>{children}</Reveal>;
}

export async function BuildSection() {
  const t = await getTranslations("home.build");

  return (
    <Section id="services" spacing="compact">
      <Sequence
        cascade
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          mb: { xs: 4, md: 6 },
        }}
      >
        <BuildIntro>
          <Reveal>
            <Box sx={{ mb: 2.5 }}>
              <Eyebrow variant="rule">{t("eyebrow")}</Eyebrow>
            </Box>
          </Reveal>
          <MarkedHeading level={2}>
            <Reveal>
              <MarkedHeading.Line tilt>{t("line1")}</MarkedHeading.Line>
            </Reveal>
            <MarkedHeading.Line>
              <Reveal>
                <MarkedHeading.Mark>{t("emphasis")}</MarkedHeading.Mark>
              </Reveal>
            </MarkedHeading.Line>
          </MarkedHeading>
        </BuildIntro>
        <BuildSummary>
          <Text tone="secondary">{t("description")}</Text>
        </BuildSummary>
      </Sequence>

      <Columns
        component="ul"
        columns={{ md: 3 }}
        gap={2}
        data-animate={beats.revealList}
      >
        {offerings.map((offering) => (
          <BuildCard
            key={offering.id}
            Icon={offering.Icon}
            title={t(`items.${offering.id}.title`)}
            description={t(`items.${offering.id}.description`)}
          />
        ))}
      </Columns>
    </Section>
  );
}
