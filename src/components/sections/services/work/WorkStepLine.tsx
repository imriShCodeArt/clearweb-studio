import Box from "@mui/material/Box";

import { beamTrack } from "./beam";

type WorkStepLineProps = {
  index: number;
  count: number;
};

const {
  "&::before": verticalBeam,
  "@media (min-width:600px)": horizontalBeam,
  ...beamBox
} = beamTrack;

const beamMotion = {
  animationDuration: "1.8s",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
} as const;

export function WorkStepLine({ index, count }: WorkStepLineProps) {
  const isLast = index === count - 1;
  const endsRowOfTwo = index % 2 === 1;
  const column = ["workBeamY0", "workBeamY1", "workBeamY2"][index] ?? "none";
  const pair = index < 2 ? "workBeamX2a" : "workBeamX2b";
  const row = ["workBeamX0", "workBeamX1", "workBeamX2"][index] ?? "none";

  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        zIndex: 0,
        pointerEvents: "none",
        bgcolor: "primary.main",
        boxShadow: "0 0 12px 1px rgba(247, 207, 0, 0.8)",
        display: "none",
        top: 75,
        left: "50%",
        width: 2,
        height: "calc(100% + 32px)",
        transform: "translateX(-50%)",
        "@media (min-width:600px)": {
          display: isLast || endsRowOfTwo ? "none" : "block",
          height: 2,
          width: "calc(100% + 32px)",
          transform: "translateY(-50%)",
        },
        "@media (min-width:900px)": {
          top: 85,
        },
        "@media (min-width:1200px)": {
          display: isLast ? "none" : "block",
          width: "calc(100% + 24px)",
        },
      }}
    >
      <Box
        aria-hidden
        sx={{
          ...beamBox,
          "@media (max-width:599.95px)": {
            "&::before": {
              ...verticalBeam,
              ...beamMotion,
              animationName: column,
            },
          },
          "@media (min-width:600px)": {
            "&::before": {
              ...horizontalBeam["&::before"],
              ...beamMotion,
              animationName: pair,
            },
          },
          "@media (min-width:1200px)": {
            "&::before": {
              ...horizontalBeam["&::before"],
              ...beamMotion,
              animationName: row,
            },
          },
        }}
      />
    </Box>
  );
}
