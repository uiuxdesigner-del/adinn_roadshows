"use client";
import { BleedButton } from "./BleedButton";
import { Reveal } from "./Reveal";
import { ArrowRight } from "lucide-react";

export function CTABanner() {
  return (
    <section className="py-20 md:py-28">
      <Reveal>
        <div className="relative w-full overflow-hidden rounded-none bg-ink text-white">
          <img
            src="/assets/cta-banner.jpg"
            alt=""
            aria-hidden
            loading="lazy"
            width={1024}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover opacity-10"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(110deg, rgba(15,15,20,0.95) 0%, rgba(15,15,20,0.7) 45%, rgba(15,15,20,0.4) 100%)",
            }}
          />

          <div
            className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(circle, var(--color-primary), transparent 65%)",
            }}
          />

          <div className="relative w-full p-1 md:p-16 lg:p-20">
            <div className="color-[#ffffff]">Ready when you are</div>

            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-balance-tight leading-[1.05]">
              Launch your Roadshow Campaign with Adinn.
            </h2>

            <p className="mt-6 text-lg text-white/70 max-w-2xl">
              Tell us your campaign goal, city, vehicle preference and timeline.
              Our team will help you plan the right roadshow execution.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <BleedButton href="#contact">Contact Us</BleedButton>

              <a href="#services" className="btn-on-dark">
                Explore vehicles
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}