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
        display: { xs: "flex", sm: "grid", lg: "flex" },
        flex: { lg: "1 1 0" },
        flexDirection: { xs: "column", lg: "row" },
        gridTemplateColumns: { sm: "1fr 1fr", lg: "none" },
        alignItems: { xs: "center", sm: "start", lg: "stretch" },
        justifyItems: "center",
        gap: { sm: 4, lg: 0 },
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
          rowStart={index % 2 === 0}
          order={index - 1}
        />
      ))}
    </Sequence>
  );
}
