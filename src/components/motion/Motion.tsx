import Box, { type BoxProps } from "@mui/material/Box";

type MotionProps = BoxProps & {
  motion: string;
};

export function Motion({ motion, ...props }: MotionProps) {
  return <Box {...props} data-motion={motion} />;
}
