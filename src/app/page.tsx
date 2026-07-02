"use client";

import { useEffect, useState } from "react";

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
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const loaderTimer = window.setTimeout(() => {
      setShowLoader(true);
    }, 5000);

    return () => {
      // window.clearTimeout(loaderTimer);
    };
  }, []);

  if (showLoader) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
        <video
          src="/assets/loader.webm"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          className="h-auto max-h-[150vh] w-[78vw] max-w-[920px] object-contain md:w-[85vw]"
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