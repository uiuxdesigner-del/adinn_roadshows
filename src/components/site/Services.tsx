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
//                       <BleedButton
//                         onClick={() => setSelectedVehicle(s)}
//                       >
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
// /*  DETAIL MODAL                                                              */
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

//   // The active spec set comes from the selected variant if one exists,
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
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className={`
//           relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden
//           rounded-3xl bg-white
//           shadow-[0_40px_120px_rgba(0,0,0,0.35)]
//           transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]
//           ${show ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-[0.97] opacity-0"}
//         `}
//       >
//         {/* Close */}
//         <button
//           type="button"
//           aria-label="Close"
//           onClick={handleClose}
//           className="
//             absolute right-4 top-4 z-20 flex size-10 items-center justify-center
//             rounded-full bg-white/90 text-black shadow-md
//             transition-transform hover:scale-110
//           "
//         >
//           <X className="size-5" />
//         </button>

//         {/* Scroll body */}
//         <div className="overflow-y-auto">
//           {/* Image */}
//           <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-muted">
//             <img
//               src={images[activeImage]}
//               alt={vehicle.name}
//               className="h-full w-full object-cover"
//             />
//           </div>

//           {/* Thumbnails */}
//           {images.length > 1 && (
//             <div className="flex gap-3 px-6 pt-4">
//               {images.map((img, i) => (
//                 <button
//                   key={i}
//                   type="button"
//                   onClick={() => setActiveImage(i)}
//                   className={`
//                     size-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors
//                     ${activeImage === i ? "border-black" : "border-transparent opacity-70 hover:opacity-100"}
//                   `}
//                 >
//                   <img
//                     src={img}
//                     alt=""
//                     className="h-full w-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           )}

//           <div className="px-6 py-6 sm:px-8">
//             {/* Title + price */}
//             <div className="flex flex-wrap items-start justify-between gap-4">
//               <div>
//                 <span className="eyebrow text-[#e3000f]">
//                   {vehicle.category}
//                 </span>
//                 <h3 className="mt-1 font-display text-2xl font-semibold">
//                   {vehicle.name}
//                 </h3>
//                 <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
//                   {vehicle.shortDescription}
//                 </p>
//               </div>

//               {pricePerDay ? (
//                 <div className="rounded-2xl bg-black px-5 py-3 text-right text-white">
//                   <div className="text-[11px] uppercase tracking-wide opacity-70">
//                     From
//                   </div>
//                   <div className="font-display text-xl font-semibold">
//                     ₹{Number(pricePerDay).toLocaleString("en-IN")}
//                   </div>
//                   <div className="text-[11px] opacity-70">per day</div>
//                 </div>
//               ) : null}
//             </div>

//             {/* Highlight */}
//             {vehicle.highlight && (
//               <div className="mt-5 rounded-2xl bg-surface-muted px-4 py-3 text-sm font-medium">
//                 {vehicle.highlight}
//               </div>
//             )}

//             {/* Package */}
//             {vehicle.packageTotal && (
//               <div className="mt-3 inline-flex rounded-full bg-[#e3000f]/10 px-4 py-2 text-sm font-semibold text-[#e3000f]">
//                 Package: {vehicle.packageTotal}
//               </div>
//             )}

//             {/* Variant switcher */}
//             {hasVariants && (
//               <div className="mt-6">
//                 <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
//                   Choose KM plan
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {vehicle.variants.map((v: any) => (
//                     <button
//                       key={v.id}
//                       type="button"
//                       onClick={() => setVariantId(v.id)}
//                       className={`
//                         rounded-full px-4 py-2 text-sm font-semibold transition-colors
//                         ${
//                           variantId === v.id
//                             ? "bg-black text-white"
//                             : "bg-surface-muted text-black/60 hover:text-black"
//                         }
//                       `}
//                     >
//                       {v.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Quick specs */}
//             {specs.length > 0 && (
//               <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
//                 {specs.map((sp: any, i: number) => (
//                   <div
//                     key={i}
//                     className="rounded-2xl bg-surface-muted px-4 py-3"
//                   >
//                     <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
//                       {sp.label}
//                     </div>
//                     <div className="mt-1 text-sm font-semibold">
//                       {sp.value}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <div className="mt-7 grid gap-7 sm:grid-cols-2">
//               {/* Included */}
//               {included.length > 0 && (
//                 <div>
//                   <h4 className="font-display text-base font-semibold">
//                     What&apos;s included
//                   </h4>
//                   <ul className="mt-3 space-y-2">
//                     {included.map((item, i) => (
//                       <li
//                         key={i}
//                         className="flex gap-2 text-sm text-muted-foreground"
//                       >
//                         <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-[#e3000f]" />
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {/* Add-ons */}
//               {Array.isArray(vehicle.addOns) && vehicle.addOns.length > 0 && (
//                 <div>
//                   <h4 className="font-display text-base font-semibold">
//                     Add-ons &amp; notes
//                   </h4>
//                   <ul className="mt-3 space-y-2">
//                     {vehicle.addOns.map((item: string, i: number) => (
//                       <li
//                         key={i}
//                         className="flex gap-2 text-sm text-muted-foreground"
//                       >
//                         <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-black/40" />
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>

//             {/* Branding status */}
//             {vehicle.brandingStatus && (
//               <div className="mt-6 rounded-2xl border border-black/10 px-4 py-3 text-sm font-medium">
//                 {vehicle.brandingStatus}
//               </div>
//             )}

//             {/* Location-wise charges */}
//             {Array.isArray(vehicle.locationCharges) &&
//               vehicle.locationCharges.length > 0 && (
//                 <div className="mt-7">
//                   <h4 className="font-display text-base font-semibold">
//                     Location-wise charges
//                   </h4>
//                   <div className="mt-3 space-y-4">
//                     {vehicle.locationCharges.map((row: any, idx: number) => {
//                       const { label, ...rest } = row;
//                       return (
//                         <div
//                           key={idx}
//                           className="rounded-2xl bg-surface-muted p-4"
//                         >
//                           <div className="mb-3 text-sm font-semibold">
//                             {label}
//                           </div>
//                           <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
//                             {Object.entries(rest).map(([k, val]) => (
//                               <div
//                                 key={k}
//                                 className="flex items-center justify-between gap-2 text-sm"
//                               >
//                                 <span className="text-muted-foreground">
//                                   {prettyKey(k)}
//                                 </span>
//                                 <span className="font-semibold">
//                                   {String(val)}
//                                 </span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//             {/* CTA — preserves the original Enquire flow */}
//             <div className="mt-8">
//               <BleedButton href="#contact" onClick={handleClose}>
//                 Enquire Now
//               </BleedButton>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



/*eslint-disable*/
//@ts-nocheck
"use client";

import { Reveal } from "./Reveal";
import { BleedButton } from "./BleedButton";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";

/* -------------------------------------------------------------------------- */
/*  DATA SOURCE                                                               */
/*  Save your JSON as a file and import it. Adjust the path to wherever you   */
/*  keep it (e.g. src/data/vehicles.json or app/data/vehicles.json).         */
/* -------------------------------------------------------------------------- */
import vehiclesData from "../../data/vehicles.json";


type CategoryType = "led" | "flex" | "hybrid";

/* Map each vehicle id -> on-site tab.
   The JSON "category" field does NOT match your tabs 1:1, so we map by id.   */
const UI_CATEGORY_BY_ID: Record<number, CategoryType> = {
  1: "flex", // Tata Ace 8 Feet Vehicle
  2: "flex", // Tata Ace 10 Feet Vehicle
  4: "hybrid", // Tata Ace 8 Feet LED Vehicle (LED + Flex)
  5: "led", // Tata Ultra 19 Ft Single Side LED
  6: "led", // Tata Ultra 19 Ft - 3 Sides LED
  7: "led", // Tata Ultra 17 Ft - 3 Sides LED
  8: "led", // Tata Ace 9 Ft 2 Sides LED
};

/* Clean, display-ready vehicle list:
   - drops the promoterCharges object (no id)
   - drops hidden vehicles (id 3 -> hide: true)
   - attaches the uiCategory used by the tabs                                 */
const VEHICLES = (vehiclesData as any[])
  .filter((v) => v && typeof v.id === "number" && !v.hide)
  .map((v) => ({ ...v, uiCategory: UI_CATEGORY_BY_ID[v.id] }))
  .filter((v) => Boolean(v.uiCategory));

/* Friendly labels for the location-charge keys in the JSON                   */
const LOCATION_LABELS: Record<string, string> = {
  general: "General",
  kerala: "Kerala",
  Kerala: "Kerala",
  chennai: "Chennai",
  rotn: "Rest of TN",
  Tamilnadu: "Tamil Nadu",
  andhara: "Andhra",
  telungana: "Telangana",
  karnataka: "Karnataka",
  otherStates: "Other States",
};

const prettyKey = (k: string) => LOCATION_LABELS[k] || k;

export function Services() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMovingRef = useRef(false);
  const [activeCategory, setActiveCategory] = useState<CategoryType>("led");

  // The vehicle currently shown in the detail modal (null = closed)
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);

  const activeProducts = VEHICLES.filter(
    (v) => v.uiCategory === activeCategory
  );

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
      return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
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
              <Reveal key={`${activeCategory}-${s.id}`} delay={i}>
                <article
                  onClick={() => setSelectedVehicle(s)}
                  className="
                    card-premium
                    group
                    flex
                    min-h-[450px]
                    w-[300px]
                    shrink-0
                    cursor-pointer
                    flex-col
                    overflow-hidden
                    md:w-[360px]
                    lg:w-[390px]
                  "
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    <img
                      src={s.images?.[0]}
                      alt={s.name}
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
                      {s.name}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {s.shortDescription}
                    </p>

                    {/* Stop the card's onClick so this button keeps its own behaviour */}
                    <div
                      className="pt-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <BleedButton onClick={() => setSelectedVehicle(s)}>
                        View Details
                      </BleedButton>
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

      {/* DETAIL POPUP */}
      {selectedVehicle && (
        <VehicleModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  DETAIL MODAL  —  SPLIT TWO-PANEL LAYOUT                                   */
/*  Left  : large visual + faded name overlay + thumbnails                    */
/*  Right : flexed details column (scrollable)                                */
/* -------------------------------------------------------------------------- */
function VehicleModal({
  vehicle,
  onClose,
}: {
  vehicle: any;
  onClose: () => void;
}) {
  const hasVariants =
    Array.isArray(vehicle.variants) && vehicle.variants.length > 0;

  const [variantId, setVariantId] = useState<string | null>(
    hasVariants ? vehicle.variants[0].id : null
  );
  const [activeImage, setActiveImage] = useState(0);
  const [show, setShow] = useState(false);

  // Mount animation + body scroll lock + Esc to close
  useEffect(() => {
    setShow(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 250); // wait for the fade-out
  };

  // Active spec set comes from the selected variant if one exists,
  // otherwise from the vehicle itself.
  const activeVariant = hasVariants
    ? vehicle.variants.find((v: any) => v.id === variantId) ??
      vehicle.variants[0]
    : null;

  const specs: any[] = (activeVariant?.quickSpecs ?? vehicle.quickSpecs) || [];
  const included: string[] =
    (activeVariant?.included ?? vehicle.included) || [];
  const pricePerDay = activeVariant?.pricePerDay ?? vehicle.pricePerDay;

  const images: string[] = vehicle.images || [];

  return (
    <div
      onClick={handleClose}
      className={`
        fixed inset-0 z-[100] flex items-center justify-center p-4
        bg-black/50 backdrop-blur-sm
        transition-opacity duration-250 ease-[cubic-bezier(.16,1,.3,1)]
        ${show ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden
          rounded-3xl bg-white
          shadow-[0_40px_120px_rgba(0,0,0,0.35)]
          transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]
          md:flex-row
          ${show ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-[0.97] opacity-0"}
        `}
      > */}

      <div
  onClick={(e) => e.stopPropagation()}
  className={`
    relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden
    rounded-3xl bg-white
    shadow-[0_40px_120px_rgba(0,0,0,0.35)]
    transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]
    md:flex-row
    md:min-w-[83%] md:w-[83%]    // Added these classes
    lg:min-w-[75%] lg:w-[75%]    // Optional: for larger screens
    xl:min-w-[70%] xl:w-[70%]    // Optional: for even larger screens
    ${show ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-[0.97] opacity-0"}
  `}
>
        {/* ---------------------------------------------------------------- */}
        {/*  LEFT  —  visual panel                                           */}
        {/* ---------------------------------------------------------------- */}
        <div
          className="
            relative flex shrink-0 flex-col items-center justify-center gap-6
            bg-gradient-to-br from-[#eef1f4] to-white p-8
            min-h-[260px] md:min-h-0 md:w-[46%]
          "
        >
          <div className="relative flex w-full flex-1 items-center justify-center">
            {/* Faded name behind the image, matching your reference */}
            <span
              className="
                pointer-events-none absolute inset-x-0 bottom-2 text-center
                font-display text-2xl font-semibold uppercase tracking-wide
                text-black/10 sm:text-3xl
              "
            >
              {vehicle.name}
            </span>

            <img
              src={images[activeImage]}
              alt={vehicle.name}
              className="
                relative z-10 max-h-[220px] w-auto max-w-full object-contain
                drop-shadow-[0_24px_40px_rgba(0,0,0,0.18)]
                md:max-h-[320px]
              "
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`
                    size-14 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition-colors
                    ${activeImage === i ? "border-black" : "border-transparent opacity-70 hover:opacity-100"}
                  `}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  RIGHT  —  details column (scrollable)                           */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative flex-1 overflow-y-auto px-6 py-7 sm:px-8">
          {/* Close */}
          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="
              absolute right-5 top-5 z-20 flex size-10 items-center justify-center
              rounded-full bg-white text-black shadow-[0_8px_24px_rgba(0,0,0,0.12)]
              transition-transform hover:scale-110
            "
          >
            <X className="size-5" />
          </button>

          {/* Title block */}
          <div className="pr-12">
            <span className="eyebrow text-[#e3000f]">{vehicle.category}</span>
            <h3 className="mt-1 font-display text-2xl font-semibold leading-tight sm:text-3xl">
              {vehicle.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {vehicle.shortDescription}
            </p>
          </div>

          {/* Price + package */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {pricePerDay ? (
              <div className="flex items-baseline gap-1 rounded-2xl bg-black px-5 py-3 text-white">
                <span className="font-display text-xl font-semibold">
                  ₹{Number(pricePerDay).toLocaleString("en-IN")}
                </span>
                <span className="text-xs opacity-70">/ day</span>
              </div>
            ) : null}

            {vehicle.packageTotal && (
              <div className="rounded-full bg-[#e3000f]/10 px-4 py-2 text-sm font-semibold text-[#e3000f]">
                {vehicle.packageTotal}
              </div>
            )}
          </div>

          {/* Highlight */}
          {vehicle.highlight && (
            <div className="mt-4 rounded-2xl bg-surface-muted px-4 py-3 text-sm font-medium">
              {vehicle.highlight}
            </div>
          )}

          {/* Variant switcher */}
          {hasVariants && (
            <div className="mt-6">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Choose KM plan
              </div>
              <div className="flex flex-wrap gap-2">
                {vehicle.variants.map((v: any) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    className={`
                      rounded-full px-4 py-2 text-sm font-semibold transition-colors
                      ${
                        variantId === v.id
                          ? "bg-black text-white"
                          : "bg-surface-muted text-black/60 hover:text-black"
                      }
                    `}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick specs */}
          {specs.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              {specs.map((sp: any, i: number) => (
                <div key={i} className="rounded-2xl bg-surface-muted px-4 py-3">
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    {sp.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold">{sp.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Included */}
          {included.length > 0 && (
            <div className="mt-7">
              <h4 className="font-display text-base font-semibold">
                What&apos;s included
              </h4>
              <ul className="mt-3 space-y-2">
                {included.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-[#e3000f]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add-ons */}
          {Array.isArray(vehicle.addOns) && vehicle.addOns.length > 0 && (
            <div className="mt-7">
              <h4 className="font-display text-base font-semibold">
                Add-ons &amp; notes
              </h4>
              <ul className="mt-3 space-y-2">
                {vehicle.addOns.map((item: string, i: number) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-black/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Branding status */}
          {vehicle.brandingStatus && (
            <div className="mt-6 rounded-2xl border border-black/10 px-4 py-3 text-sm font-medium">
              {vehicle.brandingStatus}
            </div>
          )}

          {/* Location-wise charges */}
          {Array.isArray(vehicle.locationCharges) &&
            vehicle.locationCharges.length > 0 && (
              <div className="mt-7">
                <h4 className="font-display text-base font-semibold">
                  Location-wise charges
                </h4>
                <div className="mt-3 space-y-4">
                  {vehicle.locationCharges.map((row: any, idx: number) => {
                    const { label, ...rest } = row;
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl bg-surface-muted p-4"
                      >
                        <div className="mb-3 text-sm font-semibold">
                          {label}
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          {Object.entries(rest).map(([k, val]) => (
                            <div
                              key={k}
                              className="flex items-center justify-between gap-2 text-sm"
                            >
                              <span className="text-muted-foreground">
                                {prettyKey(k)}
                              </span>
                              <span className="font-semibold">
                                {String(val)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          {/* CTA — preserves the original Enquire flow */}
          <div className="mt-8">
            <BleedButton href="#contact" onClick={handleClose}>
              Enquire Now
            </BleedButton>
          </div>
        </div>
      </div>
    </div>
  );
}