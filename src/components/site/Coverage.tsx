"use client";

import { Reveal } from "./Reveal";
import {
  Building2,
  Landmark,
  Map,
  Palmtree,
  Route,
  TowerControl,
  Waves,
} from "lucide-react";

const summaryStats = [
  {
    icon: Map,
    value: "6",
    label: "South India zones",
  },
  {
    icon: Building2,
    value: "150+",
    label: "Active cities",
  },
  {
    icon: Route,
    value: "Active",
    label: "Regional Network",
  },
];

const coverageStats = [
  {
    number: "01",
    state: "Tamil Nadu",
    description: "Extensive roadshow coverage\nacross Tamil Nadu",
    icon: Landmark,
    color: "#EF1D23",
    bg: "#FFF1F1",
  },
  {
    number: "02",
    state: "Kerala",
    description: "Pan-state campaign visibility\nacross Kerala",
    icon: Palmtree,
    color: "#2563EB",
    bg: "#F1F6FF",
  },
  {
    number: "03",
    state: "Karnataka",
    description: "Strong regional presence\nacross Karnataka",
    icon: Building2,
    color: "#16A34A",
    bg: "#F1FAF4",
  },
  {
    number: "04",
    state: "Andhra Pradesh",
    description: "Wide brand outreach\nacross Andhra Pradesh",
    icon: TowerControl,
    color: "#F97316",
    bg: "#FFF5ED",
  },
  {
    number: "05",
    state: "Telangana",
    description: "Targeted campaign support\nacross Telangana",
    icon: Landmark,
    color: "#7C3AED",
    bg: "#F6F1FF",
  },
  {
    number: "06",
    state: "Puducherry",
    description: "Strategic roadshow visibility\nacross Puducherry",
    icon: Waves,
    color: "#06B6D4",
    bg: "#EFFCFF",
  },
];

function SouthIndiaMapVisual() {
  return (
    <div
      className="
        relative
        flex
        h-full
        min-h-[520px]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#F6F8FB]
        lg:min-h-full
      "
    >
      <div
        className="
          relative
          flex
          h-full
          min-h-[520px]
          w-full
          items-center
          justify-center
          overflow-hidden
          md:min-h-[620px]
          lg:min-h-full
        "
      >
        <img
          src="/assets/map.png"
          alt="South India Coverage Map"
          draggable={false}
          className="
            relative
            z-10
            h-[570px]
            w-[690px]
            max-w-none
            translate-y-[26px]
            scale-[1.08]
            select-none
            object-contain
            md:h-[700px]
            md:w-[840px]
            md:translate-y-[32px]
            lg:h-[700px]
            lg:w-[850px]
            lg:translate-y-[38px]
            lg:scale-[1.12]
          "
        />
      </div>
    </div>
  );
}

export function Coverage() {
  return (
    <section
      id="coverage"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F6F8FB]
        !py-0
      "
    >
      <div
        className="
          grid
          w-full
          items-stretch
          bg-[#F6F8FB]
          lg:grid-cols-12
        "
      >
        <div className="lg:col-span-6">
          <div
            className="
              flex
              h-full
              flex-col
              justify-center
              px-5
              py-8
              md:px-[50px]
              md:py-10
              lg:px-[70px]
              lg:py-[50px]
            "
          >
            <Reveal delay={1}>
              <h2
                className="
                  max-w-[560px]
                  font-display
                  text-[34px]
                  font-semibold
                  leading-[1.08]
                  tracking-[-0.055em]
                  text-[#06162B]
                  md:text-[44px]
                  lg:text-[46px]
                "
              >
                Roadshow visibility across{" "}
                <span className="text-[#D80F14]">South India.</span>
              </h2>
            </Reveal>

            <Reveal delay={2}>
              <p className="mt-4 max-w-[620px] text-[16px] leading-[1.6] text-[#475467] md:text-[18px]">
                Campaign support across 6 key South Indian regions.
              </p>
            </Reveal>

            <Reveal delay={3}>
              <div
                className="
                  mt-7
                  rounded-[28px]
                  bg-white
                  p-3
                  md:p-4
                "
              >
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {summaryStats.map((item) => (
                    <div
                      key={item.label}
                      className="
                        flex
                        min-h-[150px]
                        flex-col
                        items-center
                        justify-center
                        rounded-[22px]
                        bg-[#F6F8FB]
                        px-3
                        py-5
                        text-center
                      "
                    >
                      <div className="flex size-[58px] items-center justify-center rounded-full bg-[#D80F14]/10 text-[#D80F14]">
                        <item.icon className="size-7" strokeWidth={1.65} />
                      </div>

                      <div className="mt-4 font-display text-[34px] font-semibold leading-none tracking-[-0.04em] text-black">
                        {item.value}
                      </div>

                      <div className="mt-2 text-[13px] font-medium leading-snug text-[#344054]">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {coverageStats.map((item, index) => (
                <Reveal key={item.state} delay={index}>
                  <div
                    className="
                      group
                      relative
                      flex
                      min-h-[185px]
                      flex-col
                      overflow-hidden
                      rounded-[22px]
                      bg-white/80
                      px-4
                      py-4
                      text-center
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:-translate-y-1
                    "
                  >
                    <div
                      className="flex size-[36px] items-center justify-center rounded-full text-[12px] font-semibold"
                      style={{
                        backgroundColor: item.bg,
                        color: item.color,
                      }}
                    >
                      {item.number}
                    </div>

                    <div className="mt-5 flex flex-1 flex-col items-center justify-center">
                      <div
                        className="flex h-[54px] w-full items-center justify-center border-b"
                        style={{ borderColor: `${item.color}20` }}
                      >
                        <item.icon
                          className="size-10"
                          strokeWidth={1.45}
                          style={{ color: item.color }}
                        />
                      </div>

                      <h3 className="mt-4 text-[15px] font-semibold leading-tight text-[#06162B]">
                        {item.state}
                      </h3>

                      <p className="mt-2 min-h-[36px] whitespace-pre-line text-[12px] leading-[1.45] text-[#475467]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="flex h-full min-h-full overflow-hidden lg:col-span-6">
          <SouthIndiaMapVisual />
        </div>
      </div>
    </section>
  );
}