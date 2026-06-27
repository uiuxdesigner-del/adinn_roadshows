"use client";

import { Reveal } from "./Reveal";
import { motion } from "framer-motion";
import {
  MapPin,
  Activity,
  Navigation2,
  Truck,
} from "lucide-react";

export function GPSTracking() {
  return (
    <section className="section-pad">
      <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="eyebrow">GPS Tracking</div>
          </Reveal>

          <Reveal delay={1}>
            <h2 className="mt-3 text-[34px] font-display font-semibold leading-[1.05] text-balance-tight">
              Track your campaign with confidence
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
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
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
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
            <a href="#contact" className="btn-primary mt-9">
              Talk to Our Campaign Team
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={2}>
            <div className="relative card-premium p-6 md:p-8 overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.5]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, color-mix(in oklab, var(--color-foreground) 4%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-foreground) 4%, transparent) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              <svg
                viewBox="0 0 600 400"
                className="relative w-full h-auto"
                aria-hidden
              >
                <defs>
                  <linearGradient id="route" x1="0" y1="0" x2="1" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--color-primary)"
                      stopOpacity="0.2"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--color-primary)"
                      stopOpacity="1"
                    />
                  </linearGradient>
                </defs>

                {/* city blocks */}
                {Array.from({ length: 18 }).map((_, i) => {
                  const x = (i % 6) * 95 + 30;
                  const y = Math.floor(i / 6) * 110 + 40;

                  return (
                    <rect
                      key={i}
                      x={x}
                      y={y}
                      width="70"
                      height="80"
                      rx="8"
                      fill="currentColor"
                      className="text-foreground/[0.04]"
                    />
                  );
                })}

                {/* route */}
                <motion.path
                  d="M 40 340 C 140 280, 180 240, 260 220 S 420 180, 520 80"
                  stroke="url(#route)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 2.2,
                    ease: [0.2, 0.7, 0.2, 1],
                  }}
                />

                {/* start filled map pin */}
                {/* <circle
                  cx="40"
                  cy="340"
                  r="22"
                  fill="var(--color-primary)"
                  opacity="0.14"
                /> */}
               <path
  d="M40 320C32.8 320 27 325.8 27 333C27 343.5 40 356 40 356C40 356 53 343.5 53 333C53 325.8 47.2 320 40 320Z"
  fill="var(--color-primary)"
/>
<circle cx="40" cy="333" r="5" fill="#ffffff" />

                {/* moving vehicle marker - kept straight */}
                <motion.g
                  initial={{ offsetDistance: "0%" }}
                  whileInView={{ offsetDistance: "100%" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  style={{
                    offsetPath:
                      "path('M 40 340 C 140 280, 180 240, 260 220 S 420 180, 520 80')",
                    offsetRotate: "0deg",
                  }}
                >
                  <circle r="24" fill="var(--color-primary)" opacity="0.18" />
                  <circle r="16" fill="var(--color-primary)" />

                  <Truck
                    x={-11}
                    y={-11}
                    width={22}
                    height={22}
                    color="#ffffff"
                    strokeWidth={2}
                  />
                </motion.g>

                {/* end filled map pin */}
                {/* <circle
                  cx="520"
                  cy="80"
                  r="22"
                  fill="var(--color-foreground)"
                  opacity="0.12"
                /> */}
                <path
  d="M520 60C512.8 60 507 65.8 507 73C507 83.5 520 96 520 96C520 96 533 83.5 533 73C533 65.8 527.2 60 520 60Z"
  fill="var(--color-foreground)"
/>
<circle cx="520" cy="73" r="5" fill="#ffffff" />
              </svg>

              <div className="relative mt-2 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <span className="size-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-muted-foreground">Live</span>
                  <span className="font-medium">Campaign #ADN-2410</span>
                </div>

                <div className="text-sm text-muted-foreground">
                  Chennai → T. Nagar → Anna Nagar → Velachery
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}