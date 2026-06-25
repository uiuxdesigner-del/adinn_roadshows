"use client";

import { Reveal } from "./Reveal";
import { MapPin, ShieldCheck, Workflow, Headphones, Route, Sparkles } from "lucide-react";

const items = [
  { i: MapPin, t: "GPS Support", d: "Live tracking on every campaign vehicle." },
  { i: ShieldCheck, t: "RTO Certified Vehicles", d: "Fully compliant, road-ready fleet." },
  { i: Workflow, t: "One-Stop Campaign Handling", d: "Strategy to execution under one roof." },
  { i: Headphones, t: "24/7 Coordination Support", d: "Dedicated team across the campaign." },
  { i: Route, t: "High-Traffic Route Planning", d: "Routes engineered for maximum eyeballs." },
  { i: Sparkles, t: "Professional Execution", d: "Trained crew, polished delivery." },
];

export function WhyChoose() {
  return (
    <section id="why" className="section-pad bg-ink text-white relative overflow-hidden">
      {/* ambient red glow */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-primary), transparent 60%)" }}
      />
      <div className="container-x relative">
        <div className="max-w-3xl">
          <Reveal>
            <div className="eyebrow text-primary tex">Why ADINN</div>
          </Reveal>
          <Reveal delay={1}>
         <h2 className="mt-5 text-[28px] md:text-[36px] lg:text-[40px] font-display font-semibold text-balance-tight leading-[1.05]">
              Why brands choose <span className="text-[#e3000f]"> <br /> Adinn Roadshows </span> 
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 text-lg text-white/65 max-w-2xl">
              A premium partner that combines transparent execution, certified fleet, and
              on-ground discipline — built for serious brand campaigns.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i}>
              <div
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 h-full transition-all duration-500 hover:border-white/25 hover:bg-white/[0.06]"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 60px -24px rgba(220,38,38,0.35)" }}
                />
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                  <it.i className="size-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{it.t}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
