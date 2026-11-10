import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Text } from "@/components/typography";

import type { WorkStep } from "./steps";

export function WorkStepMobileCard({
  step,
  index,
}: {
  step: WorkStep;
  index: number;
}) {
  return (
    <Box
      sx={{
        border: "1px solid rgba(255, 255, 255, 0.14)",
        borderRadius: "16px",
        px: 2,
        py: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: 1.25,
          mb: 1.5,
        }}
      >
        <Box
          sx={{
            color: "text.primary",
            fontSize: 14,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </Box>
        <Typography
          sx={{
            color: "text.primary",
            fontWeight: 800,
            fontSize: "1.25rem",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
          }}
        >
          {step.title}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 120,
          mb: 1.5,
        }}
      >
        <Box
          component="img"
          src={step.image}
          alt=""
          sx={{
            display: "block",
            width: "100%",
            maxWidth: 220,
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </Box>
      <Text tone="secondary" variant="body2">
        {step.description}
      </Text>
    </Box>
  );
}
