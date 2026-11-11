import Box from "@mui/material/Box";

import { beamFrames } from "@/components/sections/services/work/beam";

import styles from "./Arrow.module.css";

type ArrowProps = {
  /** Starts a new row on tablet, so the connector is only the phone and desktop one. */
  rowStart?: boolean;
  /** Place in the connector sequence. The beam travels one arrow at a time. */
  order?: number;
};

const arrowMask = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 14"><path d="M0 7h24M19 2.2 24.2 7 19 11.8" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
)}")`;

export function Arrow({ rowStart = false, order = 0 }: ArrowProps) {
  const sequence = `processBeamX${order}`;
  const pair = order === 0 ? "processBeamPairA" : "processBeamPairB";

  return (
    <Box
      aria-hidden
      sx={{
        display: rowStart ? { xs: "flex", sm: "none", lg: "flex" } : "flex",
        position: { xs: "static", sm: "absolute", lg: "static" },
        top: { sm: 67, lg: "auto" },
        insetInlineStart: { sm: -4, lg: "auto" },
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        alignSelf: "center",
        width: { xs: 28, lg: 32 },
        height: { xs: 36, sm: "auto", lg: 148 },
        color: "primary.main",
        filter: "drop-shadow(0 0 6px rgba(247, 207, 0, 0.85))",
        transform: { xs: "rotate(90deg)", sm: "none" },
        '[dir="rtl"] &': {
          transform: { xs: "rotate(90deg)", sm: "scaleX(-1)" },
        },
        "@keyframes processBeamX0": beamFrames(0, 3, "x", true),
        "@keyframes processBeamX1": beamFrames(1, 3, "x", true),
        "@keyframes processBeamX2": beamFrames(2, 3, "x", true),
        "@keyframes processBeamPairA": beamFrames(0, 2, "x", true),
        "@keyframes processBeamPairB": beamFrames(1, 2, "x", true),
      }}
    >
      <Box sx={{ position: "relative", width: 28, height: 14 }}>
        <Box
          component="svg"
          viewBox="0 0 28 14"
          sx={{ width: 28, height: 14, display: "block" }}
        >
          <path
            d="M0 7h24M19 2.2 24.2 7 19 11.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Box>
        <Box
          aria-hidden
          className={styles.beam}
          sx={{
            maskImage: arrowMask,
            WebkitMaskImage: arrowMask,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            "&::before": {
              animationName: sequence,
              "@media (min-width:600px)": { animationName: pair },
              "@media (min-width:1200px)": { animationName: sequence },
            },
          }}
        />
      </Box>
    </Box>
  );
}
