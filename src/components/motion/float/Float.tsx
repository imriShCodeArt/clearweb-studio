
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./Float.module.css";

type FloatImage = {
  src: string;
  maskSrc?: string;
  width: number;
  height: number;
};

export type FloatMotion = "a" | "b";

type Rgb = readonly [number, number, number];

export type FloatProps = {
  image: FloatImage;
  alt?: string;
  motion?: FloatMotion;

  /** Unique seed for reproducible random movement. */
  seed?: string | number;

  duration?: string;
  delay?: string;
  sizes?: string;
  perspective?: number;

  edgeLayers?: number;
  edgeStep?: number;
  edgeFrom?: string;
  edgeTo?: string;

  shadow?: boolean;
  sx?: SxProps<Theme>;
};

type FloatVariables = CSSProperties & {
  "--float-duration": string;
  "--float-delay": string;
  "--float-perspective": string;
  "--float-mask": string;
  "--float-ratio": string;
  "--float-natural-width": string;
  "--float-natural-height": string;

  "--float-x": string;
  "--float-y": string;
  "--float-z": string;
  "--float-rx": string;
  "--float-ry": string;
  "--float-rz": string;

  "--sway-duration": string;
  "--sway-delay": string;
  "--sway-angle": string;
};

type EdgeVariables = CSSProperties & {
  "--edge-depth": string;
  "--edge-color": string;
};

const DEFAULT_DURATION = 10;

const DEFAULT_FROM: Rgb = [247, 190, 0];
const DEFAULT_TO: Rgb = [122, 78, 0];

const DEFAULT_LAYERS = 4;
const DEFAULT_STEP = 1.8;
const MAX_LAYERS = 16;

/* ---------------------------------------------
   Seeded randomness
--------------------------------------------- */

function seededRandom(
  seed: string,
  salt: number
): number {
  const input = `${seed}:${salt}`;
  let hash = 2166136261;

  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0) / 4294967295;
}

function randomBetween(
  seed: string,
  salt: number,
  min: number,
  max: number
): number {
  return min + seededRandom(seed, salt) * (max - min);
}

/* ---------------------------------------------
   Edge color helpers
--------------------------------------------- */

function parseHex(
  value: string | undefined,
  fallback: Rgb
): Rgb {
  if (!value) return fallback;

  const hex = value.trim().replace(/^#/, "");

  const normalized =
    hex.length === 3
      ? hex.replace(/./g, "$&$&")
      : hex;

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return fallback;
  }

  const color = Number.parseInt(normalized, 16);

  return [
    (color >> 16) & 255,
    (color >> 8) & 255,
    color & 255,
  ];
}

function interpolateColor(
  layer: number,
  total: number,
  from: Rgb,
  to: Rgb
): string {
  const t =
    total <= 1 ? 0 : (layer - 1) / (total - 1);

  const channels = from.map((start, index) =>
    Math.round(start + (to[index] - start) * t)
  );

  return `rgb(${channels.join(", ")})`;
}

function getLayerCount(value: number): number {
  if (!Number.isFinite(value)) {
    return DEFAULT_LAYERS;
  }

  return Math.min(
    MAX_LAYERS,
    Math.max(1, Math.round(value))
  );
}

/* ---------------------------------------------
   Float component
--------------------------------------------- */

export function Float({
  image,
  alt = "",
  motion = "a",
  seed,
  duration,
  delay,
  sizes = "(max-width: 599px) 70vw, 220px",
  perspective = 800,

  edgeLayers = DEFAULT_LAYERS,
  edgeStep = DEFAULT_STEP,
  edgeFrom,
  edgeTo,

  shadow = true,
  sx,
}: FloatProps) {
  /* Stable random values */

  const randomSeed = String(seed ?? `${image.src}:${motion}`);

  const rand = (
    salt: number,
    min: number,
    max: number
  ) => randomBetween(randomSeed, salt, min, max);

  const direction = motion === "a" ? 1 : -1;

  /* Edge configuration */

  const layers = getLayerCount(edgeLayers);

  const step = Number.isFinite(edgeStep)
    ? Math.max(0, edgeStep)
    : DEFAULT_STEP;

  const from = parseHex(edgeFrom, DEFAULT_FROM);
  const to = parseHex(edgeTo, DEFAULT_TO);

  const maskSrc = image.maskSrc ?? image.src;

  /* Randomized animation settings */

  const randomizedDuration = DEFAULT_DURATION * rand(1, 0.9, 1.15);

  const randomizedDelay = -rand(2, 0, 7);

  const variables: FloatVariables = {
    "--float-duration":
      duration ?? `${randomizedDuration.toFixed(2)}s`,

    "--float-delay":
      delay ?? `${randomizedDelay.toFixed(2)}s`,

    "--float-perspective":
      `${Number.isFinite(perspective)
        ? Math.max(1, perspective)
        : 800}px`,

    "--float-mask":
      `url(${JSON.stringify(maskSrc)})`,

    "--float-ratio":
      `${image.width} / ${image.height}`,

    "--float-natural-width":
      `${image.width}px`,

    "--float-natural-height":
      `${image.height}px`,

    /* Main floating movement */

    "--float-x":
      `${(direction * rand(3, 0.8, 2)).toFixed(2)}px`,

    "--float-y":
      `${(-rand(4, 2.5, 5)).toFixed(2)}px`,

    "--float-z":
      `${rand(5, 2, 5).toFixed(2)}px`,

    /* Main rotation */

    "--float-rx":
      `${(direction * rand(6, 1, 2.2)).toFixed(2)}deg`,

    "--float-ry":
      `${(direction * rand(7, 1.2, 2.6)).toFixed(2)}deg`,

    "--float-rz":
      `${(direction * rand(8, 0.15, 0.45)).toFixed(2)}deg`,

    /* Independent secondary sway */

    "--sway-duration":
      `${rand(9, 12, 16).toFixed(2)}s`,

    "--sway-delay":
      `${(-rand(10, 0, 9)).toFixed(2)}s`,

    "--sway-angle":
      `${rand(11, 0.12, 0.4).toFixed(2)}deg`,
  };

  return (
    <Box
      className={styles.root}
      style={variables}
      sx={sx}
    >
      {/* Animated ground shadow */}

      {shadow && (
        <span
          className={styles.shadow}
          aria-hidden="true"
        />
      )}

      {/* Primary animation */}

      <span
        className={[
          styles.figure,
          motion === "a" ? styles.motionA : styles.motionB,
        ].join(" ")}
      >
        {/* Independent secondary animation */}

        <span className={styles.sway}>
          {/* 3D extrusion layers */}

          {Array.from(
            { length: layers },
            (_, index) => layers - index
          ).map((layer) => {
            const edgeStyle: EdgeVariables = {
              "--edge-depth":
                `${-layer * step}px`,

              "--edge-color":
                interpolateColor(
                  layer,
                  layers,
                  from,
                  to
                ),
            };

            return (
              <span
                key={layer}
                className={styles.edge}
                style={edgeStyle}
                aria-hidden="true"
              />
            );
          })}

          {/* Front-facing image */}

          <Image
            className={styles.image}
            alt={alt}
            src={image.src}
            width={image.width}
            height={image.height}
            sizes={sizes}
          />
        </span>
      </span>
    </Box>
  );
}
