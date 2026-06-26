"use client";

import {
  BarChart3,
  FilePenLine,
  MapPinned,
  Megaphone,
  Route,
  Truck,
} from "lucide-react";
import { Reveal } from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Share Campaign Requirement",
    desc: "Tell us your brand goal, target city and timeline.",
    icon: FilePenLine,
    tone: "blue",
  },
  {
    number: "02",
    title: "Choose Vehicle & Coverage",
    desc: "Select the right LED format and city routes.",
    icon: Truck,
    tone: "green",
  },
  {
    number: "03",
    title: "Plan Route, Branding, Schedule",
    desc: "We design routes, creatives and timing.",
    icon: MapPinned,
    tone: "orange",
  },
  {
    number: "04",
    title: "Launch Roadshow Campaign",
    desc: "On-ground team executes with precision.",
    icon: Megaphone,
    tone: "purple",
  },
  {
    number: "05",
    title: "Track Campaign Execution",
    desc: "Live GPS, location updates and reporting.",
    icon: BarChart3,
    tone: "green",
  },
];

const toneStyles = {
  blue: {
    numberBg: "bg-[#EAF1FF]",
    numberText: "text-[#2F6BFF]",
    iconText: "text-[#2F6BFF]",
    glow: "group-hover:shadow-[0_28px_80px_rgba(47,107,255,0.12)]",
  },
  green: {
    numberBg: "bg-[#EAF8EE]",
    numberText: "text-[#31A852]",
    iconText: "text-[#31A852]",
    glow: "group-hover:shadow-[0_28px_80px_rgba(49,168,82,0.12)]",
  },
  orange: {
    numberBg: "bg-[#FFF0E8]",
    numberText: "text-[#F05A28]",
    iconText: "text-[#F05A28]",
    glow: "group-hover:shadow-[0_28px_80px_rgba(240,90,40,0.12)]",
  },
  purple: {
    numberBg: "bg-[#F1EAFE]",
    numberText: "text-[#7B55D9]",
    iconText: "text-[#7B55D9]",
    glow: "group-hover:shadow-[0_28px_80px_rgba(123,85,217,0.12)]",
  },
};

export function Process() {
  return (
    <section
      id="process"
      className="
        relative
        overflow-hidden
        bg-[#F8F9FB]
        py-24
        md:py-28
      "
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,107,255,0.07),transparent_34%)]" />

      <div className="container-x relative z-10">
        <Reveal>
          <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#2F6BFF]">
            How It Works
          </div>
        </Reveal>

        <Reveal delay={1}>
          <h2
            className="
              mt-5
              max-w-5xl
              font-display
              text-[34px]
              font-semibold
              leading-[1.05]
              tracking-[-0.055em]
              text-[#071426]
              md:text-[44px]
              lg:text-[52px]
            "
          >
            From campaign idea to street-level visibility
          </h2>
        </Reveal>

        <div
          className="
            mt-16
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-5
          "
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const tone = toneStyles[step.tone as keyof typeof toneStyles];

            return (
              <Reveal key={step.number} delay={index}>
                <article
                  className={`
                    group
                    relative
                    min-h-[360px]
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-black/[0.05]
                    bg-white
                    px-8
                    py-9
                    shadow-[0_20px_70px_rgba(0,0,0,0.06)]
                    transition-all
                    duration-500
                    ease-[cubic-bezier(.16,1,.3,1)]
                    hover:-translate-y-2
                    ${tone.glow}
                  `}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div
                      className={`
                        grid
                        size-[70px]
                        place-items-center
                        rounded-full
                        ${tone.numberBg}
                        ${tone.numberText}
                        font-display
                        text-[28px]
                        font-semibold
                        tracking-[-0.04em]
                      `}
                    >
                      {step.number}
                    </div>

                    <Icon
                      className={`
                        mt-2
                        size-12
                        ${tone.iconText}
                        transition-transform
                        duration-500
                        group-hover:scale-110
                      `}
                      strokeWidth={1.9}
                    />
                  </div>

                  <h3
                    className="
                      mt-12
                      max-w-[220px]
                      font-display
                      text-[23px]
                      font-semibold
                      leading-[1.28]
                      tracking-[-0.035em]
                      text-[#071426]
                    "
                  >
                    {step.title}
                  </h3>

                  <p
                    className="
                      mt-5
                      max-w-[220px]
                      text-[17px]
                      leading-8
                      text-[#4D5563]
                    "
                  >
                    {step.desc}
                  </p>

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-x-8
                      bottom-0
                      h-px
                      scale-x-0
                      bg-[#071426]/20
                      transition-transform
                      duration-500
                      group-hover:scale-x-100
                    "
                  />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}