// "use client";

// import {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
//   type RefObject,
// } from "react";
// import { motion, useReducedMotion } from "framer-motion";
// import { ChevronLeft, ChevronRight, Star } from "lucide-react";
// import "./Testimonials.css";

// type TestimonialItem = {
//   q: string;
//   n: string;
//   role: string;
//   c: string;
//   avatar: string;
// };

// type CarouselItem = TestimonialItem & {
//   originalIndex: number;
//   cloneKey: string;
// };

// const items: TestimonialItem[] = [
//   {
//     q: "ADINN executed our product launch roadshow across three cities flawlessly. The GPS tracking gave us complete confidence.",
//     n: "Aishwarya R.",
//     role: "Marketing Lead, Consumer Goods",
//     c: "Product Launch",
//     avatar: "/assets/girl-1.png",
//   },
//   {
//     q: "Premium fleet, professional crew and on-time execution. Our retail footfall improved significantly during the campaign weeks.",
//     n: "Karthik S.",
//     role: "Brand Manager, Retail Chain",
//     c: "Retail Promotion",
//     avatar: "/assets/boy-1.png",
//   },
//   {
//     q: "A genuinely corporate partner. Route planning, branding and reporting were handled end-to-end without us chasing anything.",
//     n: "Meera P.",
//     role: "Director, Real Estate Group",
//     c: "Real Estate",
//     avatar: "/assets/girl-2.png",
//   },
//   {
//     q: "Excellent coordination across cities with real-time tracking and detailed reports. Great experience working with the ADINN team.",
//     n: "Rohit M.",
//     role: "Marketing Head, FMCG",
//     c: "Brand Activation",
//     avatar: "/assets/boy-2.png",
//   },
//   {
//     q: "From permissions to execution, everything was handled professionally. Highly recommended for roadshows.",
//     n: "Sneha T.",
//     role: "Sr. Manager, Automobile",
//     c: "Product Promo",
//     avatar: "/assets/girl-3.png",
//   },
//   {
//     q: "The LED vehicle helped us create strong visibility in high-footfall locations. The complete execution was very clean.",
//     n: "Arjun V.",
//     role: "Regional Manager, Retail",
//     c: "LED Roadshow",
//     avatar: "/assets/boy-3.png",
//   },
// ];

// function getInitials(name: string) {
//   return name
//     .split(" ")
//     .map((word) => word[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();
// }

// function useCardsPerView() {
//   const [perView, setPerView] = useState(6);

//   useEffect(() => {
//     const update = () => {
//       const width = window.innerWidth;

//       if (width < 640) setPerView(1);
//       else if (width < 900) setPerView(2);
//       else if (width < 1180) setPerView(3);
//       else if (width < 1440) setPerView(5);
//       else setPerView(6);
//     };

//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   return perView;
// }

// function useElementWidth(ref: RefObject<HTMLDivElement | null>) {
//   const [width, setWidth] = useState(0);

//   useEffect(() => {
//     if (!ref.current) return;

//     const observer = new ResizeObserver(([entry]) => {
//       setWidth(entry.contentRect.width);
//     });

//     observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [ref]);

//   return width;
// }

// function TestimonialAvatar({ src, name }: { src: string; name: string }) {
//   const [failed, setFailed] = useState(false);

//   return (
//     <div className="adinn-testimonial-avatar">
//       <span>{getInitials(name)}</span>

//       {!failed && (
//         <img
//           src={src}
//           alt={name}
//           onError={() => setFailed(true)}
//           draggable={false}
//         />
//       )}
//     </div>
//   );
// }

// // function CitySkyline() {
// //   return (
// //     <div className="adinn-testimonial-skyline" aria-hidden="true">
// //       <svg
// //         viewBox="0 0 1500 360"
// //         preserveAspectRatio="xMidYMax slice"
// //         xmlns="http://www.w3.org/2000/svg"
// //       >
// //         <rect x="0" y="245" width="42" height="115" />
// //         <rect x="56" y="210" width="64" height="150" />
// //         <rect x="142" y="235" width="48" height="125" />
// //         <rect x="212" y="185" width="76" height="175" />
// //         <rect x="235" y="140" width="28" height="45" />
// //         <rect x="318" y="220" width="64" height="140" />
// //         <rect x="410" y="175" width="82" height="185" />
// //         <rect x="522" y="205" width="52" height="155" />
// //         <rect x="604" y="150" width="86" height="210" />
// //         <rect x="632" y="105" width="30" height="45" />
// //         <rect x="720" y="190" width="70" height="170" />
// //         <rect x="824" y="135" width="92" height="225" />
// //         <rect x="856" y="70" width="26" height="65" />
// //         <rect x="948" y="220" width="56" height="140" />
// //         <rect x="1036" y="170" width="78" height="190" />
// //         <rect x="1062" y="126" width="24" height="44" />
// //         <rect x="1142" y="214" width="64" height="146" />
// //         <rect x="1238" y="155" width="88" height="205" />
// //         <rect x="1268" y="90" width="28" height="65" />
// //         <rect x="1364" y="226" width="58" height="134" />
// //         <rect x="1452" y="194" width="48" height="166" />
// //       </svg>
// //     </div>
// //   );
// // }

// export function Testimonials() {
//   const perView = useCardsPerView();
//   const shouldReduceMotion = useReducedMotion();

//   const viewportRef = useRef<HTMLDivElement | null>(null);
//   const viewportWidth = useElementWidth(viewportRef);

//   const gap = viewportWidth < 640 ? 16 : 20;
//   const cardWidth =
//     viewportWidth > 0 ? (viewportWidth - gap * (perView - 1)) / perView : 0;

//   const [activeIndex, setActiveIndex] = useState(perView);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [isJumping, setIsJumping] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);

//   const extendedItems = useMemo<CarouselItem[]>(() => {
//     const before = items.slice(-perView).map((item, index) => ({
//       ...item,
//       originalIndex: items.length - perView + index,
//       cloneKey: `before-${index}-${item.n}`,
//     }));

//     const real = items.map((item, index) => ({
//       ...item,
//       originalIndex: index,
//       cloneKey: `real-${index}-${item.n}`,
//     }));

//     const after = items.slice(0, perView).map((item, index) => ({
//       ...item,
//       originalIndex: index,
//       cloneKey: `after-${index}-${item.n}`,
//     }));

//     return [...before, ...real, ...after];
//   }, [perView]);

//   useEffect(() => {
//     setIsJumping(true);
//     setActiveIndex(perView);

//     const frame = requestAnimationFrame(() => setIsJumping(false));
//     return () => cancelAnimationFrame(frame);
//   }, [perView]);

//   const currentDot =
//     ((activeIndex - perView) % items.length + items.length) % items.length;

//   useEffect(() => {
//     setSelectedIndex(currentDot);
//   }, [currentDot]);

//   const selectedItem = items[selectedIndex];

//   const next = useCallback(() => {
//     if (cardWidth === 0) return;
//     setActiveIndex((prev) => prev + 1);
//   }, [cardWidth]);

//   const prev = useCallback(() => {
//     if (cardWidth === 0) return;
//     setActiveIndex((prev) => prev - 1);
//   }, [cardWidth]);

//   useEffect(() => {
//     if (isPaused || shouldReduceMotion) return;

//     const timer = window.setInterval(() => {
//       next();
//     }, 4600);

//     return () => window.clearInterval(timer);
//   }, [isPaused, next, shouldReduceMotion]);

//   const handleAnimationComplete = () => {
//     if (isJumping) return;

//     if (activeIndex >= items.length + perView) {
//       setIsJumping(true);
//       setActiveIndex(perView);

//       requestAnimationFrame(() => {
//         requestAnimationFrame(() => setIsJumping(false));
//       });
//     }

//     if (activeIndex <= perView - 1) {
//       setIsJumping(true);
//       setActiveIndex(items.length + perView - 1);

//       requestAnimationFrame(() => {
//         requestAnimationFrame(() => setIsJumping(false));
//       });
//     }
//   };

//   const handleCardSelect = (index: number) => {
//     setSelectedIndex(index);
//   };

//   return (
//     <section className="adinn-testimonial-section" id="testimonials">
//       <div className="adinn-testimonial-bg-layer" />

//       <div className="adinn-testimonial-shell">
//         <div className="adinn-testimonial-container">
//           <motion.div
//             className="adinn-testimonial-heading"
//             initial={{ opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-90px" }}
//             transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
//           >
//             <div className="adinn-testimonial-eyebrow">Testimonials</div>

//             <h2>
//               Trusted by Brands Across <span>Industries</span>
//             </h2>

//             <p>
//               Real results. Real partnerships. See what our clients have to say
//               about their experience with ADINN.
//             </p>
//           </motion.div>

//           <motion.div
//             className="adinn-testimonial-hero"
//             initial={{ opacity: 0, y: 34 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{
//               duration: 0.72,
//               ease: [0.22, 1, 0.36, 1],
//               delay: 0.1,
//             }}
//           >
//             {/* <CitySkyline /> */}

//             <div className="adinn-testimonial-floor" />

//             <div className="adinn-testimonial-truck-stage">
//               {/* <img
//                 className="adinn-testimonial-truck-img"
//                 src="/assets/led-truck_testimonials.png"
//                 alt="ADINN LED roadshow vehicle"
//                 draggable={false}
//               /> */}

//               <div className="adinn-led-screen-overlay">
//                 <motion.div
//                   key={selectedItem.n}
//                   className="adinn-led-screen-content"
//                   initial={
//                     shouldReduceMotion
//                       ? false
//                       : { opacity: 0, y: 14, filter: "blur(8px)" }
//                   }
//                   animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//                   transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
//                 >
//                   <div className="adinn-led-screen-tag">{selectedItem.c}</div>

//                   <p className="adinn-led-screen-quote">
//                     “{selectedItem.q}”
//                   </p>

//                   <div className="adinn-led-screen-bottom">
//                     <div>
//                       <div className="adinn-led-screen-stars">
//                         {Array.from({ length: 5 }).map((_, starIndex) => (
//                           <Star
//                             key={starIndex}
//                             size={18}
//                             fill="currentColor"
//                           />
//                         ))}
//                       </div>

//                       <strong>{selectedItem.n}</strong>
//                       <span>{selectedItem.role}</span>
//                     </div>

//                     <div className="adinn-led-live-badge">
//                       LIVE LED DISPLAY
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           </motion.div>

//           <div
//             className="adinn-testimonial-carousel"
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}  style={{display:'none'}}
//           >
//             <button
//               className="adinn-testimonial-arrow adinn-testimonial-arrow-left"
//               type="button"
//               onClick={prev}
//               aria-label="Previous testimonial"
//             >
//               <ChevronLeft size={24} />
//             </button>

//             <div className="adinn-testimonial-viewport" ref={viewportRef}>
//               <motion.div
//                 className="adinn-testimonial-track"
//                 style={{ gap }}
//                 animate={{ x: -activeIndex * (cardWidth + gap) }}
//                 transition={
//                   isJumping || shouldReduceMotion
//                     ? { duration: 0 }
//                     : {
//                         type: "spring",
//                         stiffness: 145,
//                         damping: 28,
//                         mass: 0.9,
//                       }
//                 }
//                 onAnimationComplete={handleAnimationComplete}
//                 drag="x"
//                 dragConstraints={{ left: 0, right: 0 }}
//                 dragElastic={0.08}
//                 onDragEnd={(_, info) => {
//                   if (info.offset.x < -55 || info.velocity.x < -420) next();
//                   else if (info.offset.x > 55 || info.velocity.x > 420) prev();
//                 }}
//               >
//                 {extendedItems.map((item) => {
//                   const isSelected = selectedIndex === item.originalIndex;

//                   return (
//                     <div
//                       className="adinn-testimonial-slide"
//                       key={item.cloneKey}
//                       style={{
//                         width: cardWidth || undefined,
//                         minWidth: cardWidth || undefined,
//                       }}
//                     >
//                       <motion.article
//                         className={`adinn-testimonial-card ${
//                           isSelected ? "is-selected" : ""
//                         }`}
//                         whileHover={
//                           shouldReduceMotion
//                             ? undefined
//                             : {
//                                 y: -6,
//                                 transition: { duration: 0.26 },
//                               }
//                         }
//                         role="button"
//                         tabIndex={0}
//                         aria-pressed={isSelected}
//                         onClick={() => handleCardSelect(item.originalIndex)}
//                         onKeyDown={(event) => {
//                           if (event.key === "Enter" || event.key === " ") {
//                             event.preventDefault();
//                             handleCardSelect(item.originalIndex);
//                           }
//                         }}
//                       >
//                         <div className="adinn-testimonial-stars">
//                           {Array.from({ length: 5 }).map((_, starIndex) => (
//                             <Star
//                               key={starIndex}
//                               size={15}
//                               fill="currentColor"
//                             />
//                           ))}
//                         </div>

//                         <div className="adinn-testimonial-quote-mark">“</div>

//                         <p className="adinn-testimonial-text">“{item.q}”</p>

//                         <div className="adinn-testimonial-profile">
//                           <TestimonialAvatar src={item.avatar} name={item.n} />

//                           <div className="adinn-testimonial-person">
//                             <h3>{item.n}</h3>
//                             <p>{item.role}</p>
//                           </div>
//                         </div>

//                         <div className="adinn-testimonial-chip">{item.c}</div>
//                       </motion.article>
//                     </div>
//                   );
//                 })}
//               </motion.div>
//             </div>

//             <button
//               className="adinn-testimonial-arrow adinn-testimonial-arrow-right"
//               type="button"
//               onClick={next}
//               aria-label="Next testimonial"
//             >
//               <ChevronRight size={24} />
//             </button>
//           </div>

//           <div className="adinn-testimonial-dots" aria-label="Testimonials">
//             {items.map((item, index) => (
//               <button
//                 key={item.n}
//                 type="button"
//                 className={currentDot === index ? "active" : ""}
//                 onClick={() => {
//                   setActiveIndex(index + perView);
//                   setSelectedIndex(index);
//                 }}
//                 aria-label={`Go to testimonial ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { motion, useReducedMotion } from "framer-motion";
// import { Star } from "lucide-react";
// import "./Testimonials.css";

// type TestimonialItem = {
//   q: string;
//   n: string;
//   role: string;
//   c: string;
//   avatar: string;
// };

// const items: TestimonialItem[] = [
//   {
//     q: "ADINN executed our product launch roadshow across three cities flawlessly. The GPS tracking gave us complete confidence.",
//     n: "Aishwarya R.",
//     role: "Marketing Lead, Consumer Goods",
//     c: "Product Launch",
//     avatar: "/assets/girl-1.png",
//   },
//   {
//     q: "Premium fleet, professional crew and on-time execution. Our retail footfall improved significantly during the campaign weeks.",
//     n: "Karthik S.",
//     role: "Brand Manager, Retail Chain",
//     c: "Retail Promotion",
//     avatar: "/assets/boy-1.png",
//   },
//   {
//     q: "A genuinely corporate partner. Route planning, branding and reporting were handled end-to-end without us chasing anything.",
//     n: "Meera P.",
//     role: "Director, Real Estate Group",
//     c: "Real Estate",
//     avatar: "/assets/girl-2.png",
//   },
//   {
//     q: "Excellent coordination across cities with real-time tracking and detailed reports. Great experience working with the ADINN team.",
//     n: "Rohit M.",
//     role: "Marketing Head, FMCG",
//     c: "Brand Activation",
//     avatar: "/assets/boy-2.png",
//   },
//   {
//     q: "From permissions to execution, everything was handled professionally. Highly recommended for roadshows.",
//     n: "Sneha T.",
//     role: "Sr. Manager, Automobile",
//     c: "Product Promo",
//     avatar: "/assets/girl-3.png",
//   },
//   {
//     q: "The LED vehicle helped us create strong visibility in high-footfall locations. The complete execution was very clean.",
//     n: "Arjun V.",
//     role: "Regional Manager, Retail",
//     c: "LED Roadshow",
//     avatar: "/assets/boy-3.png",
//   },
// ];

// const AUTO_CHANGE_TIME = 2000;

// function getNextIndex(index: number) {
//   return (index + 1) % items.length;
// }

// export function Testimonials() {
//   const shouldReduceMotion = useReducedMotion();
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   const selectedItem = items[selectedIndex];

//   useEffect(() => {
//     if (shouldReduceMotion || isPaused) return;

//     const timer = window.setInterval(() => {
//       setSelectedIndex((prev) => getNextIndex(prev));
//     }, AUTO_CHANGE_TIME);

//     return () => window.clearInterval(timer);
//   }, [shouldReduceMotion, isPaused]);

//   return (
//     <section className="adinn-testimonial-section" id="testimonials">
//       <div className="adinn-testimonial-bg-layer" />

//       <div className="adinn-testimonial-shell">
//         <div className="adinn-testimonial-container">
//           <motion.div
//             className="adinn-testimonial-heading"
//             initial={{ opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-90px" }}
//             transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
//           >
//             <div className="adinn-testimonial-eyebrow">Testimonials</div>

//             <h2>
//               Trusted by Brands Across <span>Industries</span>
//             </h2>

//             <p>
//               Real results. Real partnerships. See what our clients have to say
//               about their experience with ADINN.
//             </p>
//           </motion.div>

//           <motion.div
//             className="adinn-testimonial-hero"
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//             initial={{ opacity: 0, y: 34 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{
//               duration: 0.72,
//               ease: [0.22, 1, 0.36, 1],
//               delay: 0.1,
//             }}
//           >
//             <div className="adinn-testimonial-floor" />

//             <div className="adinn-testimonial-truck-stage">
//               {/* <img
//                 className="adinn-testimonial-truck-img"
//                 src="/assets/led-truck_testimonials.png"
//                 alt="ADINN LED roadshow vehicle"
//                 draggable={false}
//               /> */}

//               <div className="adinn-led-screen-overlay" aria-live="polite">
//                 <motion.div
//                   key={selectedItem.n}
//                   className="adinn-led-screen-content"
//                   initial={
//                     shouldReduceMotion
//                       ? false
//                       : { opacity: 0, x: 22, filter: "blur(8px)" }
//                   }
//                   animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
//                 >
//                   <div className="adinn-led-screen-inner">
//                     <div className="adinn-led-screen-tag">
//                       {selectedItem.c}
//                     </div>

//                     <p className="adinn-led-screen-quote">
//                       “{selectedItem.q}”
//                     </p>

//                     <div className="adinn-led-screen-bottom">
//                       <div>
//                         <div className="adinn-led-screen-stars">
//                           {Array.from({ length: 5 }).map((_, starIndex) => (
//                             <Star
//                               key={starIndex}
//                               size={18}
//                               fill="currentColor"
//                             />
//                           ))}
//                         </div>

//                         <strong>{selectedItem.n}</strong>
//                         <span>{selectedItem.role}</span>
//                       </div>

//                       <div className="adinn-led-live-badge">
//                         LIVE LED DISPLAY
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           </motion.div>

//           <div className="adinn-testimonial-carousel" aria-hidden="true" />

//           <div className="adinn-testimonial-dots" aria-label="Testimonials">
//             {items.map((item, index) => (
//               <button
//                 key={item.n}
//                 type="button"
//                 className={selectedIndex === index ? "active" : ""}
//                 onClick={() => setSelectedIndex(index)}
//                 aria-label={`Show testimonial ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Star } from "lucide-react";
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

const AUTO_CHANGE_TIME = 2000;

function getNextIndex(index: number) {
  return (index + 1) % items.length;
}

const screenVariants: Variants = {
  enter: {
    opacity: 0,
    x: 34,
    scale: 0.985,
    filter: "blur(10px)",
  },
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.055,
    },
  },
  exit: {
    opacity: 0,
    x: -28,
    scale: 0.99,
    filter: "blur(8px)",
    transition: {
      duration: 0.32,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const childVariants: Variants = {
  enter: {
    opacity: 0,
    y: 12,
  },
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.46,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.22,
    },
  },
};

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const selectedItem = items[selectedIndex];

  useEffect(() => {
    if (shouldReduceMotion || isPaused) return;

    const timer = window.setInterval(() => {
      setSelectedIndex((prev) => getNextIndex(prev));
    }, AUTO_CHANGE_TIME);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion, isPaused]);

  return (
    <section className="adinn-testimonial-section" id="testimonials">
      <div className="adinn-testimonial-bg-layer" />

      <div className="adinn-testimonial-shell">
        <div className="adinn-testimonial-container">
          <motion.div
            className="adinn-testimonial-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >

            <h2>
              Trusted by Brands Across <span>Industries</span>
            </h2>
            {/* <div className="adinn-testimonial-eyebrow">Testimonials</div> */}

            <p>
              Real results. Real partnerships. See what our clients have to say
              about their experience with ADINN.
            </p>
          </motion.div>

          <motion.div
            className="adinn-testimonial-hero"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.72,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
          >
            <div className="adinn-testimonial-floor" />

            <div className="adinn-testimonial-truck-stage">
              <div className="adinn-led-screen-overlay" aria-live="polite">
                {!shouldReduceMotion && !isPaused && (
                  <motion.div
                    key={`progress-${selectedIndex}`}
                    className="adinn-led-progress"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: AUTO_CHANGE_TIME / 1000,
                      ease: "linear",
                    }}
                  />
                )}

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={selectedItem.n}
                    className="adinn-led-screen-content"
                    variants={screenVariants}
                    initial={shouldReduceMotion ? false : "enter"}
                    animate="center"
                    exit="exit"
                  >
                    <div className="adinn-led-screen-inner">
                      <motion.div
                        className="adinn-led-screen-tag"
                        variants={childVariants}
                      >
                        {selectedItem.c}
                      </motion.div>

                      <motion.p
                        className="adinn-led-screen-quote"
                        variants={childVariants}
                      >
                        “{selectedItem.q}”
                      </motion.p>

                      <motion.div
                        className="adinn-led-screen-bottom"
                        variants={childVariants}
                      >
                        <div>
                          <div className="adinn-led-screen-stars">
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <motion.span
                                key={starIndex}
                                initial={
                                  shouldReduceMotion
                                    ? false
                                    : { opacity: 0, scale: 0.45, y: 6 }
                                }
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{
                                  duration: 0.34,
                                  delay: 0.16 + starIndex * 0.045,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                              >
                                <Star size={18} fill="currentColor" />
                              </motion.span>
                            ))}
                          </div>

                          <strong>{selectedItem.n}</strong>
                          <span>{selectedItem.role}</span>
                        </div>

                        <motion.div
                          className="adinn-led-live-badge"
                          initial={
                            shouldReduceMotion
                              ? false
                              : { opacity: 0, scale: 0.92 }
                          }
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.28, duration: 0.34 }}
                        >
                          LIVE LED DISPLAY
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <div className="adinn-testimonial-carousel" aria-hidden="true" />

          <div className="adinn-testimonial-dots" aria-label="Testimonials">
            {items.map((item, index) => (
              <button
                key={item.n}
                type="button"
                className={selectedIndex === index ? "active" : ""}
                onClick={() => setSelectedIndex(index)}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}