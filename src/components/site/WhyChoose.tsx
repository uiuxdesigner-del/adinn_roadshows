"use client";

import { useRef } from "react";
import { Reveal } from "./Reveal";
import { motion } from "framer-motion";
import { BleedButton } from "./BleedButton";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Headphones,
  Headset,
  MapPin,
  Route,
  ShieldCheck,
  Truck,
  UsersRound,
  Workflow,
} from "lucide-react";

const items = [
  {
    i: MapPin,
    visual: "gps",
    t: "GPS\nSupport",
    d: "Live tracking on every campaign vehicle.",
  },
  {
    i: ShieldCheck,
    visual: "truck",
    t: "RTO Certified\nVehicles",
    d: "Fully compliant, road-ready fleet.",
  },
  {
    i: Workflow,
    visual: "plan",
    t: "One-Stop Campaign\nHandling",
    d: "Strategy to execution under one roof.",
  },
  {
    i: Headphones,
    visual: "support",
    t: "24/7 Coordination\nSupport",
    d: "Dedicated team across the campaign.",
  },
  {
    i: Route,
    visual: "route",
    t: "High-Traffic Route\nPlanning",
    d: "Routes engineered for maximum eyeballs.",
  },
  {
    i: UsersRound,
    visual: "team",
    t: "Professional\nExecution",
    d: "Trained crew, polished delivery.",
  },
];

function CardVisual({ type }: { type: string }) {
  if (type === "gps") {
    return (
      <div className="absolute inset-x-5 bottom-4 h-[155px] overflow-hidden">
        <img
          src="/assets/why-gps.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="h-full w-full select-none object-contain object-bottom"
        />
      </div>
    );
  }

  if (type === "truck") {
    return (
      <div className="absolute inset-x-5 bottom-4 h-[155px] overflow-hidden">
        <Truck
          className="absolute bottom-7 left-1/2 size-36 -translate-x-1/2 text-[#7D8794]"
          strokeWidth={1.1}
        />
        <div className="absolute bottom-7 left-1/2 h-3 w-[150px] -translate-x-1/2 rounded-full bg-black/10 blur-md" />
      </div>
    );
  }

  if (type === "plan") {
    return (
      <div className="absolute inset-x-5 bottom-4 h-[155px] overflow-hidden">
        <div className="absolute bottom-5 left-1/2 h-[132px] w-[108px] -translate-x-1/2 rotate-[-4deg] rounded-[14px] border border-black/10 bg-white p-3 shadow-[0_18px_35px_rgba(15,23,42,0.14)]">
          <div className="absolute -top-3 left-1/2 h-6 w-11 -translate-x-1/2 rounded-t-xl bg-[#5B6472]" />

          <div className="text-center text-[10px] font-bold leading-tight text-[#111827]">
            CAMPAIGN PLAN
          </div>

          <div className="mt-3 space-y-2.5">
            {["Strategy", "Execution", "Monitoring", "Reporting"].map(
              (text) => (
                <div key={text} className="flex items-center gap-2">
                  <ClipboardCheck
                    className="size-3.5 text-[#2878F0]"
                    strokeWidth={1.8}
                  />
                  <span className="text-[9px] font-medium text-[#111827]/70">
                    {text}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  if (type === "support") {
    return (
      <div className="absolute inset-x-5 bottom-4 h-[155px] overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-[100px] bg-[radial-gradient(circle_at_center,rgba(40,120,240,0.12),transparent_62%)]" />
        <Headset
          className="absolute bottom-6 left-1/2 size-36 -translate-x-1/2 text-[#1F2937]"
          strokeWidth={1.1}
        />
      </div>
    );
  }

  if (type === "route") {
    return (
      <div className="absolute inset-x-5 bottom-4 h-[155px] overflow-hidden">
        <svg viewBox="0 0 220 160" className="absolute inset-0 h-full w-full">
          <path
            d="M0 50 C55 28 86 62 135 40 C174 24 198 38 230 24"
            stroke="#CFE3FA"
            strokeWidth="16"
            fill="none"
          />
          <path
            d="M-10 118 C40 88 90 120 132 88 C170 58 194 78 230 48"
            stroke="#CFE3FA"
            strokeWidth="18"
            fill="none"
          />
          <path
            d="M36 122 C72 94 104 112 126 85 C152 54 178 60 196 38"
            stroke="#2878F0"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          {[36, 90, 126, 166, 196].map((x, idx) => (
            <g key={x}>
              <circle
                cx={x}
                cy={[122, 103, 85, 61, 38][idx]}
                r="10"
                fill="#2878F0"
                opacity="0.18"
              />
              <circle
                cx={x}
                cy={[122, 103, 85, 61, 38][idx]}
                r="5"
                fill="#2878F0"
              />
            </g>
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div className="absolute inset-x-5 bottom-4 h-[155px] overflow-hidden">
      <Truck
        className="absolute bottom-[52px] right-5 size-24 text-[#7D8794]"
        strokeWidth={1.1}
      />

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-end gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="size-7 rounded-full bg-[#111827]" />
            <div className="mt-1 h-14 w-8 rounded-t-2xl bg-[#111827]" />
            <div className="mt-1 text-[8px] font-bold text-white">ADINN</div>
          </div>
        ))}
      </div>
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
        <Reveal>
          <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#2F6BFF]">
            Why ADINN
          </div>
        </Reveal>

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
    h-[405px]
    w-[350px]
    shrink-0
    overflow-hidden
    rounded-[24px]
    bg-white
    px-6
    pt-7
    md:w-[380px]
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
                        bg-white/75
                        text-[#2878F0]
                        shadow-[0_10px_30px_rgba(15,23,42,0.06)]
                        backdrop-blur-sm
                      "
                    >
                      <Icon className="size-6" strokeWidth={2.2} />
                    </motion.div>

                    <h3
                      className="
                        mt-7
                        min-h-[48px]
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
                        min-h-[46px]
                        max-w-[300px]
                        text-[14px]
                        leading-6
                        text-[#3F4550]
                      "
                    >
                      {it.d}
                    </p>

                    <CardVisual type={it.visual} />
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