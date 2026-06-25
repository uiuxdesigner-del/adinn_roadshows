"use client";

import { Reveal } from "./Reveal";
import { motion } from "framer-motion";

const steps = [
  { n: "01", t: "Share Campaign Requirement", d: "Tell us your brand goal, target city and timeline." },
  { n: "02", t: "Choose Vehicle & Coverage", d: "Select the right LED format and city routes." },
  { n: "03", t: "Plan Route, Branding, Schedule", d: "We design routes, creatives and timing." },
  { n: "04", t: "Launch Roadshow Campaign", d: "On-ground team executes with precision." },
  { n: "05", t: "Track Campaign Execution", d: "Live GPS, location updates and reporting." },
];

export function HowItWorks() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal><div className="eyebrow">How It <span className="text-[#e3000f]" > Works </span> </div></Reveal>
          <Reveal delay={1}>
                           <h2 className="mt-2 text-[28px] md:text-[36px] lg:text-[40px] font-display font-semibold text-balance-tight leading-[1.05]">
              From campaign <br /> idea to street-level visibility
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 relative">
          {/* connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
            style={{ transformOrigin: "left" }}
            className="hidden lg:block absolute left-0 right-0 top-[34px] h-[2px] bg-gradient-to-r from-primary via-primary/40 to-transparent"
            aria-hidden
          />
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i}>
                <div className="relative">
                  <div className="size-16 rounded-2xl bg-surface border border-border flex items-center justify-center font-display text-lg font-semibold text-primary shadow-[var(--shadow-soft)]">
                    {s.n}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
