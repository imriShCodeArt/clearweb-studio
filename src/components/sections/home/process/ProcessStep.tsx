import Box from "@mui/material/Box";

import { Arrow } from "@/components/icons";
import { Motion } from "@/components/motion";

import { ProcessStepCopy } from "./ProcessStepCopy";
import { ProcessStepImage } from "./ProcessStepImage";

type ProcessStepProps = {
  image: string;
  number: string;
  title: string;
  description: string;
  showArrow: boolean;
  rowStart?: boolean;
  order?: number;
};

export function ProcessStep({
  image,
  number,
  title,
  description,
  showArrow,
  rowStart = false,
  order = 0,
}: ProcessStepProps) {
  return (
    <Motion
      component="li"
      motion="item"
      sx={{
        position: "relative",
        display: "flex",
        flex: { lg: 1 },
        flexDirection: { xs: "column", lg: "row" },
        alignItems: { xs: "center", lg: "stretch" },
        justifyContent: { xs: "center", lg: "flex-start" },
        width: { xs: "100%", lg: "auto" },
        minWidth: 0,
      }}
    >
      {showArrow ? <Arrow rowStart={rowStart} order={order} /> : null}
      <Box
        sx={{
          display: "flex",
          flex: { lg: 1 },
          flexDirection: "column",
          alignItems: { xs: "center", lg: "flex-start" },
          gap: 1.5,
          width: { xs: "100%", sm: "auto" },
          maxWidth: { xs: 280, sm: 220, lg: "none" },
          minWidth: 0,
          textAlign: { xs: "center", lg: "start" },
        }}
      >
        <ProcessStepImage src={image} />
        <ProcessStepCopy
          number={number}
          title={title}
          description={description}
        />
      </Box>
    </Motion>
  );
}
