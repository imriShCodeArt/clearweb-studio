import Box from "@mui/material/Box";

import { Motion } from "@/components/motion";
import { Card } from "@/components/surfaces";

import { OfferingCopy } from "./OfferingCopy";
import { OfferingImage } from "./OfferingImage";
import type { OfferingPicture } from "./offerings";
import { OfferingTags, type OfferingTag } from "./OfferingTags";

type OfferingCardProps = {
  index: string;
  title: string;
  description: string;
  image: OfferingPicture;
  tags: OfferingTag[];
  wide?: boolean;
};

export function OfferingCard({
  index,
  title,
  description,
  image,
  tags,
  wide = false,
}: OfferingCardProps) {
  return (
    <Motion
      component="li"
      motion="item"
      sx={{
        display: "flex",
        minWidth: 0,
        ...(wide && { gridColumn: { sm: "1 / -1", lg: "auto" } }),
      }}
    >
      <Card
        sx={{
          flex: 1,
          overflow: "hidden",
          backgroundColor: "#121314",
        }}
      >
        <Box
          sx={{
            position: "relative",
            flex: 1,
            minHeight: wide ? { xs: 220, sm: 280, lg: 250 } : { xs: 220, md: 250 },
          }}
        >
          <OfferingImage image={image} wide={wide} />
          <OfferingCopy
            index={index}
            title={title}
            description={description}
            wide={wide}
          />
        </Box>
        <OfferingTags tags={tags} />
      </Card>
    </Motion>
  );
}
