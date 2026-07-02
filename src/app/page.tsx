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

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const loaderTimer = window.setTimeout(() => {
      setShowLoader(false);
    }, 3000);

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

    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const playLoader = async () => {
      try {
        video.currentTime = 0;
        await video.play();
      } catch {
        // iOS Low Power Mode / browser policy may still block autoplay.
        // Loader will still close after 3 seconds.
      }
    };

    playLoader();
  }, [showLoader]);

  if (showLoader) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#030303]">
        <video
          ref={videoRef}
          src="/assets/loader.mp4"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          disablePictureInPicture
          controls={false}
          className="h-auto max-h-[72vh] w-[78vw] max-w-[920px] object-contain md:w-[85vw]"
        />
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