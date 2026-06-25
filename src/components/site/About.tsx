"use client";

import { Reveal } from "./Reveal";
import { CheckCircle2 } from "lucide-react";

export function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="eyebrow"> About <span className="text-[#e3000f]">us</span> </div>
          </Reveal>

          <Reveal delay={1}>
  <h2 className="mt-1 text-[28px] md:text-[36px] lg:text-[40px] font-display font-semibold text-balance-tight leading-[1.05]">
    Mobile campaigns
    <br />
    built for impact.
  </h2>
</Reveal>

{/* <Reveal delay={2}>
  <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-[0.3]">
    Premium mobile campaigns with complete on-ground support.
  </p>
</Reveal> */}

<Reveal delay={3}>
  <ul className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-4 max-w-xl">
    {[
      "End-to-end campaign coordination",
      "RTO certified roadshow vehicles",
      "Live GPS execution monitoring",
      "Custom branding & route planning",
    ].map((t) => (
      <li key={t} className="flex items-start gap-3 text-sm text-foreground/80">
        <CheckCircle2 className="size-5 text-primary mt-0.5 shrink-0" />
        {t}
      </li>
    ))}
  </ul>
</Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={2}>
            <div className="grid grid-cols-2 gap-10">
              <div className="card-premium col-span-2 bg-[#F9F9F9] p-6">
                <div className="font-display text-4xl md:text-5xl font-semibold text-black">
                  12<span className="text-primary">+</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Years of outdoor advertising and roadshow execution experience.
                </p>
              </div>

              <div className="card-premium bg-[#F9F9F9]  p-6">
                <div className="font-display text-3xl font-semibold text-black">
                  500+
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Campaigns delivered across India
                </p>
              </div>

              <div className="card-premium bg-[#F9F9F9] p-6">
                <div className="font-display text-3xl font-semibold text-black">
                  8
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Cities of active route coverage
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}