"use client";

import { useEffect, useRef } from "react";

const heroVehicle = "/assets/HomeBanner_MainPageFinal.png";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;
    const glow = glowRef.current;
    const bg = bgRef.current;

    if (!hero || !image || !glow || !bg) return;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let frameId = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      targetX = x * 110;
      targetY = y * 90;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.105;
      currentY += (targetY - currentY) * 0.175;

      image.style.transform = `
        translate3d(${currentX}px, ${currentY}px, 0)
        rotateX(${-currentY * 0.11}deg)
        rotateY(${currentX * 0.11}deg)
        scale(1.04)
      `;

      glow.style.transform = `
        translate3d(${currentX * 0.55}px, ${currentY * 0.42}px, 0)
      `;

      bg.style.transform = `
        translate3d(${-currentX * 0.08}px, ${-currentY * 0.06}px, 0)
        scale(1.04)
      `;

      frameId = requestAnimationFrame(animate);
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);
    frameId = requestAnimationFrame(animate);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-black
        text-white
      "
    >
      <div
        ref={bgRef}
        className="
          absolute
          -inset-10
          bg-[linear-gradient(180deg,#000_0%,#020207_55%,#000_100%)]
          will-change-transform
        "
      />

      <div
        ref={glowRef}
        className="
          absolute
          left-1/2
          top-[62%]
          h-[580px]
          w-[1020px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(0,54,190,0.72)_0%,rgba(0,35,130,0.34)_38%,transparent_72%)]
          blur-2xl
          will-change-transform
        "
      />

      <div
        className="
          relative
          z-20
          mx-auto
          flex
          min-h-screen
          max-w-7xl
          flex-col
          items-center
          px-0
          pt-[200px]
          text-center
        "
      >
        <h1
          className="
            max-w-4xl
            text-[42px]
            font-semibold
            leading-[1.02]
            tracking-[-0.055em]
            md:text-[64px]
            lg:text-[50px]
          "
        >
          Launch roadshow campaigns that move with your audience.
        </h1>

        <div
          className="
            relative
            z-10
            mt-16
            flex
            w-full
            justify-center
            overflow-visible
            perspective-[1200px]
          "
        >
          <img
            ref={imageRef}
            src={heroVehicle}
            alt="ADINN roadshow vehicle"
            draggable={false}
            className="
              block
              w-[65vw]
              max-w-[1980px]
              min-w-[620px]
              select-none
              object-contain
              opacity-95
              will-change-transform
              origin-center
              drop-shadow-[0_45px_100px_rgba(0,60,255,0.35)]
            "
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[160px] bg-gradient-to-t from-black via-black/85 to-transparent" />
    </section>
  );
}