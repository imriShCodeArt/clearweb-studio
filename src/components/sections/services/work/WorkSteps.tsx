import Box from "@mui/material/Box";

import { servicesMotion } from "@/animations/services";
import { Columns } from "@/components/layout";
import { FadeIn } from "@/components/motion";

import { beamFrames } from "./beam";
import type { WorkStep } from "./steps";
import { WorkStepDesktop } from "./WorkStepDesktop";
import { WorkStepLine } from "./WorkStepLine";
import { WorkStepMobile } from "./WorkStepMobile";

export function WorkSteps({ steps }: { steps: WorkStep[] }) {
  return (
    <Columns
      component="ol"
      columns={{ sm: 2, lg: 4 }}
      gap={{ xs: 2, sm: 4, lg: 3 }}
      sx={{
        "@keyframes workBeamY0": beamFrames(0, 3, "y"),
        "@keyframes workBeamY1": beamFrames(1, 3, "y"),
        "@keyframes workBeamY2": beamFrames(2, 3, "y"),
        "@keyframes workBeamX2a": beamFrames(0, 2, "x"),
        "@keyframes workBeamX2b": beamFrames(1, 2, "x"),
        "@keyframes workBeamX0": beamFrames(0, 3, "x"),
        "@keyframes workBeamX1": beamFrames(1, 3, "x"),
        "@keyframes workBeamX2": beamFrames(2, 3, "x"),
      }}
    >
      {steps.map((step, index) => (
        <FadeIn
          component="li"
          key={step.id}
          delay={servicesMotion.lead + index * servicesMotion.stagger}
          from="bottom"
          sx={{ position: "relative", minWidth: 0 }}
        >
          <WorkStepLine index={index} count={steps.length} />
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <WorkStepMobile step={step} index={index} count={steps.length} />
          </Box>
          <WorkStepDesktop step={step} index={index} />
        </FadeIn>
      ))}
    </Columns>
  );
}
