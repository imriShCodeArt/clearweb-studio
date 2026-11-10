import Box from "@mui/material/Box";

import { seamSize } from "./backdrop";

export function AboutSeam() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        zIndex: 2,
        left: 0,
        right: 0,
        bottom: 0,
        height: seamSize,
        pointerEvents: "none",
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      >
        <defs>
          <filter
            id="about-seam-glow"
            x="-5%"
            y="-80%"
            width="110%"
            height="260%"
          >
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="10"
          stroke="#F7CF00AA"
          strokeWidth="2"
          filter="url(#about-seam-glow)"
        />
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="10"
          stroke="#F7CF0099"
          strokeWidth="0.35"
        />
      </Box>
    </Box>
  );
}
