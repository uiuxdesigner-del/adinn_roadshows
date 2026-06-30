"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Handshake,
  MapPin,
  Megaphone,
  Sparkles,
  Target,
  TrendingUp,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "./ClientLogos.css";

type ClientLogo = {
  name: string;
  sub: string;
  image: string;
};

type StatItem = {
  icon: LucideIcon;
  value: string;
  label: string;
};

type ProofItem = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const logos: ClientLogo[] = [
  {
    name: "AIRTEL",
    sub: "Telecom Campaign",
    image: "/assets/RS_Client_Bharti_Airtel_Logo.png",
  },
  {
    name: "KELLOGG'S",
    sub: "FMCG Visibility",
    image: "/assets/RS_Client_kelloggs_logo.png",
  },
  {
    name: "PHILIPS",
    sub: "Retail Promotion",
    image: "/assets/RS_Client_philips_logo.png",
  },
  {
    name: "THANGAMAYIL",
    sub: "Jewellery Campaign",
    image: "/assets/RS_Client_Thangamayil.png",
  },
  {
    name: "MERIDIAN",
    sub: "Brand Activation",
    image: "/assets/RS_Client_Thangamayil.png",
  },
  {
    name: "QUANTA",
    sub: "Media Planning",
    image: "/assets/RS_Client_Bharti_Airtel_Logo.png",
  },
  {
    name: "ORION",
    sub: "Creative Labs",
    image: "/assets/RS_Client_philips_logo.png",
  },
  {
    name: "CIVIC&CO",
    sub: "Retail Network",
    image: "/assets/RS_Client_Thangamayil.png",
  },
  {
    name: "ATLAS",
    sub: "Developers",
    image: "/assets/RS_Client_Bharti_Airtel_Logo.png",
  },
  {
    name: "STRATA",
    sub: "Enterprises",
    image: "/assets/RS_Client_kelloggs_logo.png",
  },
];

const proofItems: ProofItem[] = [
  {
    icon: MapPin,
    title: "South Indian ",
    text: "Coverage",
  },
  {
    icon: TrendingUp,
    title: "High Visibility",
    text: "Everyday",
  },
  {
    icon: Target,
    title: "Result Driven",
    text: "Promotions",
  },
];

const stats: StatItem[] = [
  {
    icon: Megaphone,
    value: "5000+",
    label: "Successful Campaigns",
  },
  {
    icon: Truck,
    value: "250+",
    label: "Roadshow Vehicles",
  },
  {
    icon: Eye,
    value: "20L+",
    label: "Daily Impressions",
  },
  {
    icon: MapPin,
    value: "South India",
    label: "South Indian Presence",
  },
];

function wrapIndex(index: number, total: number) {
  return (index + total) % total;
}

function ClientLogoImage({ logo }: { logo: ClientLogo }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className="client-logo-fallback">{logo.name}</span>;
  }

  return (
    <img
      src={logo.image}
      alt={`${logo.name} logo`}
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}

export function ClientLogos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const activeLogo = logos[activeIndex];

  const loopLogos = useMemo(() => {
    return [...logos, ...logos];
  }, []);

  const next = useCallback(() => {
    setActiveIndex((prev) => wrapIndex(prev + 1, logos.length));
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => wrapIndex(prev - 1, logos.length));
  }, []);

  useEffect(() => {
    if (paused || shouldReduceMotion) return;

    const timer = window.setInterval(() => {
      next();
    }, 2600);

    return () => window.clearInterval(timer);
  }, [paused, shouldReduceMotion, next]);

  return (
    <section className="client-roadshow-section" id="clients">
      <div className="client-roadshow-grid-bg" />

      <div className="client-roadshow-container">
        <div className="client-roadshow-hero">
          <motion.div
            className="client-roadshow-copy"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="client-roadshow-eyebrow">
              <Sparkles size={15} />
              Trusted by <span>Growing Brands</span>
            </div>

            <h2>
              Brands that move <br />
              with Adinn<span>.</span>
            </h2>

            <p>
              From product launches to mass promotions, our roadshows help
              brands reach farther, faster and more effectively.
            </p>

            <div className="client-roadshow-proof">
              {proofItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    className="client-roadshow-proof-item"
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.12 + index * 0.08,
                    }}
                    whileHover={{ y: -4 }}
                  >
                    <span>
                      <Icon size={20} />
                    </span>
                    <div>
                      <strong>{item.title}</strong>
                      <small>{item.text}</small>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            className="client-roadshow-visual"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* <motion.img
              src="/assets/RS_Client_Roadshow_BG.png"
              alt="Roadshow vehicle campaign"
              draggable={false}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, -8, 0],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            /> */}

            {/* <motion.div
              className="client-roadshow-float-card"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.35 }}
              whileHover={{ y: -5 }}
            >
              <span>
                <Truck size={22} />
              </span>
              <div>
                <strong>100+ Roadshow Vehicles</strong>
                <p>On-ground. On-time. On-brand.</p>
              </div>
            </motion.div> */}
          </motion.div>
        </div>

        <motion.div
          className="client-roadshow-logo-panel"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.1 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            className="client-roadshow-arrow left"
            onClick={prev}
            aria-label="Previous client"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            type="button"
            className="client-roadshow-arrow right"
            onClick={next}
            aria-label="Next client"
          >
            <ArrowRight size={20} />
          </button>

          <div className="client-roadshow-logo-fade left" />
          <div className="client-roadshow-logo-fade right" />

          <div className="client-roadshow-logo-window">
            <div
              className={`client-roadshow-logo-track ${
                paused ? "paused" : ""
              }`}
            >
              {loopLogos.map((logo, index) => {
                const realIndex = index % logos.length;
                const isActive = activeIndex === realIndex;

                return (
                  <motion.button
                    type="button"
                    className={`client-roadshow-logo-card ${
                      isActive ? "active" : ""
                    }`}
                    key={`${logo.name}-${index}`}
                    onClick={() => setActiveIndex(realIndex)}
                    aria-label={`Highlight ${logo.name}`}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ClientLogoImage logo={logo} />
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="client-roadshow-logo-dots">
            {logos.slice(0, 4).map((logo, index) => (
              <button
                type="button"
                key={logo.name}
                className={activeIndex % 4 === index ? "active" : ""}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to ${logo.name}`}
              />
            ))}
          </div>
        </motion.div>

        {/* <motion.div
          className="client-roadshow-active-client"
          key={activeLogo.name}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="client-roadshow-active-logo">
            <ClientLogoImage logo={activeLogo} />
          </div>

          <div>
            <span>Currently highlighting</span>
            <h3>{activeLogo.name}</h3>
            <p>{activeLogo.sub}</p>
          </div>
        </motion.div> */}

        <div className="client-roadshow-stats">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                className="client-roadshow-stat"
                key={item.label}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.52,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -5 }}
              >
                <span>
                  <Icon size={24} />
                </span>

                <div>
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}