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
import { ContactForm } from "@/components/site/ContactForm";
import Footer from "@/components/site/Footer";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showLoader, setShowLoader] = useState(true);
  const [videoBlocked, setVideoBlocked] = useState(false);

  useEffect(() => {
    const loaderTimer = window.setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    return () => {
      window.clearTimeout(loaderTimer);
    };
  }, []);

  const setLoaderVideoRef = (node: HTMLVideoElement | null) => {
    videoRef.current = node;

    if (!node) return;

    node.muted = true;
    node.defaultMuted = true;
    node.playsInline = true;
    node.controls = false;

    node.setAttribute("muted", "");
    node.setAttribute("playsinline", "");
    node.setAttribute("webkit-playsinline", "");
  };

  useEffect(() => {
    if (!showLoader) return;

    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const playVideo = async () => {
      try {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;

        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");

        video.currentTime = 0;
        await video.play();
      } catch {
        if (!cancelled) {
          setVideoBlocked(true);
        }
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("loadeddata", playVideo, { once: true });
    }

    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", playVideo);
    };
  }, [showLoader]);

  if (showLoader) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#030303]">
        {!videoBlocked ? (
          <video
            ref={setLoaderVideoRef}
            src="/assets/loader-ios.mp4"
            poster="/assets/loader-poster.png"
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            disablePictureInPicture
            controls={false}
            onError={() => setVideoBlocked(true)}
            className="loader-video pointer-events-none h-auto max-h-[72vh] w-[78vw] max-w-[920px] object-contain md:w-[85vw]"
          />
        ) : (
          <img
            src="/assets/loader-poster.png"
            alt="Loading"
            className="h-auto max-h-[72vh] w-[78vw] max-w-[920px] object-contain md:w-[85vw]"
          />
        )}
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
        <ContactForm />
        <Footer />
      </main>
    </SmoothScroll>
  );
}