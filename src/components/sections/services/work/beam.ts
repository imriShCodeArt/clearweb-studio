const beamLength = 28;
// Shifts are relative to the beam. -100% hides it before the segment;
// 100 / 0.28 hides it after the segment, so nothing rests on the joint.
const beamFrom = "-100%";
const beamTo = `${(10000 / beamLength).toFixed(2)}%`;
const beamFromX = `translateX(${beamFrom})`;
const beamToX = `translateX(${beamTo})`;
const beamFromY = `translateY(${beamFrom})`;
const beamToY = `translateY(${beamTo})`;

export function beamFrames(order: number, total: number, axis: "x" | "y") {
  const start = (order / total) * 100;
  const end = ((order + 1) / total) * 100;
  const from = axis === "x" ? beamFromX : beamFromY;
  const to = axis === "x" ? beamToX : beamToY;
  const frames: Record<string, { transform: string }> = {};
  const set = (percent: number, transform: string) => {
    frames[`${Number(percent.toFixed(2))}%`] = { transform };
  };

  set(0, from);
  set(start, from);
  set(end, to);
  set(100, to);

  return frames;
}

const beamBefore = {
  content: '""',
  position: "absolute",
  top: 0,
  left: 0,
} as const;

export const beamTrack = {
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  "&::before": {
    ...beamBefore,
    width: "100%",
    height: `${beamLength}%`,
    background:
      "linear-gradient(to bottom, transparent, #fff6c2 35%, #ffffff 50%, #fff6c2 65%, transparent)",
  },
  "@media (min-width:600px)": {
    "&::before": {
      ...beamBefore,
      width: `${beamLength}%`,
      height: "100%",
      background:
        "linear-gradient(to right, transparent, #fff6c2 35%, #ffffff 50%, #fff6c2 65%, transparent)",
    },
  },
  "@media (prefers-reduced-motion: reduce)": {
    display: "none",
  },
} as const;
