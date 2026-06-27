// "use client";
// import { BleedButton } from "./BleedButton";
// import { Reveal } from "./Reveal";
// import { useState, type FormEvent } from "react";
// import {
//   Phone, Mail, MapPin, Clock, CheckCircle2, Loader2, ChevronDown,
// } from "lucide-react";
// import emailjs from "@emailjs/browser";

// const inputCx =
//   "w-full bg-transparent border-b outline-none py-3 text-base placeholder:text-muted-foreground/70 transition-all duration-200";
// const labelCx =
//   "text-xs uppercase tracking-widest text-muted-foreground font-medium";

// type FormState = {
//   fullName: string; phone: string; email: string; campaignType: string;
//   preferredVehicle: string; city: string; startDate: string;
//   duration: string; budget: string; message: string;
// };

// const initialForm: FormState = {
//   fullName: "", phone: "", email: "", campaignType: "",
//   preferredVehicle: "", city: "", startDate: "",
//   duration: "", budget: "", message: "",
// };

// // ─── Animations used here live in your GLOBAL css (globals.css) ───────────────
// // .animate-shake     → invalid-field shake
// // .animate-cf-float  → floating decorative orb inside the form card
// // .animate-cf-pop    → success checkmark pop
// // (full snippet provided in global-animations.css)

// export function ContactForm() {
//   const [form, setForm] = useState<FormState>(initialForm);
//   const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
//   const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
//   const [formError, setFormError] = useState("");
//   const [shakeFields, setShakeFields] = useState<Set<string>>(new Set());

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//     setFormError("");
//   };

//   const validateForm = () => {
//     const nextErrors: Partial<Record<keyof FormState, string>> = {};
//     if (!form.fullName.trim()) nextErrors.fullName = "Full name / company is required.";
//     const phone = form.phone.replace(/\s+/g, "").replace("+91", "");
//     if (!phone) nextErrors.phone = "Phone number is required.";
//     else if (!/^[6-9]\d{9}$/.test(phone)) nextErrors.phone = "Enter a valid 10-digit number.";
//     if (!form.email.trim()) nextErrors.email = "Email address is required.";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email.";
//     if (!form.city.trim()) nextErrors.city = "City / service location is required.";
//     if (!form.startDate.trim()) nextErrors.startDate = "Campaign start date is required.";
//     const days = Number(form.duration.replace(/\D/g, ""));
//     if (!form.duration.trim()) nextErrors.duration = "Campaign duration is required.";
//     else if (!days || days < 10) nextErrors.duration = "Minimum duration is 10 days.";
//     if (!form.message.trim()) nextErrors.message = "Please enter your campaign requirement.";
//     return nextErrors;
//   };

//   const openWhatsApp = () => {
//     const msg = `New ADINN Roadshow Enquiry\n\nName / Company: ${form.fullName}\nPhone: ${form.phone}\nEmail: ${form.email}\nCampaign Type: ${form.campaignType || "-"}\nPreferred Vehicle: ${form.preferredVehicle || "-"}\nCity: ${form.city}\nStart Date: ${form.startDate}\nDuration: ${form.duration}\nBudget: ${form.budget || "-"}\n\nRequirement:\n${form.message}`;
//     // ✅ CHANGE: WhatsApp number aligned with footer contact (+91 73737 85057)
//     window.open(`https://wa.me/917373785057?text=${encodeURIComponent(msg)}`, "_blank");
//   };

//   const EMAILJS_SERVICE_ID  = "service_m7blrwk";   // from Email Services tab
//   const EMAILJS_TEMPLATE_ID = "template_6l5cw1b";  // from Email Templates tab
//   const EMAILJS_PUBLIC_KEY  = "0LqsQAkcgAOP2XMOe"; // from Account tab

//   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setFormError("");
//     setErrors({});

//     const clientErrors = validateForm();
//     if (Object.keys(clientErrors).length > 0) {
//       setErrors(clientErrors);
//       setShakeFields(new Set(Object.keys(clientErrors)));
//       setTimeout(() => setShakeFields(new Set()), 500);
//       setFormError("Please fill in all required fields before submitting.");
//       return;
//     }

//     setStatus("loading");

//     try {
//       // EmailJS sends directly from the browser — no backend needed
//       await emailjs.send(
//         EMAILJS_SERVICE_ID,
//         EMAILJS_TEMPLATE_ID,
//         {
//           // These keys must match {{variable}} names in your EmailJS template
//           fullName:         form.fullName,
//           phone:            form.phone,
//           email:            form.email,
//           campaignType:     form.campaignType  || "—",
//           preferredVehicle: form.preferredVehicle || "—",
//           city:             form.city,
//           startDate:        form.startDate,
//           duration:         form.duration,
//           budget:           form.budget        || "—",
//           message:          form.message,
//         },
//         EMAILJS_PUBLIC_KEY
//       );

//       // openWhatsApp(); // still available if you want to open WhatsApp on submit
//       setStatus("success");
//       setForm(initialForm);
//       setTimeout(() => setStatus("idle"), 50000); // success ui timer (50s)

//     } catch (err) {
//       console.error("EmailJS error:", err);
//       setFormError("Unable to send enquiry. Please try again or contact us directly.");
//       setStatus("idle");
//     }
//   };

//   // ✅ CHANGE: phone + email now match the footer (correct details).
//   // Phone supports multiple click-to-call lines, just like the footer.
//   type ContactLine = { v: string; href?: string };
//   type ContactItem = { i: typeof Phone; t: string; lines: ContactLine[] };

//   const contactInfo: ContactItem[] = [
//     {
//       i: Phone, t: "Phone",
//       lines: [
//         { v: "+91 73737 85057", href: "tel:+917373785057" },
//         { v: "+91 96269 87861", href: "tel:+919626987861" },
//       ],
//     },
//     {
//       i: Mail, t: "Email",
//       lines: [{ v: "ba@adinn.co.in", href: "mailto:ba@adinn.co.in" }],
//     },
//     {
//       i: MapPin, t: "Head Office",
//       lines: [{ v: "Madurai, Tamil Nadu, India" }],
//     },
//     {
//       i: Clock, t: "Business Hours",
//       lines: [{ v: "Mon – Sat, 9:30 AM – 7:00 PM" }],
//     },
//   ];

//   return (
//     <section id="contact" className="section-pad bg-surface-muted">
//       <div className="container-x grid lg:grid-cols-12 gap-10">
//         {/* ── Left column ── */}
//         <div className="lg:col-span-5">
//           <Reveal><div className="eyebrow">Request a Campaign</div></Reveal>
//           <Reveal delay={1}>
//             <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-[1.05] text-balance-tight">
//               Let&apos;s plan your roadshow.
//             </h2>
//           </Reveal>
//           <Reveal delay={2}>
//             <p className="mt-5 text-muted-foreground text-lg max-w-md">
//               Share your campaign requirement and our team will get back within one
//               business day with a tailored proposal.
//             </p>
//           </Reveal>
//           <Reveal delay={3}>
//             <div className="mt-10 card-premium p-7 space-y-5">
//               {contactInfo.map((c) => (
//                 // ✅ animation: hover lifts the icon, fills it with brand colour & tilts it
//                 <div key={c.t} className="flex gap-4 group">
//                   <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 transition-all duration-300 ease-out group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:-rotate-6">
//                     <c.i className="size-5" />
//                   </div>
//                   <div>
//                     <div className={labelCx}>{c.t}</div>
//                     {/* ✅ clickable phone(s) + email, stacked */}
//                     <div className="mt-1 flex flex-col">
//                       {c.lines.map((ln) =>
//                         ln.href ? (
//                           <a
//                             key={ln.v}
//                             href={ln.href}
//                             className="font-medium hover:text-primary transition-colors duration-200 w-fit"
//                           >
//                             {ln.v}
//                           </a>
//                         ) : (
//                           <span key={ln.v} className="font-medium">{ln.v}</span>
//                         )
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Reveal>
//         </div>

//         {/* ── Right column ── */}
//         <div className="lg:col-span-7">
//           <Reveal delay={2}>
//             <form
//               onSubmit={onSubmit}
//               className="card-premium p-7 md:p-10 relative overflow-hidden"
//               style={{ alignItems: "center", alignContent: "center" }}
//             >
//               {/* ✅ decorative floating orb (purely cosmetic, sits behind content) */}
//               <div
//                 aria-hidden
//                 className="pointer-events-none absolute -top-32 -right-32 size-72 rounded-full bg-primary/5 blur-3xl animate-cf-float"
//               />

//               {status === "success" ? (
//                 <div className="flex flex-col items-center text-center py-16 animate-in fade-in zoom-in-95 duration-500 relative">
//                   <div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center animate-cf-pop">
//                     <CheckCircle2 className="size-8" />
//                   </div>
//                   <h3 className="mt-6 font-display text-2xl font-semibold">Enquiry received</h3>
//                   <p className="mt-3 text-muted-foreground max-w-sm">
//                     Thank you. Our campaign team will reach out within one business day.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="relative">
//                   {/* ✅ animated global error banner */}
//                   {formError && (
//                     <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
//                       <span className="text-base">⚠️</span>
//                       {formError}
//                     </div>
//                   )}

//                   <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
//                     <Field label="Full Name / Company" name="fullName" placeholder="Acme Pvt Ltd" required
//                       value={form.fullName} error={errors.fullName} onChange={handleChange}
//                       shake={shakeFields.has("fullName")} />
//                     <Field label="Phone Number" name="phone" type="tel" placeholder="+91" required
//                       value={form.phone} error={errors.phone} onChange={handleChange}
//                       shake={shakeFields.has("phone")} />
//                     <Field label="Email Address" name="email" type="email" placeholder="you@brand.com" required
//                       value={form.email} error={errors.email} onChange={handleChange}
//                       shake={shakeFields.has("email")} />
//                     <Field label="Campaign Type" name="campaignType" placeholder="Product launch, retail, ..."
//                       value={form.campaignType} error={errors.campaignType} onChange={handleChange} />
//                     <Select label="Preferred Vehicle" name="preferredVehicle"
//                       value={form.preferredVehicle} error={errors.preferredVehicle} onChange={handleChange}
//                       options={["LED Screen Vehicle","L-Type LED Vehicle","3-Side LED Truck","Customized Fabrication","Not sure"]} />
//                     <Field label="City / Service Location" name="city" placeholder="Chennai" required
//                       value={form.city} error={errors.city} onChange={handleChange}
//                       shake={shakeFields.has("city")} />
//                     <DateField label="Campaign Start Date" name="startDate"
//                       value={form.startDate} error={errors.startDate} onChange={handleChange}
//                       shake={shakeFields.has("startDate")} />
//                     <Field label="Campaign Duration" name="duration" placeholder="e.g. 10 days" required
//                       value={form.duration} error={errors.duration} onChange={handleChange}
//                       shake={shakeFields.has("duration")} />
//                     <Select label="Budget Range" name="budget"
//                       value={form.budget} error={errors.budget} onChange={handleChange}
//                       options={["< ₹1 Lakh","₹1 – 3 Lakh","₹3 – 7 Lakh","₹7 Lakh+","Discuss"]} />

//                     <div className="sm:col-span-2">
//                       <label className={labelCx}>Message / Requirement *</label>
//                       {/* ✅ animated underline wrapper */}
//                       <div className="relative mb-6">
//                         <textarea
//                           name="message" rows={3}
//                           placeholder="Tell us about your campaign goal..."
//                           value={form.message} onChange={handleChange}
//                           className={`${inputCx} peer resize-none ${
//                             errors.message ? "border-red-500 animate-shake" : "border-border"
//                           }`}
//                         />
//                         <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 peer-focus:w-full" />
//                       </div>
//                       {errors.message && (
//                         <p className="mt-2 text-[13px] text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1 duration-200">
//                           <span>↑</span> {errors.message}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <BleedButton type="submit" disabled={status === "loading"}>
//                     {status === "loading" ? (
//                       <span className="flex items-center gap-2">
//                         <Loader2 className="size-4 animate-spin" /> Submitting…
//                       </span>
//                     ) : "Submit Enquiry"}
//                   </BleedButton>

//                   <p className="mt-5 text-xs text-muted-foreground">
//                     By submitting, you agree to be contacted by ADINN Roadshow about your enquiry.
//                   </p>
//                 </div>
//               )}
//             </form>
//           </Reveal>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ── Field ──────────────────────────────────────────────────────────────────────
// function Field({ label, name, type = "text", placeholder, required, value, error, onChange, shake }: {
//   label: string; name: keyof FormState; type?: string; placeholder?: string;
//   required?: boolean; value: string; error?: string;
//   onChange: React.ChangeEventHandler<HTMLInputElement>; shake?: boolean;
// }) {
//   return (
//     <div>
//       <label htmlFor={name} className={labelCx}>{label}{required && " *"}</label>
//       {/* ✅ relative wrapper drives the animated focus underline */}
//       <div className="relative">
//         <input
//           id={name} name={name} type={type} placeholder={placeholder}
//           required={required} value={value} onChange={onChange}
//           className={`${inputCx} peer ${shake ? "animate-shake" : ""} ${
//             error ? "border-red-500" : "border-border"
//           }`}
//         />
//         <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 peer-focus:w-full" />
//       </div>
//       {error && (
//         <p className="mt-2 text-[13px] text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1 duration-200">
//           <span className="text-xs">↑</span> {error}
//         </p>
//       )}
//     </div>
//   );
// }

// // ── Select ─────────────────────────────────────────────────────────────────────
// function Select({ label, name, options, value, error, onChange }: {
//   label: string; name: keyof FormState; options: string[]; value: string;
//   error?: string; onChange: React.ChangeEventHandler<HTMLSelectElement>;
// }) {
//   return (
//     <div>
//       <label htmlFor={name} className={labelCx}>{label}</label>
//       <div className="relative">
//         <select id={name} name={name} value={value} onChange={onChange}
//           className={`${inputCx} peer appearance-none pr-7 cursor-pointer ${
//             error ? "border-red-500" : "border-border"
//           }`}>
//           <option value="">Select...</option>
//           {options.map((o) => <option key={o} value={o}>{o}</option>)}
//         </select>
//         {/* ✅ chevron rotates + turns brand colour on focus */}
//         <ChevronDown className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 size-4 text-muted-foreground transition-all duration-300 peer-focus:rotate-180 peer-focus:text-primary" />
//         <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 peer-focus:w-full" />
//       </div>
//       {error && <p className="mt-2 text-[13px] text-red-600">{error}</p>}
//     </div>
//   );
// }

// // ── DateField ──────────────────────────────────────────────────────────────────
// function DateField({ label, name, value, error, onChange, shake }: {
//   label: string; name: keyof FormState; value: string; error?: string;
//   onChange: React.ChangeEventHandler<HTMLInputElement>; shake?: boolean;
// }) {
//   return (
//     <div>
//       <label htmlFor={name} className={labelCx}>{label} *</label>
//       <div className="relative">
//         <input
//           id={name} name={name} type="date" value={value} onChange={onChange}
//           min={new Date().toISOString().split("T")[0]}
//           className={`${inputCx} peer cursor-pointer ${shake ? "animate-shake" : ""} ${
//             error ? "border-red-500" : "border-border"
//           }`}
//         />
//         <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 peer-focus:w-full" />
//       </div>
//       {error && (
//         <p className="mt-2 text-[13px] text-red-600 animate-in slide-in-from-top-1 duration-200">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }


/*eslint-disable*/
//@ts-nocheck
"use client";

import { useState, type FormEvent } from "react";
import {
  User,
  Car, 
  PencilLine,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Loader2,
  ChevronDown,
  Send,
  FilePenLine,
  LockKeyhole,
  Building2,
  CalendarDays,
  Target,
  Trophy,
  BadgeCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ContactForm.css";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  campaignType: string;
  preferredVehicle: string;
  city: string;
  startDate: string;
  duration: string;
  budget: string;
  message: string;
};

const initialForm: FormState = {
  fullName: "",
  phone: "",
  email: "",
  campaignType: "",
  preferredVehicle: "",
  city: "",
  startDate: "",
  duration: "",
  budget: "",
  message: "",
};

const EMAILJS_SERVICE_ID = "service_m7blrwk";
const EMAILJS_TEMPLATE_ID = "template_6l5cw1b";
const EMAILJS_PUBLIC_KEY = "0LqsQAkcgAOP2XMOe";

// const contactInfo = [
//   {
//     icon: Phone,
//     title: "Call Us",
//     value: "+91 73737 85057",
//     sub: "Mon – Sat, 9:30 AM – 7:00 PM",
//     href: "tel:+917373785057",
//   },
//   {
//     icon: Mail,
//     title: "Email Us",
//     value: "ba@adinn.co.in",
//     sub: "We reply within 24 hours",
//     href: "mailto:ba@adinn.co.in",
//   },
//   {
//     icon: MapPin,
//     title: "Head Office",
//     value: "Madurai, Tamil Nadu, India",
//     sub: "We are here to help",
//   },
//   {
//     icon: Clock,
//     title: "Business Hours",
//     value: "Mon – Sat, 9:30 AM – 7:00 PM",
//     sub: "Sunday Closed",
//   },
// ];


const contactInfo = [
{
icon:Target,
title:"Campaign Planning",
value:"Tailored roadshow strategies",
sub:"Customized campaigns for your audience"
},

{
icon:CalendarDays,
title:"Quick Turnaround",
value:"Proposal within 24 Hours",
sub:"Fast response from our campaign team"
},

{
icon:MapPin,
title:"Pan India Coverage",
value:"200+ Cities Served",
sub:"Execute campaigns anywhere in India"
},

{
icon:BadgeCheck,
title:"Trusted Experience",
value:"10+ Years Expertise",
sub:"Successful activations for leading brands"
}
]

const stats = [
  {
    icon: Building2,
    value: "1500+",
    label: "Campaigns Executed",
  },
  {
    icon: MapPin,
    value: "200+",
    label: "Cities Covered",
  },
  {
    icon: Trophy,
    value: "98%",
    label: "Client Satisfaction",
  },
  {
    icon: BadgeCheck,
    value: "10+",
    label: "Years Experience",
  },
];

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [formError, setFormError] = useState("");
  const [shakeFields, setShakeFields] = useState<Set<string>>(new Set());

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setFormError("");
  };

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Full name / company is required.";
    }

    const phone = form.phone.replace(/\s+/g, "").replace("+91", "");

    if (!phone) {
      nextErrors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      nextErrors.phone = "Enter a valid 10-digit mobile number.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    // if (!form.city.trim()) {
    //   nextErrors.city = "City / service location is required.";
    // }

    // if (!form.startDate.trim()) {
    //   nextErrors.startDate = "Campaign start date is required.";
    // }

    // const days = Number(form.duration.replace(/\D/g, ""));

    // if (!form.duration.trim()) {
    //   nextErrors.duration = "Campaign duration is required.";
    // } else if (!days || days < 10) {
    //   nextErrors.duration = "Minimum campaign duration is 10 days.";
    // }

    if (!form.message.trim()) {
      nextErrors.message = "Please enter your campaign requirement.";
    }

    return nextErrors;
  };

  const openWhatsApp = () => {
    const msg = `New ADINN Roadshow Enquiry

Name / Company: ${form.fullName}
Phone: ${form.phone}
Email: ${form.email}
Campaign Type: ${form.campaignType || "-"}
Preferred Vehicle: ${form.preferredVehicle || "-"}
City: ${form.city}
Start Date: ${form.startDate}
Duration: ${form.duration}
Budget: ${form.budget || "-"}

Requirement:
${form.message}`;

    window.open(
      `https://wa.me/917373785057?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormError("");
    setErrors({});

    const clientErrors = validateForm();

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setShakeFields(new Set(Object.keys(clientErrors)));

      setTimeout(() => {
        setShakeFields(new Set());
      }, 520);

      setFormError("Please fill all required fields before submitting.");
      toast.error("Please complete the required fields.", {
        position: "top-right",
        autoClose: 3000,
      });

      return;
    }

    setStatus("loading");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          campaignType: form.campaignType || "—",
          preferredVehicle: form.preferredVehicle || "—",
          city: form.city,
          startDate: form.startDate,
          duration: form.duration,
          budget: form.budget || "—",
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      toast.success("Enquiry submitted successfully.", {
        position: "top-right",
        autoClose: 3500,
      });

      setStatus("success");
      openWhatsApp();
      setForm(initialForm);

      setTimeout(() => {
        setStatus("idle");
      }, 50000);
    } catch (error) {
      console.error("EmailJS error:", error);

      setStatus("idle");
      setFormError("Unable to send enquiry. Please try again.");

      toast.error("Unable to send enquiry. Please try again.", {
        position: "top-right",
        autoClose: 3500,
      });
    }
  };

  return (
    <section className="adinn-contact-section" id="contact">
      <ToastContainer
        theme="light"
        newestOnTop
        closeOnClick
        pauseOnHover
        className="adinn-toast"
      />

      <div className="adinn-contact-bg-pattern" />

      <div className="adinn-contact-container">
        <div className="adinn-contact-grid">
          {/* LEFT */}
          <motion.div
            className="adinn-contact-left"
            initial={{ opacity: 0, x: -34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="adinn-contact-eyebrow"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              <Send size={15} />
              Request a Campaign
            </motion.div>

            <h1 className="adinn-contact-title">
              Let&apos;s plan your
              <span>roadshow.</span>
            </h1>

            <p className="adinn-contact-desc">
              Share your campaign requirement and our team will get back within
              one business day with a tailored proposal.
            </p>

            <div className="adinn-contact-cards">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;

                const content = (
                  <motion.div
                    className="adinn-contact-info-card"
                    whileHover={{ y: -8, scale: 1.025 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.24 }}
                  >
                    <span className="adinn-contact-info-icon">
                      <Icon size={22} />
                    </span>

                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.value}</p>
                      <small>{item.sub}</small>
                    </div>

                    {/* <span className="adinn-card-number">0{index + 1}</span> */}
                  </motion.div>
                );

                if (item.href) {
                  return (
                    <a href={item.href} key={item.title}>
                      {content}
                    </a>
                  );
                }

                return <div key={item.title}>{content}</div>;
              })}
            </div>

            <div className="adinn-contact-sketch">
              <span className="adinn-plane">✈</span>
              <p>
                Let&apos;s build something
                <br />
                great together!
              </p>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className="adinn-contact-form-wrap"
            initial={{ opacity: 0, x: 34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={onSubmit} className="adinn-contact-form">
              <div className="adinn-form-header">
                <div className="adinn-form-header-icon">
                  <FilePenLine size={28} />
                </div>

                <div>
                  <h2>Tell us about your campaign</h2>
                  <p>Fill in the details below and we&apos;ll take care of the rest.</p>
                </div>
              </div>

              {status === "success" ? (
                <motion.div
                  className="adinn-success-box"
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                >
                  <span>
                    <CheckCircle2 size={42} />
                  </span>

                  <h3>Enquiry Received</h3>

                  <p>
                    Thank you. Our campaign team will contact you within one
                    business day.
                  </p>
                </motion.div>
              ) : (
                <>
                  {formError && (
                    <motion.div
                      className="adinn-form-error"
                      initial={{ opacity: 0, y: -12 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {formError}
                    </motion.div>
                  )}

                  <div className="adinn-form-grid">
                    <Field
                      label="Full Name / Company"
                      name="fullName"
                      placeholder="Enter name or company"
                      value={form.fullName}
                      onChange={handleChange}
                      error={errors.fullName}
                      shake={shakeFields.has("fullName")}
                      required
                      icon={<User size={18}/>}
                    />

                    <Field
                      label="Phone Number"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      shake={shakeFields.has("phone")}
                      required
                      icon={<Phone size={18}/>}
                    />

                    <Field
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                      error={errors.email}
                      shake={shakeFields.has("email")}
                      required
                      icon={<Mail size={18}/>}
                    />

                    {/* <Field
                      label="Campaign Type"
                      name="campaignType"
                      placeholder="Product launch, retail, promotion..."
                      value={form.campaignType}
                      onChange={handleChange}
                    /> */}

                    <Select
                      label="Preferred Vehicle"
                      name="preferredVehicle"
                      value={form.preferredVehicle}
                      onChange={handleChange}
                      options={[
                        "LED Screen Vehicle",
                        "L-Type LED Vehicle",
                        "3-Side LED Truck",
                        "Flex Branding Vehicle",
                        "Hybrid LED + Flex",
                        "Not Sure",
                      ]}
                    />

                    {/* <Field
                      label="City / Service Location"
                      name="city"
                      placeholder="Enter city"
                      value={form.city}
                      onChange={handleChange}
                      error={errors.city}
                      shake={shakeFields.has("city")}
                      required
                    /> */}

                    {/* <DateField
                      label="Campaign Start Date"
                      name="startDate"
                      value={form.startDate}
                      onChange={handleChange}
                      error={errors.startDate}
                      shake={shakeFields.has("startDate")}
                    />

                    <Field
                      label="Campaign Duration"
                      name="duration"
                      placeholder="e.g. 10 days"
                      value={form.duration}
                      onChange={handleChange}
                      error={errors.duration}
                      shake={shakeFields.has("duration")}
                      required
                    />

                    <Select
                      label="Budget Range"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      options={[
                        "< ₹1 Lakh",
                        "₹1 – 3 Lakh",
                        "₹3 – 7 Lakh",
                        "₹7 Lakh+",
                        "Discuss",
                      ]}
                    /> */}

                    {/* <div className="adinn-form-field adinn-form-message">
                      <label>
                        Message / Requirement <span>*</span>
                      </label>

                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Tell us about your campaign goal, audience, locations, etc."
                        value={form.message}
                        onChange={handleChange}
                        className={`${errors.message ? "has-error" : ""} ${
                          shakeFields.has("message") ? "shake" : ""
                        }`}
                      />

                      {errors.message && (
                        <p className="adinn-field-error">{errors.message}</p>
                      )}
                    </div> */}


                    <div className="adinn-form-field adinn-form-message">
  <label>
    Message / Requirement <span>*</span>
  </label>

  <div className="adinn-textarea-wrap">
    <span className="adinn-input-icon">
      <PencilLine size={18} />
    </span>

    <textarea
      name="message"
      rows={4}
      placeholder="Tell us about your campaign goal, audience, locations, etc."
      value={form.message}
      onChange={handleChange}
      className={`${errors.message ? "has-error" : ""} ${
        shakeFields.has("message") ? "shake" : ""
      }`}
    />
  </div>

  {errors.message && (
    <p className="adinn-field-error">{errors.message}</p>
  )}
</div>


                  </div>

                  <motion.button
                    type="submit"
                    className="adinn-submit-btn"
                    disabled={status === "loading"}
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="spin" size={19} />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Enquiry
                        <span>
                          <Send size={18} />
                        </span>
                      </>
                    )}
                  </motion.button>

                  <p className="adinn-form-note">
                    <LockKeyhole size={14} />
                    By submitting, you agree to be contacted by ADINN Roadshow
                    about your enquiry.
                  </p>
                </>
              )}
            </form>
          </motion.div>
        </div>

        {/* <motion.div
          className="adinn-contact-stats"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.14 }}
        >
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                className="adinn-stat-card"
                key={item.label}
                whileHover={{ y: -6, scale: 1.025 }}
              >
                <span>
                  <Icon size={23} />
                </span>

                <div>
                  <h3>{item.value}</h3>
                  <p>{item.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div> */}
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: string;
  error?: string;
  shake?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
};

function Field({
  label,
 name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  shake,
  required,
  icon,
}: FieldProps) {
  return (
    <div className="adinn-form-field">
      <label htmlFor={name}>
        {label} {required && <span>*</span>}
      </label>

      <div className="adinn-input-wrap">
        <span className="adinn-input-icon">{icon}</span>

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${error ? "has-error" : ""} ${shake ? "shake" : ""}`}
        />
      </div>

      {error && <p className="adinn-field-error">{error}</p>}
    </div>
  );
}


type SelectProps = {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: string[];
  error?: string;
};


function Select({
  label,
  name,
  value,
  onChange,
  options,
  error,
}: SelectProps) {
  return (
    <div className="adinn-form-field">
      <label htmlFor={name}>{label}</label>

      <div className="adinn-input-wrap adinn-select-wrap">
        {/* ICON INSIDE WRAP */}
        <span className="adinn-input-icon">
          <Car size={18} />
        </span>

        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={error ? "has-error" : ""}
        >
          <option value="">Select vehicle</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* <ChevronDown size={17} 
            className="adinn-select-arrow"
/> */}
      </div>

      {error && <p className="adinn-field-error">{error}</p>}
    </div>
  );
}


type DateFieldProps = {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  shake?: boolean;
};

function DateField({
  label,
  name,
  value,
  onChange,
  error,
  shake,
}: DateFieldProps) {
  return (
    <div className="adinn-form-field">
      <label htmlFor={name}>
        {label} <span>*</span>
      </label>

      <input
        id={name}
        name={name}
        type="date"
        value={value}
        min={new Date().toISOString().split("T")[0]}
        onChange={onChange}
        className={`${error ? "has-error" : ""} ${shake ? "shake" : ""}`}
      />

      {error && <p className="adinn-field-error">{error}</p>}
    </div>
  );
}