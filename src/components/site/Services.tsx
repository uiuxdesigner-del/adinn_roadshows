/* eslint-disable */
// @ts-nocheck
"use client";

import { Reveal } from "./Reveal";
import "./Services.css";
import { BleedButton } from "./BleedButton";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  MapPin,
  Monitor,
  Power,
  RefreshCw,
  Truck,
  Volume2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import vehiclesData from "../../data/vehicles.json";

type CategoryType = "led" | "flex" | "hybrid";

const UI_CATEGORY_BY_ID: Record<number, CategoryType> = {
  1: "flex",
  2: "flex",
  4: "hybrid",
  5: "led",
  6: "led",
  7: "led",
  8: "led",
};

const VEHICLES = (vehiclesData as any[])
  .filter((v) => v && typeof v.id === "number" && !v.hide)
  .map((v) => ({ ...v, uiCategory: UI_CATEGORY_BY_ID[v.id] }))
  .filter((v) => Boolean(v.uiCategory));

const wrapFrame = (index: number, total: number) => {
  if (!total) return 0;
  return ((index % total) + total) % total;
};

const formatCurrency = (value?: number | string | null) => {
  if (!value) return "";
  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) return String(value);
  return `₹${numberValue.toLocaleString("en-IN")}`;
};

const formatPdfMoney = (value?: number | string | null) => {
  if (!value) return "";
  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) return normalizePdfText(value);
  return `Rs. ${numberValue.toLocaleString("en-IN")}`;
};

const normalizePdfText = (value: any) =>
  String(value ?? "")
    .replaceAll("₹", "Rs. ")
    .replaceAll("–", "-")
    .replaceAll("—", "-")
    .replaceAll("×", "x")
    .replaceAll("  ", " ")
    .trim();

const toFileName = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getSpecIcon = (label: string) => {
  const key = String(label || "").toLowerCase();

  if (key.includes("screen") || key.includes("led") || key.includes("display")) {
    return Monitor;
  }

  if (key.includes("power") || key.includes("genset")) {
    return Power;
  }

  if (key.includes("audio") || key.includes("sound") || key.includes("p.a")) {
    return Volume2;
  }

  return Truck;
};

const getAvailability = () => ["Chennai", "Rest of TN", "Other States"];

async function imageToDataUrl(src: string) {
  try {
    const response = await fetch(src);
    const blob = await response.blob();

    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return "";
  }
}

async function addImageSafe(
  pdf: any,
  src: string,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const dataUrl = await imageToDataUrl(src);
  if (!dataUrl) return;

  const img = new Image();
  img.src = dataUrl;

  await new Promise((resolve) => {
    img.onload = resolve;
    img.onerror = resolve;
  });

  if (!img.width || !img.height) return;

  const imageRatio = img.width / img.height;
  const boxRatio = w / h;

  let drawW = w;
  let drawH = h;

  if (imageRatio > boxRatio) {
    drawH = w / imageRatio;
  } else {
    drawW = h * imageRatio;
  }

  const drawX = x + (w - drawW) / 2;
  const drawY = y + (h - drawH) / 2;

  const format = dataUrl.includes("image/jpeg") ? "JPEG" : "PNG";
  pdf.addImage(dataUrl, format, drawX, drawY, drawW, drawH);
}

function drawRoundedCard(pdf: any, x: number, y: number, w: number, h: number) {
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(x, y, w, h, 18, 18, "F");
}

function drawWrappedText(
  pdf: any,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 99
) {
  const cleanText = normalizePdfText(text);
  const lines = pdf.splitTextToSize(cleanText, maxWidth).slice(0, maxLines);
  pdf.text(lines, x, y);
  return y + lines.length * lineHeight;
}

async function downloadVehicleBrochurePDF(vehicle: any, activeVariant: any | null) {
  const { jsPDF } = await import("jspdf");

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "a4",
  });

  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  const pricePerDay = activeVariant?.pricePerDay ?? vehicle.pricePerDay;
  const specs = activeVariant?.quickSpecs ?? vehicle.quickSpecs ?? [];
  const included = activeVariant?.included ?? vehicle.included ?? [];
  const addOns = vehicle.addOns ?? [];
  const images = Array.isArray(vehicle.images) ? vehicle.images : [];

  const pdfSpecs = [
    {
      label: "Vehicle Type",
      value: vehicle.type || vehicle.category || "Roadshow Vehicle",
    },
    ...specs,
  ].slice(0, 6);

  const featureItems = [...included, ...addOns].slice(0, 14);

  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageW, pageH, "F");

  pdf.setFillColor(246, 246, 246);
  pdf.roundedRect(28, 28, pageW - 56, pageH - 56, 24, 24, "F");

  drawRoundedCard(pdf, 52, 52, pageW - 104, 250);

  pdf.setFillColor(17, 17, 17);
  pdf.roundedRect(78, 78, 120, 28, 14, 14, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.text(normalizePdfText(vehicle.category || "Vehicle").toUpperCase(), 96, 96);

  pdf.setTextColor(17, 17, 17);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(32);

  const titleLines = pdf.splitTextToSize(
    normalizePdfText(vehicle.name || "Vehicle Brochure"),
    340
  );
  pdf.text(titleLines, 78, 146);

  pdf.setTextColor(88, 88, 88);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  drawWrappedText(pdf, vehicle.shortDescription || "", 78, 220, 350, 14, 3);

  if (vehicle.highlight) {
    pdf.setTextColor(17, 17, 17);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    drawWrappedText(pdf, vehicle.highlight, 78, 264, 360, 12, 2);
  }

  if (pricePerDay) {
    pdf.setFillColor(17, 17, 17);
    pdf.roundedRect(78, 282, 158, 34, 16, 16, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text(`${formatPdfMoney(pricePerDay)} / day`, 94, 304);
  }

  pdf.setFillColor(238, 238, 238);
  pdf.roundedRect(470, 76, 290, 190, 18, 18, "F");

  if (images[0]) {
    await addImageSafe(pdf, images[0], 500, 98, 230, 145);
  }

  drawRoundedCard(pdf, 52, 326, 355, 172);
  drawRoundedCard(pdf, 430, 326, pageW - 482, 172);

  pdf.setTextColor(17, 17, 17);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("Vehicle Specifications", 76, 358);
  pdf.text("Key Features", 454, 358);

  pdfSpecs.forEach((spec: any, index: number) => {
    const col = index % 2;
    const row = Math.floor(index / 2);

    const x = 76 + col * 158;
    const y = 380 + row * 43;

    pdf.setFillColor(246, 246, 246);
    pdf.roundedRect(x, y, 142, 34, 9, 9, "F");

    pdf.setTextColor(112, 112, 112);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7);
    pdf.text(normalizePdfText(spec.label || "").toUpperCase(), x + 10, y + 12);

    pdf.setTextColor(17, 17, 17);
    pdf.setFontSize(9);
    const specText = pdf.splitTextToSize(normalizePdfText(spec.value || "-"), 118);
    pdf.text(specText.slice(0, 1), x + 10, y + 26);
  });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);

  featureItems.forEach((item: string, index: number) => {
    const col = index >= 7 ? 1 : 0;
    const row = index % 7;

    const x = 454 + col * 175;
    const y = 382 + row * 19;

    pdf.setTextColor(17, 17, 17);
    pdf.setFont("helvetica", "bold");
    pdf.text("-", x, y);

    pdf.setTextColor(64, 64, 64);
    pdf.setFont("helvetica", "normal");

    const text = pdf.splitTextToSize(normalizePdfText(item), 145);
    pdf.text(text[0], x + 12, y);
  });

  pdf.setTextColor(120, 120, 120);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.text("Adinn Roadshow Vehicle Brochure", 60, pageH - 30);
  pdf.text("On-ground. On-time. On-brand.", pageW - 210, pageH - 30);

  if (images.length > 1) {
    pdf.addPage("a4", "landscape");

    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageW, pageH, "F");

    pdf.setFillColor(246, 246, 246);
    pdf.roundedRect(28, 28, pageW - 56, pageH - 56, 24, 24, "F");

    pdf.setTextColor(17, 17, 17);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(28);
    pdf.text("Vehicle Image Gallery", 54, 76);

    pdf.setTextColor(92, 92, 92);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.text(normalizePdfText(vehicle.name), 54, 98);

    const gallery = images.slice(0, 4);

    for (let i = 0; i < gallery.length; i++) {
      const col = i % 2;
      const row = Math.floor(i / 2);

      const x = 54 + col * 382;
      const y = 126 + row * 190;

      drawRoundedCard(pdf, x, y, 350, 160);
      pdf.setFillColor(240, 240, 240);
      pdf.roundedRect(x + 16, y + 18, 318, 118, 14, 14, "F");

      await addImageSafe(pdf, gallery[i], x + 34, y + 28, 282, 98);

      pdf.setTextColor(100, 100, 100);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.text(`Angle ${i + 1}`, x + 18, y + 146);
    }

    pdf.setTextColor(120, 120, 120);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.text("Adinn Roadshow Vehicle Brochure", 60, pageH - 30);
    pdf.text("Vehicle visuals and specifications", pageW - 230, pageH - 30);
  }

  pdf.save(`${toFileName(vehicle.name || "vehicle")}-brochure.pdf`);
}

export function Services() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryType>("led");
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);

  const activeProducts = useMemo(
    () => VEHICLES.filter((v) => v.uiCategory === activeCategory),
    [activeCategory]
  );

  const handleCategoryChange = (category: CategoryType) => {
    if (activeCategory === category) return;

    setActiveCategory(category);

    requestAnimationFrame(() => {
      carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    });
  };

  const moveCarousel = (direction: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;

    const card = el.querySelector("article") as HTMLElement | null;
    const track = el.querySelector(".services-card-track") as HTMLElement | null;

    if (!card || !track) return;

    const gap = parseFloat(window.getComputedStyle(track).columnGap || "40") || 40;
    const cardWidth = card.getBoundingClientRect().width;
    const distance = cardWidth + gap;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const current = el.scrollLeft;

    if (direction === "right") {
      if (current >= maxScroll - 8) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: distance, behavior: "smooth" });
      }
    } else {
      if (current <= 8) {
        el.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        el.scrollBy({ left: -distance, behavior: "smooth" });
      }
    }
  };

  return (
    <section id="services" className="section-pad bg-surface-muted overflow-hidden">
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
            <div className="relative flex w-fit rounded-full bg-white p-1.5 shadow-[0_18px_60px_rgba(0,0,0,0.06)]">
              <span
                className={`
                  pointer-events-none absolute left-1.5 top-1.5 z-0
                  h-[calc(100%-12px)] w-[125px] rounded-full bg-black
                  shadow-[0_14px_34px_rgba(0,0,0,0.20)]
                  transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]
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
                  relative z-10 h-14 min-w-[125px] rounded-full px-5 text-[14px]
                  font-semibold transition-colors duration-500 sm:min-w-[145px] sm:text-[15px]
                  ${activeCategory === "led" ? "text-white" : "text-black/50 hover:text-black"}
                `}
              >
                LED Vehicles
              </button>

              <button
                type="button"
                aria-pressed={activeCategory === "flex"}
                onClick={() => handleCategoryChange("flex")}
                className={`
                  relative z-10 h-14 min-w-[125px] rounded-full px-5 text-[14px]
                  font-semibold transition-colors duration-500 sm:min-w-[145px] sm:text-[15px]
                  ${activeCategory === "flex" ? "text-white" : "text-black/50 hover:text-black"}
                `}
              >
                Flex Branding
              </button>

              <button
                type="button"
                aria-pressed={activeCategory === "hybrid"}
                onClick={() => handleCategoryChange("hybrid")}
                className={`
                  relative z-10 h-14 min-w-[125px] rounded-full px-5 text-[14px]
                  font-semibold transition-colors duration-500 sm:min-w-[145px] sm:text-[15px]
                  ${activeCategory === "hybrid" ? "text-white" : "text-black/50 hover:text-black"}
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
            ml-[16px] overflow-x-auto pr-6 [scrollbar-width:none]
            md:ml-[40px] md:pr-10
            lg:ml-[max(100px,calc((100vw-1440px)/2))]
            lg:pr-[max(100px,calc((100vw-1440px)/2))]
            [&::-webkit-scrollbar]:hidden
          "
        >
          <div className="services-card-track flex gap-10 pb-4">
            {activeProducts.map((s, i) => (
              <Reveal key={`${activeCategory}-${s.id}`} delay={i}>
                <article
                  onClick={() => setSelectedVehicle(s)}
                  className="
                    card-premium group flex min-h-[450px] w-[300px] shrink-0
                    cursor-pointer flex-col overflow-hidden md:w-[360px] lg:w-[390px]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-white" >
                    <img
                      src={s.images?.[0]}
                      alt={s.name}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="
                      ServicesCardImages
                        h-full w-full object-contain transition-transform
                        duration-[1600ms] ease-[cubic-bezier(.16,1,.3,1)]
                        group-hover:scale-[1.04]
                      "
                    />
                  </div>

                  <div className="flex flex-col px-6 pt-5 pb-4">
                    <h3 className="font-display text-xl font-semibold">{s.name}</h3>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {s.shortDescription}
                    </p>

                    <div className="pt-4" onClick={(e) => e.stopPropagation()}>
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
            mt-8 flex justify-end gap-3 pr-6 md:pr-10
            lg:pr-[max(100px,calc((100vw-1440px)/2))]
          "
        >
          <BleedButton onClick={() => moveCarousel("left")} className="bleed-icon-button">
            <ChevronLeft className="size-7" />
          </BleedButton>

          <BleedButton onClick={() => moveCarousel("right")} className="bleed-icon-button">
            <ChevronRight className="size-7" />
          </BleedButton>
        </div>
      </div>

      {selectedVehicle && (
        <VehicleModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </section>
  );
}

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
  const [autoRotate, setAutoRotate] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef = useRef({ x: 0, index: 0 });

  const images: string[] =
    Array.isArray(vehicle.images) && vehicle.images.length > 0
      ? vehicle.images
      : [];

  const activeVariant = hasVariants
    ? vehicle.variants.find((v: any) => v.id === variantId) ?? vehicle.variants[0]
    : null;

  const specs: any[] = activeVariant?.quickSpecs ?? vehicle.quickSpecs ?? [];
  const included: string[] = activeVariant?.included ?? vehicle.included ?? [];
  const pricePerDay = activeVariant?.pricePerDay ?? vehicle.pricePerDay;

  const modalSpecs = [
    {
      label: "Vehicle Type",
      value: vehicle.type || vehicle.category || "Roadshow Vehicle",
    },
    ...specs,
  ].slice(0, 4);

  const nextImage = useCallback(() => {
    if (!images.length) return;
    setActiveImage((prev) => wrapFrame(prev + 1, images.length));
  }, [images.length]);

  const prevImage = useCallback(() => {
    if (!images.length) return;
    setActiveImage((prev) => wrapFrame(prev - 1, images.length));
  }, [images.length]);

  const handleClose = useCallback(() => {
    setShow(false);
    window.setTimeout(onClose, 260);
  }, [onClose]);

  useEffect(() => {
    setShow(true);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    const prevOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [handleClose, nextImage, prevImage]);

  useEffect(() => {
    setActiveImage(0);
    setAutoRotate(false);
  }, [vehicle.id]);

  useEffect(() => {
    if (!autoRotate || images.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveImage((prev) => wrapFrame(prev + 1, images.length));
    }, 760);

    return () => window.clearInterval(timer);
  }, [autoRotate, images.length]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (images.length <= 1) return;

    setIsDragging(true);
    setAutoRotate(false);

    dragStartRef.current = {
      x: e.clientX,
      index: activeImage,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || images.length <= 1) return;

    const diff = e.clientX - dragStartRef.current.x;
    const frameShift = Math.trunc(diff / 24);

    if (frameShift !== 0) {
      setActiveImage(wrapFrame(dragStartRef.current.index - frameShift, images.length));
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleDownloadBrochure = async () => {
    try {
      setIsDownloading(true);
      await downloadVehicleBrochurePDF(vehicle, activeVariant);
    } catch (error) {
      console.error("PDF download failed:", error);
      alert("PDF download failed. Please check vehicle image paths and try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className={`vehicle-modal-overlay ${show ? "is-visible" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`vehicle-modal-shell ${show ? "is-visible" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={handleClose}
          className="vehicle-modal-close"
        >
          <X size={22} />
        </button>

        <div className="vehicle-modal-content">
          <aside className="vehicle-modal-media">
            {/* <div className="vehicle-modal-thumbs">
              {images.map((img, index) => (
                <button
                  key={`${img}-${index}`}
                  type="button"
                  className={activeImage === index ? "active" : ""}
                  onClick={() => {
                    setAutoRotate(false);
                    setActiveImage(index);
                  }}
                  aria-label={`View vehicle image ${index + 1}`}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div> */}

            <div
              className={`vehicle-image-stage ${isDragging ? "dragging" : ""}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              <span className="vehicle-image-orbit" />
              <span className="vehicle-image-road" />
              <span className="vehicle-image-glow" />

              {/* {images.length > 1 && (
                <button
                  type="button"
                  className="vehicle-image-nav left"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
              )} */}

              {images[activeImage] ? (
                <img
                  key={`${vehicle.id}-${activeImage}`}
                  src={images[activeImage]}
                  alt={vehicle.name}
                  draggable={false}
                  className="vehicle-main-image"
                />
              ) : (
                <div className="vehicle-no-image">Vehicle Image</div>
              )}

              {/* {images.length > 1 && (
                <button
                  type="button"
                  className="vehicle-image-nav right"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
              )} */}


              {/* <div className="vehicle-image-dots">
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={activeImage === index ? "active" : ""}
                    onClick={() => {
                      setAutoRotate(false);
                      setActiveImage(index);
                    }}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div> */}
            </div>
          </aside>

          <main className="vehicle-modal-details">
            <div className="vehicle-category-pill">{vehicle.category}</div>

            <h3>{vehicle.name}</h3>

            <p className="vehicle-modal-description">{vehicle.shortDescription}</p>

            {vehicle.highlight && (
              <div className="vehicle-highlight-box">{vehicle.highlight}</div>
            )}

            {hasVariants && (
              <div className="vehicle-variant-block">
                <div className="vehicle-small-label">Choose KM plan</div>

                <div className="vehicle-variant-list">
                  {vehicle.variants.map((variant: any) => (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setVariantId(variant.id)}
                      className={variantId === variant.id ? "active" : ""}
                    >
                      {variant.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="vehicle-spec-grid">
              {modalSpecs.map((spec, index) => {
                const Icon = getSpecIcon(spec.label);

                return (
                  <div className="vehicle-spec-card" key={`${spec.label}-${index}`}>
                    <span>
                      <Icon size={18} />
                    </span>

                    <div>
                      <small>{spec.label}</small>
                      <strong>{spec.value}</strong>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="vehicle-details-grid">
              {included.length > 0 && (
                <section>
                  <h4>Key Features</h4>

                  <ul className="vehicle-feature-list">
                    {included.map((item, index) => (
                      <li key={`${item}-${index}`}>
                        <Check size={15} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section className="vehicle-available-card">
                <h4>Available In</h4>

                <ul>
                  {getAvailability().map((item) => (
                    <li key={item}>
                      <MapPin size={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {Array.isArray(vehicle.addOns) && vehicle.addOns.length > 0 && (
              <section className="vehicle-addon-section">
                <h4>Add-ons & Notes</h4>

                <div className="vehicle-addon-list">
                  {vehicle.addOns.map((item: string, index: number) => (
                    <span key={`${item}-${index}`}>{item}</span>
                  ))}
                </div>
              </section>
            )}

            {vehicle.brandingStatus && (
              <div className="vehicle-branding-note">{vehicle.brandingStatus}</div>
            )}
          </main>
        </div>

        <footer className="vehicle-modal-footer">
          <div className="vehicle-price-box">
            <span>Starting at</span>

            <strong>
              {pricePerDay ? formatCurrency(pricePerDay) : "Custom"}
              {pricePerDay && <small> / day</small>}
            </strong>

            {vehicle.packageTotal && <p>{vehicle.packageTotal}</p>}
          </div>

          <div className="vehicle-modal-actions">
            <button
              type="button"
              className="vehicle-download-btn"
              onClick={handleDownloadBrochure}
              disabled={isDownloading}
            >
              <Download size={18} />
              {isDownloading ? "Preparing PDF..." : "Download Brochure"}
            </button>

            {/* <BleedButton href="#contact" onClick={handleClose}>
              Enquire Now
              <ArrowRight size={18} />
            </BleedButton> */}
          </div>
        </footer>
      </div>
    </div>
  );
}