// /*eslint-disable*/
// //@ts-nocheck
// "use client";

// import { Reveal } from "./Reveal";
// import { BleedButton } from "./BleedButton";
// import { ChevronLeft, ChevronRight, X } from "lucide-react";
// import { useRef, useState, useEffect } from "react";

// /* -------------------------------------------------------------------------- */
// /*  DATA SOURCE                                                               */
// /*  Save your JSON as a file and import it. Adjust the path to wherever you   */
// /*  keep it (e.g. src/data/vehicles.json or app/data/vehicles.json).         */
// /* -------------------------------------------------------------------------- */
// import vehiclesData from "../../data/vehicles.json";


// type CategoryType = "led" | "flex" | "hybrid";

// /* Map each vehicle id -> on-site tab.
//    The JSON "category" field does NOT match your tabs 1:1, so we map by id.   */
// const UI_CATEGORY_BY_ID: Record<number, CategoryType> = {
//   1: "flex", // Tata Ace 8 Feet Vehicle
//   2: "flex", // Tata Ace 10 Feet Vehicle
//   4: "hybrid", // Tata Ace 8 Feet LED Vehicle (LED + Flex)
//   5: "led", // Tata Ultra 19 Ft Single Side LED
//   6: "led", // Tata Ultra 19 Ft - 3 Sides LED
//   7: "led", // Tata Ultra 17 Ft - 3 Sides LED
//   8: "led", // Tata Ace 9 Ft 2 Sides LED
// };

// /* Clean, display-ready vehicle list:
//    - drops the promoterCharges object (no id)
//    - drops hidden vehicles (id 3 -> hide: true)
//    - attaches the uiCategory used by the tabs                                 */
// const VEHICLES = (vehiclesData as any[])
//   .filter((v) => v && typeof v.id === "number" && !v.hide)
//   .map((v) => ({ ...v, uiCategory: UI_CATEGORY_BY_ID[v.id] }))
//   .filter((v) => Boolean(v.uiCategory));

// /* Friendly labels for the location-charge keys in the JSON                   */
// const LOCATION_LABELS: Record<string, string> = {
//   general: "General",
//   kerala: "Kerala",
//   Kerala: "Kerala",
//   chennai: "Chennai",
//   rotn: "Rest of TN",
//   Tamilnadu: "Tamil Nadu",
//   andhara: "Andhra",
//   telungana: "Telangana",
//   karnataka: "Karnataka",
//   otherStates: "Other States",
// };

// const prettyKey = (k: string) => LOCATION_LABELS[k] || k;

// export function Services() {
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const isMovingRef = useRef(false);
//   const [activeCategory, setActiveCategory] = useState<CategoryType>("led");

//   // The vehicle currently shown in the detail modal (null = closed)
//   const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);

//   const activeProducts = VEHICLES.filter(
//     (v) => v.uiCategory === activeCategory
//   );

//   const handleCategoryChange = (category: CategoryType) => {
//     if (activeCategory === category) return;

//     setActiveCategory(category);
//     isMovingRef.current = false;

//     requestAnimationFrame(() => {
//       if (carouselRef.current) {
//         carouselRef.current.scrollLeft = 0;
//       }
//     });
//   };

//   const moveCarousel = (direction: "left" | "right") => {
//     const el = carouselRef.current;
//     if (!el || isMovingRef.current) return;

//     isMovingRef.current = true;

//     const firstCard = el.querySelector("article");
//     const cardWidth = firstCard?.getBoundingClientRect().width || 390;
//     const gap = 40;
//     const distance = cardWidth + gap;

//     const start = el.scrollLeft;
//     const maxScroll = el.scrollWidth - el.clientWidth;

//     const target =
//       direction === "right"
//         ? Math.min(start + distance, maxScroll)
//         : Math.max(start - distance, 0);

//     if (target === start) {
//       isMovingRef.current = false;
//       return;
//     }

//     const duration = 1250;
//     const startTime = performance.now();

//     const easeInOutQuart = (t: number) => {
//       return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
//     };

//     const animateScroll = (time: number) => {
//       const progress = Math.min((time - startTime) / duration, 1);
//       const eased = easeInOutQuart(progress);

//       el.scrollLeft = start + (target - start) * eased;

//       if (progress < 1) {
//         requestAnimationFrame(animateScroll);
//       } else {
//         isMovingRef.current = false;
//       }
//     };

//     requestAnimationFrame(animateScroll);
//   };

//   return (
//     <section
//       id="services"
//       className="section-pad bg-surface-muted overflow-hidden"
//     >
//       <div className="container-x">
//         <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
//           <div className="max-w-3xl">
//             <Reveal>
//               <div className="eyebrow">
//                 Roadshow <span className="text-[#e3000f]">Solutions</span>
//               </div>
//             </Reveal>

//             <Reveal delay={1}>
//               <h2 className="mt-3 text-[28px] md:text-[36px] lg:text-[40px] font-display font-semibold text-balance-tight leading-[1.08]">
//                 Built for <br /> brand impact
//               </h2>
//             </Reveal>
//           </div>

//           <Reveal delay={2}>
//             <div
//               className="
//                 relative
//                 flex
//                 w-fit
//                 rounded-full
//                 bg-white
//                 p-1.5
//                 shadow-[0_18px_60px_rgba(0,0,0,0.06)]
//               "
//             >
//               <span
//                 className={`
//                   pointer-events-none
//                   absolute
//                   left-1.5
//                   top-1.5
//                   z-0
//                   h-[calc(100%-12px)]
//                   w-[125px]
//                   rounded-full
//                   bg-black
//                   shadow-[0_14px_34px_rgba(0,0,0,0.20)]
//                   transition-transform
//                   duration-700
//                   ease-[cubic-bezier(.16,1,.3,1)]
//                   sm:w-[145px]
//                   ${
//                     activeCategory === "led"
//                       ? "translate-x-0"
//                       : activeCategory === "flex"
//                         ? "translate-x-[125px] sm:translate-x-[145px]"
//                         : "translate-x-[250px] sm:translate-x-[290px]"
//                   }
//                 `}
//               />

//               <button
//                 type="button"
//                 aria-pressed={activeCategory === "led"}
//                 onClick={() => handleCategoryChange("led")}
//                 className={`
//                   relative
//                   z-10
//                   h-14
//                   min-w-[125px]
//                   rounded-full
//                   px-5
//                   text-[14px]
//                   font-semibold
//                   transition-colors
//                   duration-500
//                   sm:min-w-[145px]
//                   sm:text-[15px]
//                   ${
//                     activeCategory === "led"
//                       ? "text-white"
//                       : "text-black/50 hover:text-black"
//                   }
//                 `}
//               >
//                 LED Vehicles
//               </button>

//               <button
//                 type="button"
//                 aria-pressed={activeCategory === "flex"}
//                 onClick={() => handleCategoryChange("flex")}
//                 className={`
//                   relative
//                   z-10
//                   h-14
//                   min-w-[125px]
//                   rounded-full
//                   px-5
//                   text-[14px]
//                   font-semibold
//                   transition-colors
//                   duration-500
//                   sm:min-w-[145px]
//                   sm:text-[15px]
//                   ${
//                     activeCategory === "flex"
//                       ? "text-white"
//                       : "text-black/50 hover:text-black"
//                   }
//                 `}
//               >
//                 Flex Branding
//               </button>

//               <button
//                 type="button"
//                 aria-pressed={activeCategory === "hybrid"}
//                 onClick={() => handleCategoryChange("hybrid")}
//                 className={`
//                   relative
//                   z-10
//                   h-14
//                   min-w-[125px]
//                   rounded-full
//                   px-5
//                   text-[14px]
//                   font-semibold
//                   transition-colors
//                   duration-500
//                   sm:min-w-[145px]
//                   sm:text-[15px]
//                   ${
//                     activeCategory === "hybrid"
//                       ? "text-white"
//                       : "text-black/50 hover:text-black"
//                   }
//                 `}
//               >
//                 Hybrid
//               </button>
//             </div>
//           </Reveal>
//         </div>
//       </div>

//       <div className="relative mt-14">
//         <div
//           ref={carouselRef}
//           className="
//             ml-[16px]
//             overflow-x-auto
//             pr-6
//             [scrollbar-width:none]
//             md:ml-[40px]
//             md:pr-10
//             lg:ml-[max(100px,calc((100vw-1440px)/2))]
//             lg:pr-[max(100px,calc((100vw-1440px)/2))]
//             [&::-webkit-scrollbar]:hidden
//           "
//         >
//           <div className="flex gap-10 pb-4">
//             {activeProducts.map((s, i) => (
//               <Reveal key={`${activeCategory}-${s.id}`} delay={i}>
//                 <article
//                   onClick={() => setSelectedVehicle(s)}
//                   className="
//                     card-premium
//                     group
//                     flex
//                     min-h-[450px]
//                     w-[300px]
//                     shrink-0
//                     cursor-pointer
//                     flex-col
//                     overflow-hidden
//                     md:w-[360px]
//                     lg:w-[390px]
//                   "
//                 >
//                   <div className="relative aspect-[4/3] overflow-hidden bg-white">
//                     <img
//                       src={s.images?.[0]}
//                       alt={s.name}
//                       loading="lazy"
//                       width={1024}
//                       height={1024}
//                       className="
//                         h-full
//                         w-full
//                         object-cover
//                         transition-transform
//                         duration-[2100ms]
//                         ease-[cubic-bezier(.16,1,.3,1)]
//                         group-hover:scale-[1.035]
//                       "
//                     />
//                   </div>

//                   <div className="flex flex-col px-6 pt-5 pb-4">
//                     <h3 className="font-display text-xl font-semibold">
//                       {s.name}
//                     </h3>

//                     <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
//                       {s.shortDescription}
//                     </p>

//                     {/* Stop the card's onClick so this button keeps its own behaviour */}
//                     <div
//                       className="pt-4"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <BleedButton onClick={() => setSelectedVehicle(s)}>
//                         View Details
//                       </BleedButton>
//                     </div>
//                   </div>
//                 </article>
//               </Reveal>
//             ))}
//           </div>
//         </div>

//         <div
//           className="
//             mt-8
//             flex
//             justify-end
//             gap-3
//             pr-6
//             md:pr-10
//             lg:pr-[max(100px,calc((100vw-1440px)/2))]
//           "
//         >
//           <BleedButton
//             onClick={() => moveCarousel("left")}
//             className="bleed-icon-button"
//           >
//             <ChevronLeft className="size-7" />
//           </BleedButton>

//           <BleedButton
//             onClick={() => moveCarousel("right")}
//             className="bleed-icon-button"
//           >
//             <ChevronRight className="size-7" />
//           </BleedButton>
//         </div>
//       </div>

//       {/* DETAIL POPUP */}
//       {selectedVehicle && (
//         <VehicleModal
//           vehicle={selectedVehicle}
//           onClose={() => setSelectedVehicle(null)}
//         />
//       )}
//     </section>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  DETAIL MODAL  —  SPLIT TWO-PANEL LAYOUT                                   */
// /*  Left  : large visual + faded name overlay + thumbnails                    */
// /*  Right : flexed details column (scrollable)                                */
// /* -------------------------------------------------------------------------- */
// function VehicleModal({
//   vehicle,
//   onClose,
// }: {
//   vehicle: any;
//   onClose: () => void;
// }) {
//   const hasVariants =
//     Array.isArray(vehicle.variants) && vehicle.variants.length > 0;

//   const [variantId, setVariantId] = useState<string | null>(
//     hasVariants ? vehicle.variants[0].id : null
//   );
//   const [activeImage, setActiveImage] = useState(0);
//   const [show, setShow] = useState(false);

//   // Mount animation + body scroll lock + Esc to close
//   useEffect(() => {
//     setShow(true);
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") handleClose();
//     };
//     document.addEventListener("keydown", onKey);
//     const prevOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.removeEventListener("keydown", onKey);
//       document.body.style.overflow = prevOverflow;
//     };
//     // eslint-disable-next-line
//   }, []);

//   const handleClose = () => {
//     setShow(false);
//     setTimeout(onClose, 250); // wait for the fade-out
//   };

//   // Active spec set comes from the selected variant if one exists,
//   // otherwise from the vehicle itself.
//   const activeVariant = hasVariants
//     ? vehicle.variants.find((v: any) => v.id === variantId) ??
//       vehicle.variants[0]
//     : null;

//   const specs: any[] = (activeVariant?.quickSpecs ?? vehicle.quickSpecs) || [];
//   const included: string[] =
//     (activeVariant?.included ?? vehicle.included) || [];
//   const pricePerDay = activeVariant?.pricePerDay ?? vehicle.pricePerDay;

//   const images: string[] = vehicle.images || [];

//   return (
//     <div
//       onClick={handleClose}
//       className={`
//         fixed inset-0 z-[100] flex items-center justify-center p-4
//         bg-black/50 backdrop-blur-sm
//         transition-opacity duration-250 ease-[cubic-bezier(.16,1,.3,1)]
//         ${show ? "opacity-100" : "opacity-0"}
//       `}
//     >
//       {/* <div
//         onClick={(e) => e.stopPropagation()}
//         className={`
//           relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden
//           rounded-3xl bg-white
//           shadow-[0_40px_120px_rgba(0,0,0,0.35)]
//           transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]
//           md:flex-row
//           ${show ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-[0.97] opacity-0"}
//         `}
//       > */}

//       <div
//   onClick={(e) => e.stopPropagation()}
//   className={`
//     relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden
//     rounded-3xl bg-white
//     shadow-[0_40px_120px_rgba(0,0,0,0.35)]
//     transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]
//     md:flex-row
//     md:min-w-[83%] md:w-[83%]    // Added these classes
//     lg:min-w-[75%] lg:w-[75%]    // Optional: for larger screens
//     xl:min-w-[70%] xl:w-[70%]    // Optional: for even larger screens
//     ${show ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-[0.97] opacity-0"}
//   `}
// >
//         {/* ---------------------------------------------------------------- */}
//         {/*  LEFT  —  visual panel                                           */}
//         {/* ---------------------------------------------------------------- */}
//         <div
//           className="
//             relative flex shrink-0 flex-col items-center justify-center gap-6
//             bg-gradient-to-br from-[#eef1f4] to-white p-8
//             min-h-[260px] md:min-h-0 md:w-[46%]
//           "
//         >
//           <div className="relative flex w-full flex-1 items-center justify-center">
//             {/* Faded name behind the image, matching your reference */}
//             <span
//               className="
//                 pointer-events-none absolute inset-x-0 bottom-2 text-center
//                 font-display text-2xl font-semibold uppercase tracking-wide
//                 text-black/10 sm:text-3xl
//               "
//             >
//               {vehicle.name}
//             </span>

//             <img
//               src={images[activeImage]}
//               alt={vehicle.name}
//               className="
//                 relative z-10 max-h-[220px] w-auto max-w-full object-contain
//                 drop-shadow-[0_24px_40px_rgba(0,0,0,0.18)]
//                 md:max-h-[320px]
//               "
//             />
//           </div>

//           {/* Thumbnails */}
//           {images.length > 1 && (
//             <div className="flex flex-wrap justify-center gap-3">
//               {images.map((img, i) => (
//                 <button
//                   key={i}
//                   type="button"
//                   onClick={() => setActiveImage(i)}
//                   className={`
//                     size-14 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition-colors
//                     ${activeImage === i ? "border-black" : "border-transparent opacity-70 hover:opacity-100"}
//                   `}
//                 >
//                   <img src={img} alt="" className="h-full w-full object-cover" />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* ---------------------------------------------------------------- */}
//         {/*  RIGHT  —  details column (scrollable)                           */}
//         {/* ---------------------------------------------------------------- */}
//         <div className="relative flex-1 overflow-y-auto px-6 py-7 sm:px-8">
//           {/* Close */}
//           <button
//             type="button"
//             aria-label="Close"
//             onClick={handleClose}
//             className="
//               absolute right-5 top-5 z-20 flex size-10 items-center justify-center
//               rounded-full bg-white text-black shadow-[0_8px_24px_rgba(0,0,0,0.12)]
//               transition-transform hover:scale-110
//             "
//           >
//             <X className="size-5" />
//           </button>

//           {/* Title block */}
//           <div className="pr-12">
//             <span className="eyebrow text-[#e3000f]">{vehicle.category}</span>
//             <h3 className="mt-1 font-display text-2xl font-semibold leading-tight sm:text-3xl">
//               {vehicle.name}
//             </h3>
//             <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
//               {vehicle.shortDescription}
//             </p>
//           </div>

//           {/* Price + package */}
//           <div className="mt-5 flex flex-wrap items-center gap-3">
//             {pricePerDay ? (
//               <div className="flex items-baseline gap-1 rounded-2xl bg-black px-5 py-3 text-white">
//                 <span className="font-display text-xl font-semibold">
//                   ₹{Number(pricePerDay).toLocaleString("en-IN")}
//                 </span>
//                 <span className="text-xs opacity-70">/ day</span>
//               </div>
//             ) : null}

//             {vehicle.packageTotal && (
//               <div className="rounded-full bg-[#e3000f]/10 px-4 py-2 text-sm font-semibold text-[#e3000f]">
//                 {vehicle.packageTotal}
//               </div>
//             )}
//           </div>

//           {/* Highlight */}
//           {vehicle.highlight && (
//             <div className="mt-4 rounded-2xl bg-surface-muted px-4 py-3 text-sm font-medium">
//               {vehicle.highlight}
//             </div>
//           )}

//           {/* Variant switcher */}
//           {hasVariants && (
//             <div className="mt-6">
//               <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
//                 Choose KM plan
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {vehicle.variants.map((v: any) => (
//                   <button
//                     key={v.id}
//                     type="button"
//                     onClick={() => setVariantId(v.id)}
//                     className={`
//                       rounded-full px-4 py-2 text-sm font-semibold transition-colors
//                       ${
//                         variantId === v.id
//                           ? "bg-black text-white"
//                           : "bg-surface-muted text-black/60 hover:text-black"
//                       }
//                     `}
//                   >
//                     {v.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Quick specs */}
//           {specs.length > 0 && (
//             <div className="mt-6 grid grid-cols-2 gap-3">
//               {specs.map((sp: any, i: number) => (
//                 <div key={i} className="rounded-2xl bg-surface-muted px-4 py-3">
//                   <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
//                     {sp.label}
//                   </div>
//                   <div className="mt-1 text-sm font-semibold">{sp.value}</div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Included */}
//           {included.length > 0 && (
//             <div className="mt-7">
//               <h4 className="font-display text-base font-semibold">
//                 What&apos;s included
//               </h4>
//               <ul className="mt-3 space-y-2">
//                 {included.map((item, i) => (
//                   <li
//                     key={i}
//                     className="flex gap-2 text-sm text-muted-foreground"
//                   >
//                     <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-[#e3000f]" />
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Add-ons */}
//           {Array.isArray(vehicle.addOns) && vehicle.addOns.length > 0 && (
//             <div className="mt-7">
//               <h4 className="font-display text-base font-semibold">
//                 Add-ons &amp; notes
//               </h4>
//               <ul className="mt-3 space-y-2">
//                 {vehicle.addOns.map((item: string, i: number) => (
//                   <li
//                     key={i}
//                     className="flex gap-2 text-sm text-muted-foreground"
//                   >
//                     <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-black/40" />
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Branding status */}
//           {vehicle.brandingStatus && (
//             <div className="mt-6 rounded-2xl border border-black/10 px-4 py-3 text-sm font-medium">
//               {vehicle.brandingStatus}
//             </div>
//           )}

//           {/* Location-wise charges */}
//           {Array.isArray(vehicle.locationCharges) &&
//             vehicle.locationCharges.length > 0 && (
//               <div className="mt-7">
//                 <h4 className="font-display text-base font-semibold">
//                   Location-wise charges
//                 </h4>
//                 <div className="mt-3 space-y-4">
//                   {vehicle.locationCharges.map((row: any, idx: number) => {
//                     const { label, ...rest } = row;
//                     return (
//                       <div
//                         key={idx}
//                         className="rounded-2xl bg-surface-muted p-4"
//                       >
//                         <div className="mb-3 text-sm font-semibold">
//                           {label}
//                         </div>
//                         <div className="grid grid-cols-2 gap-x-4 gap-y-2">
//                           {Object.entries(rest).map(([k, val]) => (
//                             <div
//                               key={k}
//                               className="flex items-center justify-between gap-2 text-sm"
//                             >
//                               <span className="text-muted-foreground">
//                                 {prettyKey(k)}
//                               </span>
//                               <span className="font-semibold">
//                                 {String(val)}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//           {/* CTA — preserves the original Enquire flow */}
//           <div className="mt-8">
//             <BleedButton href="#contact" onClick={handleClose}>
//               Enquire Now
//             </BleedButton>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Box,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Gauge,
  MapPin,
  Maximize2,
  MonitorPlay,
  Route,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import "./Services.css";

type VehicleCategory = "led" | "flex" | "hybrid";

type VehicleItem = {
  id: string;
  category: VehicleCategory;
  badge: string;
  title: string;
  desc: string;
  image: string;
  gallery: string[];
  size: string;
  bestFor: string;
  display: string;
  power: string;
  tracking: string;
  features: string[];
};

const vehicles: VehicleItem[] = [
  {
    id: "ultra-19-single",
    category: "led",
    badge: "LED Vehicle",
    title: "Tata Ultra 19 Ft Single Side LED",
    desc: "Premium single-side LED format for strong visual storytelling with a large moving display.",
    // image: "/assets/services/ultra-19-single.png",
        image: "/assets/HybridLed_Flex2.png",

    gallery: [
      "/assets/HybridLed_Flex1.png",
      "/assets/HybridLed_Flex1.png",
      "/assets/HybridLed_Flex1.png",

      // "/assets/services/ultra-19-3side.png",
      // "/assets/services/ultra-17-3side.png",
    ],
    size: "19 Ft Single Side",
    bestFor: "Product Launches, Promotions, Awareness",
    display: "High Resolution LED Screen",
    power: "Integrated Silent Generator",
    tracking: "Live GPS Tracking & Reporting",
    features: [
      "High-impact moving display",
      "Ideal for city and market routes",
      "Day and night visibility",
      "Campaign proof support",
    ],
  },
  {
    id: "ultra-19-3side",
    category: "led",
    badge: "3 Side LED",
    title: "Tata Ultra 19 Ft - 3 Sides LED",
    desc: "Top visibility LED vehicle for premium roadshows, launches and high-footfall campaigns.",
    // image: "/assets/services/ultra-19-3side.png",
        image: "/assets/HybridLed_Flex2.png",

    gallery: [
      "/assets/HybridLed_Flex2.png",
      "/assets/HybridLed_Flex2.png",
      "/assets/HybridLed_Flex2.png",


      // "/assets/services/ultra-19-3side.png",
      // "/assets/services/ultra-19-single.png",
      // "/assets/services/ultra-17-3side.png",
    ],
    size: "19 Ft 3 Sides",
    bestFor: "Premium Launches, Mall Routes, City Activations",
    display: "3 Side LED Display",
    power: "Generator + Backup Support",
    tracking: "Live Route Monitoring",
    features: [
      "Maximum visibility from multiple angles",
      "Premium brand presence",
      "Suitable for high-traffic roads",
      "Strong recall for video creatives",
    ],
  },
  {
    id: "ultra-17-3side",
    category: "led",
    badge: "Compact LED",
    title: "Tata Ultra 17 Ft - 3 Sides LED",
    desc: "Large LED option with strong visibility and slightly smaller format than the 19 ft canter.",
    // image: "/assets/services/ultra-17-3side.png",
    image:   "/assets/HybridLed_Flex2.png",

    gallery: [
      "/assets/HybridLed_Flex2.png",
      "/assets/HybridLed_Flex2.png",
      "/assets/HybridLed_Flex2.png",

      // "/assets/services/ultra-17-3side.png",
      // "/assets/services/ultra-19-3side.png",
      // "/assets/services/ace-9-2side.png",
    ],
    size: "17 Ft 3 Sides",
    bestFor: "Retail Roads, Brand Promotion, Local Launch",
    display: "Multi-side LED Display",
    power: "Silent Generator",
    tracking: "GPS Tracking",
    features: [
      "Good balance of size and mobility",
      "Works well for local market routes",
      "Strong visibility in traffic zones",
      "Suitable for video-led campaigns",
    ],
  },
  {
    id: "ace-9-2side",
    category: "led",
    badge: "City LED",
    title: "Tata Ace 9 Ft 2 Sides LED",
    desc: "Flexible LED vehicle for video-led local market and city routes.",
    // image: "/assets/services/ace-9-2side.png",
    image:"/assets/HybridLed_Flex2.png",

    gallery: [
            "/assets/HybridLed_Flex2.png",
            "/assets/HybridLed_Flex2.png",
            "/assets/HybridLed_Flex2.png",


      // "/assets/services/ace-9-2side.png",
      // "/assets/services/ultra-17-3side.png",
      // "/assets/services/ultra-19-single.png",
    ],
    size: "9 Ft 2 Sides",
    bestFor: "Local Market, Retail Promo, Hyperlocal Campaign",
    display: "2 Side LED Screen",
    power: "Vehicle Power + Backup",
    tracking: "GPS Monitoring",
    features: [
      "Easy movement in narrow routes",
      "Suitable for city-level promotions",
      "Cost-effective LED visibility",
      "Good for short campaign bursts",
    ],
  },
  {
    id: "flex-tata-ace",
    category: "flex",
    badge: "Flex Branding",
    title: "Tata Ace Flex Branding",
    desc: "Cost-effective mobile branding format for local visibility and retail announcements.",
    image: "/assets/HybridLed_Flex2.png",
    gallery: [
            "/assets/HybridLed_Flex2.png",
            "/assets/HybridLed_Flex2.png",
            "/assets/HybridLed_Flex2.png",

      // "/assets/services/flex-tata-ace.png",
      // "/assets/services/auto-branding.png",
      // "/assets/services/ace-9-2side.png",
    ],
    size: "8 Ft / 10 Ft Flex",
    bestFor: "Retail Offers, Store Launch, Local Promotion",
    display: "Flex / Vinyl Branding",
    power: "No Power Required",
    tracking: "Route Proof Support",
    features: [
      "Budget-friendly roadshow format",
      "Clear brand visibility",
      "Flexible route execution",
      "Ideal for local market coverage",
    ],
  },
  {
    id: "auto-branding",
    category: "flex",
    badge: "Local Promo",
    title: "Auto Branding Roadshow",
    desc: "Compact and effective format for hyperlocal promotions and area-based campaigns.",
    // image: "/assets/services/auto-branding.png",
        image: "/assets/HybridLed_Flex2.png",
    gallery: [
       "/assets/HybridLed_Flex2.png",
            "/assets/HybridLed_Flex2.png",
            "/assets/HybridLed_Flex2.png",
      // "/assets/services/auto-branding.png",
      // "/assets/services/flex-tata-ace.png",
      // "/assets/services/ace-9-2side.png",
    ],
    size: "Compact Vehicle",
    bestFor: "Area Promotions, Announcements, Local Reach",
    display: "Static Branding",
    power: "No Power Required",
    tracking: "Proof Based Tracking",
    features: [
      "High route flexibility",
      "Good for narrow streets",
      "Fast deployment",
      "Useful for store-level campaigns",
    ],
  },
  {
    id: "hybrid-led-flex",
    category: "hybrid",
    badge: "Hybrid",
    title: "LED + Flex Hybrid Campaign",
    desc: "Combine LED attention with static branding for stronger recall and repeated visibility.",
    // image: "/assets/services/hybrid-led-flex.png",
    image:       "/assets/HybridLed_Flex2.png",

    gallery: [
            "/assets/HybridLed_Flex2.png",
            "/assets/HybridLed_Flex2.png",
            "/assets/HybridLed_Flex2.png",


      // "/assets/services/hybrid-led-flex.png",
      // "/assets/services/ultra-19-single.png",
      // "/assets/services/flex-tata-ace.png",
    ],
    size: "Custom Setup",
    bestFor: "Launches, Events, Dealer Meets",
    display: "LED + Flex Branding",
    power: "Based on Setup",
    tracking: "Live + Proof Reporting",
    features: [
      "Best of video and static visibility",
      "More brand recall",
      "Flexible campaign planning",
      "Suitable for premium activations",
    ],
  },
];

const tabs: {
  id: VehicleCategory;
  label: string;
  icon: typeof Truck;
}[] = [
  { id: "led", label: "LED Vehicles", icon: MonitorPlay },
  { id: "flex", label: "Flex Branding", icon: Box },
  { id: "hybrid", label: "Hybrid Campaigns", icon: Route },
];

const featurePoints = [
  {
    icon: Zap,
    title: "High Visibility LED",
    text: "Crystal-clear display for day and night visibility.",
  },
  {
    icon: ShieldCheck,
    title: "Pan India Operations",
    text: "Execute across multiple cities with ease.",
  },
  {
    icon: BarChart3,
    title: "Real-time Tracking",
    text: "Live GPS, route and performance monitoring.",
  },
];

function VehicleImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`service-img-wrap ${className}`}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          draggable={false}
        />
      ) : (
        <div className="service-img-fallback">
          <Truck size={46} />
          <span>{alt}</span>
        </div>
      )}
    </div>
  );
}

export function Services() {
  const [activeTab, setActiveTab] = useState<VehicleCategory>("led");
  const [selected, setSelected] = useState<VehicleItem | null>(null);
  const [thumb, setThumb] = useState(0);

  const filteredVehicles = useMemo(
    () => vehicles.filter((item) => item.category === activeTab),
    [activeTab]
  );

  useEffect(() => {
    if (!selected) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  const openVehicle = (item: VehicleItem) => {
    setSelected(item);
    setThumb(0);
  };

  const handleCardMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <>
      <section className="services-section" id="services">
        <div className="services-bg-grid" />

        <div className="services-container">
          <div className="services-top">
            <motion.div
              className="services-copy"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="services-eyebrow">
                <span />
                Roadshow Solutions
              </div>

              <h2>
                Built for <br />
                Brand <strong>Impact</strong>
              </h2>

              <p>
                High-visibility roadshow vehicles that move brands further and
                connect them with more people.
              </p>
            </motion.div>

            <motion.div
              className="services-tabs"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    className={`services-tab ${isActive ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="serviceActiveTab"
                        className="services-tab-active-bg"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    )}

                    <span className="services-tab-icon">
                      <Icon size={17} />
                    </span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </motion.div>
          </div>

          <div className="services-main-grid">
            <motion.aside
              className="services-feature-panel"
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {featurePoints.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    className="services-feature-item"
                    key={item.title}
                    whileHover={{ x: 8, scale: 1.02 }}
                    transition={{ duration: 0.24 }}
                  >
                    <span className="services-feature-icon">
                      <Icon size={21} />
                    </span>

                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>

                    <span className="services-feature-number">
                      0{index + 1}
                    </span>
                  </motion.div>
                );
              })}

              <div className="services-mini-proof">
                <BadgeCheck size={20} />
                <div>
                  <strong>Execution support included</strong>
                  <span>Route planning, crew coordination and proof reports.</span>
                </div>
              </div>
            </motion.aside>

            <div className="services-card-area">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  className="services-card-grid"
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {filteredVehicles.map((vehicle, index) => (
                    <motion.div
                      key={vehicle.id}
                      className="service-card"
                      onMouseMove={handleCardMouseMove}
                      initial={{ opacity: 0, y: 34 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{
                        y: -12,
                        transition: { duration: 0.24 },
                      }}
                    >
                      <div className="service-card-shine" />

                      <div className="service-card-media">
                        <VehicleImage
                          src={vehicle.image}
                          alt={vehicle.title}
                        />

                        <div className="service-card-badge">
                          <Sparkles size={14} />
                          {vehicle.badge}
                        </div>

                        <button
                          className="service-quick-view"
                          onClick={() => openVehicle(vehicle)}
                          aria-label={`Quick view ${vehicle.title}`}
                        >
                          <Eye size={17} />
                        </button>
                      </div>

                      <div className="service-card-body">
                        <h3>{vehicle.title}</h3>
                        <span className="service-title-line" />
                        <p>{vehicle.desc}</p>

                        <button
                          className="service-view-btn"
                          onClick={() => openVehicle(vehicle)}
                        >
                          <span>View Details</span>
                          <span className="service-view-icon">
                            <ArrowRight size={18} />
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="services-dots">
                {filteredVehicles.map((_, index) => (
                  <span key={index} className={index === 0 ? "active" : ""} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <VehicleModal
            item={selected}
            thumb={thumb}
            setThumb={setThumb}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function VehicleModal({
  item,
  thumb,
  setThumb,
  onClose,
}: {
  item: VehicleItem;
  thumb: number;
  setThumb: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
}) {
  const currentImage = item.gallery[thumb] || item.image;

  const nextThumb = () => {
    setThumb((prev) => (prev + 1) % item.gallery.length);
  };

  const prevThumb = () => {
    setThumb((prev) => (prev - 1 + item.gallery.length) % item.gallery.length);
  };

  return (
    <motion.div
      className="service-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
    >
      <motion.div
        className="service-modal"
        initial={{ opacity: 0, scale: 0.88, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="service-modal-close" onClick={onClose}>
          <X size={22} />
        </button>

        <div className="service-modal-left">
          <div className="service-modal-image-card">
            <button className="service-gallery-btn left" onClick={prevThumb}>
              <ChevronLeft size={20} />
            </button>

            <VehicleImage
              src={currentImage}
              alt={item.title}
              className="modal-image"
            />

            <button className="service-gallery-btn right" onClick={nextThumb}>
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="service-modal-thumbs">
            {item.gallery.map((image, index) => (
              <button
                key={image}
                className={thumb === index ? "active" : ""}
                onClick={() => setThumb(index)}
              >
                <VehicleImage src={image} alt={`${item.title} ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="service-modal-right">
          <div className="service-modal-badge">{item.badge}</div>

          <h2>{item.title}</h2>

          <p className="service-modal-desc">{item.desc}</p>

          <div className="service-spec-list">
            <Spec icon={Maximize2} label="LED Size" value={item.size} />
            <Spec icon={CheckCircle2} label="Best For" value={item.bestFor} />
            <Spec icon={MonitorPlay} label="Display Type" value={item.display} />
            <Spec icon={Gauge} label="Power Supply" value={item.power} />
            <Spec icon={MapPin} label="Tracking" value={item.tracking} />
          </div>

          <div className="service-modal-features">
            {item.features.map((feature) => (
              <span key={feature}>
                <CheckCircle2 size={15} />
                {feature}
              </span>
            ))}
          </div>

          <div className="service-modal-actions">
            <a href="#contact" onClick={onClose} className="service-request-btn">
              Request This Vehicle
              <ArrowRight size={18} />
            </a>

            <button className="service-download-btn">
              Download Brochure
              <Download size={17} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Truck;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      className="service-spec"
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      <span>
        <Icon size={17} />
      </span>

      <div>
        <strong>{label}</strong>
        <p>{value}</p>
      </div>
    </motion.div>
  );
}