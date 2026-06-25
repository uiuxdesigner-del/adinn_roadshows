"use client";

import { Reveal } from "./Reveal";
import {
  Rocket, Sparkles, ShoppingBag, Vote, GraduationCap, Building2, CalendarDays, PackageOpen,
} from "lucide-react";

const cases = [
  { i: Rocket, t: "Product Launches" },
  { i: Sparkles, t: "Festival Promotions" },
  { i: ShoppingBag, t: "Retail Store Promotions" },
  { i: Vote, t: "Political Campaign Visibility" },
  { i: GraduationCap, t: "Education Admissions" },
  { i: Building2, t: "Real Estate Promotions" },
  { i: CalendarDays, t: "Event Promotions" },
  { i: PackageOpen, t: "Sampling Activities" },
];

export function UseCases() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal><div className="eyebrow">Campaign Use Cases</div></Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-balance-tight leading-[1.05]">
              Built for high-impact brand promotions.
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cases.map((c, i) => (
            <Reveal key={c.t} delay={i}>
              <div className="card-premium p-7 h-full group">
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-surface-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <c.i className="size-5" />
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold">{c.t}</h3>
                <div className="mt-4 h-[2px] w-8 bg-primary/70 transition-all duration-500 group-hover:w-16" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
