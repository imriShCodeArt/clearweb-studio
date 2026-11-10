import Box, { type BoxProps } from "@mui/material/Box";

import { beats } from "@/animations/home";

type ScrollSlideProps = BoxProps & {
  from: "right" | "left";
};

type LoadSlideProps = BoxProps & {
  from: "top";
  trigger: "load";
};

export function Reveal(props: BoxProps) {
  return <Box {...props} data-animate={beats.reveal} />;
}

export function RevealGroup(props: BoxProps) {
  return <Box {...props} data-animate={beats.revealList} />;
}

type SequenceProps = BoxProps & {
  cascade?: boolean;
};

export function Sequence({ cascade = false, ...props }: SequenceProps) {
  return (
    <Box
      {...props}
      data-animate={beats.revealSequence}
      {...(cascade ? { "data-cascade": "" } : {})}
    />
  );
}

export function Slide(props: ScrollSlideProps | LoadSlideProps) {
  if (props.from === "top") {
    const { from: _from, trigger: _trigger, ...rest } = props;
    return <Box {...rest} data-animate={beats.heroPanel} />;
  }

  const { from, ...rest } = props;
  return <Box {...rest} data-animate={beats.slide} data-from={from} />;
}
