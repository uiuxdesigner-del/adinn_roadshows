"use client";

import { useRef } from "react";
import { Reveal } from "./Reveal";
import { motion } from "framer-motion";
import { BleedButton } from "./BleedButton";
import {
  ChevronLeft,
  ChevronRight,
  Headphones,
  MapPin,
  Route,
  ShieldCheck,
  UsersRound,
  Workflow,
} from "lucide-react";

const items = [
  {
    i: MapPin,
    image: "/assets/why-gps.png",
    t: "GPS\nSupport",
    d: "Live tracking on every campaign vehicle.",
  },
  {
    i: ShieldCheck,
    image: "/assets/why-rto.png",
    t: "RTO Certified\nVehicles",
    d: "Fully compliant, road-ready fleet.",
  },
  {
    i: Workflow,
    image: "/assets/why-plan.png",
    t: "One-Stop Campaign\nHandling",
    d: "Strategy to execution under one roof.",
  },
  {
    i: Headphones,
    image: "/assets/headset.png",
    t: "24/7 Coordination\nSupport",
    d: "Dedicated team across the campaign.",
  },
  {
    i: Route,
    image: "/assets/why-map.png",
    t: "High-Traffic Route\nPlanning",
    d: "Routes engineered for maximum eyeballs.",
  },
  {
    i: UsersRound,
    image: "/assets/professional.png",
    t: "Professional\nExecution",
    d: "Trained crew, polished delivery.",
  },
];

function CardVisual({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <div className="absolute inset-x-2 bottom-2 h-[220px] overflow-hidden">
      <img
        src={image}
        alt={title}
        draggable={false}
        className="
          h-full
          w-full
          scale-[1.18]
          select-none
          object-contain
          object-bottom
        "
      />
    </div>
  );
}

export function WhyChoose() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollCards = (direction: "left" | "right") => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: direction === "left" ? -430 : 430,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="why"
      className="
        relative
        overflow-hidden
        bg-[#F4F7FB]
        py-24
        text-[#071426]
        md:py-28
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_0%,rgba(47,107,255,0.08),transparent_42%)]
        "
      />

      <div
        className="
          relative
          z-10
          w-full
          px-6
          md:px-10
          lg:px-14
          xl:px-16
        "
      >
        <Reveal delay={1}>
          <h2
            className="
              mt-5
              max-w-5xl
              font-display
              text-[28px]
              font-semibold
              leading-[1.05]
              tracking-[-0.055em]
              text-[#071426]
              md:text-[32px]
              lg:text-[34px]
            "
          >
            Why brands choose Adinn Roadshows
          </h2>
        </Reveal>

        <div
          ref={sliderRef}
          className="
            mt-14
            overflow-x-auto
            scroll-smooth
            pb-6
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          <div className="flex gap-5">
            {items.map((it, index) => {
              const Icon = it.i;

              return (
                <Reveal key={it.t} delay={index}>
                  <article
                    className="
                      relative
                      h-[440px]
                      w-[360px]
                      shrink-0
                      overflow-hidden
                      rounded-[24px]
                      bg-white
                      px-6
                      pt-7
                      md:w-[390px]
                      lg:w-[410px]
                    "
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 3.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.18,
                      }}
                      className="
  inline-flex
  size-11
  items-center
  justify-center
  rounded-full
  bg-white
  text-[#E3000F]
"
                    >
                      <Icon className="size-6" strokeWidth={2.2} />
                    </motion.div>

                    <h3
                      className="
                        mt-7
                        min-h-[52px]
                        max-w-[300px]
                        whitespace-pre-line
                        font-display
                        text-[20px]
                        font-semibold
                        leading-[1.15]
                        tracking-[-0.035em]
                        text-[#111111]
                      "
                    >
                      {it.t}
                    </h3>

                    <p
                      className="
                        mt-2
                        min-h-[48px]
                        max-w-[300px]
                        text-[14px]
                        leading-6
                        text-[#3F4550]
                      "
                    >
                      {it.d}
                    </p>

                    <CardVisual
                      image={it.image}
                      title={it.t.replace("\n", " ")}
                    />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-end gap-4">
          <BleedButton
            type="button"
            onClick={() => scrollCards("left")}
            className="bleed-icon-button"
          >
            <ChevronLeft className="size-5" strokeWidth={1.8} />
          </BleedButton>

          <BleedButton
            type="button"
            onClick={() => scrollCards("right")}
            className="bleed-icon-button"
          >
            <ChevronRight className="size-5" strokeWidth={1.8} />
          </BleedButton>
        </div>
      </div>
    </section>
  );
}