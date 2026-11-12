import Box from "@mui/material/Box";

import { Float, Motion } from "@/components/motion";
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
  index?: number;
};

export function ApproachCard({
  title,
  description,
  image,
  index = 0,
}: ApproachCardProps) {
  return (
    <Motion
      component="li"
      motion="item"
      sx={{ display: "flex", minWidth: 0, transformStyle: "preserve-3d" }}
    >
      <Card
        sx={{
          flex: 1,
          alignItems: "center",
          gap: 1.75,
          transformStyle: "preserve-3d",
          px: { xs: 2, md: 2.25 },
          py: { xs: 2.5, md: 3 },
          textAlign: "center",
        }}
      >
        <Float motion={index % 2 == 0 ? "a" : "b"} image={image} />
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
    </Motion>
  );
}
