"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  BarChart3,
  FilePenLine,
  MapPinned,
  Megaphone,
  Truck,
} from "lucide-react";
import { Reveal } from "./Reveal";

const steps = [
  {
    title: "Share Campaign Requirement",
    desc: "Tell us your brand goal, target city and timeline.",
    icon: FilePenLine,
    tone: "blue",
  },
  {
    title: "Choose Vehicle & Coverage",
    desc: "Select the right LED format and city routes.",
    icon: Truck,
    tone: "green",
  },
  {
    title: "Plan Route, Branding, Schedule",
    desc: "We design routes, creatives and timing.",
    icon: MapPinned,
    tone: "orange",
  },
  {
    title: "Launch Roadshow Campaign",
    desc: "On-ground team executes with precision.",
    icon: Megaphone,
    tone: "purple",
  },
  {
    title: "Track Campaign Execution",
    desc: "Live GPS, location updates and reporting.",
    icon: BarChart3,
    tone: "green",
  },
];

const toneStyles = {
  blue: {
    iconBg: "bg-[#EAF1FF]",
    iconText: "text-[#2F6BFF]",
  },
  green: {
    iconBg: "bg-[#EAF8EE]",
    iconText: "text-[#31A852]",
  },
  orange: {
    iconBg: "bg-[#FFF0E8]",
    iconText: "text-[#F05A28]",
  },
  purple: {
    iconBg: "bg-[#F1EAFE]",
    iconText: "text-[#7B55D9]",
  },
};

type ProcessCardProps = {
  step: (typeof steps)[number];
  index: number;
  progress: MotionValue<number>;
};

function ProcessCard({ step, index, progress }: ProcessCardProps) {
  const Icon = step.icon;
  const tone = toneStyles[step.tone as keyof typeof toneStyles];

  const start = index * 0.09;
  const end = start + 0.42;

  const x = useTransform(progress, [start, end], [220, 0]);
  const y = useTransform(progress, [start, end], [95, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.96, 1]);

  return (
    <motion.article
      style={{
        x,
        y,
        opacity,
        scale,
      }}
      className="
        relative
        flex
        min-h-[330px]
        w-full
        flex-col
        overflow-hidden
        rounded-[28px]
        bg-white
        px-8
        py-9
        shadow-[0_16px_50px_rgba(0,0,0,0.04)]
        will-change-transform
      "
    >
      <div
        className={`
          grid
          size-[74px]
          place-items-center
          rounded-full
          ${tone.iconBg}
          ${tone.iconText}
        `}
      >
        <Icon className="size-9" strokeWidth={1.2} />
      </div>

      <h3
        className="
          mt-12
          max-w-[310px]
          font-display
          text-[25px]
          font-semibold
          leading-[1.22]
          tracking-[-0.04em]
          text-[#071426]
        "
      >
        {step.title}
      </h3>

      <p
        className="
          mt-5
          max-w-[310px]
          text-[16px]
          leading-7
          text-[#4D5563]
        "
      >
        {step.desc}
      </p>
    </motion.article>
  );
}

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 25%"],
  });

  return (
    <section
      ref={sectionRef}
      id="process"
      className="
        relative
        overflow-hidden
        bg-transparent
        py-24
        md:py-28
      "
    >
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
        {/* <Reveal>
          <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#2F6BFF]">
            How It Works
          </div>
        </Reveal> */}

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
            From campaign idea to street-level visibility
          </h2>
        </Reveal>

        <div
          className="
            mt-16
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-5
          "
        >
          {steps.map((step, index) => (
            <ProcessCard
              key={step.title}
              step={step}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}