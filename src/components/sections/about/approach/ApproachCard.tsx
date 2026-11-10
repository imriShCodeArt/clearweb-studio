import Box from "@mui/material/Box";
import Image from "next/image";

import { Card } from "@/components/surfaces";
import { Text } from "@/components/typography";

type ApproachCardProps = {
  title: string;
  description: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
};

export function ApproachCard({ title, description, image }: ApproachCardProps) {
  return (
    <Card
      component="li"
      sx={{
        alignItems: "center",
        gap: 1.75,
        px: { xs: 2, md: 2.25 },
        py: { xs: 2.5, md: 3 },
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          width: "100%",
          height: { xs: 156, sm: 128, lg: 148 },
        }}
      >
        <Image
          alt=""
          src={image.src}
          width={image.width}
          height={image.height}
          sizes="(max-width: 599px) 70vw, 220px"
          style={{
            width: "auto",
            maxWidth: "100%",
            maxHeight: "100%",
            height: "auto",
          }}
        />
      </Box>
      <Box>
        <Text
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.15rem", md: "1.25rem" },
            lineHeight: 1.2,
          }}
        >
          {title}
        </Text>
        <Text tone="secondary" variant="body2" sx={{ mt: 0.75 }}>
          {description}
        </Text>
      </Box>
    </Card>
  );
}
