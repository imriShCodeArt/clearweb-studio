import Box from "@mui/material/Box";

import type { OfferingPicture } from "./offerings";

export function OfferingImage({
  image,
  wide = false,
}: {
  image: OfferingPicture;
  wide?: boolean;
}) {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        zIndex: 0,
        bottom: 0,
        insetInlineEnd: 0,
        width: wide ? { xs: "70%", sm: "min(42%, 320px)", lg: "70%" } : "70%",
        aspectRatio: `${image.width} / ${image.height}`,
        backgroundImage: `url(${image.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        backgroundSize: "contain",
        pointerEvents: "none",
        '[dir="rtl"] &': { transform: "scaleX(-1)" },
      }}
    />
  );
}
