export const steps = [
  {
    id: "discovery",
    image: "/services/work/services-work-section-01-discovery.webp",
  },
  {
    id: "architecture",
    image: "/services/work/services-work-section-02-architecture.webp",
  },
  {
    id: "development",
    image: "/services/work/services-work-section-03-development.webp",
  },
  {
    id: "launch",
    image: "/services/work/services-work-section-04-launch.webp",
  },
] as const;

export type WorkStep = {
  id: string;
  image: string;
  title: string;
  description: string;
};
