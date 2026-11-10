import { getTranslations } from "next-intl/server";

import { Columns, Section } from "@/components/layout";
import { CompactHeading } from "@/components/typography";

import { steps } from "./steps";
import { WorkSteps } from "./WorkSteps";

export async function WorkSection() {
  const t = await getTranslations("services.work");

  return (
    <Section label={t("label")} spacing="compact">
      <Columns alignItems="start" columns={{ xs: 1, md: "1fr 3fr" }} columnGap={{ md: 6 }}>
        <CompactHeading
          eyebrow={t("eyebrow")}
          line1={t("line1")}
          line2={t("line2")}
          description={t("description")}
          sx={{ mb: { xs: 4, md: 0 } }}
        />
        <WorkSteps
          steps={steps.map((step) => ({
            ...step,
            title: t(`steps.${step.id}.title`),
            description: t(`steps.${step.id}.description`),
          }))}
        />
      </Columns>
    </Section>
  );
}
