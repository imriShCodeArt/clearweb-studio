import { heroStatPlan } from "@/animations/about";
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
  const plan = heroStatPlan(stats.map((stat) => amountOf(stat.value)));
  const items = stats.map((stat, index) => ({
    stat,
    index,
    duration: plan.items[index]?.duration ?? 0,
    delay: plan.items[index]?.delay ?? 0,
  }));

  return (
    <Columns component="ul" columns={{ sm: 3 }} gap={{ xs: 2, sm: 0 }}>
      {items.map(({ stat, index, duration, delay }) => (
        <HeroStat
          key={stat.id}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          divided={index > 0}
          delay={delay}
          duration={duration}
        />
      ))}
    </Columns>
  );
}
