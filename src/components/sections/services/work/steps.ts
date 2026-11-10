export const steps = [
  {
    id: "discovery",
    image: "/services/services-work-section-01-discovery.png",
  },
  {
    id: "architecture",
    image: "/services/services-work-section-02-architecture.png",
  },
  {
    id: "development",
    image: "/services/services-work-section-03-development.png",
  },
  {
    id: "launch",
    image: "/services/services-work-section-04-launch.png",
  },
] as const;

export type WorkStep = {
  id: string;
  image: string;
  title: string;
  description: string;
};
