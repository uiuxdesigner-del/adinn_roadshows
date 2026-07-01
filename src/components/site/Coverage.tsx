"use client";

import { Reveal } from "./Reveal";
import {
  Building2,
  Landmark,
  Map,
  MapPin,
  Megaphone,
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
    description: "Extensive coverage across Tamil Nadu",
    icon: Landmark,
    color: "#EF1D23",
    bg: "#FFF1F1",
  },
  {
    number: "02",
    state: "Kerala",
    description: "Pan-state visibility across Kerala",
    icon: Palmtree,
    color: "#2563EB",
    bg: "#F1F6FF",
  },
  {
    number: "03",
    state: "Karnataka",
    description: "Strong presence in Karnataka",
    icon: Building2,
    color: "#16A34A",
    bg: "#F1FAF4",
  },
  {
    number: "04",
    state: "Andhra Pradesh",
    description: "Wide outreach across Andhra Pradesh",
    icon: TowerControl,
    color: "#F97316",
    bg: "#FFF5ED",
  },
  {
    number: "05",
    state: "Telangana",
    description: "Targeted campaigns across Telangana",
    icon: Landmark,
    color: "#7C3AED",
    bg: "#F6F1FF",
  },
  {
    number: "06",
    state: "Puducherry",
    description: "Strategic visibility in Puducherry",
    icon: Waves,
    color: "#06B6D4",
    bg: "#EFFCFF",
  },
];

function SouthIndiaMapVisual() {
  return (
    <div className="relative flex min-h-[360px] items-center justify-center lg:min-h-[455px]">
      {/* <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[520px] w-[520px] rounded-full border border-[#D80F14]/10" />
      </div> */}

      {/* <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[430px] w-[430px] rounded-full border border-[#D80F14]/10" />
      </div> */}

      {/* <div className="absolute right-0 top-4 h-[390px] w-[390px] rounded-full bg-[#D80F14]/[0.045] blur-3xl" /> */}

      {/* <div className="absolute right-[-20px] top-4 h-[300px] w-[300px] bg-[radial-gradient(circle,rgba(216,15,20,0.16)_1.4px,transparent_1.8px)] [background-size:14px_14px] opacity-45" /> */}

      <img
        src="/assets/map.png"
        alt="South India Coverage Map"
        draggable={false}
        className="relative z-10 h-auto w-full max-w-[600px] select-none object-contain"
      />
    </div>
  );
}

export function Coverage() {
  return (
    <section
      id="coverage"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_74%_20%,rgba(216,15,20,0.07),transparent_34%),linear-gradient(180deg,#FFFFFF_0%,#FAFAFB_55%,#FFFFFF_100%)] py-16 md:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-[520px] w-[520px] bg-[radial-gradient(circle,rgba(216,15,20,0.12)_1.3px,transparent_1.8px)] [background-size:16px_16px] opacity-25" />

      <div className="container-x relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              {/*    */}
            </Reveal>

            <Reveal delay={1}>
              <h2 className="mt-7 max-w-3xl font-display text-[42px] font-semibold leading-[1.08] tracking-[-0.055em] text-[#06162B] text-balance-tight md:text-[56px] lg:text-[62px]">
                Roadshow visibility across{" "}
                <span className="text-[#D80F14]">South India.</span>
              </h2>
            </Reveal>

            <Reveal delay={2}>
              <p className="mt-6 max-w-2xl text-[18px] leading-[1.7] text-[#475467] md:text-[20px]">
                Campaign support across 6 key South Indian regions.
              </p>
            </Reveal>

            <Reveal delay={3}>
              <div className="mt-8 max-w-2xl overflow-hidden rounded-[22px] border border-black/[0.06] bg-white/90 shadow-[0_22px_65px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                <div className="grid grid-cols-3 divide-x divide-black/[0.08]">
                  {summaryStats.map((item) => (
                    <div
                      key={item.label}
                      className="flex min-h-[160px] flex-col items-center justify-center px-4 py-6 text-center"
                    >
                      <div className="flex size-[68px] items-center justify-center rounded-full bg-[#F2F4F7] text-[#D80F14]">
                        <item.icon className="size-8" strokeWidth={1.65} />
                      </div>

                      <div className="mt-5 font-display text-[38px] font-semibold leading-none tracking-[-0.04em] text-[#000000]">
                        {item.value}
                      </div>

                      <div className="mt-3 text-[14px] font-medium leading-snug text-[#344054]">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={2}>
              <SouthIndiaMapVisual />
            </Reveal>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {coverageStats.map((item, index) => (
            <Reveal key={item.state} delay={index}>
              <div className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-[18px] border border-black/[0.06] bg-white/95 px-5 py-6 text-center shadow-[0_16px_45px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.09)]">
                <div
                  className="flex size-[46px] items-center justify-center rounded-full text-[15px] font-semibold"
                  style={{
                    backgroundColor: "#F2F4F7",
                    color: item.color,
                  }}
                >
                  {item.number}
                </div>

                <div className="relative mt-7 flex flex-1 flex-col items-center justify-center">
                  <div
                    className="absolute bottom-[84px] left-0 right-0 h-[70px] opacity-20"
                    style={{
                      background: `linear-gradient(180deg, transparent 0%, ${item.bg} 100%)`,
                    }}
                  />

                  <div
                    className="relative z-10 flex h-[88px] w-full items-center justify-center border-b"
                    style={{ borderColor: `${item.color}22` }}
                  >
                    <item.icon
                      className="size-16"
                      strokeWidth={1.35}
                      style={{ color: item.color }}
                    />
                  </div>

                  <h3 className="mt-6 text-[18px] font-semibold leading-tight text-[#06162B]">
                    {item.state}
                  </h3>

                  <p className="mt-3 text-[14px] leading-[1.55] text-[#475467]">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2}>
          <div className="relative mt-8 overflow-hidden rounded-[18px] border border-black/[0.06] bg-white/95 px-7 py-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
            <div className="pointer-events-none absolute bottom-[-70px] right-0 h-[180px] w-[330px] bg-[radial-gradient(circle,rgba(216,15,20,0.18)_1.5px,transparent_2px)] [background-size:10px_10px] opacity-35" />

            <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-start">
              <div className="flex size-[58px] shrink-0 items-center justify-center rounded-full bg-[#F2F4F7] text-[#D80F14]">
                <Megaphone className="size-7" strokeWidth={1.6} />
              </div>

              <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
                <h3 className="text-[20px] font-semibold leading-tight text-[#06162B]">
                  Driving brand visibility.
                </h3>

                <p className="text-[16px] leading-relaxed text-[#475467]">
                  Seamless roadshow operations and maximum reach across South
                  India.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}