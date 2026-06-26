// "use client";
// import { BleedButton } from "./BleedButton";
// import { Reveal } from "./Reveal";
// import { useState, type FormEvent } from "react";
// import {
//   Phone, Mail, MapPin, Clock, CheckCircle2, Loader2,
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

// // ─── Shake keyframe (add to your global CSS or tailwind config) ───────────────
// // @keyframes shake {
// //   0%,100% { transform: translateX(0); }
// //   20%,60%  { transform: translateX(-5px); }
// //   40%,80%  { transform: translateX(5px); }
// // }
// // .animate-shake { animation: shake 0.4s ease; }

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
//     window.open(`https://wa.me/916380849557?text=${encodeURIComponent(msg)}`, "_blank");
//   };
// const EMAILJS_SERVICE_ID  = "service_m7blrwk";   // from Email Services tab
// const EMAILJS_TEMPLATE_ID = "template_6l5cw1b";  // from Email Templates tab
// const EMAILJS_PUBLIC_KEY  = "0LqsQAkcgAOP2XMOe";   // from Account tab


//   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   setFormError("");
//   setErrors({});

//   const clientErrors = validateForm();
//   if (Object.keys(clientErrors).length > 0) {
//     setErrors(clientErrors);
//     setShakeFields(new Set(Object.keys(clientErrors)));
//     setTimeout(() => setShakeFields(new Set()), 500);
//     setFormError("Please fill in all required fields before submitting.");
//     return;
//   }

//   setStatus("loading");

//   try {
//     // EmailJS sends directly from the browser — no backend needed
//     await emailjs.send(
//       EMAILJS_SERVICE_ID,
//       EMAILJS_TEMPLATE_ID,
//       {
//         // These keys must match {{variable}} names in your EmailJS template
//         fullName:         form.fullName,
//         phone:            form.phone,
//         email:            form.email,
//         campaignType:     form.campaignType  || "—",
//         preferredVehicle: form.preferredVehicle || "—",
//         city:             form.city,
//         startDate:        form.startDate,
//         duration:         form.duration,
//         budget:           form.budget        || "—",
//         message:          form.message,
//       },
//       EMAILJS_PUBLIC_KEY
//     );

//     // openWhatsAppManual(); // still opens WhatsApp as before
//     setStatus("success");
//     setForm(initialForm);
//     setTimeout(() => setStatus("idle"), 50000); //success contact ui timer //5000 -> 5s

//   } catch (err) {
//     console.error("EmailJS error:", err);
//     setFormError("Unable to send enquiry. Please try again or contact us directly.");
//     setStatus("idle");
//   }
// };

//   const contactInfo = [
//     {
//       i: Phone, t: "Phone", v: "+91 63808 49557",
//       // ✅ CHANGE: href for click-to-call
//       href: "tel:+916380849557",
//     },
//     {
//       i: Mail, t: "Email", v: "campaigns@adinn.in",
//       // ✅ CHANGE: href for mailto
//       href: "mailto:campaigns@adinn.in",
//     },
//     { i: MapPin, t: "Head Office", v: "Madurai, Tamil Nadu, India" },
//     { i: Clock, t: "Business Hours", v: "Mon – Sat, 9:30 AM – 7:00 PM" },
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
//                 <div key={c.t} className="flex gap-4">
//                   <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
//                     <c.i className="size-5" />
//                   </div>
//                   <div>
//                     <div className={labelCx}>{c.t}</div>
//                     {/* ✅ CHANGE: clickable phone + email */}
//                    {c.href ? (
//         <a
//           href={c.href}
//           className="mt-1 font-medium hover:text-primary transition-colors block"
//         >
//           {c.v}
//         </a>
//       ) : (
//         <div className="mt-1 font-medium">{c.v}</div>
//       )}
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
//               className="card-premium p-7 md:p-10 relative overflow-hidden"  style={{  alignItems:'center', alignContent:'center'}}
//             >
//               {status === "success" ? (
//                 <div className="flex flex-col items-center text-center py-16 animate-in fade-in zoom-in-95 duration-500">
//                   <div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
//                     <CheckCircle2 className="size-8" />
//                   </div>
//                   <h3 className="mt-6 font-display text-2xl font-semibold">Enquiry received</h3>
//                   <p className="mt-3 text-muted-foreground max-w-sm">
//                     Thank you. Our campaign team will reach out within one business day.
//                   </p>
//                   {/* <p className="mt-4 text-xs text-muted-foreground">Form will appear again in 5 seconds.</p> */}
//                 </div>
//               ) : (
//                 <>
//                   {/* ✅ CHANGE: animated global error banner */}
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
//                       <textarea
//                         name="message" rows={3}
//                         placeholder="Tell us about your campaign goal..."
//                         value={form.message} onChange={handleChange}
//                         className={`${inputCx} resize-none ${
//                           errors.message ? "border-red-500 animate-shake" : "border-border focus:border-primary"
//                         } mb-6`}
//                       />
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
//                 </>
//              )} 
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
//       <input
//         id={name} name={name} type={type} placeholder={placeholder}
//         required={required} value={value} onChange={onChange}
//         // ✅ CHANGE: animate-shake class applied when shakeFields contains this field
//         className={`${inputCx} ${shake ? "animate-shake" : ""} ${
//           error ? "border-red-500" : "border-border focus:border-primary"
//         }`}
//       />
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
//       <select id={name} name={name} value={value} onChange={onChange}
//         className={`${inputCx} appearance-none ${
//           error ? "border-red-500" : "border-border focus:border-primary"
//         }`}>
//         <option value="">Select...</option>
//         {options.map((o) => <option key={o} value={o}>{o}</option>)}
//       </select>
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
//       <input
//         id={name} name={name} type="date" value={value} onChange={onChange}
//         min={new Date().toISOString().split("T")[0]}
//         className={`${inputCx} cursor-pointer ${shake ? "animate-shake" : ""} ${
//           error ? "border-red-500" : "border-border focus:border-primary"
//         }`}
//       />
//       {error && (
//         <p className="mt-2 text-[13px] text-red-600 animate-in slide-in-from-top-1 duration-200">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }




"use client";
import { BleedButton } from "./BleedButton";
import { Reveal } from "./Reveal";
import { useState, type FormEvent } from "react";
import {
  Phone, Mail, MapPin, Clock, CheckCircle2, Loader2, ChevronDown,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const inputCx =
  "w-full bg-transparent border-b outline-none py-3 text-base placeholder:text-muted-foreground/70 transition-all duration-200";
const labelCx =
  "text-xs uppercase tracking-widest text-muted-foreground font-medium";

type FormState = {
  fullName: string; phone: string; email: string; campaignType: string;
  preferredVehicle: string; city: string; startDate: string;
  duration: string; budget: string; message: string;
};

const initialForm: FormState = {
  fullName: "", phone: "", email: "", campaignType: "",
  preferredVehicle: "", city: "", startDate: "",
  duration: "", budget: "", message: "",
};

// ─── Animations used here live in your GLOBAL css (globals.css) ───────────────
// .animate-shake     → invalid-field shake
// .animate-cf-float  → floating decorative orb inside the form card
// .animate-cf-pop    → success checkmark pop
// (full snippet provided in global-animations.css)

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [formError, setFormError] = useState("");
  const [shakeFields, setShakeFields] = useState<Set<string>>(new Set());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormError("");
  };

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Full name / company is required.";
    const phone = form.phone.replace(/\s+/g, "").replace("+91", "");
    if (!phone) nextErrors.phone = "Phone number is required.";
    else if (!/^[6-9]\d{9}$/.test(phone)) nextErrors.phone = "Enter a valid 10-digit number.";
    if (!form.email.trim()) nextErrors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email.";
    if (!form.city.trim()) nextErrors.city = "City / service location is required.";
    if (!form.startDate.trim()) nextErrors.startDate = "Campaign start date is required.";
    const days = Number(form.duration.replace(/\D/g, ""));
    if (!form.duration.trim()) nextErrors.duration = "Campaign duration is required.";
    else if (!days || days < 10) nextErrors.duration = "Minimum duration is 10 days.";
    if (!form.message.trim()) nextErrors.message = "Please enter your campaign requirement.";
    return nextErrors;
  };

  const openWhatsApp = () => {
    const msg = `New ADINN Roadshow Enquiry\n\nName / Company: ${form.fullName}\nPhone: ${form.phone}\nEmail: ${form.email}\nCampaign Type: ${form.campaignType || "-"}\nPreferred Vehicle: ${form.preferredVehicle || "-"}\nCity: ${form.city}\nStart Date: ${form.startDate}\nDuration: ${form.duration}\nBudget: ${form.budget || "-"}\n\nRequirement:\n${form.message}`;
    // ✅ CHANGE: WhatsApp number aligned with footer contact (+91 73737 85057)
    window.open(`https://wa.me/917373785057?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const EMAILJS_SERVICE_ID  = "service_m7blrwk";   // from Email Services tab
  const EMAILJS_TEMPLATE_ID = "template_6l5cw1b";  // from Email Templates tab
  const EMAILJS_PUBLIC_KEY  = "0LqsQAkcgAOP2XMOe"; // from Account tab

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setErrors({});

    const clientErrors = validateForm();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setShakeFields(new Set(Object.keys(clientErrors)));
      setTimeout(() => setShakeFields(new Set()), 500);
      setFormError("Please fill in all required fields before submitting.");
      return;
    }

    setStatus("loading");

    try {
      // EmailJS sends directly from the browser — no backend needed
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          // These keys must match {{variable}} names in your EmailJS template
          fullName:         form.fullName,
          phone:            form.phone,
          email:            form.email,
          campaignType:     form.campaignType  || "—",
          preferredVehicle: form.preferredVehicle || "—",
          city:             form.city,
          startDate:        form.startDate,
          duration:         form.duration,
          budget:           form.budget        || "—",
          message:          form.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      // openWhatsApp(); // still available if you want to open WhatsApp on submit
      setStatus("success");
      setForm(initialForm);
      setTimeout(() => setStatus("idle"), 50000); // success ui timer (50s)

    } catch (err) {
      console.error("EmailJS error:", err);
      setFormError("Unable to send enquiry. Please try again or contact us directly.");
      setStatus("idle");
    }
  };

  // ✅ CHANGE: phone + email now match the footer (correct details).
  // Phone supports multiple click-to-call lines, just like the footer.
  type ContactLine = { v: string; href?: string };
  type ContactItem = { i: typeof Phone; t: string; lines: ContactLine[] };

  const contactInfo: ContactItem[] = [
    {
      i: Phone, t: "Phone",
      lines: [
        { v: "+91 73737 85057", href: "tel:+917373785057" },
        { v: "+91 96269 87861", href: "tel:+919626987861" },
      ],
    },
    {
      i: Mail, t: "Email",
      lines: [{ v: "ba@adinn.co.in", href: "mailto:ba@adinn.co.in" }],
    },
    {
      i: MapPin, t: "Head Office",
      lines: [{ v: "Madurai, Tamil Nadu, India" }],
    },
    {
      i: Clock, t: "Business Hours",
      lines: [{ v: "Mon – Sat, 9:30 AM – 7:00 PM" }],
    },
  ];

  return (
    <section id="contact" className="section-pad bg-surface-muted">
      <div className="container-x grid lg:grid-cols-12 gap-10">
        {/* ── Left column ── */}
        <div className="lg:col-span-5">
          <Reveal><div className="eyebrow">Request a Campaign</div></Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-[1.05] text-balance-tight">
              Let&apos;s plan your roadshow.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 text-muted-foreground text-lg max-w-md">
              Share your campaign requirement and our team will get back within one
              business day with a tailored proposal.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-10 card-premium p-7 space-y-5">
              {contactInfo.map((c) => (
                // ✅ animation: hover lifts the icon, fills it with brand colour & tilts it
                <div key={c.t} className="flex gap-4 group">
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 transition-all duration-300 ease-out group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:-rotate-6">
                    <c.i className="size-5" />
                  </div>
                  <div>
                    <div className={labelCx}>{c.t}</div>
                    {/* ✅ clickable phone(s) + email, stacked */}
                    <div className="mt-1 flex flex-col">
                      {c.lines.map((ln) =>
                        ln.href ? (
                          <a
                            key={ln.v}
                            href={ln.href}
                            className="font-medium hover:text-primary transition-colors duration-200 w-fit"
                          >
                            {ln.v}
                          </a>
                        ) : (
                          <span key={ln.v} className="font-medium">{ln.v}</span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── Right column ── */}
        <div className="lg:col-span-7">
          <Reveal delay={2}>
            <form
              onSubmit={onSubmit}
              className="card-premium p-7 md:p-10 relative overflow-hidden"
              style={{ alignItems: "center", alignContent: "center" }}
            >
              {/* ✅ decorative floating orb (purely cosmetic, sits behind content) */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-32 -right-32 size-72 rounded-full bg-primary/5 blur-3xl animate-cf-float"
              />

              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-16 animate-in fade-in zoom-in-95 duration-500 relative">
                  <div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center animate-cf-pop">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold">Enquiry received</h3>
                  <p className="mt-3 text-muted-foreground max-w-sm">
                    Thank you. Our campaign team will reach out within one business day.
                  </p>
                </div>
              ) : (
                <div className="relative">
                  {/* ✅ animated global error banner */}
                  {formError && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
                      <span className="text-base">⚠️</span>
                      {formError}
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                    <Field label="Full Name / Company" name="fullName" placeholder="Acme Pvt Ltd" required
                      value={form.fullName} error={errors.fullName} onChange={handleChange}
                      shake={shakeFields.has("fullName")} />
                    <Field label="Phone Number" name="phone" type="tel" placeholder="+91" required
                      value={form.phone} error={errors.phone} onChange={handleChange}
                      shake={shakeFields.has("phone")} />
                    <Field label="Email Address" name="email" type="email" placeholder="you@brand.com" required
                      value={form.email} error={errors.email} onChange={handleChange}
                      shake={shakeFields.has("email")} />
                    <Field label="Campaign Type" name="campaignType" placeholder="Product launch, retail, ..."
                      value={form.campaignType} error={errors.campaignType} onChange={handleChange} />
                    <Select label="Preferred Vehicle" name="preferredVehicle"
                      value={form.preferredVehicle} error={errors.preferredVehicle} onChange={handleChange}
                      options={["LED Screen Vehicle","L-Type LED Vehicle","3-Side LED Truck","Customized Fabrication","Not sure"]} />
                    <Field label="City / Service Location" name="city" placeholder="Chennai" required
                      value={form.city} error={errors.city} onChange={handleChange}
                      shake={shakeFields.has("city")} />
                    <DateField label="Campaign Start Date" name="startDate"
                      value={form.startDate} error={errors.startDate} onChange={handleChange}
                      shake={shakeFields.has("startDate")} />
                    <Field label="Campaign Duration" name="duration" placeholder="e.g. 10 days" required
                      value={form.duration} error={errors.duration} onChange={handleChange}
                      shake={shakeFields.has("duration")} />
                    <Select label="Budget Range" name="budget"
                      value={form.budget} error={errors.budget} onChange={handleChange}
                      options={["< ₹1 Lakh","₹1 – 3 Lakh","₹3 – 7 Lakh","₹7 Lakh+","Discuss"]} />

                    <div className="sm:col-span-2">
                      <label className={labelCx}>Message / Requirement *</label>
                      {/* ✅ animated underline wrapper */}
                      <div className="relative mb-6">
                        <textarea
                          name="message" rows={3}
                          placeholder="Tell us about your campaign goal..."
                          value={form.message} onChange={handleChange}
                          className={`${inputCx} peer resize-none ${
                            errors.message ? "border-red-500 animate-shake" : "border-border"
                          }`}
                        />
                        <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 peer-focus:w-full" />
                      </div>
                      {errors.message && (
                        <p className="mt-2 text-[13px] text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1 duration-200">
                          <span>↑</span> {errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <BleedButton type="submit" disabled={status === "loading"}>
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="size-4 animate-spin" /> Submitting…
                      </span>
                    ) : "Submit Enquiry"}
                  </BleedButton>

                  <p className="mt-5 text-xs text-muted-foreground">
                    By submitting, you agree to be contacted by ADINN Roadshow about your enquiry.
                  </p>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── Field ──────────────────────────────────────────────────────────────────────
function Field({ label, name, type = "text", placeholder, required, value, error, onChange, shake }: {
  label: string; name: keyof FormState; type?: string; placeholder?: string;
  required?: boolean; value: string; error?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>; shake?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelCx}>{label}{required && " *"}</label>
      {/* ✅ relative wrapper drives the animated focus underline */}
      <div className="relative">
        <input
          id={name} name={name} type={type} placeholder={placeholder}
          required={required} value={value} onChange={onChange}
          className={`${inputCx} peer ${shake ? "animate-shake" : ""} ${
            error ? "border-red-500" : "border-border"
          }`}
        />
        <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 peer-focus:w-full" />
      </div>
      {error && (
        <p className="mt-2 text-[13px] text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1 duration-200">
          <span className="text-xs">↑</span> {error}
        </p>
      )}
    </div>
  );
}

// ── Select ─────────────────────────────────────────────────────────────────────
function Select({ label, name, options, value, error, onChange }: {
  label: string; name: keyof FormState; options: string[]; value: string;
  error?: string; onChange: React.ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelCx}>{label}</label>
      <div className="relative">
        <select id={name} name={name} value={value} onChange={onChange}
          className={`${inputCx} peer appearance-none pr-7 cursor-pointer ${
            error ? "border-red-500" : "border-border"
          }`}>
          <option value="">Select...</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {/* ✅ chevron rotates + turns brand colour on focus */}
        <ChevronDown className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 size-4 text-muted-foreground transition-all duration-300 peer-focus:rotate-180 peer-focus:text-primary" />
        <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 peer-focus:w-full" />
      </div>
      {error && <p className="mt-2 text-[13px] text-red-600">{error}</p>}
    </div>
  );
}

// ── DateField ──────────────────────────────────────────────────────────────────
function DateField({ label, name, value, error, onChange, shake }: {
  label: string; name: keyof FormState; value: string; error?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>; shake?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelCx}>{label} *</label>
      <div className="relative">
        <input
          id={name} name={name} type="date" value={value} onChange={onChange}
          min={new Date().toISOString().split("T")[0]}
          className={`${inputCx} peer cursor-pointer ${shake ? "animate-shake" : ""} ${
            error ? "border-red-500" : "border-border"
          }`}
        />
        <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 peer-focus:w-full" />
      </div>
      {error && (
        <p className="mt-2 text-[13px] text-red-600 animate-in slide-in-from-top-1 duration-200">
          {error}
        </p>
      )}
    </div>
  );
}