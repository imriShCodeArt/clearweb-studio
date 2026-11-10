export const seamSize = "clamp(32px, 3vw, 48px)";

export const slantedBottom = `polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - ${seamSize}))`;

export const photoShade = [
  "linear-gradient(to bottom,",
  "rgba(11, 12, 13, 0.38) 0%,",
  "rgba(11, 12, 13, 0.25) 34%,",
  "rgba(11, 12, 13, 0.25) 66%,",
  "rgba(11, 12, 13, 0.38) 100%)",
].join(" ");

export const photos = {
  mobile: "/homepage/about-section-bg-MOBILE.png",
  desktop: "/homepage/about-section-bg.png",
  widescreen: "/homepage/about-section-bg-WIDESCREEN.png",
} as const;

export const scrim = {
  xs: [
    "linear-gradient(to bottom,",
    "rgba(11, 12, 13, 0.92) 0%,",
    "rgba(11, 12, 13, 0.72) 26%,",
    "rgba(11, 12, 13, 0.16) 48%,",
    "rgba(11, 12, 13, 0) 64%)",
  ].join(" "),
  md: [
    "linear-gradient(to right,",
    "rgba(11, 12, 13, 0.9) 0%,",
    "rgba(11, 12, 13, 0.72) 32%,",
    "rgba(11, 12, 13, 0.16) 58%,",
    "rgba(11, 12, 13, 0) 74%)",
  ].join(" "),
};

export function coveredPhoto(src: string) {
  return `${photoShade},url(${src})`;
}
