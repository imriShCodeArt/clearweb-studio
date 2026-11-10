import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Text } from "@/components/typography";

import type { WorkStep } from "./steps";

export function WorkStepDesktop({
  step,
  index,
}: {
  step: WorkStep;
  index: number;
}) {
  return (
    <Box sx={{ display: { xs: "none", sm: "block" } }}>
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: { xs: 150, md: 170 },
          mb: 2,
        }}
      >
        <Box
          component="img"
          src={step.image}
          alt=""
          sx={{
            display: "block",
            width: "100%",
            maxWidth: 280,
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </Box>
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          mb: 1,
          color: "text.primary",
          fontSize: 14,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {String(index + 1).padStart(2, "0")}
        <Box
          aria-hidden
          sx={{
            width: 28,
            borderTop: "1px solid",
            borderColor: "rgba(255, 255, 255, 0.35)",
          }}
        />
      </Box>
      <Typography
        sx={{
          position: "relative",
          zIndex: 1,
          mb: 1,
          color: "text.primary",
          fontWeight: 800,
          fontSize: "1.35rem",
          lineHeight: 1.15,
          letterSpacing: "-0.03em",
        }}
      >
        {step.title}
      </Typography>
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 260,
          color: "text.secondary",
          "& .MuiTypography-root": { color: "inherit" },
        }}
      >
        <Text tone="secondary" variant="body2">
          {step.description}
        </Text>
      </Box>
    </Box>
  );
}
