import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

type TextTone = "primary" | "secondary" | "muted";
type TextVariant = "body1" | "body2";

type TextProps = {
  children: ReactNode;
  tone?: TextTone;
  variant?: TextVariant;
  dir?: "ltr" | "rtl";
  sx?: SxProps<Theme>;
};

const textColor: Record<TextTone, string> = {
  primary: "text.primary",
  secondary: "text.secondary",
  muted: "text.disabled",
};

export function Text({
  children,
  tone = "primary",
  variant = "body1",
  dir,
  sx,
}: TextProps) {
  return (
    <Typography variant={variant} color={textColor[tone]} sx={sx}>
      {dir ? (
        <Box component="span" dir={dir} sx={{ unicodeBidi: "isolate" }}>
          {children}
        </Box>
      ) : (
        children
      )}
    </Typography>
  );
}
