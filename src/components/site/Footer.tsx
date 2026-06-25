"use client";

import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-white relative overflow-hidden">
      {/* moving road line */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div
          className="h-px w-1/3 bg-primary animate-[roadline_6s_linear_infinite]"
          style={{ boxShadow: "0 0 18px var(--color-primary)" }}
        />
      </div>
      <style>{`@keyframes roadline { 0% { transform: translateX(-100%);} 100% { transform: translateX(400%);} }`}</style>

      <div className="container-x py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-semibold">
                A
              </span>
              <span className="font-display text-xl font-semibold">
                ADINN <span className="text-white/60 font-normal">Roadshow</span>
              </span>
            </div>
            <p className="mt-5 text-white/65 max-w-md leading-relaxed">
              Premium LED roadshow vehicle advertising — built for serious brands who want
              real visibility on real streets.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex items-center gap-2 max-w-md border-b border-white/15 focus-within:border-white pb-2"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent outline-none placeholder:text-white/40 py-2"
              />
              <button type="submit" className="text-primary text-sm font-medium inline-flex items-center gap-1">
                Subscribe <ArrowUpRight className="size-4" />
              </button>
            </form>
          </div>

          <FooterCol title="Services" items={[
            "LED Screen Vehicle", "L-Type LED Vehicle", "3-Side LED Truck", "Custom Fabrication",
          ]} />
          <FooterCol title="Company" items={[
            { l: "About", h: "#about" }, { l: "Why Adinn", h: "#why" },
            { l: "Coverage", h: "#coverage" }, { l: "Contact", h: "#contact" },
          ]} />
          <FooterCol title="Contact" items={[
            "+91 90000 00000", "campaigns@adinn.in", "Madurai, Tamil Nadu", "Mon – Sat, 9:30 – 7:00",
          ]} />
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/50">
          <div>© {year} Adinn Roadshow. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Legal Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title, items,
}: { title: string; items: (string | { l: string; h: string })[] }) {
  return (
    <div className="lg:col-span-2">
      <div className="text-xs uppercase tracking-widest text-white/40 font-medium">{title}</div>
      <ul className="mt-5 space-y-3 text-sm text-white/75">
        {items.map((it, i) => (
          <li key={i}>
            {typeof it === "string" ? it : <a href={it.h} className="hover:text-white transition-colors">{it.l}</a>}
          </li>
        ))}
      </ul>
    </div>
  );
}
