import Image from "next/image";

import { aboutMotion } from "@/animations/about";
import { FadeIn } from "@/components/motion";

export function HeroPortrait() {
  return (
    <FadeIn
      delay={aboutMotion.hero.portrait}
      from="bottom"
      sx={{
        position: "relative",
        height: 340,
        width: '100%',
        mx: { xs: "auto", lg: 0 },
        maxWidth: { xs: 460, lg: "none" },
        maskImage: { xs: "none", lg: "linear-gradient(to right, transparent, #000 16%)" },
        "& img": {
          objectFit: "cover",
          objectPosition: { xs: "center top", lg: "70% top" },
        },
        overflow:'visible',
        mb: { xs: -4, md: -6 }
      }}
    >
      <Image
        src="/about/hero/about-hero-bg.png"
        alt=""
        fill
        priority
        sizes="(max-width: 900px) 100vw, 560px"
        style={{'overflow':'visible'}}
      />
    </FadeIn>
  );
}
