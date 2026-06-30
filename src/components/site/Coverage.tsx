"use client";

import { Reveal } from "./Reveal";
import {
  Building2,
  Landmark,
  Map,
  MapPin,
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
    value: "5+",
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
    state: "Tamil Nadu",
    icon: Landmark,
  },
  {
    state: "Kerala",
    icon: Palmtree,
  },
  {
    state: "Karnataka",
    icon: Building2,
  },
  {
    state: "Andhra Pradesh",
    icon: Waves,
  },
  {
    state: "Telangana",
    icon: Landmark,
  },
  {
    state: "Puducherry",
    icon: TowerControl,
  },
];

function SouthIndiaMapVisual() {
  return (
    <div className="relative flex min-h-[360px] items-center justify-center lg:min-h-[430px]">
      <div className="absolute right-6 top-10 h-[360px] w-[360px] rounded-full bg-[#D80F14]/[0.04] blur-2xl" />

      <div className="absolute left-4 top-12 h-[300px] w-[300px] bg-[radial-gradient(circle,rgba(216,15,20,0.12)_1.5px,transparent_2px)] [background-size:18px_18px] opacity-40" />

      <img
        src="/assets/map.png"
        alt="South India Coverage Map"
        draggable={false}
        className="relative z-10 h-auto w-full max-w-[430px] select-none object-contain drop-shadow-[0_24px_60px_rgba(216,15,20,0.14)]"
      />
    </div>
  );
}

export function Coverage() {
  return (
    <section
      id="coverage"
      className="overflow-hidden bg-[#FAFAFB] py-16 md:py-20 lg:py-24"
    >
      <div className="container-x">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            {/* <Reveal>
              <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#D80F14]">
                South India Coverage
              </div>
              <div className="mt-3 h-[3px] w-[70px] rounded-full bg-[#D80F14]" />
            </Reveal> */}

            <Reveal delay={1}>
              <h2 className="mt-7 max-w-3xl font-display text-[30px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#06162B] text-balance-tight md:text-[38px] lg:text-[44px]">
                Roadshow visibility across South India.
              </h2>
            </Reveal>

            <Reveal delay={2}>
              <p className="mt-6 max-w-2xl text-[16px] leading-[1.7] text-[#475467] md:text-[18px]">
                Campaign support across 6 key South Indian regions.
              </p>
            </Reveal>

            <Reveal delay={3}>
              <div className="mt-8 max-w-2xl overflow-hidden rounded-[22px] border border-black/[0.06] bg-white shadow-[0_22px_60px_rgba(15,23,42,0.06)]">
                <div className="grid grid-cols-3 divide-x divide-black/[0.08]">
                  {summaryStats.map((item) => (
                    <div
                      key={item.label}
                      className="flex min-h-[132px] flex-col items-center justify-center px-4 py-5 text-center"
                    >
                      <div className="flex size-[64px] items-center justify-center rounded-full bg-[#D80F14]/10 text-[#D80F14]">
                        <item.icon className="size-7" strokeWidth={1.6} />
                      </div>

                      <div className="mt-4 font-display text-[32px] font-semibold leading-none text-[#D80F14]">
                        {item.value}
                      </div>

                      <div className="mt-2 text-[14px] font-medium leading-snug text-[#344054]">
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
              <div className="group flex min-h-[210px] flex-col items-center justify-center rounded-[18px] border border-black/[0.06] bg-white px-5 py-7 text-center shadow-[0_16px_45px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
                <div className="flex size-[76px] items-center justify-center rounded-full bg-[#D80F14]/10 text-[#D80F14] transition-colors duration-300 group-hover:bg-[#D80F14] group-hover:text-white">
                  <item.icon className="size-9" strokeWidth={1.5} />
                </div>

                <h3 className="mt-6 text-[18px] font-semibold leading-tight text-[#101828]">
                  {item.state}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}