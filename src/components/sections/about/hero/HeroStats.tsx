import { Columns } from "@/components/layout";

import { HeroStat } from "./HeroStat";
import type { HeroStatIcon, HeroStatId } from "./stats";

export type HeroStatItem = {
  id: HeroStatId;
  icon: HeroStatIcon;
  value: string;
  label: string;
};

function amountOf(value: string) {
  const amount = Number.parseFloat(value);
  return Number.isFinite(amount) ? amount : 0;
}

export function HeroStats({ stats }: { stats: HeroStatItem[] }) {
  const amounts = stats.map((stat) => amountOf(stat.value));
  const longest = Math.max(...amounts, 1);
  const items = stats.map((stat, index) => ({
    stat,
    index,
    duration: (amounts[index] / longest) * 1.6,
  }));

  return (
    <Columns component="ul" columns={{ sm: 3 }} gap={{ xs: 2, sm: 0 }}>
      {items.map(({ stat, index, duration }) => (
        <HeroStat
          key={stat.id}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          divided={index > 0}
          duration={duration}
        />
      ))}
    </Columns>
  );
}
