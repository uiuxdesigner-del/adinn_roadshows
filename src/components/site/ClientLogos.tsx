// "use client";

// import { Reveal } from "./Reveal";

// const logos = [
//   "NORTHSTAR", "VELOCITY", "AURUM", "MERIDIAN", "QUANTA",
//   "PINNACLE", "ORION", "CIVIC&CO", "ATLAS", "STRATA",
// ];

// export function ClientLogos() {
//   return (
//     <section className="py-20 md:py-24 border-y border-border bg-surface-muted overflow-hidden">
//       <div className="container-x">
//         <Reveal>
//           <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
//             Trusted by growing brands
//           </p>
//         </Reveal>
//       </div>
//       <div className="mt-10 relative">
//         <div
//           className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
//           style={{ background: "linear-gradient(to right, var(--color-surface-muted), transparent)" }}
//         />
//         <div
//           className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
//           style={{ background: "linear-gradient(to left, var(--color-surface-muted), transparent)" }}
//         />
//         <div className="flex gap-16 animate-[marquee_40s_linear_infinite] whitespace-nowrap">
//           {[...logos, ...logos].map((l, i) => (
//             <span
//               key={i}
//               className="font-display text-2xl md:text-3xl font-semibold tracking-[0.18em] text-foreground/40 hover:text-foreground/80 transition-colors"
//             >
//               {l}
//             </span>
//           ))}
//         </div>
//       </div>
//       <style>{`
//         @keyframes marquee {
//           from { transform: translateX(0); }
//           to   { transform: translateX(-50%); }
//         }
//       `}</style>
//     </section>
//   );
// }


"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Handshake,
  MapPin,
  Sparkles,
  Trophy,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "./ClientLogos.css";

type ClientLogo = {
  name: string;
  sub: string;
  image: string;
  accent: string;
};

type StatItem = {
  icon: LucideIcon;
  value: string;
  label: string;
};

const logos: ClientLogo[] = [
  {
    name: "NORTHSTAR",
    sub: "Marketing Solutions",
    image: "/assets/RS_Client_Bharti_Airtel_Logo.png",
    accent: "#c70d18",
  },
  {
    name: "VELOCITY",
    sub: "Experiences",
    image: "/assets/RS_Client_kelloggs_logo.png",
    accent: "#1f3f72",
  },
  {
    name: "AURUM",
    sub: "Group",
    image: "/assets/RS_Client_philips_logo.png",
    accent: "#b1842b",
  },
  {
    name: "MERIDIAN",
    sub: "Communications",
    image: "/assets/RS_Client_Thangamayil.png",
    accent: "#7d8187",
  },
  {
    name: "QUANTA",
    sub: "Media",
        image: "/assets/RS_Client_Bharti_Airtel_Logo.png",
    accent: "#4b4f55",
  },
  {
    name: "PINNACLE",
    sub: "Advertising",
       image: "/assets/RS_Client_kelloggs_logo.png",

    accent: "#c70d18",
  },
  {
    name: "ORION",
    sub: "Creative Labs",
        image: "/assets/RS_Client_philips_logo.png",
    accent: "#8b8d91",
  },
  {
    name: "CIVIC&CO",
    sub: "Retail Network",
        image: "/assets/RS_Client_Thangamayil.png",

    accent: "#2f3035",
  },
  {
    name: "ATLAS",
    sub: "Developers",
        image: "/assets/RS_Client_Bharti_Airtel_Logo.png",

    accent: "#c70d18",
  },
  {
    name: "STRATA",
    sub: "Enterprises",
        image: "/assets/RS_Client_kelloggs_logo.png",

    accent: "#4c4f55",
  },
];

const stats: StatItem[] = [
  {
    icon: Handshake,
    value: "50+",
    label: "Happy Clients",
  },
  {
    icon: Trophy,
    value: "200+",
    label: "Successful Campaigns",
  },
  {
    icon: MapPin,
    value: "100+",
    label: "Cities Covered",
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Client Satisfaction",
  },
];

const visibleOffsets = [-3, -2, -1, 0, 1, 2, 3];

function wrapIndex(index: number, total: number) {
  return (index + total) % total;
}

function ClientLogoImage({
  logo,
  compact = false,
}: {
  logo: ClientLogo;
  compact?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={compact ? "client-logo-fallback compact" : "client-logo-fallback"}>
        {logo.name}
      </div>
    );
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

  const visibleLogos = useMemo(() => {
    return visibleOffsets.map((offset) => {
      const index = wrapIndex(activeIndex + offset, logos.length);
      return {
        logo: logos[index],
        index,
        offset,
      };
    });
  }, [activeIndex]);

  const next = () => {
    setActiveIndex((prev) => wrapIndex(prev + 1, logos.length));
  };

  const prev = () => {
    setActiveIndex((prev) => wrapIndex(prev - 1, logos.length));
  };

  useEffect(() => {
    if (paused || shouldReduceMotion) return;

    const timer = window.setInterval(() => {
      next();
    }, 3200);

    return () => window.clearInterval(timer);
  }, [paused, shouldReduceMotion]);

  return (
    <section className="client-logo-section" id="clients">
      <div className="client-logo-bg" />

      <div className="client-logo-container">
        <motion.div
          className="client-logo-heading"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="client-logo-eyebrow">
            <Sparkles size={15} />
            Trusted by <span>Growing Brands</span>
          </div>

          <h2>
            Proud to partner with <br />
            <span>visionary</span> brands.
          </h2>

          <p>
            Brands choose ADINN for roadshows, visibility campaigns, activations
            and market-level brand recall.
          </p>
        </motion.div>

        <div
          className="client-coverflow-wrap"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            className="client-nav-btn left"
            onClick={prev}
            aria-label="Previous client"
          >
            <ArrowLeft size={21} />
          </button>

          <div className="client-coverflow-stage">
            {visibleLogos.map(({ logo, index, offset }) => {
              const abs = Math.abs(offset);
              const isActive = offset === 0;

              return (
                <motion.button
                  key={logo.name}
                  type="button"
                  className={`client-logo-card ${isActive ? "active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View ${logo.name}`}
                  style={
                    {
                      "--logo-accent": logo.accent,
                      zIndex: 20 - abs,
                      pointerEvents: abs > 2 ? "none" : "auto",
                    } as CSSProperties
                  }
                  initial={false}
                  animate={{
                    x: offset * 235,
                    scale: isActive ? 1 : 0.86 - abs * 0.035,
                    rotateY: offset * -10,
                    opacity: isActive ? 1 : abs === 1 ? 0.78 : abs === 2 ? 0.48 : 0.2,
                    filter: isActive ? "blur(0px)" : abs >= 3 ? "blur(1.4px)" : "blur(0px)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 155,
                    damping: 24,
                    mass: 0.9,
                  }}
                  whileHover={
                    isActive
                      ? {
                          y: -10,
                          scale: 1.03,
                          transition: { duration: 0.24 },
                        }
                      : {
                          y: -6,
                          scale: 0.92,
                          transition: { duration: 0.24 },
                        }
                  }
                  whileTap={{ scale: isActive ? 0.97 : 0.88 }}
                >
                  <span className="client-logo-card-glow" />

                  <div className="client-logo-media">
                    <ClientLogoImage logo={logo} />
                  </div>

                  <div className="client-logo-content">
                    <h3>{logo.name}</h3>
                    <p>{logo.sub}</p>
                  </div>

                  <span className="client-logo-status">
                    {isActive ? "Featured Partner" : "View Brand"}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <button
            className="client-nav-btn right"
            onClick={next}
            aria-label="Next client"
          >
            <ArrowRight size={21} />
          </button>
        </div>

        <div className="client-logo-dots">
          {logos.map((logo, index) => (
            <button
              key={logo.name}
              className={activeIndex === index ? "active" : ""}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to ${logo.name}`}
            />
          ))}
        </div>

        <motion.div
          className="client-active-caption"
          key={activeLogo.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          Currently highlighting <strong>{activeLogo.name}</strong>
        </motion.div>

        <motion.div
          className="client-stats-bar"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.12 }}
        >
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                className="client-stat-item"
                key={item.label}
                whileHover={{ y: -6, scale: 1.025 }}
                transition={{ duration: 0.22 }}
              >
                <span className="client-stat-icon">
                  <Icon size={24} />
                </span>

                <div>
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                </div>

                {index !== stats.length - 1 && <span className="client-stat-divider" />}
              </motion.div>
            );
          })}
        </motion.div>

        <div className="client-logo-ribbon" onMouseEnter={() => setPaused(true)}>
          <div className={`client-ribbon-track ${paused ? "paused" : ""}`}>
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <div className="client-ribbon-logo" key={`${logo.name}-${index}`}>
                <ClientLogoImage logo={logo} compact />
                <span>{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}