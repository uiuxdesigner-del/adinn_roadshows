// "use client";

// import { Reveal } from "./Reveal";
// import { Star } from "lucide-react";

// const items = [
//   {
//     q: "ADINN executed our product launch roadshow across three cities flawlessly. The GPS tracking gave us complete confidence.",
//     n: "Aishwarya R.",
//     role: "Marketing Lead, Consumer Goods",
//     c: "Product Launch",
//   },
//   {
//     q: "Premium fleet, professional crew and on-time execution. Our retail footfall jumped significantly during the campaign weeks.",
//     n: "Karthik S.",
//     role: "Brand Manager, Retail Chain",
//     c: "Retail Promotion",
//   },
//   {
//     q: "A genuinely corporate partner. Route planning, branding and reporting were handled end-to-end without us chasing anything.",
//     n: "Meera P.",
//     role: "Director, Real Estate Group",
//     c: "Real Estate",
//   },
// ];

// export function Testimonials() {
//   return (
//     <section className="section-pad">
//       <div className="container-x">
//         <div className="max-w-3xl">
//           <Reveal><div className="eyebrow">Testimonials</div></Reveal>
//           <Reveal delay={1}>
//             <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-balance-tight leading-[1.05]">
//               Voices from the road.
//             </h2>
//           </Reveal>
//         </div>

//         <div className="mt-12 grid md:grid-cols-3 gap-5">
//           {items.map((t, i) => (
//             <Reveal key={t.n} delay={i}>
//               <article className="card-premium p-7 h-full flex flex-col">
//                 <div className="flex gap-1 text-primary">
//                   {Array.from({ length: 5 }).map((_, k) => (
//                     <Star key={k} className="size-4 fill-current" />
//                   ))}
//                 </div>
//                 <p className="mt-5 text-lg font-display leading-snug text-balance-tight">
//                   “{t.q}”
//                 </p>
//                 <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
//                   <div>
//                     <div className="font-medium text-sm">{t.n}</div>
//                     <div className="text-xs text-muted-foreground">{t.role}</div>
//                   </div>
//                   <span className="text-[10px] uppercase tracking-widest text-primary">{t.c}</span>
//                 </div>
//               </article>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

// // ── Testimonials (added a few more) ──────────────────────────────────────────
// const items = [
//   {
//     q: "ADINN executed our product launch roadshow across three cities flawlessly. The GPS tracking gave us complete confidence.",
//     n: "Aishwarya R.",
//     role: "Marketing Lead, Consumer Goods",
//     c: "Product Launch",
//   },
//   {
//     q: "Premium fleet, professional crew and on-time execution. Our retail footfall jumped significantly during the campaign weeks.",
//     n: "Karthik S.",
//     role: "Brand Manager, Retail Chain",
//     c: "Retail Promotion",
//   },
//   {
//     q: "A genuinely corporate partner. Route planning, branding and reporting were handled end-to-end without us chasing anything.",
//     n: "Meera P.",
//     role: "Director, Real Estate Group",
//     c: "Real Estate",
//   },
//   {
//     q: "The LED truck campaign turned heads in every market we entered. Real-time reports made it easy to prove ROI to leadership.",
//     n: "Rohan M.",
//     role: "Head of Growth, Fintech",
//     c: "Brand Awareness",
//   },
//   {
//     q: "From creative to coordination, the team was proactive at every step. Our regional launch couldn't have gone smoother.",
//     n: "Divya N.",
//     role: "Regional Manager, FMCG",
//     c: "Regional Launch",
//   },
//   {
//     q: "Reliable, transparent and genuinely creative. The branded fleet became the talking point of our entire dealer event.",
//     n: "Arjun V.",
//     role: "Marketing Head, Automobile",
//     c: "Dealer Activation",
//   },
// ];

// const gradients = [
//   "from-violet-500 to-indigo-500",
//   "from-fuchsia-500 to-purple-500",
//   "from-blue-500 to-violet-500",
//   "from-purple-500 to-pink-500",
//   "from-indigo-500 to-blue-500",
//   "from-rose-500 to-fuchsia-500",
// ];

// const initials = (name: string) =>
//   name
//     .split(/\s+/)
//     .map((w) => w[0])
//     .slice(0, 2)
//     .join("")
//     .toUpperCase();

// function Underline({ className = "" }: { className?: string }) {
//   return (
//     <svg viewBox="0 0 200 12" className={className} fill="none" aria-hidden="true">
//       <path
//         d="M3 8c40-6 90-7 130-4 22 2 44 4 64 2"
//         stroke="url(#tu)" strokeWidth="4" strokeLinecap="round"
//       />
//       <defs>
//         <linearGradient id="tu" x1="0" x2="200" y1="0" y2="0">
//           <stop stopColor="#8b5cf6" />
//           <stop offset="1" stopColor="#d946ef" />
//         </linearGradient>
//       </defs>
//     </svg>
//   );
// }

// export function Testimonials() {
//   const [perView, setPerView] = useState(3);
//   const [page, setPage] = useState(0);

//   // responsive cards-per-view
//   useEffect(() => {
//     const calc = () => {
//       const w = window.innerWidth;
//       setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
//     };
//     calc();
//     window.addEventListener("resize", calc);
//     return () => window.removeEventListener("resize", calc);
//   }, []);

//   const pages = Math.ceil(items.length / perView);

//   // keep page in range when perView changes
//   useEffect(() => {
//     setPage((p) => Math.min(p, pages - 1));
//   }, [pages]);

//   const go = (dir: number) => setPage((p) => (p + dir + pages) % pages);

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-b from-violet-50 via-purple-50/60 to-white">
//       {/* ambient blobs */}
//       <div aria-hidden className="pointer-events-none absolute -top-24 left-1/4 size-72 rounded-full bg-violet-200/50 blur-[100px]" />
//       <div aria-hidden className="pointer-events-none absolute bottom-0 right-1/4 size-72 rounded-full bg-fuchsia-200/50 blur-[100px]" />

//       <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-20 md:py-28">
//         {/* ── Heading ── */}
//         <motion.div
//           className="text-center max-w-2xl mx-auto"
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-80px" }}
//           transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//         >
//           <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] text-violet-500">
//             <span className="h-px w-6 bg-violet-300" />
//             TESTIMONIALS
//             <span className="h-px w-6 bg-violet-300" />
//           </div>
//           <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-[1.05] text-slate-900">
//             Voices from the{" "}
//             <span className="relative inline-block">
//               <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
//                 road.
//               </span>
//               <Underline className="absolute -bottom-2 left-0 w-full" />
//             </span>
//           </h2>
//         </motion.div>

//         {/* ── Carousel ── */}
//         <div className="relative mt-14">
//           {/* arrows */}
//           <button
//             onClick={() => go(-1)}
//             aria-label="Previous"
//             className="absolute left-0 md:-left-4 top-1/2 z-10 -translate-y-1/2 grid size-11 place-items-center rounded-full bg-white text-slate-700 shadow-lg shadow-violet-200/50 ring-1 ring-violet-100 transition hover:scale-110 hover:text-violet-600 active:scale-95"
//           >
//             <ChevronLeft className="size-5" />
//           </button>
//           <button
//             onClick={() => go(1)}
//             aria-label="Next"
//             className="absolute right-0 md:-right-4 top-1/2 z-10 -translate-y-1/2 grid size-11 place-items-center rounded-full bg-white text-slate-700 shadow-lg shadow-violet-200/50 ring-1 ring-violet-100 transition hover:scale-110 hover:text-violet-600 active:scale-95"
//           >
//             <ChevronRight className="size-5" />
//           </button>

//           {/* track */}
//           <div className="overflow-hidden px-1 md:px-8">
//             <motion.div
//               className="flex"
//               animate={{ x: `-${page * 100}%` }}
//               transition={{ type: "spring", stiffness: 260, damping: 30 }}
//             >
//               {items.map((t, i) => (
//                 <div
//                   key={t.n}
//                   className="shrink-0 px-2.5 py-2"
//                   style={{ flexBasis: `${100 / perView}%` }}
//                 >
//                   <article className="h-full rounded-3xl bg-white p-6 md:p-7 shadow-[0_24px_60px_-24px_rgba(99,46,170,0.30)] ring-1 ring-violet-100/70 flex flex-col transition-transform duration-300 hover:-translate-y-1">
//                     <div className="flex items-start justify-between">
//                       <div className="flex gap-1">
//                         {Array.from({ length: 5 }).map((_, k) => (
//                           <Star key={k} className="size-4 text-amber-400 fill-amber-400" />
//                         ))}
//                       </div>
//                       <Quote className="size-8 text-violet-200 fill-violet-100" />
//                     </div>

//                     <p className="mt-5 text-slate-700 leading-relaxed flex-1">
//                       “{t.q}”
//                     </p>

//                     <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
//                       <div
//                         className={`grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br ${gradients[i % gradients.length]} text-white text-sm font-semibold`}
//                       >
//                         {initials(t.n)}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="font-semibold text-slate-900 text-sm">{t.n}</div>
//                         <div className="text-xs text-slate-500 truncate">{t.role}</div>
//                       </div>
//                       <span className="text-[10px] font-semibold uppercase tracking-widest text-violet-500 whitespace-nowrap shrink-0">
//                         {t.c}
//                       </span>
//                     </div>
//                   </article>
//                 </div>
//               ))}
//             </motion.div>
//           </div>

//           {/* dots */}
//           <div className="mt-10 flex justify-center gap-2.5">
//             {Array.from({ length: pages }).map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setPage(i)}
//                 aria-label={`Go to slide ${i + 1}`}
//                 className={`h-2.5 rounded-full transition-all duration-300 ${
//                   page === i
//                     ? "w-7 bg-gradient-to-r from-violet-500 to-fuchsia-500"
//                     : "w-2.5 bg-violet-200 hover:bg-violet-300"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }












"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import "./Testimonials.css";

type TestimonialItem = {
  q: string;
  n: string;
  role: string;
  c: string;
  avatar: string;
};

const items: TestimonialItem[] = [
  {
    q: "ADINN executed our product launch roadshow across three cities flawlessly. The GPS tracking gave us complete confidence.",
    n: "Aishwarya R.",
    role: "Marketing Lead, Consumer Goods",
    c: "Product Launch",
    avatar: "/assets/girl-1.png",
  },
  {
    q: "Premium fleet, professional crew and on-time execution. Our retail footfall improved significantly during the campaign weeks.",
    n: "Karthik S.",
    role: "Brand Manager, Retail Chain",
    c: "Retail Promotion",
    avatar: "/assets/boy-1.png",
  },
  {
    q: "A genuinely corporate partner. Route planning, branding and reporting were handled end-to-end without us chasing anything.",
    n: "Meera P.",
    role: "Director, Real Estate Group",
    c: "Real Estate",
    avatar: "/assets/girl-2.png",
  },
  {
    q: "Excellent coordination across cities with real-time tracking and detailed reports. Great experience working with the ADINN team.",
    n: "Rohit M.",
    role: "Marketing Head, FMCG",
    c: "Brand Activation",
    avatar: "/assets/boy-2.png",
  },
  {
    q: "From permissions to execution, everything was handled professionally. Highly recommended for roadshows.",
    n: "Sneha T.",
    role: "Sr. Manager, Automobile",
    c: "Product Promo",
    avatar: "/assets/girl-3.png",
  },
  {
    q: "The LED vehicle helped us create strong visibility in high-footfall locations. The complete execution was very clean.",
    n: "Arjun V.",
    role: "Regional Manager, Retail",
    c: "LED Roadshow",
    avatar: "/assets/boy-3.png",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function useCardsPerView() {
  const [perView, setPerView] = useState(5);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;

      if (width < 640) setPerView(1);
      else if (width < 900) setPerView(2);
      else if (width < 1180) setPerView(3);
      else if (width < 1440) setPerView(4);
      else setPerView(5);
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return perView;
}

function useElementWidth(ref: React.RefObject<HTMLDivElement | null>) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return width;
}

function TestimonialAvatar({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="adinn-testimonial-avatar">
      <span>{getInitials(name)}</span>

      {!failed && (
        <img
          src={src}
          alt={name}
          onError={() => setFailed(true)}
          draggable={false}
        />
      )}
    </div>
  );
}

function Underline() {
  return (
    <svg
      viewBox="0 0 230 20"
      className="adinn-testimonial-underline"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 11C39 2 70 19 104 10C137 1 172 18 224 8"
        stroke="url(#testimonialGradient)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="testimonialGradient"
          x1="0"
          y1="0"
          x2="230"
          y2="0"
        >
          <stop stopColor="#6d4cff" />
          <stop offset="1" stopColor="#8d73ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Testimonials() {
  const perView = useCardsPerView();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const viewportWidth = useElementWidth(viewportRef);
  const shouldReduceMotion = useReducedMotion();

  const gap = viewportWidth < 640 ? 16 : 22;

  const cardWidth =
    viewportWidth > 0 ? (viewportWidth - gap * (perView - 1)) / perView : 0;

  const [activeIndex, setActiveIndex] = useState(perView);
  const [isJumping, setIsJumping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const extendedItems = useMemo(() => {
    const before = items.slice(-perView);
    const after = items.slice(0, perView);

    return [...before, ...items, ...after];
  }, [perView]);

  useEffect(() => {
    setIsJumping(true);
    setActiveIndex(perView);

    const frame = requestAnimationFrame(() => {
      setIsJumping(false);
    });

    return () => cancelAnimationFrame(frame);
  }, [perView]);

  const next = useCallback(() => {
    if (cardWidth === 0) return;
    setActiveIndex((prev) => prev + 1);
  }, [cardWidth]);

  const prev = useCallback(() => {
    if (cardWidth === 0) return;
    setActiveIndex((prev) => prev - 1);
  }, [cardWidth]);

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    const timer = window.setInterval(() => {
      next();
    }, 4200);

    return () => window.clearInterval(timer);
  }, [isPaused, next, shouldReduceMotion]);

  const handleAnimationComplete = () => {
    if (isJumping) return;

    if (activeIndex >= items.length + perView) {
      setIsJumping(true);
      setActiveIndex(perView);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsJumping(false);
        });
      });
    }

    if (activeIndex <= perView - 1) {
      setIsJumping(true);
      setActiveIndex(items.length + perView - 1);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsJumping(false);
        });
      });
    }
  };

  const currentDot =
    ((activeIndex - perView) % items.length + items.length) % items.length;

  return (
    <section className="adinn-testimonial-section" id="testimonials">
      <div className="adinn-testimonial-bg-layer" />

      <div className="adinn-testimonial-container">
        <motion.div
          className="adinn-testimonial-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="adinn-testimonial-eyebrow">
            <Sparkles size={15} />
            Testimonials
          </div>

          <h2>
            Voices from <span>the road.</span>
            <Underline />
          </h2>
        </motion.div>

        <div
          className="adinn-testimonial-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            className="adinn-testimonial-arrow adinn-testimonial-arrow-left"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={23} />
          </button>

          <div className="adinn-testimonial-viewport" ref={viewportRef}>
            <motion.div
              className="adinn-testimonial-track"
              style={{ gap }}
              animate={{
                x: -activeIndex * (cardWidth + gap),
              }}
              transition={
                isJumping || shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 145,
                      damping: 28,
                      mass: 0.9,
                    }
              }
              onAnimationComplete={handleAnimationComplete}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={(_, info) => {
                if (info.offset.x < -55 || info.velocity.x < -420) {
                  next();
                } else if (info.offset.x > 55 || info.velocity.x > 420) {
                  prev();
                }
              }}
            >
              {extendedItems.map((item, index) => (
                <div
                  className="adinn-testimonial-slide"
                  key={`${item.n}-${index}`}
                  style={{
                    width: cardWidth,
                    minWidth: cardWidth,
                  }}
                >
                  <motion.article
                    className="adinn-testimonial-card"
                    whileHover={{
                      y: -10,
                      scale: 1.015,
                      transition: { duration: 0.28 },
                    }}
                  >
                    <div className="adinn-testimonial-stars">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          size={17}
                          fill="currentColor"
                        />
                      ))}
                    </div>

                    <p className="adinn-testimonial-text">“{item.q}”</p>

                    <div className="adinn-testimonial-profile">
                      <TestimonialAvatar src={item.avatar} name={item.n} />

                      <div className="adinn-testimonial-person">
                        <h3>{item.n}</h3>
                        <p>{item.role}</p>
                      </div>
                    </div>

                    <div className="adinn-testimonial-chip">{item.c}</div>
                  </motion.article>
                </div>
              ))}
            </motion.div>
          </div>

          <button
            className="adinn-testimonial-arrow adinn-testimonial-arrow-right"
            onClick={next}
            aria-label="Next testimonial"
          >
            <ChevronRight size={23} />
          </button>
        </div>

        <div className="adinn-testimonial-dots">
          {items.map((_, index) => (
            <button
              key={index}
              className={currentDot === index ? "active" : ""}
              onClick={() => setActiveIndex(index + perView)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}