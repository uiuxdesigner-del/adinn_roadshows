"use client";

import { useEffect, useRef, useState } from "react";

import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { WhyChoose } from "@/components/site/WhyChoose";
import { GPSTracking } from "@/components/site/GPSTracking";
import { Coverage } from "@/components/site/Coverage";
import { UseCases } from "@/components/site/UseCases";
import { ClientLogos } from "@/components/site/ClientLogos";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
// import { CTABanner } from "@/components/site/CTABanner";
import { ContactForm } from "@/components/site/ContactForm";
import Footer from "@/components/site/Footer";

const LOADER_DURATION_MS = 3000;

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showLoader, setShowLoader] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const loaderTimer = window.setTimeout(() => {
      setShowLoader(false);
    }, LOADER_DURATION_MS);

    return () => {
      window.clearTimeout(loaderTimer);
    };
  }, []);

  useEffect(() => {
    if (!showLoader) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;

    video.setAttribute("muted", "true");
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("autoplay", "true");

    const tryPlay = async () => {
      try {
        video.load();
        video.currentTime = 0;

        const playPromise = video.play();

        if (playPromise !== undefined) {
          await playPromise;
        }

        setIsVideoPlaying(true);
      } catch {
        setIsVideoPlaying(false);
      }
    };

    const playDelay = window.setTimeout(tryPlay, 80);

    return () => {
      window.clearTimeout(playDelay);
    };
  }, [showLoader]);

  if (showLoader) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#030303]">
        {!isVideoPlaying && (
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
              Loading
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          disablePictureInPicture
          controls={false}
          onPlaying={() => setIsVideoPlaying(true)}
          onCanPlay={() => {
            videoRef.current?.play().catch(() => {});
          }}
          className={`h-auto max-h-[72vh] w-[78vw] max-w-[920px] object-contain transition-opacity duration-300 md:w-[85vw] ${
            isVideoPlaying ? "opacity-100" : "pointer-events-none absolute opacity-0"
          }`}
        >
          <source src="/assets/loader.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-background text-foreground">
        <Header />
        <Hero />
        <About />
        <Services />
        <Process />
        <WhyChoose />
        <GPSTracking />
        <Coverage />
        <UseCases />
        <ClientLogos />
        <Testimonials />
        <FAQ />
        {/* <CTABanner /> */}
        <ContactForm />
        <Footer />
      </main>
    </SmoothScroll>
  );
}