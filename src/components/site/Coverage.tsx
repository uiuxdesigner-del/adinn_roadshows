"use client";

import { Reveal } from "./Reveal";
import { MapPin } from "lucide-react";

const cities = [
  "Chennai", "Madurai", "Coimbatore", "Bengaluru",
  "Thrissur", "Kollam", "Theni", "Vellore",
];

export function Coverage() {
  return (
    <section id="coverage" className="section-pad bg-surface-muted">
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal><div className="eyebrow">City Coverage</div></Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 text-[28px] md:text-[36px] lg:text-[40px] font-display font-semibold text-balance-tight leading-[1.05]">
              Campaign visibility <br /> across key cities.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 text-lg text-muted-foreground">
              Active roadshow operations across South India, with seamless coordination
              and route planning in every supported city.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {cities.map((c, i) => (
            <Reveal key={c} delay={i}>
              <div className="group card-premium px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <MapPin className="size-4" />
                  </span>
                  <span className="font-medium">{c}</span>
                </div>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Active</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
