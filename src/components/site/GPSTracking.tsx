"use client";

import { Reveal } from "./Reveal";
import { Activity, MapPin, Navigation2, Truck } from "lucide-react";
import { motion } from "framer-motion";

function PinMarker({
  x,
  y,
  variant = "start",
}: {
  x: number;
  y: number;
  variant?: "start" | "end";
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M0 -25C-13 -25 -23 -15 -23 -2C-23 15 0 32 0 32S23 15 23 -2C23 -15 13 -25 0 -25Z"
        fill="#080D14"
      />
      <circle cx="0" cy="-3" r="7" fill="#FFFFFF" />
      {variant === "end" && <circle cx="0" cy="-3" r="3" fill="#080D14" />}
    </g>
  );
}

function TrackingVisual() {
  const routePath =
    "M 60 340 C 155 280, 220 225, 315 195 C 425 160, 510 125, 620 70";

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-black/[0.06] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
      <div className="relative h-[430px] overflow-hidden rounded-t-[30px] bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" />

        <svg
          viewBox="0 0 700 430"
          className="relative z-10 h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          {Array.from({ length: 18 }).map((_, i) => {
            const x = (i % 6) * 105 + 70;
            const y = Math.floor(i / 6) * 105 + 60;

            return (
              <rect
                key={i}
                x={x}
                y={y}
                width="78"
                height="82"
                rx="10"
                fill="#F1F3F5"
                opacity="0.72"
              />
            );
          })}

          <motion.path
            id="gpsRouteLine"
            d={routePath}
            stroke="#62666A"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              ease: [0.22, 0.7, 0.24, 1],
            }}
          />

          <PinMarker x={60} y={340} variant="start" />
          <PinMarker x={620} y={70} variant="end" />

          <g>
            <animateMotion
              dur="7s"
              repeatCount="indefinite"
              rotate="0"
              path={routePath}
            />

            <circle r="25" fill="#111827" opacity="0.14" />
            <circle r="17" fill="#080D14" />

            <foreignObject x="-11" y="-11" width="22" height="22">
              <div className="flex h-[22px] w-[22px] items-center justify-center text-white">
                <Truck className="h-[17px] w-[17px]" strokeWidth={2.1} />
              </div>
            </foreignObject>
          </g>
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.08] bg-white px-6 py-5">
        <div className="flex items-center gap-2 text-sm">
          <span className="size-2 rounded-full bg-[#111827]" />
          <span className="text-[#667085]">Live</span>
          <span className="font-semibold text-[#111827]">
            Campaign #ADN-2410
          </span>
        </div>

        <div className="text-sm font-medium text-[#667085]">
          Chennai → T. Nagar → Anna Nagar → Velachery
        </div>
      </div>
    </div>
  );
}

export function GPSTracking() {
  return (
    <section className="section-pad">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="eyebrow">GPS Tracking</div>
          </Reveal>

          <Reveal delay={1}>
            <h2 className="mt-3 font-display text-[34px] font-semibold leading-[1.05] text-balance-tight md:text-[44px]">
              Track your campaign with confidence
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              GPS-supported visibility for routes, movement, and live execution
              updates.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <ul className="mt-8 space-y-4">
              {[
                {
                  i: Activity,
                  t: "Real-time movement",
                  d: "Live vehicle position on the campaign route.",
                },
                {
                  i: Navigation2,
                  t: "Route adherence",
                  d: "Verify planned route execution.",
                },
                {
                  i: MapPin,
                  t: "Location reports",
                  d: "Periodic check-ins and end-of-day reports.",
                },
              ].map((f) => (
                <li key={f.t} className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E3000F]/10 text-[#E3000F]">
                    <f.i className="size-5" strokeWidth={1.4} />
                  </div>

                  <div>
                    <div className="font-medium">{f.t}</div>
                    <p className="text-sm text-muted-foreground">{f.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={4}>
            <button
              type="button"
              className="btn-primary mt-9"
              onClick={() => {
                const contactSection = document.getElementById("contact");

                if (contactSection) {
                  contactSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }

                window.history.replaceState(null, "", window.location.pathname);
              }}
            >
              Talk to Our Campaign Team
            </button>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={2}>
            <TrackingVisual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}