import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type { OfferingIcon } from "./offerings";

const hairline = "1px solid rgba(255, 255, 255, 0.1)";

export type OfferingTag = {
  label: string;
  Icon: OfferingIcon;
};

function OfferingTagItem({
  tag,
  divided,
}: {
  tag: OfferingTag;
  divided: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        minWidth: 0,
        px: 1,
        py: 1.5,
        color: "text.secondary",
        borderInlineStart: divided ? hairline : "none",
      }}
    >
      <tag.Icon sx={{ flexShrink: 0, fontSize: "1rem" }} />
      <Typography
        component="span"
        sx={{
          color: "inherit",
          fontSize: "1rem",
          fontWeight: 400,
          lineHeight: 1.0,
          whiteSpace: "nowrap",
        }}
      >
        {tag.label}
      </Typography>
    </Box>
  );
}

export function OfferingTags({ tags }: { tags: OfferingTag[] }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "stretch",
        borderTop: hairline,
      }}
    >
      {tags.map((tag, index) => (
        <OfferingTagItem key={tag.label} tag={tag} divided={index > 0} />
      ))}
    </Box>
  );
}
