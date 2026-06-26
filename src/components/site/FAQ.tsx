// "use client";

// import { Reveal } from "./Reveal";
// import { useState } from "react";
// import { Plus } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";

// const faqs = [
//   { q: "What is included in a roadshow campaign?",
//     a: "End-to-end planning, branded LED vehicle, route design, on-ground crew, GPS tracking and a post-campaign report." },
//   { q: "How early should we contact ADINN?",
//     a: "We recommend at least 7–10 days before launch for branding, route mapping and city permissions." },
//   { q: "Can ADINN support multiple city campaigns?",
//     a: "Yes — we operate across multiple cities simultaneously with coordinated route and reporting." },
//   { q: "Is GPS tracking available?",
//     a: "Every roadshow vehicle is GPS-enabled with live monitoring and shareable updates." },
//   { q: "Can the vehicle be branded for our campaign?",
//     a: "Yes. We handle custom creatives, vinyl wraps, LED content and fabrication where required." },
//   { q: "Who handles route planning and coordination?",
//     a: "Our internal roadshow team plans routes, manages on-ground crew and shares execution reports." },
// ];

// export function FAQ() {
//   const [open, setOpen] = useState<number | null>(0);
//   return (
//     <section className="section-pad bg-surface-muted">
//       <div className="container-x grid lg:grid-cols-12 gap-12">
//         <div className="lg:col-span-4">
//           <Reveal><div className="eyebrow">Help Center</div></Reveal>
//           <Reveal delay={1}>
//             <h2 className="mt-5 text-4xl md:text-5xl font-display font-semibold leading-[1.05] text-balance-tight">
//               Questions, answered.
//             </h2>
//           </Reveal>
//           <Reveal delay={2}>
//             <p className="mt-5 text-muted-foreground">
//               Can't find what you're looking for? Our campaign team is one message away.
//             </p>
//           </Reveal>
//           <Reveal delay={3}>
//             <a href="#contact" className="btn-ghost mt-7">Contact the team</a>
//           </Reveal>
//         </div>

//         <div className="lg:col-span-8">
//           <div className="divide-y divide-border border-y border-border">
//             {faqs.map((f, i) => {
//               const isOpen = open === i;
//               return (
//                 <div key={f.q}>
//                   <button
//                     onClick={() => setOpen(isOpen ? null : i)}
//                     className="w-full flex items-center justify-between gap-6 py-6 text-left group"
//                     aria-expanded={isOpen}
//                   >
//                     <span className="font-display text-lg md:text-xl font-medium group-hover:text-primary transition-colors">
//                       {f.q}
//                     </span>
//                     <span className={`inline-flex size-9 items-center justify-center rounded-full border border-border transition-all ${isOpen ? "bg-primary text-primary-foreground border-primary rotate-45" : ""}`}>
//                       <Plus className="size-4" />
//                     </span>
//                   </button>
//                   <AnimatePresence initial={false}>
//                     {isOpen && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
//                         className="overflow-hidden"
//                       >
//                         <p className="pb-6 pr-12 text-muted-foreground leading-relaxed">{f.a}</p>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Plus, Minus, MessageCircle, ArrowRight, HelpCircle,
//   Headphones, Users, ShieldCheck,
//   CalendarDays, CalendarClock, BarChart3, MapPin, Car, Route,
// } from "lucide-react";

// // ── FAQ data (icon + optional highlight pills shown when expanded) ────────────
// const faqs = [
//   {
//     icon: CalendarDays,
//     q: "What is included in a roadshow campaign?",
//     a: "A roadshow campaign by ADINN includes vehicle branding, route planning, GPS tracking, on-ground crew, real-time reporting and performance insights.",
//     highlights: [
//       { icon: MapPin, t: "Strategic Routes", s: "& Planning" },
//       { icon: Car, t: "Branded Vehicles", s: "& Crew" },
//       { icon: BarChart3, t: "Tracking &", s: "Real-time Reports" },
//     ],
//   },
//   {
//     icon: CalendarClock,
//     q: "How early should we contact ADINN?",
//     a: "We recommend at least 7–10 days before launch so we can finalise branding, route mapping and city permissions comfortably.",
//   },
//   {
//     icon: BarChart3,
//     q: "Can ADINN support multiple city campaigns?",
//     a: "Yes — we operate across multiple cities simultaneously with coordinated routing, crew and consolidated reporting.",
//   },
//   {
//     icon: MapPin,
//     q: "Is GPS tracking available?",
//     a: "Every roadshow vehicle is GPS-enabled with live monitoring and shareable real-time location updates.",
//   },
//   {
//     icon: Car,
//     q: "Can the vehicle be branded for our campaign?",
//     a: "Absolutely. We handle custom creatives, vinyl wraps, LED content and fabrication wherever required.",
//   },
//   {
//     icon: Route,
//     q: "Who handles route planning and coordination?",
//     a: "Our internal roadshow team plans routes, manages the on-ground crew and shares clear execution reports.",
//   },
// ];

// const trust = [
//   { icon: Headphones, t: "Quick", s: "Replies" },
//   { icon: Users, t: "Expert", s: "Support" },
//   { icon: ShieldCheck, t: "Trusted by", s: "100+ Brands" },
// ];

// // small decorative underline
// function Underline({ className = "" }: { className?: string }) {
//   return (
//     <svg viewBox="0 0 200 12" className={className} fill="none" aria-hidden="true">
//       <path
//         d="M3 8c40-6 90-7 130-4 22 2 44 4 64 2"
//         stroke="url(#faqu)" strokeWidth="4" strokeLinecap="round"
//       />
//       <defs>
//         <linearGradient id="faqu" x1="0" x2="200" y1="0" y2="0">
//           <stop stopColor="#a78bfa" />
//           <stop offset="1" stopColor="#e879f9" />
//         </linearGradient>
//       </defs>
//     </svg>
//   );
// }

// export function FAQ() {
//   const [open, setOpen] = useState<number | null>(0);

//   return (
//     <section className="relative overflow-hidden bg-[#0b0a1f] text-white">
//       {/* ── ambient glow orbs ── */}
//       <div aria-hidden className="pointer-events-none absolute -top-40 -left-32 size-[28rem] rounded-full bg-violet-600/30 blur-[130px]" />
//       <div aria-hidden className="pointer-events-none absolute top-24 -right-44 size-[30rem] rounded-full bg-blue-600/20 blur-[140px]" />
//       <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(124,58,237,0.18),transparent_60%)]" />

//       <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-20 md:py-28 grid lg:grid-cols-12 gap-12 lg:gap-16">
//         {/* ── Left column ── */}
//         <motion.div
//           className="lg:col-span-5"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-80px" }}
//           transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//         >
//           <div className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-violet-200">
//             <span className="grid size-5 place-items-center rounded-full bg-violet-500/30">
//               <HelpCircle className="size-3" />
//             </span>
//             HELP CENTER
//           </div>

//           <h2 className="mt-6 text-4xl md:text-5xl font-display font-semibold leading-[1.05]">
//             Questions,
//             <br />
//             <span className="relative inline-block">
//               <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
//                 answered.
//               </span>
//               <Underline className="absolute -bottom-2 left-0 w-full" />
//             </span>
//           </h2>

//           <p className="mt-6 text-white/60 leading-relaxed max-w-sm">
//             Can&apos;t find what you&apos;re looking for? Our campaign team is one
//             message away.
//           </p>

//           <a
//             href="#contact"
//             className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-6 py-3 font-medium text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-violet-500/50"
//           >
//             <MessageCircle className="size-4" />
//             Contact the team
//             <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
//           </a>

//           {/* trust badges */}
//           <div className="mt-10 flex flex-wrap gap-x-8 gap-y-5">
//             {trust.map((b) => (
//               <div key={b.s} className="flex items-center gap-2.5">
//                 <span className="grid size-9 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 text-violet-300">
//                   <b.icon className="size-4" />
//                 </span>
//                 <span className="text-sm leading-tight text-white/70">
//                   {b.t}
//                   <br />
//                   {b.s}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </motion.div>

//         {/* ── Right column: glass accordion ── */}
//         <motion.div
//           className="lg:col-span-7"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-80px" }}
//           transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
//         >
//           <div className="overflow-hidden rounded-3xl bg-white/[0.03] ring-1 ring-white/10 backdrop-blur-xl divide-y divide-white/10">
//             {faqs.map((f, i) => {
//               const isOpen = open === i;
//               const Icon = f.icon;
//               return (
//                 <div
//                   key={f.q}
//                   className={`relative transition-colors duration-300 ${
//                     isOpen ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
//                   }`}
//                 >
//                   {/* active left accent */}
//                   <span
//                     className={`absolute left-0 top-0 h-full w-[3px] rounded-r bg-gradient-to-b from-violet-400 to-fuchsia-500 transition-opacity duration-300 ${
//                       isOpen ? "opacity-100" : "opacity-0"
//                     }`}
//                   />
//                   <button
//                     onClick={() => setOpen(isOpen ? null : i)}
//                     className="w-full flex items-center gap-4 px-5 py-5 text-left"
//                     aria-expanded={isOpen}
//                   >
//                     <span
//                       className={`grid size-10 shrink-0 place-items-center rounded-xl ring-1 transition-colors duration-300 ${
//                         isOpen
//                           ? "bg-violet-500/20 ring-violet-400/40 text-violet-200"
//                           : "bg-white/5 ring-white/10 text-white/60"
//                       }`}
//                     >
//                       <Icon className="size-5" />
//                     </span>
//                     <span className="flex-1 font-medium text-base md:text-lg text-white">
//                       {f.q}
//                     </span>
//                     <span
//                       className={`grid size-9 shrink-0 place-items-center rounded-full ring-1 transition-all duration-300 ${
//                         isOpen
//                           ? "bg-violet-500 ring-violet-500 text-white"
//                           : "ring-white/15 text-white/70"
//                       }`}
//                     >
//                       {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
//                     </span>
//                   </button>

//                   <AnimatePresence initial={false}>
//                     {isOpen && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
//                         className="overflow-hidden"
//                       >
//                         <div className="px-5 pb-6 pl-[4.75rem]">
//                           <p className="text-white/65 leading-relaxed">{f.a}</p>

//                           {f.highlights && (
//                             <div className="mt-5 grid sm:grid-cols-3 gap-3">
//                               {f.highlights.map((h) => (
//                                 <div
//                                   key={h.t}
//                                   className="flex items-center gap-3 rounded-xl bg-white/[0.04] ring-1 ring-white/10 px-3 py-2.5"
//                                 >
//                                   <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-violet-500/20 text-violet-200">
//                                     <h.icon className="size-4" />
//                                   </span>
//                                   <span className="text-xs leading-tight text-white/80">
//                                     {h.t}
//                                     <br />
//                                     {h.s}
//                                   </span>
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               );
//             })}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }



// "use client";

// import { useState } from "react";
// import {
//   Plus,
//   X,
//   ArrowRight,
//   Gift,
//   Clock3,
//   Building2,
//   MapPin,
//   Tag,
//   Users2,
//   HelpCircle,
// } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import { Reveal } from "./Reveal";
// import "./FAQ.css";

// const faqs = [
//   {
//     q: "What is included in a roadshow campaign?",
//     a: "End-to-end planning, branded LED vehicle, route design, on-ground crew, GPS tracking and a post-campaign report.",
//     icon: Gift,
//   },
//   {
//     q: "How early should we contact ADINN?",
//     a: "We recommend at least 7–10 days before launch for branding, route mapping and city permissions.",
//     icon: Clock3,
//   },
//   {
//     q: "Can ADINN support multiple city campaigns?",
//     a: "Yes. ADINN can execute multiple-city campaigns with coordinated routing, monitoring and proof reporting.",
//     icon: Building2,
//   },
//   {
//     q: "Is GPS tracking available?",
//     a: "Yes. Every roadshow vehicle can be tracked with GPS-based movement updates and execution monitoring.",
//     icon: MapPin,
//   },
//   {
//     q: "Can the vehicle be branded for our campaign?",
//     a: "Yes. We support campaign branding, LED creatives, vehicle wraps, flex branding and on-ground visibility elements.",
//     icon: Tag,
//   },
//   {
//     q: "Who handles route planning and coordination?",
//     a: "Our internal roadshow team handles route planning, on-ground coordination, crew management and campaign reporting.",
//     icon: Users2,
//   },
// ];

// export function FAQ() {
//   const [open, setOpen] = useState<number | null>(0);

//   return (
//     <section className="adinn-faq-section" id="faq">
//       <div className="adinn-faq-bg" />

//       <div className="adinn-faq-container">
//         {/* LEFT CONTENT */}
//         <div className="adinn-faq-left">
//           <Reveal>
//             <div className="adinn-faq-eyebrow">
//               <HelpCircle size={16} />
//               Help Center
//             </div>
//           </Reveal>

//           <Reveal delay={1}>
//             <h2 className="adinn-faq-title">
//               Questions,
//               <span> answered.</span>
//             </h2>
//           </Reveal>

//           <Reveal delay={2}>
//             <p className="adinn-faq-desc">
//               Can’t find what you’re looking for? Our campaign team is one
//               message away.
//             </p>
//           </Reveal>

//           <Reveal delay={3}>
//             <a href="#contact" className="adinn-faq-cta">
//               Contact the team
//               <ArrowRight size={19} />
//             </a>
//           </Reveal>
//         </div>

//         {/* RIGHT ACCORDION */}
//         <div className="adinn-faq-list">
//           {faqs.map((item, index) => {
//             const isOpen = open === index;
//             const Icon = item.icon;

//             return (
//               <motion.div
//                 layout
//                 key={item.q}
//                 whileHover={{
//                   y: -4,
//                   transition: { duration: 0.25 },
//                 }}
//                 className={`adinn-faq-card ${isOpen ? "is-open" : ""}`}
//               >
//                 <button
//                   className="adinn-faq-question"
//                   onClick={() => setOpen(isOpen ? null : index)}
//                   aria-expanded={isOpen}
//                 >
//                   <span className="adinn-faq-icon">
//                     <Icon size={22} />
//                   </span>

//                   <span className="adinn-faq-q-text">{item.q}</span>

//                   <span className="adinn-faq-toggle">
//                     {isOpen ? <X size={19} /> : <Plus size={20} />}
//                   </span>
//                 </button>

//                 <AnimatePresence initial={false}>
//                   {isOpen && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0, y: -8 }}
//                       animate={{ height: "auto", opacity: 1, y: 0 }}
//                       exit={{ height: 0, opacity: 0, y: -8 }}
//                       transition={{
//                         duration: 0.38,
//                         ease: [0.22, 1, 0.36, 1],
//                       }}
//                       className="adinn-faq-answer-wrap"
//                     >
//                       <p className="adinn-faq-answer">{item.a}</p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }











"use client";

import { useState } from "react";
import {
  Plus,
  X,
  ArrowRight,
  Gift,
  Clock3,
  Building2,
  MapPin,
  Tag,
  Users2,
  HelpCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";
import "./FAQ.css";

const faqs = [
  {
    q: "What is included in a roadshow campaign?",
    a: "End-to-end planning, branded LED vehicle, route design, on-ground crew, GPS tracking and a post-campaign report.",
    icon: Gift,
  },
  {
    q: "How early should we contact ADINN?",
    a: "We recommend at least 7–10 days before launch for branding, route mapping and city permissions.",
    icon: Clock3,
  },
  {
    q: "Can ADINN support multiple city campaigns?",
    a: "Yes. ADINN can execute multiple-city campaigns with coordinated routing, monitoring and proof reporting.",
    icon: Building2,
  },
  {
    q: "Is GPS tracking available?",
    a: "Yes. Every roadshow vehicle can be tracked with GPS-based movement updates and execution monitoring.",
    icon: MapPin,
  },
  {
    q: "Can the vehicle be branded for our campaign?",
    a: "Yes. We support campaign branding, LED creatives, vehicle wraps, flex branding and on-ground visibility elements.",
    icon: Tag,
  },
  {
    q: "Who handles route planning and coordination?",
    a: "Our internal roadshow team handles route planning, on-ground coordination, crew management and campaign reporting.",
    icon: Users2,
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };

  return (
    <section className="adinn-faq-section" id="faq">
      <div className="adinn-faq-bg" />

      <div className="adinn-faq-container">
        <div className="adinn-faq-left">
          <motion.div
            className="adinn-faq-eyebrow"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -3, scale: 1.03 }}
          >
            <HelpCircle size={16} />
            Help Center
          </motion.div>

          <motion.h2
            className="adinn-faq-title"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.55 }}
          >
            Questions,
            <span>answered.</span>
          </motion.h2>

          <motion.p
            className="adinn-faq-desc"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16, duration: 0.55 }}
          >
            Can’t find what you’re looking for? Our campaign team is one message
            away.
          </motion.p>

          <motion.a
            href="#contact"
            className="adinn-faq-cta"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24, duration: 0.55 }}
            whileHover={{ y: -5, scale: 1.025 }}
            whileTap={{ scale: 0.96 }}
          >
            Contact the team
            <ArrowRight size={19} />
          </motion.a>
        </div>

        <div className="adinn-faq-list">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            const Icon = item.icon;

            return (
              <motion.div
                layout
                key={item.q}
                onMouseMove={handleMouseMove}
                className={`adinn-faq-card ${isOpen ? "is-open" : ""}`}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.48,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.24 },
                }}
              >
                <button
                  className="adinn-faq-question"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="adinn-faq-icon">
                    <Icon size={22} />
                  </span>

                  <span className="adinn-faq-q-text">{item.q}</span>

                  <span className="adinn-faq-toggle">
                    {isOpen ? <X size={19} /> : <Plus size={20} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, y: -12 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -12 }}
                      transition={{
                        duration: 0.42,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="adinn-faq-answer-wrap"
                    >
                      <p className="adinn-faq-answer">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}