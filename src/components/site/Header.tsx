"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BleedButton } from "./BleedButton";

const navLinks = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "Services",
    href: "#services",
  },
  {
    label: "Coverage",
    href: "#coverage",
  },
  {
    label: "Process",
    href: "#process",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const logo = isScrolled ? "/assets/Logo.svg" : "/assets/Logo-white.svg";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="
        fixed
        left-0
        right-0
        top-0
        z-50
        px-4
        pt-4
      "
    >
      <div
        className={`
          mx-auto
          flex
          h-20
          w-full
          max-w-[860px]
          items-center
          justify-between
          rounded-full
          border
          pl-7
          pr-4
          transition-all
          duration-500
          ease-[cubic-bezier(.16,1,.3,1)]
          ${
            isScrolled
              ? "border-black/10 bg-white/85 text-black shadow-[0_18px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl"
              : "border-white/10 bg-black/45 text-white backdrop-blur-xl"
          }
        `}
      >
        <a href="#home" className="flex items-center">
          <img
            src={logo}
            alt="ADINN"
            className="
              h-7
              w-auto
              transition-opacity
              duration-500
            "
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`
                nav-bleed-link
                ${isScrolled ? "nav-bleed-dark" : "nav-bleed-light"}
                text-[16px]
                font-semibold
              `}
            >
              <span className="nav-bleed-text" data-text={link.label}>
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <BleedButton href="#contact" className="bleed-button-sm">
            Get Quote
          </BleedButton>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`
            grid
            size-9
            place-items-center
            rounded-full
            transition-colors
            md:hidden
            ${
              isScrolled
                ? "bg-black/5 text-black"
                : "bg-white/10 text-white"
            }
          `}
        >
          {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {isOpen && (
        <div
          className="
            mx-auto
            mt-3
            w-full
            max-w-[860px]
            overflow-hidden
            rounded-[24px]
            border
            border-white/10
            bg-black/90
            p-4
            text-white
            shadow-[0_20px_80px_rgba(0,0,0,0.25)]
            backdrop-blur-xl
            md:hidden
          "
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="
                  rounded-full
                  px-4
                  py-3
                  text-sm
                  text-white/65
                  transition
                  hover:bg-white/10
                  hover:text-white
                "
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-3 px-1">
            <BleedButton href="#contact" className="bleed-button-sm">
              Get Quote
            </BleedButton>
          </div>
        </div>
      )}
    </header>
  );
}