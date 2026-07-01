"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  PointerEvent as ReactPointerEvent,
  TransitionEvent as ReactTransitionEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
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

type CarouselMetrics = {
  windowWidth: number;
  cardWidth: number;
  cardStep: number;
};

const logos: ClientLogo[] = [
  {
    name: "KFC",
    sub: "QSR Campaign",
    image: "/assets/client-logos/KFC.png",
  },
  {
    name: "NIPPON PAINT",
    sub: "Paint Brand Campaign",
    image: "/assets/client-logos/Nippon_Paint.png",
  },
  {
    name: "DOMINO'S",
    sub: "QSR Promotion",
    image: "/assets/client-logos/Dominos.png",
  },
  {
    name: "ROYAL ENFIELD",
    sub: "Automobile Campaign",
    image: "/assets/client-logos/Royal_Enfield.png",
  },
  {
    name: "HAVELLS",
    sub: "Electrical Brand Visibility",
    image: "/assets/client-logos/Havells.png",
  },
  {
    name: "IMPEX",
    sub: "Home Appliance Campaign",
    image: "/assets/client-logos/Impex.png",
  },
  {
    name: "HERO",
    sub: "Automobile Campaign",
    image: "/assets/client-logos/Hero.png",
  },
  {
    name: "TVS",
    sub: "Automobile Campaign",
    image: "/assets/client-logos/TVS.png",
  },
  {
    name: "ACC",
    sub: "Cement Brand Campaign",
    image: "/assets/client-logos/ACC.png",
  },
  {
    name: "AMBUJA CEMENT",
    sub: "Cement Brand Visibility",
    image: "/assets/client-logos/Ambuja_Cement.png",
  },
  {
    name: "DALMIA CEMENT",
    sub: "Cement Brand Campaign",
    image: "/assets/client-logos/Dalmia_Cement.png",
  },
  {
    name: "AIRTEL",
    sub: "Telecom Campaign",
    image: "/assets/client-logos/Airtel.png",
  },
  {
    name: "PHILIPS",
    sub: "Retail Promotion",
    image: "/assets/client-logos/Philips.png",
  },
  {
    name: "THANGAMAYIL",
    sub: "Jewellery Campaign",
    image: "/assets/client-logos/Thangamayil_Jewellery.png",
  },
  {
    name: "ITC",
    sub: "FMCG Visibility",
    image: "/assets/client-logos/ITC.png",
  },
  {
    name: "CASAGRAND",
    sub: "Real Estate Campaign",
    image: "/assets/client-logos/Casagrand.png",
  },
  {
    name: "BAJAJ",
    sub: "Automobile Campaign",
    image: "/assets/client-logos/Bajaj.png",
  },
  {
    name: "MARUTI SUZUKI",
    sub: "Automobile Campaign",
    image: "/assets/client-logos/Maruti_Suzuki.png",
  },
  {
    name: "POORVIKA MOBILES",
    sub: "Retail Campaign",
    image: "/assets/client-logos/Poorvika.png",
  },
  {
    name: "THE CHENNAI MOBILES",
    sub: "Retail Campaign",
    image: "/assets/client-logos/The_Chennai_Mobiles.png",
  },
  {
    name: "MILKY MIST",
    sub: "FMCG Campaign",
    image: "/assets/client-logos/Milky_Mist.png",
  },
  {
    name: "GRT JEWELLERS",
    sub: "Jewellery Campaign",
    image: "/assets/client-logos/GRT_Jewellers.png",
  },
  {
    name: "SREE KUMARAN THANGAMALIGAI",
    sub: "Jewellery Campaign",
    image: "/assets/client-logos/Sree_Kumaran_Thangamaligai.png",
  },
  {
    name: "LALITHAA JEWELLERY",
    sub: "Jewellery Campaign",
    image: "/assets/client-logos/Lalithaa_Jewellery.png",
  },
  {
    name: "G SQUARE",
    sub: "Real Estate Campaign",
    image: "/assets/client-logos/G_Square.png",
  },
  {
    name: "DRA HOMES",
    sub: "Real Estate Campaign",
    image: "/assets/client-logos/DRA_Homes.png",
  },
];

const proofItems: ProofItem[] = [
  {
    icon: MapPin,
    title: "Pan Tamil Nadu",
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
];

const LOGOS_PER_DOT = 5;

function wrapIndex(index: number, total: number) {
  return (index + total) % total;
}

function getNearestCarouselPosition(
  currentPosition: number,
  targetLogicalIndex: number,
  total: number
) {
  const currentGroup = Math.floor(currentPosition / total) * total;

  const positions = [
    currentGroup + targetLogicalIndex,
    currentGroup + targetLogicalIndex - total,
    currentGroup + targetLogicalIndex + total,
  ];

  return positions.reduce((nearest, current) => {
    return Math.abs(current - currentPosition) <
      Math.abs(nearest - currentPosition)
      ? current
      : nearest;
  });
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
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export function ClientLogos() {
  const shouldReduceMotion = useReducedMotion();

  const extendedLogos = useMemo(() => {
    return [...logos, ...logos, ...logos];
  }, []);

  const [position, setPosition] = useState(logos.length);
  const [metrics, setMetrics] = useState<CarouselMetrics>({
    windowWidth: 0,
    cardWidth: 0,
    cardStep: 0,
  });

  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  const logoWindowRef = useRef<HTMLDivElement | null>(null);
  const logoTrackRef = useRef<HTMLDivElement | null>(null);
  const firstLogoCardRef = useRef<HTMLButtonElement | null>(null);

  const positionRef = useRef(position);
  const pointerStartXRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const didDragRef = useRef(false);

  const activeIndex = wrapIndex(position, logos.length);
  const activePage = Math.floor(activeIndex / LOGOS_PER_DOT);
  const totalPages = Math.ceil(logos.length / LOGOS_PER_DOT);

  const carouselContentWidth = logos.length * metrics.cardStep;
  const showCarouselControls =
    metrics.windowWidth > 0 &&
    metrics.cardStep > 0 &&
    carouselContentWidth > metrics.windowWidth;

  const isPaused =
    isHovering || isDragging || shouldReduceMotion || !showCarouselControls;

  const trackX =
    metrics.cardStep > 0
      ? metrics.windowWidth / 2 -
        metrics.cardWidth / 2 -
        position * metrics.cardStep +
        dragOffset
      : 0;

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    const updateMetrics = () => {
      const windowEl = logoWindowRef.current;
      const trackEl = logoTrackRef.current;
      const firstCardEl = firstLogoCardRef.current;

      if (!windowEl || !trackEl || !firstCardEl) return;

      const cardRect = firstCardEl.getBoundingClientRect();
      const trackStyle = window.getComputedStyle(trackEl);
      const gapValue = trackStyle.columnGap || trackStyle.gap || "0px";
      const gap = Number.parseFloat(gapValue) || 0;

      setMetrics({
        windowWidth: windowEl.clientWidth,
        cardWidth: cardRect.width,
        cardStep: cardRect.width + gap,
      });
    };

    updateMetrics();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateMetrics)
        : null;

    if (logoWindowRef.current) resizeObserver?.observe(logoWindowRef.current);
    if (firstLogoCardRef.current)
      resizeObserver?.observe(firstLogoCardRef.current);

    window.addEventListener("resize", updateMetrics);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateMetrics);
    };
  }, []);

  const normalizePosition = useCallback(() => {
    const currentPosition = positionRef.current;

    if (currentPosition >= logos.length * 2 || currentPosition < logos.length) {
      const normalizedPosition =
        logos.length + wrapIndex(currentPosition, logos.length);

      setIsJumping(true);
      setPosition(normalizedPosition);
      positionRef.current = normalizedPosition;

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsJumping(false);
        });
      });
    }
  }, []);

  const goToPosition = useCallback((nextPosition: number) => {
    setDragOffset(0);
    setPosition(nextPosition);
  }, []);

  const goToLogo = useCallback(
    (targetLogicalIndex: number) => {
      const nextPosition = getNearestCarouselPosition(
        positionRef.current,
        targetLogicalIndex,
        logos.length
      );

      goToPosition(nextPosition);
    },
    [goToPosition]
  );

  const next = useCallback(() => {
    goToPosition(positionRef.current + 1);
  }, [goToPosition]);

  const prev = useCallback(() => {
    goToPosition(positionRef.current - 1);
  }, [goToPosition]);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      next();
    }, 2400);

    return () => window.clearInterval(timer);
  }, [isPaused, next]);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!showCarouselControls || event.button !== 0) return;

      pointerIdRef.current = event.pointerId;
      pointerStartXRef.current = event.clientX;
      didDragRef.current = false;

      setIsDragging(true);
      setDragOffset(0);

      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [showCarouselControls]
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!isDragging || pointerIdRef.current !== event.pointerId) return;

      const offset = event.clientX - pointerStartXRef.current;

      if (Math.abs(offset) > 4) {
        didDragRef.current = true;
      }

      setDragOffset(offset);
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!isDragging || pointerIdRef.current !== event.pointerId) return;

      const offset = event.clientX - pointerStartXRef.current;
      const threshold = Math.min(
        90,
        Math.max(44, metrics.cardWidth * 0.26)
      );

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      setIsDragging(false);
      setDragOffset(0);
      pointerIdRef.current = null;

      if (Math.abs(offset) > threshold) {
        const moveCount = Math.max(
          1,
          Math.round(Math.abs(offset) / Math.max(metrics.cardStep, 1))
        );

        goToPosition(
          positionRef.current + (offset < 0 ? moveCount : -moveCount)
        );
      }

      window.setTimeout(() => {
        didDragRef.current = false;
      }, 0);
    },
    [goToPosition, isDragging, metrics.cardStep, metrics.cardWidth]
  );

  const handlePointerCancel = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (pointerIdRef.current === event.pointerId) {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }

        pointerIdRef.current = null;
        didDragRef.current = false;
        setIsDragging(false);
        setDragOffset(0);
      }
    },
    []
  );

  const handleTrackTransitionEnd = useCallback(
    (event: ReactTransitionEvent<HTMLDivElement>) => {
      if (
        event.target !== event.currentTarget ||
        event.propertyName !== "transform"
      ) {
        return;
      }

      normalizePosition();
    },
    [normalizePosition]
  );

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
          />
        </div>

        <motion.div
          className="client-roadshow-logo-panel"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.1 }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onFocus={() => setIsHovering(true)}
          onBlur={() => setIsHovering(false)}
        >
          {showCarouselControls && (
            <>
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
            </>
          )}

          <div className="client-roadshow-logo-fade left" />
          <div className="client-roadshow-logo-fade right" />

          <div
            className={`client-roadshow-logo-window ${
              isDragging ? "dragging" : ""
            }`}
            ref={logoWindowRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            <div
              className="client-roadshow-logo-track"
              ref={logoTrackRef}
              style={{
                transform: `translate3d(${trackX}px, 0, 0)`,
                transition:
                  isDragging || isJumping || shouldReduceMotion
                    ? "none"
                    : "transform 620ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              onTransitionEnd={handleTrackTransitionEnd}
            >
              {extendedLogos.map((logo, index) => {
                const realIndex = index % logos.length;
                const isActive = activeIndex === realIndex;

                return (
                  <motion.button
                    type="button"
                    className={`client-roadshow-logo-card ${
                      isActive ? "active" : ""
                    }`}
                    key={`${logo.name}-${index}`}
                    ref={(element) => {
                      if (index === 0) {
                        firstLogoCardRef.current = element;
                      }
                    }}
                    onClick={() => {
                      if (didDragRef.current) return;
                      goToLogo(realIndex);
                    }}
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

          {showCarouselControls && totalPages > 1 && (
            <div className="client-roadshow-logo-dots">
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <button
                  type="button"
                  key={pageIndex}
                  className={activePage === pageIndex ? "active" : ""}
                  onClick={() => goToLogo(pageIndex * LOGOS_PER_DOT)}
                  aria-label={`Go to client logo group ${pageIndex + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>

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