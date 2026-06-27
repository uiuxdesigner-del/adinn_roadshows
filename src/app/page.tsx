"use client";

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
import  Footer  from "@/components/site/Footer";

export default function Home() {
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
