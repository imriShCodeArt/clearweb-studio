import Box from "@mui/material/Box";

export function ProcessStepImage({ src }: { src: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        width: { xs: 168, lg: "100%" },
        height: { xs: 148, lg: 148 },
      }}
    >
      <Box
        component="img"
        src={src}
        alt=""
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </Box>
  );
}
