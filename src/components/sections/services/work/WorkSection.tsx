import { getTranslations } from "next-intl/server";

import { Columns, Section } from "@/components/layout";
import { Motion, StaggeredSectionMotion } from "@/components/motion";
import { CompactHeading } from "@/components/typography";

import { steps } from "./steps";
import { WorkSteps } from "./WorkSteps";

export async function WorkSection() {
  const t = await getTranslations("services.work");

  return (
    <StaggeredSectionMotion>
      <Section id="services-work" label={t("label")} spacing="compact">
        <Columns alignItems="start" columns={{ xs: 1, md: "1fr 3fr" }} columnGap={{ md: 6 }}>
          <Motion motion="heading">
            <CompactHeading
              eyebrow={t("eyebrow")}
              line1={t("line1")}
              line2={t("line2")}
              description={t("description")}
              sx={{ mb: { xs: 4, md: 0 } }}
            />
          </Motion>
          <WorkSteps
            steps={steps.map((step) => ({
              ...step,
              title: t(`steps.${step.id}.title`),
              description: t(`steps.${step.id}.description`),
            }))}
          />
        </Columns>
      </Section>
    </StaggeredSectionMotion>
  );
}
