import Box from "@mui/material/Box";

import { Arrow } from "@/components/icons";
import { Reveal } from "@/components/motion";

import { ProcessStepCopy } from "./ProcessStepCopy";
import { ProcessStepImage } from "./ProcessStepImage";

type ProcessStepProps = {
  image: string;
  number: string;
  title: string;
  description: string;
  showArrow: boolean;
};

export function ProcessStep({
  image,
  number,
  title,
  description,
  showArrow,
}: ProcessStepProps) {
  return (
    <Reveal
      component="li"
      sx={{
        display: "flex",
        flex: { lg: 1 },
        flexDirection: { xs: "column", lg: "row" },
        alignItems: { xs: "center", lg: "stretch" },
        width: { xs: "100%", lg: "auto" },
        minWidth: 0,
      }}
    >
      {showArrow ? <Arrow /> : null}
      <Box
        sx={{
          display: "flex",
          flex: { lg: 1 },
          flexDirection: "column",
          alignItems: { xs: "center", lg: "flex-start" },
          gap: 1.5,
          width: { xs: "100%", lg: "auto" },
          maxWidth: { xs: 280, lg: "none" },
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
    </Reveal>
  );
}
