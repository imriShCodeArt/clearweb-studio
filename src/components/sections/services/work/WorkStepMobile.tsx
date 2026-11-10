import Box from "@mui/material/Box";

import { beamTrack } from "./beam";
import type { WorkStep } from "./steps";
import { WorkStepMobileCard } from "./WorkStepMobileCard";

const rail = "16px";

type WorkStepMobileProps = {
  step: WorkStep;
  index: number;
  count: number;
};

export function WorkStepMobile({ step, index, count }: WorkStepMobileProps) {
  const isLast = index === count - 1;
  const beam = ["workBeamY0", "workBeamY1", "workBeamY2"][index] ?? "none";

  return (
    <Box sx={{ position: "relative", marginInlineStart: 3 }}>
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          zIndex: 1,
          top: "50%",
          left: `-${rail}`,
          width: 8,
          height: 8,
          borderRadius: "50%",
          bgcolor: "primary.main",
          boxShadow: "0 0 8px rgba(247, 207, 0, 0.9)",
          transform: "translate(-50%, -50%)",
        }}
      />
      {isLast ? null : (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            zIndex: 0,
            top: "50%",
            left: `-${rail}`,
            width: 2,
            height: "calc(100% + 16px)",
            bgcolor: "primary.main",
            boxShadow: "0 0 12px 1px rgba(247, 207, 0, 0.8)",
            transform: "translate(-50%, 0)",
          }}
        >
          <Box
            aria-hidden
            sx={{
              ...beamTrack,
              "&::before": {
                ...beamTrack["&::before"],
                animationDuration: "1.8s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationName: beam,
              },
            }}
          />
        </Box>
      )}
      <WorkStepMobileCard step={step} index={index} />
    </Box>
  );
}
