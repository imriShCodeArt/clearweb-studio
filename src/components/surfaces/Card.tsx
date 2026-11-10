import type { ElementType, ReactNode } from "react";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

type CardProps = {
  children: ReactNode;
  component?: ElementType;
  sx?: SxProps<Theme>;
};

const frameSx = {
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  borderRadius: "22px",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  backgroundColor: "rgba(255, 255, 255, 0.03)",
} as const;

export function Card({ children, component = "div", sx }: CardProps) {
  return (
    <Box
      component={component}
      sx={[frameSx, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </Box>
  );
}
