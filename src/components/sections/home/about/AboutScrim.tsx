import Box from "@mui/material/Box";

import { scrim, slantedBottom } from "./backdrop";

export function AboutScrim() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        backgroundImage: scrim,
        clipPath: slantedBottom,
      }}
    />
  );
}
