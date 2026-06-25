"use client";

import { Reveal } from "./Reveal";
import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  { q: "What is included in a roadshow campaign?",
    a: "End-to-end planning, branded LED vehicle, route design, on-ground crew, GPS tracking and a post-campaign report." },
  { q: "How early should we contact ADINN?",
    a: "We recommend at least 7–10 days before launch for branding, route mapping and city permissions." },
  { q: "Can ADINN support multiple city campaigns?",
    a: "Yes — we operate across multiple cities simultaneously with coordinated route and reporting." },
  { q: "Is GPS tracking available?",
    a: "Every roadshow vehicle is GPS-enabled with live monitoring and shareable updates." },
  { q: "Can the vehicle be branded for our campaign?",
    a: "Yes. We handle custom creatives, vinyl wraps, LED content and fabrication where required." },
  { q: "Who handles route planning and coordination?",
    a: "Our internal roadshow team plans routes, manages on-ground crew and shares execution reports." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section-pad bg-surface-muted">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <Reveal><div className="eyebrow">Help Center</div></Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 text-4xl md:text-5xl font-display font-semibold leading-[1.05] text-balance-tight">
              Questions, answered.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 text-muted-foreground">
              Can't find what you're looking for? Our campaign team is one message away.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <a href="#contact" className="btn-ghost mt-7">Contact the team</a>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg md:text-xl font-medium group-hover:text-primary transition-colors">
                      {f.q}
                    </span>
                    <span className={`inline-flex size-9 items-center justify-center rounded-full border border-border transition-all ${isOpen ? "bg-primary text-primary-foreground border-primary rotate-45" : ""}`}>
                      <Plus className="size-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-12 text-muted-foreground leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
