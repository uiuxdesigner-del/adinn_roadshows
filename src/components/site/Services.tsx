/*eslint-disable*/
//@ts-nocheck
"use client";

import { Reveal } from "./Reveal";
import { BleedButton } from "./BleedButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

const ledVehicles = [
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
    desc: "Single-side branded vehicle visibility for clean route-based campaign execution.",
    img: "/assets/singleside.png",
  },
];

const flexBrandingProducts = [
  {
    title: "Bus Branding",
    desc: "High-reach transit branding for daily city movement and strong route visibility.",
    img: "/assets/bus-branding.png",
  },
  {
    title: "Auto Branding",
    desc: "Compact moving media for local market visibility and high-frequency city reach.",
    img: "/assets/auto-branding.png",
  },
  {
    title: "Cab Branding",
    desc: "Premium city mobility branding for corporate, launch and awareness campaigns.",
    img: "/assets/cab-branding.png",
  },
  {
    title: "Van Branding",
    desc: "Flexible vehicle branding for promotional routes, launches and local activations.",
    img: "/assets/van-branding.png",
  },
  {
    title: "Flex Board Branding",
    desc: "Static outdoor flex branding support for campaign extensions and local visibility.",
    img: "/assets/flex-board-branding.png",
  },
];

const hybridProducts = [
  {
    title: "Double Side Hybrid Vehicle",
    desc: "One side LED display and one side flex branding for dynamic video plus static brand visibility.",
    img: "/assets/hybrid-double-side.png",
  },
  {
    title: "LED + Flex Roadshow Van",
    desc: "A balanced campaign vehicle combining motion content with printed brand panels.",
    img: "/assets/hybrid-roadshow-van.png",
  },
  {
    title: "Hybrid Campaign Truck",
    desc: "Ideal for launches, festivals and promotions where video and flex branding work together.",
    img: "/assets/hybrid-campaign-truck.png",
  },
];

type CategoryType = "led" | "flex" | "hybrid";

export function Services() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMovingRef = useRef(false);
  const [activeCategory, setActiveCategory] = useState<CategoryType>("led");

  const activeProducts =
    activeCategory === "led"
      ? ledVehicles
      : activeCategory === "flex"
        ? flexBrandingProducts
        : hybridProducts;

  const handleCategoryChange = (category: CategoryType) => {
    if (activeCategory === category) return;

    setActiveCategory(category);
    isMovingRef.current = false;

    requestAnimationFrame(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft = 0;
      }
    });
  };

  const moveCarousel = (direction: "left" | "right") => {
    const el = carouselRef.current;
    if (!el || isMovingRef.current) return;

    isMovingRef.current = true;

    const firstCard = el.querySelector("article");
    const cardWidth = firstCard?.getBoundingClientRect().width || 390;
    const gap = 40;
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
    <section
      id="services"
      className="section-pad bg-surface-muted overflow-hidden"
    >
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Reveal>
              <div className="eyebrow">
                Roadshow <span className="text-[#e3000f]">Solutions</span>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <h2 className="mt-3 text-[28px] md:text-[36px] lg:text-[40px] font-display font-semibold text-balance-tight leading-[1.08]">
                Built for <br /> brand impact
              </h2>
            </Reveal>
          </div>

          <Reveal delay={2}>
            <div
              className="
                relative
                flex
                w-fit
                rounded-full
                bg-white
                p-1.5
                shadow-[0_18px_60px_rgba(0,0,0,0.06)]
              "
            >
              <span
                className={`
                  pointer-events-none
                  absolute
                  left-1.5
                  top-1.5
                  z-0
                  h-[calc(100%-12px)]
                  w-[125px]
                  rounded-full
                  bg-black
                  shadow-[0_14px_34px_rgba(0,0,0,0.20)]
                  transition-transform
                  duration-700
                  ease-[cubic-bezier(.16,1,.3,1)]
                  sm:w-[145px]
                  ${
                    activeCategory === "led"
                      ? "translate-x-0"
                      : activeCategory === "flex"
                        ? "translate-x-[125px] sm:translate-x-[145px]"
                        : "translate-x-[250px] sm:translate-x-[290px]"
                  }
                `}
              />

              <button
                type="button"
                aria-pressed={activeCategory === "led"}
                onClick={() => handleCategoryChange("led")}
                className={`
                  relative
                  z-10
                  h-14
                  min-w-[125px]
                  rounded-full
                  px-5
                  text-[14px]
                  font-semibold
                  transition-colors
                  duration-500
                  sm:min-w-[145px]
                  sm:text-[15px]
                  ${
                    activeCategory === "led"
                      ? "text-white"
                      : "text-black/50 hover:text-black"
                  }
                `}
              >
                LED Vehicles
              </button>

              <button
                type="button"
                aria-pressed={activeCategory === "flex"}
                onClick={() => handleCategoryChange("flex")}
                className={`
                  relative
                  z-10
                  h-14
                  min-w-[125px]
                  rounded-full
                  px-5
                  text-[14px]
                  font-semibold
                  transition-colors
                  duration-500
                  sm:min-w-[145px]
                  sm:text-[15px]
                  ${
                    activeCategory === "flex"
                      ? "text-white"
                      : "text-black/50 hover:text-black"
                  }
                `}
              >
                Flex Branding
              </button>

              <button
                type="button"
                aria-pressed={activeCategory === "hybrid"}
                onClick={() => handleCategoryChange("hybrid")}
                className={`
                  relative
                  z-10
                  h-14
                  min-w-[125px]
                  rounded-full
                  px-5
                  text-[14px]
                  font-semibold
                  transition-colors
                  duration-500
                  sm:min-w-[145px]
                  sm:text-[15px]
                  ${
                    activeCategory === "hybrid"
                      ? "text-white"
                      : "text-black/50 hover:text-black"
                  }
                `}
              >
                Hybrid
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-14">
        <div
          ref={carouselRef}
          className="
            ml-[16px]
            overflow-x-auto
            pr-6
            [scrollbar-width:none]
            md:ml-[40px]
            md:pr-10
            lg:ml-[max(100px,calc((100vw-1440px)/2))]
            lg:pr-[max(100px,calc((100vw-1440px)/2))]
            [&::-webkit-scrollbar]:hidden
          "
        >
          <div className="flex gap-10 pb-4">
            {activeProducts.map((s, i) => (
              <Reveal key={`${activeCategory}-${s.title}`} delay={i}>
                <article
                  className="
                    card-premium
                    group
                    flex
                    min-h-[450px]
                    w-[300px]
                    shrink-0
                    flex-col
                    overflow-hidden
                    md:w-[360px]
                    lg:w-[390px]
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

                  <div className="flex flex-col px-6 pt-5 pb-4">
                    <h3 className="font-display text-xl font-semibold">
                      {s.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>

                    <div className="pt-4">
                      <BleedButton href="#contact">Enquire Now</BleedButton>
                    </div>
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
          <BleedButton
            onClick={() => moveCarousel("left")}
            className="bleed-icon-button"
          >
            <ChevronLeft className="size-7" />
          </BleedButton>

          <BleedButton
            onClick={() => moveCarousel("right")}
            className="bleed-icon-button"
          >
            <ChevronRight className="size-7" />
          </BleedButton>
        </div>
      </div>
    </section>
  );
}