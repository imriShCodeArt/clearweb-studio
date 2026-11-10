import { getTranslations } from "next-intl/server";

import { Sequence } from "@/components/motion";

import { ProcessStep } from "./ProcessStep";
import { steps } from "./steps";

export async function ProcessSteps() {
  const t = await getTranslations("home.process");

  return (
    <Sequence
      component="ol"
      sx={{
        display: "flex",
        flex: { lg: "1 1 0" },
        flexDirection: { xs: "column", lg: "row" },
        alignItems: { xs: "center", lg: "stretch" },
        width: { xs: "100%", lg: "auto" },
        minWidth: 0,
        m: 0,
        p: 0,
        listStyle: "none",
      }}
    >
      {steps.map((step, index) => (
        <ProcessStep
          key={step.id}
          image={step.image}
          number={String(index + 1).padStart(2, "0")}
          title={t(`steps.${step.id}.title`)}
          description={t(`steps.${step.id}.description`)}
          showArrow={index > 0}
        />
      ))}
    </Sequence>
  );
}
