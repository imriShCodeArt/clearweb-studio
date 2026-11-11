import Box from "@mui/material/Box";
import { getTranslations } from "next-intl/server";

import { Columns, Section } from "@/components/layout";

import { HeroIntro } from "./HeroIntro";
import { HeroPortrait } from "./HeroPortrait";
import { HeroStats } from "./HeroStats";
import { stats } from "./stats";

export async function HeroSection() {
  const t = await getTranslations("about.hero");

  return (
    <Section id="about-hero" label={t("eyebrow")} spacing="none">
      <Columns
        alignItems={{ lg: "end" }}
        columnGap={{ lg: 4 }}
        rowGap={{ xs: 4, md: 5 }}
        columns={{ xs: 1, lg: "minmax(0, 1.15fr) minmax(280px, 0.85fr)" }}
        sx={{ overflow: "visible", pb: { xs: 4, md: 6 } }}
      >
        <Box sx={{ display: "grid", alignContent: "center", rowGap: { xs: 3.5, md: 5 } }}>
          <HeroIntro
            eyebrow={t("eyebrow")}
            line1={t("line1")}
            name={t("name")}
            role={t("role")}
            description={t("description")}
          />
          <HeroStats
            stats={stats.map((stat) => ({
              id: stat.id,
              icon: stat.Icon,
              value: t(`stats.${stat.id}.value`),
              label: t(`stats.${stat.id}.label`),
            }))}
          />
        </Box>
        <HeroPortrait />
      </Columns>
    </Section>
  );
}
