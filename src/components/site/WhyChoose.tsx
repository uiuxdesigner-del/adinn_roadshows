"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Headphones,
  MapPin,
  Route,
  ShieldCheck,
  UsersRound,
  Workflow,
} from "lucide-react";

const items = [
  {
    i: MapPin,
    image: "/assets/why-gps.png",
    t: "GPS\nSupport",
    d: "Live tracking on every campaign vehicle.",
  },
  {
    i: ShieldCheck,
    image: "/assets/why-rto.png",
    t: "RTO Certified\nVehicles",
    d: "Fully Certified, campaign-ready fleet.",
  },
  {
    i: Workflow,
    image: "/assets/why-plan.png",
    t: "One-Stop Campaign\nHandling",
    d: "Strategy to execution under one roof.",
  },
  {
    i: Headphones,
    image: "/assets/headset.png",
    t: "24/7 Coordination\nSupport",
    d: "Dedicated team across the campaign.",
  },
  {
    i: Route,
    image: "/assets/why-map.png",
    t: "High-Traffic Route\nPlanning",
    d: "Routes engineered for maximum eyeballs.",
  },
  {
    i: UsersRound,
    image: "/assets/professional.png",
    t: "Professional\nExecution",
    d: "Trained crew, smooth delivery.",
  },
];

function CardVisual({ image, title }: { image: string; title: string }) {
  return (
    <div className="absolute inset-x-2 bottom-2 h-[220px] overflow-hidden">
      <img
        src={image}
        alt={title}
        draggable={false}
        className="h-full w-full scale-[1.18] select-none object-contain object-bottom"
      />
    </div>
  );
}

export function WhyChoose() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [scrollDistance, setScrollDistance] = useState(0);

  /**
   * Increase this value if you want to reduce more bottom gap.
   * Good range: 120 to 220
   */
  const bottomSpaceReduction = 170;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  useEffect(() => {
    const updateScrollDistance = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;

      if (!viewport || !track) return;

      const viewportWidth = viewport.offsetWidth;
      const trackWidth = track.scrollWidth;

      setScrollDistance(Math.max(0, trackWidth - viewportWidth));
    };

    updateScrollDistance();

    const resizeObserver = new ResizeObserver(updateScrollDistance);

    if (viewportRef.current) resizeObserver.observe(viewportRef.current);
    if (trackRef.current) resizeObserver.observe(trackRef.current);

    window.addEventListener("resize", updateScrollDistance);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScrollDistance);
    };
  }, []);

  const sectionHeight =
    scrollDistance > 0
      ? `calc(100vh + ${Math.max(
          0,
          scrollDistance - bottomSpaceReduction
        )}px)`
      : "100vh";

  return (
    <section
      ref={sectionRef}
      id="why"
      style={{
        height: sectionHeight,
      }}
      className="relative bg-[#F4F7FB] text-[#071426]"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#F4F7FB] pt-20 pb-8 md:pt-24 md:pb-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,107,255,0.08),transparent_42%)]" />

        <div className="relative z-10 w-full px-6 md:px-10 lg:px-14 xl:px-16">
          <Reveal delay={1}>
            <h2 className="mt-5 max-w-5xl font-display text-[28px] font-semibold leading-[1.05] tracking-[-0.055em] text-[#071426] md:text-[32px] lg:text-[34px]">
              Why brands choose Adinn Roadshows
            </h2>
          </Reveal>

          <div ref={viewportRef} className="mt-12 overflow-hidden pb-4 md:mt-14">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex w-max gap-5"
            >
              {items.map((it, index) => {
                const Icon = it.i;

                return (
                  <article
                    key={it.t}
                    className="relative h-[440px] w-[360px] shrink-0 overflow-hidden rounded-[24px] bg-white px-6 pt-7 md:w-[390px] lg:w-[410px]"
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 3.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.18,
                      }}
                      className="inline-flex size-11 items-center justify-center rounded-full bg-white text-[#E3000F]"
                    >
                      <Icon className="size-6" strokeWidth={2.2} />
                    </motion.div>

                    <h3 className="mt-7 min-h-[52px] max-w-[300px] whitespace-pre-line font-display text-[20px] font-semibold leading-[1.15] tracking-[-0.035em] text-[#111111]">
                      {it.t}
                    </h3>

                    <p className="mt-2 min-h-[48px] max-w-[300px] text-[14px] leading-6 text-[#3F4550]">
                      {it.d}
                    </p>

                    <CardVisual
                      image={it.image}
                      title={it.t.replace("\n", " ")}
                    />
                  </article>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}