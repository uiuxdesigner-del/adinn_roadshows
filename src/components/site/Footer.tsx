// /* eslint-disable */
// // @ts-nocheck
// "use client";

// import React, { useEffect, useRef, useState } from "react";
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

//   // ✅ scroll-reveal: adds .footer-in-view when the footer scrolls into view
//   const footerRef = useRef<HTMLElement>(null);
//   const [inView, setInView] = useState(false);

//   useEffect(() => {
//     const el = footerRef.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setInView(true);
//           obs.disconnect();
//         }
//       },
//       { threshold: 0.12 }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);

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
//     <footer
//       ref={footerRef}
//       className={`FooterMain text-white ${inView ? "footer-in-view" : ""}`}
//       style={{ background: "black" }}
//     >

//       {/* ── Animated road line ── */}
//       <div className="FooterRoadLine" aria-hidden="true">
//         <div className="FooterRoadLinePulse" />
//       </div>

//       {/* ── Top CTA Banner ── */}
//       <div
//         className="FooterCTAMain footer-reveal flex flex-col md:flex-row items-start md:items-center justify-around px-[5%] py-6 md:py-10 gap-4 md:gap-6"
//         style={{ animationDelay: "0s" }}
//       >
//         <div>
//           <div className="FooterCTAContent1 leading-tight">
//             Launch your campaign now.
//           </div>
//           <div className="FooterCTAContent2 mt-1">
//             Quick setup, instant visibility.
//           </div>
//         </div>

//         <a
//           href="#contact"
//           className="FooterCTAButton shrink-0 md:shrink-0 w-full md:w-auto text-center hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap block"
//         >
//           Reach Us
//         </a>
//       </div>

//       {/* ── Main Footer Content ── */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 px-[5%] md:px-[10%] lg:px-[15%] py-8 md:py-12">
//         <div
//           className="footer-reveal flex flex-col gap-4 md:gap-5 sm:col-span-2 md:col-span-1 FooterMainContentCol1"
//           style={{ animationDelay: "0.1s" }}
//         >
// <Image
//   src="/assets/Roadshow_AdinnLogo_WithoutBg.svg"
//   alt="Roadshow Logo"
//   className="FooterCol1Logo"
//   width={200}
//   height={60}
//   priority
// />

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
//         <div className="footer-reveal flex flex-col gap-2 md:gap-3" style={{ animationDelay: "0.2s" }}>
//           <div className="mb-2 FooterCol23Heading">Services</div>
//           {["LED Screen Vehicle", "L-Type LED Vehicle", "3-Side LED Truck", "Customize Fabrication Vehicle"].map((service) => (
//             <div key={service} className="FooterServiceItem transition-colors duration-200 FooterCol23Contents">
//               {service}
//             </div>
//           ))}
//         </div>

//   {/* Column 3 — Addresses */}
//   <div className="footer-reveal flex flex-col gap-3 md:gap-4" style={{ animationDelay: "0.3s" }}>
//     <div className="mb-2 FooterCol23Heading">Address</div>
//     <div className="FooterCol23Contents">
//       29, 1st Cross Street, Vanamamalai Nagar, By-pass Road,{" "}
//       <span className="FooterCol3LocationSpan">Madurai - 625 010.</span>
//     </div>
//     <div className="FooterCol23Contents">
//       No. 19/43, MG Chakrapani Street, Sathya Garden, Saligramam,{" "}
//       <span className="FooterCol3LocationSpan">Chennai - 600 092.</span>
//     </div>
//     <div className="FooterCol23Contents">
//       No. 407/8, 4th Cross, Jayanagar 7th Block, Opp-Saraswat Cooperative Bank,{" "}
//       <span className="FooterCol3LocationSpan">Bangalore - 560 070.</span>
//     </div>
//   </div>
// </div>

//       {/* ── Bottom Bar ── */}
//       <div className="FooterContentDivider"> </div>
//       <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 md:gap-8 px-[5%] py-4 md:py-5 FooterBottomContents">
//         <a href="/#" className="hover:text-white transition-colors">Cookies Policy</a>
//         <a href="/#" className="hover:text-white transition-colors">Legal Terms</a>
//         <a href="/#" className="hover:text-white transition-colors">Privacy Policy</a>
//       </div>

//     </footer>
//   );
// }

// export default Footer;








"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import Image from "next/image";


import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Send,
  Loader2,
  CheckCircle,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const EMAILJS_SERVICE_ID = "service_m7blrwk";
const EMAILJS_PUBLIC_KEY = "0LqsQAkcgAOP2XMOe";
const NEWSLETTER_TEMPLATE_ID = "template_jg2dlpo";

type Status = "idle" | "loading" | "success" | "error";

export default function Footer() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const footerRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  // Scroll reveal animation
  useEffect(() => {
    const el = footerRef.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Validation
  const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const isValidPhone = (v: string) =>
    /^[6-9]\d{9}$/.test(
      v.replace(/\s+/g, "").replace(/^\+91/, "")
    );

  const handleSubscribe = async () => {
    const trimmed = value.trim();

    if (!trimmed) {
      toast.error("Enter email or phone number");
      return;
    }

    const looksLikePhone = /^\d/.test(
      trimmed.replace(/^\+91/, "").replace(/\s/g, "")
    );

    if (looksLikePhone) {
      if (!isValidPhone(trimmed)) {
        toast.error("Enter valid 10-digit phone number");
        return;
      }
    } else {
      if (!isValidEmail(trimmed)) {
        toast.error("Enter valid email address");
        return;
      }
    }

    setStatus("loading");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        NEWSLETTER_TEMPLATE_ID,
        {
          subscriber: trimmed,
          type: isValidEmail(trimmed)
            ? "Email"
            : "Phone",
          subscribedAt: new Date().toLocaleString(
            "en-IN",
            {
              timeZone: "Asia/Kolkata",
            }
          ),
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setValue("");

      toast.success(
        "Subscribed successfully 🎉"
      );

      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    } catch (error) {
      console.log(error);

      setStatus("error");

      toast.error(
        "Subscription failed. Try again."
      );

      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }
  };

  const locations = [
    {
      id: 1,
      city: "Madurai",
      address:
        "29, 1st Cross Street, Vanamamalai Nagar, By-pass Road, Madurai - 625 010.",
    },
    {
      id: 2,
      city: "Chennai",
      address:
        "No. 19/43, MG Chakrapani Street, Sathya Garden, Saligramam, Chennai - 600 092.",
    },
    {
      id: 3,
      city: "Bangalore",
      address:
        "No. 407/8, 4th Cross, Jayanagar 7th Block, Opp-Saraswat Cooperative Bank, Bangalore - 560 070.",
    },
  ];
  return (
    <footer
      ref={footerRef}
      className={`bg-black text-white px-6 md:px-14 py-12 transition-all duration-1000 ${inView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
        }`}
    >
      <div className="max-w-7xl mx-auto">

        {/* CTA */}

        <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-r from-[#090015] to-[#140024] p-8 mb-14 flex flex-col lg:flex-row justify-between items-center gap-8">

          <div>
            <p className="text-purple-400 text-sm uppercase">
              LET'S GROW TOGETHER
            </p>

            <h2 className="text-4xl md:text-6xl font-bold mt-3">
              Launch your{" "}
              <span className="text-purple-500">
                campaign
              </span>{" "}
              now.
            </h2>

            <p className="text-gray-400 mt-3">
              Quick setup, instant visibility
            </p>
          </div>

          {/* <button className="bg-gradient-to-r from-purple-700 to-pink-500 rounded-full px-8 py-4 flex items-center gap-4 font-semibold">

            Reach Us

            <span className="bg-white rounded-full text-black p-2">
              <ArrowRight size={18} />
            </span>

          </button> */}

          <a
            href="#contact"
            className="bg-gradient-to-r from-purple-700 to-pink-500 rounded-full px-8 py-4 flex items-center gap-4 font-semibold"
          >
            Reach Us

            <span className="bg-white rounded-full text-black p-2">
              <ArrowRight
                size={18}
              />
            </span>
          </a>
        </div>

        {/* Main Grid */}

        <div className="grid lg:grid-cols-4 gap-10">

          {/* Company */}

          <div>

            <Image
              src="/assets/Roadshow_AdinnLogo_WithoutBg.svg"
              alt="Roadshow Logo"
              className="FooterCol1Logo"
              width={200}
              height={60}
              priority
            />

            <p className="text-gray-400 mt-5">
              We help brands move forward with
              powerful outdoor advertising solutions.
            </p>

            {/* Social */}

            <div className="flex gap-4 mt-6">

              {[
                {
                  icon: <FaInstagram />,
                  link:
                    "https://www.instagram.com/adinnroadshows_/",
                },
                {
                  icon: <FaFacebookF />,
                  link:
                    "https://www.facebook.com/adinnroadshow",
                },
                {
                  icon: <FaXTwitter />,
                  link:
                    "https://x.com/AdinnRoadshow",
                },
                {
                  icon: <FaLinkedinIn />,
                  link:
                    "https://www.linkedin.com/company/adinn-roadshows/",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-[#111] border border-gray-700 flex items-center justify-center hover:border-purple-500 transition"
                >
                  {item.icon}
                </a>
              ))}
            </div>

            {/* Contact */}

            <div className="bg-[#111] rounded-2xl p-5 border border-gray-800 mt-8 space-y-4">

              <div className="flex gap-3">
                <Phone className="text-purple-500" />

                <div>
                  <a href="tel:+917373785057">
                    +91 73737 85057
                  </a>

                  <br />

                  <a href="tel:+919626987861">
                    +91 96269 87861
                  </a>
                </div>
              </div>

              <hr className="border-gray-700" />

              <div className="flex gap-3">

                <Mail className="text-purple-500" />

                <a href="mailto:ba@adinn.co.in">
                  ba@adinn.co.in
                </a>

              </div>

            </div>

          </div>

          {/* Services */}

          <div>

            <h3 className="font-bold text-2xl mb-6">
              Services
            </h3>

            {[
              "LED Screen Vehicle",
              "L-Type LED Vehicle",
              "3-Side LED Truck",
              "Customize Fabrication Vehicle",
            ].map((item) => (
              <div
                key={item}
                className="bg-[#111] p-5 rounded-xl border border-gray-800 mb-4"
              >
                {item}
              </div>
            ))}

          </div>
          {/* Locations */}
          <div>
            <h3 className="font-bold text-2xl mb-6">
              Locations
            </h3>

            {locations.map((location) => (
              <div
                key={location.id}
                className="flex gap-3 mb-6"
              >
                <MapPin className="text-purple-500 shrink-0 mt-1" />

                <div>
                  <p className="font-semibold">
                    {location.city}
                  </p>

                  <p className="text-gray-400 text-sm">
                    {location.address}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter */}

          <div>

            <div className="bg-[#111] border border-gray-800 rounded-3xl p-8">

              <div className="w-14 h-14 rounded-full bg-purple-900/30 flex items-center justify-center">
                <Send className="text-purple-500" />
              </div>

              <h3 className="text-3xl font-bold mt-6">
                Stay Updated
              </h3>

              <input
                type="text"
                value={value}
                onChange={(e) =>
                  setValue(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubscribe();
                  }
                }}
                disabled={
                  status === "loading" ||
                  status === "success"
                }
                placeholder="Email or phone"
                className="w-full mt-6 rounded-xl px-4 py-4 bg-black border border-gray-700 outline-none"
              />

              <button
                onClick={handleSubscribe}
                disabled={
                  status === "loading" ||
                  status === "success"
                }
                className="w-full mt-6 rounded-full bg-gradient-to-r from-purple-700 to-pink-500 py-4 flex justify-center items-center gap-2"
              >
                {status === "loading" && (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Sending...
                  </>
                )}

                {status === "success" && (
                  <>
                    <CheckCircle size={18} />
                    Subscribed
                  </>
                )}

                {(status === "idle" ||
                  status === "error") && (
                    <>
                      Subscribe
                      <ArrowRight size={18} />
                    </>
                  )}
              </button>

            </div>

          </div>

        </div>


        <div className="border-t border-gray-800 mt-14 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500">
            © 2025 Adinn Advertising Services
          </p>

          <div className="flex gap-6 text-gray-500 mt-5 md:mt-0">

            <Link href="#">
              Cookies
            </Link>

            <Link href="#">
              Privacy
            </Link>

            <Link href="#">
              Terms
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}