import Box from "@mui/material/Box";

import { coveredPhoto, photos, slantedBottom } from "./backdrop";

export function AboutPhoto() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#0B0C0D",
        clipPath: slantedBottom,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: {
            xs: coveredPhoto(photos.mobile),
            md: coveredPhoto(photos.desktop),
            xl: coveredPhoto(photos.widescreen),
          },
          backgroundSize: "cover",
          backgroundPosition: { xs: "top", sm: "0% 40%", xl: "0% 40%" },
          backgroundRepeat: "no-repeat",
          '[dir="ltr"] &': { transform: "scaleX(-1)" },
        }}
      />
    </Box>
  );
}
