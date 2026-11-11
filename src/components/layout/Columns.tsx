import Box, { type BoxProps } from "@mui/material/Box";
import type { Breakpoint, SxProps, Theme } from "@mui/material/styles";

type Track = number | string;
type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

type ColumnsProps = Omit<BoxProps, "sx"> & {
  columns: Responsive<Track>;
  areas?: Responsive<string>;
  gap?: Responsive<number | string>;
  columnGap?: Responsive<number | string>;
  rowGap?: Responsive<number | string>;
  alignItems?: Responsive<string>;
  sx?: SxProps<Theme>;
};

const breakpoints = ["sm", "md", "lg", "xl", "xxl"] as const;

export function Columns({
  columns,
  areas,
  gap,
  columnGap,
  rowGap,
  alignItems,
  component = "div",
  sx,
  ...rest
}: ColumnsProps) {
  const list = component === "ul" || component === "ol";

  return (
    <Box
      {...rest}
      component={component}
      sx={[
        {
          display: "grid",
          gridTemplateColumns: tracks(columns),
          ...(areas ? { gridTemplateAreas: areas } : null),
          ...(gap !== undefined ? { gap } : null),
          ...(columnGap !== undefined ? { columnGap } : null),
          ...(rowGap !== undefined ? { rowGap } : null),
          ...(alignItems !== undefined ? { alignItems } : null),
          ...(list ? { m: 0, p: 0, listStyle: "none" } : null),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}

function tracks(columns: ColumnsProps["columns"]) {
  if (typeof columns === "number" || typeof columns === "string") return track(columns);

  return {
    xs: track(columns.xs ?? 1),
    ...Object.fromEntries(
      breakpoints
        .filter((breakpoint) => columns[breakpoint] !== undefined)
        .map((breakpoint) => [breakpoint, track(columns[breakpoint] as Track)]),
    ),
  };
}

function track(value: Track) {
  return typeof value === "number" ? `repeat(${value}, minmax(0, 1fr))` : value;
}
