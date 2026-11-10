import Box from "@mui/material/Box";

export function Arrow() {
  return (
    <Box
      aria-hidden
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        width: { xs: 28, lg: 32 },
        height: { xs: 36, lg: 148 },
        color: "rgba(255,255,255,0.45)",
        transform: { xs: "rotate(90deg)", lg: "none" },
        '[dir="rtl"] &': {
          transform: { xs: "rotate(90deg)", lg: "scaleX(-1)" },
        },
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 28 14"
        sx={{ width: 28, height: 14, display: "block" }}
      >
        <path
          d="M0 7h24M19 2.2 24.2 7 19 11.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Box>
    </Box>
  );
}
