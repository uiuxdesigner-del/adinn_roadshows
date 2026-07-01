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

import "./Footer.css";

const EMAILJS_SERVICE_ID = "service_m7blrwk";
const EMAILJS_PUBLIC_KEY = "0LqsQAkcgAOP2XMOe";
const NEWSLETTER_TEMPLATE_ID = "template_jg2dlpo";

type Status = "idle" | "loading" | "success" | "error";

export default function Footer() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const footerRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

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
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const isValidPhone = (v: string) =>
    /^[6-9]\d{9}$/.test(v.replace(/\s+/g, "").replace(/^\+91/, ""));

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
          type: isValidEmail(trimmed) ? "Email" : "Phone",
          subscribedAt: new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          }),
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setValue("");
      toast.success("Subscribed successfully 🎉");

      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    } catch (error) {
      console.log(error);
      setStatus("error");
      toast.error("Subscription failed. Try again.");

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
        "29, 1st Cross Street, Vanamamalai Nagar, By-pass Road, Madurai - 625010.",
    },
    {
      id: 2,
      city: "Chennai",
      address:
        "No. 19/43, MG Chakrapani Street, Sathya Garden, Saligramam, Chennai - 600092.",
    },
    {
      id: 3,
      city: "Bangalore",
      address:
        "No. 24, 2nd floor, 9th A Cross road, Park area, Wilson Garden, Bangalore - 560027.",
    },
    {
      id: 4,
      city: "Coimbatore",
      address:
        "No. 13, Sivasakthi Colony, (Near coimbatore roller flour mill), Ganapathy, Coimbatore - 641006.",
    },
  ];

  const socialLinks = [
    {
      icon: <FaInstagram />,
      link: "https://www.instagram.com/adinnroadshows_/",
      label: "Instagram",
    },
    {
      icon: <FaFacebookF />,
      link: "https://www.facebook.com/adinnroadshow",
      label: "Facebook",
    },
    {
      icon: <FaXTwitter />,
      link: "https://x.com/AdinnRoadshow",
      label: "X",
    },
    {
      icon: <FaLinkedinIn />,
      link: "https://www.linkedin.com/company/adinn-roadshows/",
      label: "LinkedIn",
    },
  ];

  const services = [
    "Traditional Models",
    "LED Models",
    "Innovation Models"
  ];

  return (
    <footer
      ref={footerRef}
      className={`adinn-footer ${inView ? "footer-in-view" : ""}`}
    >
      <div className="footer-grid-bg" />
      <div className="footer-light footer-light-one" />
      <div className="footer-light footer-light-two" />

      <div className="footer-inner">
        {/* <div className="footer-road-line">
          <span />
        </div> */}

        {/* CTA */}
        <div className="footer-cta footer-reveal" style={{ "--delay": "0ms" } as React.CSSProperties}>
          <div className="footer-cta-content">
            <p className="footer-kicker">LET&apos;S GROW TOGETHER</p>

            <h2>
              Launch your <span>campaign</span> now.
            </h2>

            <p className="footer-cta-subtitle">
              Quick setup, instant visibility
            </p>
          </div>

          <a href="#contact" className="footer-cta-button">
            <span>Reach Us</span>
            <span className="footer-cta-icon">
              <ArrowRight size={18} />
            </span>
          </a>
        </div>

        {/* Main Grid */}
        <div className="footer-main-grid">
          {/* Company */}
          <div className="footer-column footer-company footer-reveal" style={{ "--delay": "100ms" } as React.CSSProperties}>
            <Image
              src="/assets/Roadshow_AdinnLogo_WithoutBg.svg"
              alt="Roadshow Logo"
              className="FooterCol1Logo footer-logo"
              width={210}
              height={70}
              priority
            />

            <p className="footer-company-text">
              We help brands move forward with powerful outdoor advertising
              solutions.
            </p>

            <div className="footer-socials">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-link"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>

            <div className="footer-contact-card">
              <div className="footer-contact-row">
                <span className="footer-contact-icon">
                  <Phone size={21} />
                </span>

                <div>
                  <a href="tel:+917339509090">+91 73395 09090</a>
                  <br />
                  <a href="tel:+919500388761">+91 95003 88761</a>
                </div>
              </div>

              <div className="footer-divider" />

              <div className="footer-contact-row">
                <span className="footer-contact-icon">
                  <Mail size={21} />
                </span>

                <a href="mailto:roadshowsales@adinn.co.in">roadshowsales@adinn.co.in</a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="footer-column footer-reveal" style={{ "--delay": "180ms" } as React.CSSProperties}>
            <h3 className="footer-heading">Services</h3>

            <div className="footer-service-list">
              {services.map((item, index) => (
                <div
                  key={item}
                  className="footer-service-card"
                  style={{ "--item-delay": `${index * 90}ms` } as React.CSSProperties}
                >
                  <span>{item}</span>
                  <ArrowRight size={17} />
                </div>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className="footer-column footer-reveal" style={{ "--delay": "260ms" } as React.CSSProperties}>
            <h3 className="footer-heading">Locations</h3>

            <div className="footer-location-list">
              {locations.map((location) => (
                <div key={location.id} className="footer-location-item">
                  <span className="footer-location-icon">
                    <MapPin size={22} />
                  </span>

                  <div>
                    <p>{location.city}</p>
                    <span>{location.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-column footer-reveal" style={{ "--delay": "340ms" } as React.CSSProperties}>
            <div className="footer-newsletter-card">
              <div className="footer-newsletter-icon">
                <Send size={23} />
              </div>

              <h3>Stay Updated</h3>

              <p>
                Get campaign updates, new vehicle options and roadshow ideas.
              </p>

              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubscribe();
                  }
                }}
                disabled={status === "loading" || status === "success"}
                placeholder="Email or phone"
                className="footer-newsletter-input"
              />

              <button
                onClick={handleSubscribe}
                disabled={status === "loading" || status === "success"}
                className="footer-newsletter-button"
              >
                {status === "loading" && (
                  <>
                    <Loader2 size={18} className="footer-loader" />
                    Sending...
                  </>
                )}

                {status === "success" && (
                  <>
                    <CheckCircle size={18} />
                    Subscribed
                  </>
                )}

                {(status === "idle" || status === "error") && (
                  <>
                    Subscribe
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
 <div className="footer-road-line">
            <span />
          </div>
        <div className="footer-bottom footer-reveal" style={{ "--delay": "420ms" } as React.CSSProperties}>
         
        <p>© {new Date().getFullYear()} Adinn Advertising Services. All rights reserved</p>

          {/* <div>
            <Link href="#">Cookies</Link>
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}