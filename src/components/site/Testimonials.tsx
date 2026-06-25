"use client";

import { Reveal } from "./Reveal";
import { Star } from "lucide-react";

const items = [
  {
    q: "ADINN executed our product launch roadshow across three cities flawlessly. The GPS tracking gave us complete confidence.",
    n: "Aishwarya R.",
    role: "Marketing Lead, Consumer Goods",
    c: "Product Launch",
  },
  {
    q: "Premium fleet, professional crew and on-time execution. Our retail footfall jumped significantly during the campaign weeks.",
    n: "Karthik S.",
    role: "Brand Manager, Retail Chain",
    c: "Retail Promotion",
  },
  {
    q: "A genuinely corporate partner. Route planning, branding and reporting were handled end-to-end without us chasing anything.",
    n: "Meera P.",
    role: "Director, Real Estate Group",
    c: "Real Estate",
  },
];

export function Testimonials() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal><div className="eyebrow">Testimonials</div></Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-balance-tight leading-[1.05]">
              Voices from the road.
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <Reveal key={t.n} delay={i}>
              <article className="card-premium p-7 h-full flex flex-col">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-lg font-display leading-snug text-balance-tight">
                  “{t.q}”
                </p>
                <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{t.n}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-primary">{t.c}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
