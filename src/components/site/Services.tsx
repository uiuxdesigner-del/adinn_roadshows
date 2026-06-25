"use client";

import { Reveal } from "./Reveal";
import { BleedButton } from "./BleedButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const services = [
  {
    title: "LED Screen Vehicle",
    desc: "High-brightness mobile LED display vehicles for premium urban visibility and dynamic content.",
    img: "/assets/vehicle-2.png",
  },
  {
    title: "L-Type LED Vehicle",
    desc: "Hydraulic L-shaped LED units that elevate above the crowd for maximum street-level reach.",
    img: "/assets/vehicle-1.png",
  },
  {
    title: "3-Side LED Truck",
    desc: "Triple-side LED displays delivering 360° brand exposure across busy city routes.",
    img: "/assets/full_side_LED.png",
  },
  {
    title: "Ultra",
    desc: "Bespoke branded vehicle bodies designed around your product, theme and campaign goals.",
    img: "/assets/tataultra-2.png",
  },
  {
    title: "Single Side",
    desc: "Bespoke branded vehicle bodies designed around your product, theme and campaign goals.",
    img: "/assets/singleside.png",
  },
];

export function Services() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMovingRef = useRef(false);

  const moveCarousel = (direction: "left" | "right") => {
    const el = carouselRef.current;
    if (!el || isMovingRef.current) return;

    isMovingRef.current = true;

    const firstCard = el.querySelector("article");
    const cardWidth = firstCard?.getBoundingClientRect().width || 390;
    const gap = 20;
    const distance = cardWidth + gap;

    const start = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;

    const target =
      direction === "right"
        ? Math.min(start + distance, maxScroll)
        : Math.max(start - distance, 0);

    if (target === start) {
      isMovingRef.current = false;
      return;
    }

    const duration = 1250;
    const startTime = performance.now();

    const easeInOutQuart = (t: number) => {
      return t < 0.5
        ? 8 * t * t * t * t
        : 1 - Math.pow(-2 * t + 2, 4) / 2;
    };

    const animateScroll = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = easeInOutQuart(progress);

      el.scrollLeft = start + (target - start) * eased;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        isMovingRef.current = false;
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <section id="services" className="section-pad bg-surface-muted overflow-hidden">
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal>
            <div className="eyebrow">
              Roadshow <span className="text-[#e3000f]">Solutions</span>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <h2 className="mt- text-[28px] md:text-[36px] lg:text-[40px] font-display font-semibold text-balance-tight leading-[1.08]">
              Built for <br /> brand impact
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-14">
        <div
          ref={carouselRef}
          className="
            ml-[16px]
            md:ml-[40px]
            lg:ml-[max(100px,calc((100vw-1440px)/2))]
            overflow-x-auto
            pr-6
            md:pr-10
            lg:pr-[max(100px,calc((100vw-1440px)/2))]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          <div className="flex gap-10 pb-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i}>
                <article
                  className="
                    card-premium
                    w-[300px]
                    md:w-[360px]
                    lg:w-[390px]
                    shrink-0
                    overflow-hidden
                    h-full
                    flex
                    flex-col
                    group
                    
                  "
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-[2100ms]
                        ease-[cubic-bezier(.16,1,.3,1)]
                        group-hover:scale-[1.035]
                      "
                    />

                    
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-display text-xl font-semibold">
                      {s.title}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                      {s.desc}
                    </p>
                   <BleedButton href="#contact">Enquire Now</BleedButton>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div
          className="
            mt-8
            flex
            justify-end
            gap-3
            pr-6
            md:pr-10
            lg:pr-[max(100px,calc((100vw-1440px)/2))]
          "
        >
          <button
            type="button"
            aria-label="Previous vehicle"
            onClick={() => moveCarousel("left")}
            className="
              size-12
              rounded-full
              bg-[#ECECEE]
              text-black/45
              flex
              items-center
              justify-center
              transition-all
              duration-500
              ease-[cubic-bezier(.16,1,.3,1)]
              hover:bg-black
              hover:text-white
              hover:scale-[1.04]
              active:scale-[0.96]
            "
          >
            <ChevronLeft className="size-7" />
          </button>

          <button
            type="button"
            aria-label="Next vehicle"
            onClick={() => moveCarousel("right")}
            className="
              size-12
              rounded-full
              bg-[#ECECEE]
              text-black/60
              flex
              items-center
              justify-center
              transition-all
              duration-500
              ease-[cubic-bezier(.16,1,.3,1)]
              hover:bg-black
              hover:text-white
              hover:scale-[1.04]
              active:scale-[0.96]
            "
          >
            <ChevronRight className="size-7" />
          </button>
        </div>
      </div>
    </section>
  );
}