import Box from "@mui/material/Box";

const seamSize = "clamp(32px, 3vw, 48px)";
const slantedTop = `polygon(0 0, 100% ${seamSize}, 100% 100%, 0 100%)`;

const photoShade = [
  "linear-gradient(to bottom,",
  "rgba(11, 12, 13, 0.38) 0%,",
  "rgba(11, 12, 13, 0.25) 34%,",
  "rgba(11, 12, 13, 0.25) 66%,",
  "rgba(11, 12, 13, 0.38) 100%)",
].join(" ");

const photo = "/homepage/contact-section-bg.png";

export function ContactBackdrop() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#12110F",
        clipPath: slantedTop,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `${photoShade}, url(${photo})`,
          backgroundSize: "cover",
          backgroundPosition: { xs: "82% 0%", md: "center" },
          backgroundRepeat: "no-repeat",
          '[dir="rtl"] &': { transform: "scaleX(-1)" },
        }}
      />
    </Box>
  );
}
