"use client";

import { useEffect, useRef } from "react";
import {
  Award,
  MapPin,
  Megaphone,
  Paintbrush,
  Route as RouteIcon,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const aboutBg = "/assets/abou-img.png";

const features = [
  {
    title: "End-to-end campaign coordination",
    desc: "From planning to execution, we handle everything with precision.",
    icon: UsersRound,
  },
  {
    title: "RTO certified roadshow vehicles",
    desc: "Fully compliant, safe & road-ready vehicles for seamless campaigns.",
    icon: ShieldCheck,
  },
  {
    title: "Live GPS execution monitoring",
    desc: "Real-time tracking and live updates for complete transparency.",
    icon: MapPin,
  },
  {
    title: "Custom branding & route planning",
    desc: "Eye-catching branding and optimized routes for maximum visibility.",
    icon: Paintbrush,
  },
];

const stats = [
  {
    value: "25+",
    label: "Years of expertise in planning and executing impactful roadshows.",
    icon: Award,
  },
  {
    value: "5000+",
    label: "Successful Campaigns delivered across South India.",
    icon: Megaphone,
  },
  {
    value: "8",
    label: "Cities of active route coverage.",
    icon: RouteIcon,
  },
];

export function About() {
  const vehicleWrapRef = useRef<HTMLDivElement>(null);
  const vehicleImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrapper = vehicleWrapRef.current;
    const image = vehicleImgRef.current;

    if (!wrapper || !image) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    let frameId = 0;

    const updateParallax = () => {
      const rect = wrapper.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      /*
        Starts zoom when the section enters.
        Reaches full zoom around the center.
        After that it stays zoomed while scrolling down.
      */
      const progress = 1 - rect.top / viewportHeight;
      const focus = Math.max(0, Math.min(1, progress));

      const scale = 0.62 + focus * 1.05;
      const translateY = 150 - focus * 240;
      const opacity = 0.72 + focus * 0.28;

      image.style.transform = `
        translate3d(0, ${translateY}px, 0)
        scale(${scale})
      `;

      image.style.opacity = `${opacity}`;
    };

    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateParallax);
    };

    updateParallax();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      id="about"
      style={{
        backgroundImage: `url(${aboutBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="
  relative
  -mt-32
  overflow-hidden
  pt-56
  pb-24
  md:pt-60
  md:pb-28
"
    >
      {/* FULL WIDTH LEFT + RIGHT CONTENT BG MERGE */}
      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-1/2
          z-[1]
          w-screen
          -translate-x-1/2
          bg-[linear-gradient(90deg,rgba(0,0,0,0.84)_0%,rgba(0,0,0,0.72)_18%,rgba(0,0,0,0.42)_34%,rgba(0,0,0,0)_48%,rgba(0,0,0,0)_52%,rgba(0,0,0,0.42)_66%,rgba(0,0,0,0.72)_82%,rgba(0,0,0,0.84)_100%)]
        "
      />
{/* HERO TO ABOUT CENTER MERGE */}
<div
  className="
    pointer-events-none
    absolute
    inset-x-0
    top-0
    z-[2]
    h-[520px]
    bg-[linear-gradient(180deg,#000000_0%,rgba(0,0,0,0.98)_18%,rgba(0,0,0,0.88)_36%,rgba(0,0,0,0.62)_58%,rgba(0,0,0,0.30)_80%,rgba(0,0,0,0)_100%)]
  "
/>

{/* SOFT CENTER BLEND */}
<div
  className="
    pointer-events-none
    absolute
    inset-x-0
    top-0
    z-[3]
    h-[620px]
    bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.52)_30%,rgba(0,0,0,0.24)_58%,rgba(0,0,0,0)_82%)]
  "
/>
      <div
        className="
          container-x
          relative
          z-10
        "
      >
        <div
          className="
            grid
            items-center
            gap-14
            lg:min-h-[760px]
            lg:grid-cols-[31%_39%_30%]
          "
        >
          {/* LEFT CONTENT */}
          <div className="relative z-20">
            {/* <p
              className="
                text-[12px]
                font-semibold
                uppercase
                tracking-[0.24em]
                text-white/72
              "
            >
              About Us
            </p> */}

            <h2
              className="
                mt-6
                max-w-[520px]
                font-display
                text-[38px]
                font-semibold
                leading-[1.02]
                tracking-[-0.055em]
                text-white
                md:text-[48px]
                lg:text-[56px]
              "
            >
              {/* Mobile campaigns
              <br />
              built for impact. */}
              Turn Every Road Into Your Stage
            </h2>

            <p
              className="
                mt-6
                max-w-[390px]
                text-[16px]
                leading-7
                text-white/70
                md:text-[17px]
              "
            >
              We bring your brand to life on the move. Strategic, striking and
              everywhere your audience is.
            </p>

            <div className="relative mt-9 flex max-w-[430px] flex-col gap-5">
              <div className="absolute left-[22px] top-[24px] bottom-[24px] border-l border-dotted border-white/22" />

              {features.map((item) => (
                <div
                  key={item.title}
                  className="relative flex items-start gap-4"
                >
                  <div
                    className="
                      relative
                      z-10
                      grid
                      size-11
                      shrink-0
                      place-items-center
                      rounded-full
                      border
                      border-white/14
                      bg-white/12
                      text-white
                      backdrop-blur-md
                    "
                  >
                    <item.icon className="size-5" strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3
                      className="
                        text-[15px]
                        font-semibold
                        leading-5
                        tracking-[-0.01em]
                        text-white
                        md:text-[16px]
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-1.5
                        max-w-[310px]
                        text-[13px]
                        leading-6
                        text-white/64
                        md:text-[14px]
                      "
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER VEHICLE PARALLAX */}
          <div
            ref={vehicleWrapRef}
            className="
              relative
              order-first
              flex
              h-[460px]
              items-center
              justify-center
              overflow-visible
              perspective-[1400px]
              lg:order-none
              lg:h-[680px]
            "
          >
            <img
              ref={vehicleImgRef}
              src="/assets/stright%20view.png"
              alt=""
              aria-hidden="true"
              className="
                relative
                z-10
                h-auto
                w-[118%]
                max-w-[1600px]
                origin-center
                object-contain
                select-none
                will-change-transform
                lg:w-[220%]
              "
              style={{
                transform: "translate3d(0, 150px, 0) scale(0.62)",
                opacity: 0.72,
              }}
              draggable={false}
            />
          </div>

          {/* RIGHT STATS */}
          <div
            className="
              relative
              z-20
              flex
              flex-col
              gap-9
              lg:h-[58%]
              lg:justify-between
              lg:border-l
              lg:border-white/12
              lg:pl-[12%]
            "
          >
            {stats.map((item) => (
              <div key={item.value} className="flex items-center gap-5">
                <div
                  className="
                    grid
                    size-16
                    shrink-0
                    place-items-center
                    rounded-full
                    border
                    border-white/14
                    bg-white/12
                    text-white
                    backdrop-blur-md
                  "
                >
                  <item.icon className="size-8" strokeWidth={1.7} />
                </div>

                <div>
                  <div
                    className="
                      font-display
                      text-[46px]
                      font-semibold
                      leading-[0.9]
                      tracking-[-0.055em]
                      text-white
                      md:text-[56px]
                      lg:text-[64px]
                    "
                  >
                    {item.value}
                  </div>

                  <div className="mt-3 h-[3px] w-12 rounded-full bg-white/65" />

                  <p
                    className="
                      mt-3
                      max-w-[240px]
                      text-[15px]
                      leading-6
                      text-white/68
                      md:text-[16px]
                    "
                  >
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}