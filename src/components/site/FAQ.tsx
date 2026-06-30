"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Plus,
  Minus,
  Gift,
  Clock3,
  Building2,
  MapPin,
  Tag,
  Users2,
  Headphones,
  Route,
  ShieldCheck,
  RefreshCcw,
  FileText,
  Truck,
  ChevronUp,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "./FAQ.css";

type FAQItem = {
  q: string;
  a: string;
  icon: LucideIcon;
  points: string[];
};

const faqs: FAQItem[] = [
  {
    q: "What is included in a roadshow campaign?",
    a: "Adinn provides complete roadshow campaign execution including planning, branded LED vehicles, route design, on-ground crew, GPS tracking, campaign proof and post-campaign reporting.",
    icon: Gift,
    points: [
      "Planning strategy",
      "Branded LED vehicle",
      "Route scheduling",
      "On-ground crew",
      "GPS proof",
    ],
  },
  {
    q: "How early should we contact Adinn?",
    a: "We recommend contacting Adinn 7 to 10 days before the campaign launch. This gives enough time for vehicle blocking, branding preparation, route planning and team coordination.",
    icon: Clock3,
    points: [
      "7–10 days ideal",
      "Vehicle blocking",
      "Creative preparation",
      "Route planning",
      "Crew allocation",
    ],
  },
  {
    q: "Can Adinn support multiple city campaigns?",
    a: "Yes. Adinn can execute multi-city roadshow campaigns with coordinated vehicle deployment, city-wise route planning, live monitoring and centralised proof reporting.",
    icon: Building2,
    points: [
      "Multi-city planning",
      "Fleet allocation",
      "City-wise routes",
      "Execution tracking",
      "Central reporting",
    ],
  },
  {
    q: "Is GPS tracking available?",
    a: "Yes. GPS tracking is available for roadshow vehicles. It helps you monitor vehicle movement, route coverage, execution timing and location-based campaign proof.",
    icon: MapPin,
    points: [
      "Live location",
      "Route visibility",
      "Movement logs",
      "Proof updates",
      "Execution control",
    ],
  },
  {
    q: "Can the vehicle be branded for our campaign?",
    a: "Yes. Adinn supports LED creatives, flex branding, vehicle wraps and campaign visibility elements based on the brand requirement and selected vehicle model.",
    icon: Tag,
    points: [
      "LED creative",
      "Flex branding",
      "Vehicle wrap",
      "Artwork check",
      "On-road visibility",
    ],
  },
  {
    q: "Who handles route planning and coordination?",
    a: "Adinn’s internal roadshow team handles route planning, scheduling, driver communication, crew coordination, daily monitoring and final campaign reporting.",
    icon: Users2,
    points: [
      "Route mapping",
      "Time scheduling",
      "Driver coordination",
      "Crew support",
      "Final reporting",
    ],
  },
  {
    q: "Can the route be changed during execution?",
    a: "Yes. Route changes can be coordinated based on campaign priority, traffic movement, client requirement and operational feasibility.",
    icon: RefreshCcw,
    points: [
      "Route adjustment",
      "Traffic-based movement",
      "Priority locations",
      "Team coordination",
    ],
  },
  {
    q: "What proof will we receive after the campaign?",
    a: "You will receive campaign proof such as GPS movement details, execution updates, location-based photos or videos and post-campaign reporting.",
    icon: ShieldCheck,
    points: [
      "GPS report",
      "Photo proof",
      "Video proof",
      "Daily update",
      "Final report",
    ],
  },
];

const movingBadges = [
  { icon: Truck, label: "LED Vehicle" },
  { icon: Route, label: "Route Planning" },
  { icon: MapPin, label: "GPS Tracking" },
  { icon: FileText, label: "Campaign Proof" },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  const repeatedBadges = [
    ...movingBadges,
    ...movingBadges,
    ...movingBadges,
    ...movingBadges,
  ];

  return (
    <section className="adinn-road-faq-section" id="faq">
      <div className="adinn-road-faq-bg" />

      <div className="adinn-road-faq-shell">
        <motion.aside
          className="adinn-road-faq-left"
          initial={{ opacity: 0, x: -34 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="adinn-road-faq-dot-grid"
            initial={{ opacity: 0, scale: 0.78 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          />

          <p className="adinn-road-faq-eyebrow">Roadshow Help Center</p>

        <motion.h2
  className="adinn-road-faq-big-title"
  initial={{ opacity: 0, y: 22 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.55, delay: 0.08 }}
>
  FAQ<span>.</span>

  <em className="adinn-road-faq-spark" aria-hidden="true">
    <i />
    <i />
    <i />
  </em>
</motion.h2>

          <div className="adinn-road-faq-title-mark">
            <i />
            <b />
          </div>

          <motion.div
            className="adinn-road-faq-copy"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.14 }}
          >
            <h3>
              Frequently Asked
              <span>Questions</span>
            </h3>

            <p>
              Find quick answers about Adinn roadshow vehicles, campaign
              planning, GPS tracking, branding, route coordination and proof
              reporting.
            </p>
          </motion.div>

          <motion.div
            className="adinn-road-faq-support-card"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <span className="adinn-road-faq-support-icon">
              <Headphones size={34} strokeWidth={1.9} />
            </span>

            <div>
              <h4>Still have questions?</h4>
              <p>Our campaign team is ready to help you.</p>

              <a href="#contact">
                Contact Support
                <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>

          <div className="adinn-road-faq-marquee">
            <motion.div
              className="adinn-road-faq-marquee-track"
              animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 18,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
            >
              {repeatedBadges.map((item, index) => {
                const Icon = item.icon;

                return (
                  <span key={`${item.label}-${index}`}>
                    <Icon size={16} strokeWidth={2} />
                    {item.label}
                  </span>
                );
              })}
            </motion.div>
          </div>

          <div className="adinn-road-faq-wave-lines">
            <span />
            <span />
            <span />
          </div>
        </motion.aside>

        <div className="adinn-road-faq-right">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            const Icon = item.icon;

            return (
              <motion.article
                key={item.q}
                className={`adinn-road-faq-item ${isOpen ? "is-open" : ""}`}
                initial={{ opacity: 0, x: 36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.045,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -3,
                  transition: { duration: 0.22 },
                }}
              >
                <button
                  type="button"
                  className="adinn-road-faq-question"
                  aria-expanded={isOpen}
                  aria-controls={`adinn-road-faq-answer-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span className="adinn-road-faq-icon">
                    {isOpen ? (
                      <Minus size={24} strokeWidth={2.2} />
                    ) : (
                      <Icon size={24} strokeWidth={1.9} />
                    )}
                  </span>

                  <span className="adinn-road-faq-question-text">
                    {item.q}
                  </span>

                  <motion.span
                    className="adinn-road-faq-toggle"
                    animate={{ rotate: isOpen ? 0 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {isOpen ? (
                      <ChevronUp size={26} strokeWidth={2.2} />
                    ) : (
                      <Plus size={28} strokeWidth={2.1} />
                    )}
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`adinn-road-faq-answer-${index}`}
                      className="adinn-road-faq-answer"
                      initial={{ height: 0, opacity: 0, y: -10 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -10 }}
                      transition={{
                        duration: 0.38,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <div className="adinn-road-faq-answer-inner">
                        <p>{item.a}</p>

                        <div className="adinn-road-faq-points">
                          {item.points.map((point) => (
                            <span key={point}>{point}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}