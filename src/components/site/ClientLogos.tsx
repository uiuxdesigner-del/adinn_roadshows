"use client";

import { Reveal } from "./Reveal";

const logos = [
  "NORTHSTAR", "VELOCITY", "AURUM", "MERIDIAN", "QUANTA",
  "PINNACLE", "ORION", "CIVIC&CO", "ATLAS", "STRATA",
];

export function ClientLogos() {
  return (
    <section className="py-20 md:py-24 border-y border-border bg-surface-muted overflow-hidden">
      <div className="container-x">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Trusted by growing brands
          </p>
        </Reveal>
      </div>
      <div className="mt-10 relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
          style={{ background: "linear-gradient(to right, var(--color-surface-muted), transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
          style={{ background: "linear-gradient(to left, var(--color-surface-muted), transparent)" }}
        />
        <div className="flex gap-16 animate-[marquee_40s_linear_infinite] whitespace-nowrap">
          {[...logos, ...logos].map((l, i) => (
            <span
              key={i}
              className="font-display text-2xl md:text-3xl font-semibold tracking-[0.18em] text-foreground/40 hover:text-foreground/80 transition-colors"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
