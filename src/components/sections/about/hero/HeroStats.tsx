import { homeMotion } from "@/animations/home";
import { Columns } from "@/components/layout";

import { HeroStat } from "./HeroStat";
import type { HeroStatIcon, HeroStatId } from "./stats";

const countDuration = 1.6;
const turn = homeMotion.fade.duration + countDuration;

export type HeroStatItem = {
  id: HeroStatId;
  icon: HeroStatIcon;
  value: string;
  label: string;
};

export function HeroStats({ stats }: { stats: HeroStatItem[] }) {
  return (
    <Columns component="ul" columns={{ sm: 3 }} gap={{ xs: 2, sm: 0 }}>
      {stats.map((stat, index) => (
        <HeroStat
          key={stat.id}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          divided={index > 0}
          delay={index * turn}
        />
      ))}
    </Columns>
  );
}
