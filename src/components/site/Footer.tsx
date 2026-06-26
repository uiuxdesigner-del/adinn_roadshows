// /* eslint-disable */
// // @ts-nocheck
// "use client";

// import React, { useRef, useState } from "react";
// import "./Footer.css";
// import Image from "next/image";
// import emailjs from "@emailjs/browser";

// // ── EmailJS credentials (reuse same service + public key, different template) ──
// const EMAILJS_SERVICE_ID       = "service_m7blrwk";
// const EMAILJS_PUBLIC_KEY       = "0LqsQAkcgAOP2XMOe";
// const NEWSLETTER_TEMPLATE_ID   = "template_jg2dlpo"; 

// // ── Validation helpers ──────────────────────────────────────────────────────
// const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
// const isValidPhone = (v: string) => /^[6-9]\d{9}$/.test(v.replace(/\s+/g, "").replace(/^\+91/, ""));

// type NLStatus = "idle" | "loading" | "success" | "error";

// function Footer() {
//   const [value, setValue]   = useState("");
//   const [nlError, setNlError] = useState("");
//   const [nlStatus, setNlStatus] = useState<NLStatus>("idle");

//   const handleSubscribe = async () => {
//     setNlError("");

//     const trimmed = value.trim();
//     if (!trimmed) {
//       setNlError("Enter your email or phone number.");
//       return;
//     }

//     const looksLikePhone = /^\d/.test(trimmed.replace(/^\+91/, "").replace(/\s/g, ""));

//     if (looksLikePhone) {
//       const phone = trimmed.replace(/\s+/g, "").replace(/^\+91/, "");
//       if (!isValidPhone(trimmed)) {
//         setNlError("Enter a valid 10-digit phone number.");
//         return;
//       }
//     } else {
//       if (!isValidEmail(trimmed)) {
//         setNlError("Enter a valid email address.");
//         return;
//       }
//     }

//     setNlStatus("loading");

//     try {
//       await emailjs.send(
//         EMAILJS_SERVICE_ID,
//         NEWSLETTER_TEMPLATE_ID,
//         {
//           subscriber:   trimmed,
//           type:         isValidEmail(trimmed) ? "Email" : "Phone",
//           subscribedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
//         },
//         EMAILJS_PUBLIC_KEY
//       );

//       setNlStatus("success");
//       setValue("");
//       setTimeout(() => setNlStatus("idle"), 4000);
//     } catch (err) {
//       console.error("Newsletter EmailJS error:", err);
//       setNlStatus("error");
//       setNlError("Could not subscribe. Please try again.");
//       setTimeout(() => setNlStatus("idle"), 3000);
//     }
//   };

//   return (
//     <footer className="FooterMain text-white" style={{background:'black'}}>

//       {/* ── Animated road line ── */}
//       <div className="FooterRoadLine" aria-hidden="true">
//         <div className="FooterRoadLinePulse" />
//       </div>

//       {/* ── Top CTA Banner ── */}
//       {/* ✅ CHANGE: href changed from "/contact" to "#contact" so it scrolls on the same page */}
//       <div className="FooterCTAMain flex flex-col md:flex-row items-start md:items-center justify-around px-[5%] py-6 md:py-10 gap-4 md:gap-6">
//         <div>
//           <div className="FooterCTAContent1 leading-tight">
//             Launch your campaign now.
//           </div>
//           <div className="FooterCTAContent2 mt-1">
//             Quick setup, instant visibility.
//           </div>
//         </div>
//         {/* ✅ CHANGE: was href="/contact" — now scrolls to #contact section on same page */}
        
//          <a
//                     href="#contact"
//                     className="FooterCTAButton shrink-0 md:shrink-0 w-full md:w-auto text-center hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap block"
//                 >
//                     Reach Us
//                 </a>
//       </div>

//       {/* ── Main Footer Content ── */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 px-[5%] md:px-[10%] lg:px-[15%] py-8 md:py-12">
//         <div className="flex flex-col gap-4 md:gap-5 sm:col-span-2 md:col-span-1 FooterMainContentCol1">
//           <Image
//             src="/assets/Roadshow_AdinnLogo_WithoutBg.svg"
//             alt="Roadshow Logo"
//             className="FooterCol1Logo"
//             width={200}
//             height={60}
//             priority
//           />

//           {/* Social Icons */}
//           <div className="flex items-center FooterCol1Social">
//             {[
//               { src: "/assets/RS_Footer_Insta.svg",    alt: "Instagram", link: "https://www.instagram.com/adinnroadshows_/" },
//               { src: "/assets/RS_Footer_FB.svg",        alt: "Facebook",  link: "https://www.facebook.com/adinnroadshow" },
//               { src: "/assets/RS_Footer_Twitter.svg",   alt: "Twitter",   link: "https://x.com/AdinnRoadshow" },
//               { src: "/assets/RS_Footer_LinkedIn.svg",  alt: "LinkedIn",  link: "https://www.linkedin.com/company/adinn-roadshows/" },
//             ].map(({ src, alt, link }) => (
//               <a key={alt} href={link} aria-label={alt} target="_blank" rel="noreferrer" className="FooterSocialIcon">
//                 <Image src={src} alt={alt} className="FooterCol1SocialIcon" width={0} height={0} />
//               </a>
//             ))}
//           </div>

//           {/* Phone & Email */}
//           <div className="FooterCol1Contact">
//             <div className="flex items-center gap-2 flex-wrap">
//               <a href="tel:7373785057" style={{ textDecoration: "none" }}>+91 73737 85057</a>
//               <span>|</span>
//               <a href="tel:9626987861" style={{ textDecoration: "none" }}>+91 96269 87861</a>
//             </div>
//             <a href="mailto:ba@adinn.co.in" style={{ textDecoration: "none" }}>ba@adinn.co.in</a>
//           </div>

//           {/* ── Newsletter ── */}
//           {/* ✅ CHANGE: full newsletter block replaced with validation + EmailJS */}
//           <div>
//             <p className="mb-2 FooterCol1Newsletter">Get notified upon new Updates</p>

//             <div className={`RA_RightContent2Main flex gap-5 items-center bg-white rounded-full overflow-hidden pr-1 pl-4 py-1 w-full max-w-xs ${nlError ? "FooterNLError" : ""}`}>
//               <input
//                 type="text"
//                 value={value}
//                 onChange={(e) => { setValue(e.target.value); setNlError(""); }}
//                 onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
//                 placeholder="Your email or phone number"
//                 className="RA_RightContent2Input flex-1 bg-transparent text-black text-md outline-none placeholder-gray-400 min-w-0"
//                 disabled={nlStatus === "loading" || nlStatus === "success"}
//               />
//               <button
//                 onClick={handleSubscribe}
//                 disabled={nlStatus === "loading" || nlStatus === "success"}
//                 className="RA_RightContent2InpBtn transition-colors duration-200 rounded-full p-2 flex items-center justify-center flex-shrink-0"
//                 aria-label="Subscribe"
//               >
//                 {nlStatus === "loading" && <i className="fa-solid fa-spinner fa-spin" />}
//                 {nlStatus === "success"  && <i className="fa-solid fa-check" />}
//                 {(nlStatus === "idle" || nlStatus === "error") && <i className="fa-solid fa-chevron-right" />}
//               </button>
//             </div>

//             {/* Inline error */}
//             {nlError && (
//               <p className="FooterNLErrorMsg mt-1 text-xs flex items-center gap-1">
//                 <i className="fa-solid fa-circle-exclamation" style={{ fontSize: 11 }} />
//                 {nlError}
//               </p>
//             )}

//             {/* Success message */}
//             {nlStatus === "success" && (
//               <p className="FooterNLSuccessMsg mt-1 text-xs flex items-center gap-1">
//                 <i className="fa-solid fa-circle-check" style={{ fontSize: 11 }} />
//                 Subscribed! We'll keep you posted.
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Column 2 — Services */}
//         <div className="flex flex-col gap-2 md:gap-3">
//           <div className="mb-2 FooterCol23Heading">Services</div>
//           {["LED Screen Vehicle", "L-Type LED Vehicle", "3-Side LED Truck", "Customize Fabrication Vehicle"].map((service) => (
//             <div key={service} className="hover:text-white transition-colors duration-200 FooterCol23Contents">
//               {service}
//             </div>
//           ))}
//         </div>

//         {/* Column 3 — Addresses */}
//         <div className="flex flex-col gap-3 md:gap-4">
//           <div className="mb-2 FooterCol23Heading">Address</div>
//           <div className="FooterCol23Contents">
//             29, 1st Cross Street, Vanamamalai Nagar, By-pass Road,{" "}
//             <span className="FooterCol3LocationSpan">Madurai - 625 010.</span>
//           </div>
//           <div className="FooterCol23Contents">
//             No. 19/43, MG Chakrapani Street, Sathya Garden, Saligramam,{" "}
//             <span className="FooterCol3LocationSpan">Chennai - 600 092.</span>
//           </div>
//           <div className="FooterCol23Contents">
//             No. 407/8, 4th Cross, Jayanagar 7th Block, Opp-Saraswat Cooperative Bank,{" "}
//             <span className="FooterCol3LocationSpan">Bangalore - 560 070.</span>
//           </div>
//         </div>
//       </div>

//       {/* ── Bottom Bar ── */}
//       <div className="FooterContentDivider"> </div>
//       <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 md:gap-8 px-[5%] py-4 md:py-5 FooterBottomContents">
//         <a href="/#" className="hover:text-white transition-colors">Cookies Policy</a>
//         <a href="/#"   className="hover:text-white transition-colors">Legal Terms</a>
//         <a href="/#" className="hover:text-white transition-colors">Privacy Policy</a>
//       </div>
      

      
//     </footer>
//   );
// }

// export default Footer;




/* eslint-disable */
// @ts-nocheck
"use client";

import React, { useEffect, useRef, useState } from "react";
import "./Footer.css";
import Image from "next/image";
import emailjs from "@emailjs/browser";

// ── EmailJS credentials (reuse same service + public key, different template) ──
const EMAILJS_SERVICE_ID       = "service_m7blrwk";
const EMAILJS_PUBLIC_KEY       = "0LqsQAkcgAOP2XMOe";
const NEWSLETTER_TEMPLATE_ID   = "template_jg2dlpo";

// ── Validation helpers ──────────────────────────────────────────────────────
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isValidPhone = (v: string) => /^[6-9]\d{9}$/.test(v.replace(/\s+/g, "").replace(/^\+91/, ""));

type NLStatus = "idle" | "loading" | "success" | "error";

function Footer() {
  const [value, setValue]   = useState("");
  const [nlError, setNlError] = useState("");
  const [nlStatus, setNlStatus] = useState<NLStatus>("idle");

  // ✅ scroll-reveal: adds .footer-in-view when the footer scrolls into view
  const footerRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubscribe = async () => {
    setNlError("");

    const trimmed = value.trim();
    if (!trimmed) {
      setNlError("Enter your email or phone number.");
      return;
    }

    const looksLikePhone = /^\d/.test(trimmed.replace(/^\+91/, "").replace(/\s/g, ""));

    if (looksLikePhone) {
      const phone = trimmed.replace(/\s+/g, "").replace(/^\+91/, "");
      if (!isValidPhone(trimmed)) {
        setNlError("Enter a valid 10-digit phone number.");
        return;
      }
    } else {
      if (!isValidEmail(trimmed)) {
        setNlError("Enter a valid email address.");
        return;
      }
    }

    setNlStatus("loading");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        NEWSLETTER_TEMPLATE_ID,
        {
          subscriber:   trimmed,
          type:         isValidEmail(trimmed) ? "Email" : "Phone",
          subscribedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        },
        EMAILJS_PUBLIC_KEY
      );

      setNlStatus("success");
      setValue("");
      setTimeout(() => setNlStatus("idle"), 4000);
    } catch (err) {
      console.error("Newsletter EmailJS error:", err);
      setNlStatus("error");
      setNlError("Could not subscribe. Please try again.");
      setTimeout(() => setNlStatus("idle"), 3000);
    }
  };

  return (
    <footer
      ref={footerRef}
      className={`FooterMain text-white ${inView ? "footer-in-view" : ""}`}
      style={{ background: "black" }}
    >

      {/* ── Animated road line ── */}
      <div className="FooterRoadLine" aria-hidden="true">
        <div className="FooterRoadLinePulse" />
      </div>

      {/* ── Top CTA Banner ── */}
      <div
        className="FooterCTAMain footer-reveal flex flex-col md:flex-row items-start md:items-center justify-around px-[5%] py-6 md:py-10 gap-4 md:gap-6"
        style={{ animationDelay: "0s" }}
      >
        <div>
          <div className="FooterCTAContent1 leading-tight">
            Launch your campaign now.
          </div>
          <div className="FooterCTAContent2 mt-1">
            Quick setup, instant visibility.
          </div>
        </div>

        <a
          href="#contact"
          className="FooterCTAButton shrink-0 md:shrink-0 w-full md:w-auto text-center hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap block"
        >
          Reach Us
        </a>
      </div>

      {/* ── Main Footer Content ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 px-[5%] md:px-[10%] lg:px-[15%] py-8 md:py-12">
        <div
          className="footer-reveal flex flex-col gap-4 md:gap-5 sm:col-span-2 md:col-span-1 FooterMainContentCol1"
          style={{ animationDelay: "0.1s" }}
        >
          <Image
            src="/assets/Roadshow_AdinnLogo_WithoutBg.svg"
            alt="Roadshow Logo"
            className="FooterCol1Logo"
            width={200}
            height={60}
            priority
          />

          {/* Social Icons */}
          <div className="flex items-center FooterCol1Social">
            {[
              { src: "/assets/RS_Footer_Insta.svg",    alt: "Instagram", link: "https://www.instagram.com/adinnroadshows_/" },
              { src: "/assets/RS_Footer_FB.svg",        alt: "Facebook",  link: "https://www.facebook.com/adinnroadshow" },
              { src: "/assets/RS_Footer_Twitter.svg",   alt: "Twitter",   link: "https://x.com/AdinnRoadshow" },
              { src: "/assets/RS_Footer_LinkedIn.svg",  alt: "LinkedIn",  link: "https://www.linkedin.com/company/adinn-roadshows/" },
            ].map(({ src, alt, link }) => (
              <a key={alt} href={link} aria-label={alt} target="_blank" rel="noreferrer" className="FooterSocialIcon">
                <Image src={src} alt={alt} className="FooterCol1SocialIcon" width={0} height={0} />
              </a>
            ))}
          </div>

          {/* Phone & Email */}
          <div className="FooterCol1Contact">
            <div className="flex items-center gap-2 flex-wrap">
              <a href="tel:7373785057" style={{ textDecoration: "none" }}>+91 73737 85057</a>
              <span>|</span>
              <a href="tel:9626987861" style={{ textDecoration: "none" }}>+91 96269 87861</a>
            </div>
            <a href="mailto:ba@adinn.co.in" style={{ textDecoration: "none" }}>ba@adinn.co.in</a>
          </div>

          {/* ── Newsletter ── */}
          <div>
            <p className="mb-2 FooterCol1Newsletter">Get notified upon new Updates</p>

            <div className={`RA_RightContent2Main flex gap-5 items-center bg-white rounded-full overflow-hidden pr-1 pl-4 py-1 w-full max-w-xs ${nlError ? "FooterNLError" : ""}`}>
              <input
                type="text"
                value={value}
                onChange={(e) => { setValue(e.target.value); setNlError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                placeholder="Your email or phone number"
                className="RA_RightContent2Input flex-1 bg-transparent text-black text-md outline-none placeholder-gray-400 min-w-0"
                disabled={nlStatus === "loading" || nlStatus === "success"}
              />
              <button
                onClick={handleSubscribe}
                disabled={nlStatus === "loading" || nlStatus === "success"}
                className="RA_RightContent2InpBtn transition-colors duration-200 rounded-full p-2 flex items-center justify-center flex-shrink-0"
                aria-label="Subscribe"
              >
                {nlStatus === "loading" && <i className="fa-solid fa-spinner fa-spin" />}
                {nlStatus === "success"  && <i className="fa-solid fa-check" />}
                {(nlStatus === "idle" || nlStatus === "error") && <i className="fa-solid fa-chevron-right" />}
              </button>
            </div>

            {/* Inline error */}
            {nlError && (
              <p className="FooterNLErrorMsg mt-1 text-xs flex items-center gap-1">
                <i className="fa-solid fa-circle-exclamation" style={{ fontSize: 11 }} />
                {nlError}
              </p>
            )}

            {/* Success message */}
            {nlStatus === "success" && (
              <p className="FooterNLSuccessMsg mt-1 text-xs flex items-center gap-1">
                <i className="fa-solid fa-circle-check" style={{ fontSize: 11 }} />
                Subscribed! We'll keep you posted.
              </p>
            )}
          </div>
        </div>

        {/* Column 2 — Services */}
        <div className="footer-reveal flex flex-col gap-2 md:gap-3" style={{ animationDelay: "0.2s" }}>
          <div className="mb-2 FooterCol23Heading">Services</div>
          {["LED Screen Vehicle", "L-Type LED Vehicle", "3-Side LED Truck", "Customize Fabrication Vehicle"].map((service) => (
            <div key={service} className="FooterServiceItem transition-colors duration-200 FooterCol23Contents">
              {service}
            </div>
          ))}
        </div>

        {/* Column 3 — Addresses */}
        <div className="footer-reveal flex flex-col gap-3 md:gap-4" style={{ animationDelay: "0.3s" }}>
          <div className="mb-2 FooterCol23Heading">Address</div>
          <div className="FooterCol23Contents">
            29, 1st Cross Street, Vanamamalai Nagar, By-pass Road,{" "}
            <span className="FooterCol3LocationSpan">Madurai - 625 010.</span>
          </div>
          <div className="FooterCol23Contents">
            No. 19/43, MG Chakrapani Street, Sathya Garden, Saligramam,{" "}
            <span className="FooterCol3LocationSpan">Chennai - 600 092.</span>
          </div>
          <div className="FooterCol23Contents">
            No. 407/8, 4th Cross, Jayanagar 7th Block, Opp-Saraswat Cooperative Bank,{" "}
            <span className="FooterCol3LocationSpan">Bangalore - 560 070.</span>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="FooterContentDivider"> </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 md:gap-8 px-[5%] py-4 md:py-5 FooterBottomContents">
        <a href="/#" className="hover:text-white transition-colors">Cookies Policy</a>
        <a href="/#" className="hover:text-white transition-colors">Legal Terms</a>
        <a href="/#" className="hover:text-white transition-colors">Privacy Policy</a>
      </div>

    </footer>
  );
}

export default Footer;