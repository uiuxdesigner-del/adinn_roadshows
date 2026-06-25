"use client";
import { BleedButton } from "./BleedButton";
import { Reveal } from "./Reveal";
import { useState, type FormEvent } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const inputCx =
  "w-full bg-transparent border-b outline-none py-3 text-base placeholder:text-muted-foreground/70 transition-colors";
const labelCx = "text-xs uppercase tracking-widest text-muted-foreground font-medium";

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

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [formError, setFormError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      nextErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.city.trim()) {
      nextErrors.city = "City / service location is required.";
    }

    if (!form.startDate.trim()) {
      nextErrors.startDate = "Campaign start date is required.";
    }

    const days = Number(form.duration.replace(/\D/g, ""));
    if (!form.duration.trim()) {
      nextErrors.duration = "Campaign duration is required.";
    } else if (!days || days < 10) {
      nextErrors.duration = "Minimum campaign duration is 10 days.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Please enter your campaign requirement.";
    }

    return nextErrors;
  };

  const openWhatsAppManual = () => {
    const whatsappMessage = `New ADINN Roadshow Enquiry

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

    const whatsappUrl = `https://wa.me/916380849557?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormError("");
    setErrors({});

    const clientErrors = validateForm();

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setFormError(data.message || "Unable to submit enquiry. Please try again.");
        }

        setStatus("idle");
        return;
      }

      openWhatsAppManual();

      setStatus("success");
      setForm(initialForm);

      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch {
      setFormError("Unable to submit enquiry. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <section id="contact" className="section-pad bg-surface-muted">
      <div className="container-x grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="eyebrow">Request a Campaign</div>
          </Reveal>

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
              {[
                { i: Phone, t: "Phone", v: "+91 63808 49557" },
                { i: Mail, t: "Email", v: "campaigns@adinn.in" },
                { i: MapPin, t: "Head Office", v: "Madurai, Tamil Nadu, India" },
                { i: Clock, t: "Business Hours", v: "Mon – Sat, 9:30 AM – 7:00 PM" },
              ].map((c) => (
                <div key={c.t} className="flex gap-4">
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <c.i className="size-5" />
                  </div>
                  <div>
                    <div className={labelCx}>{c.t}</div>
                    <div className="mt-1 font-medium">{c.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={2}>
            <form
              onSubmit={onSubmit}
              className="card-premium p-7 md:p-10 relative overflow-hidden"
            >
              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-16">
                  <div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold">
                    Enquiry received
                  </h3>
                  <p className="mt-3 text-muted-foreground max-w-sm">
                    Thank you. Our campaign team will reach out within one business day.
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Form will appear again in 5 seconds.
                  </p>
                </div>
              ) : (
                <>
                  {formError && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {formError}
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                    <Field
                      label="Full Name / Company"
                      name="fullName"
                      placeholder="Acme Pvt Ltd"
                      required
                      value={form.fullName}
                      error={errors.fullName}
                      onChange={handleChange}
                    />

                    <Field
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="+91"
                      required
                      value={form.phone}
                      error={errors.phone}
                      onChange={handleChange}
                    />

                    <Field
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="you@brand.com"
                      required
                      value={form.email}
                      error={errors.email}
                      onChange={handleChange}
                    />

                    <Field
                      label="Campaign Type"
                      name="campaignType"
                      placeholder="Product launch, retail, ..."
                      value={form.campaignType}
                      error={errors.campaignType}
                      onChange={handleChange}
                    />

                    <Select
                      label="Preferred Vehicle"
                      name="preferredVehicle"
                      value={form.preferredVehicle}
                      error={errors.preferredVehicle}
                      onChange={handleChange}
                      options={[
                        "LED Screen Vehicle",
                        "L-Type LED Vehicle",
                        "3-Side LED Truck",
                        "Customized Fabrication",
                        "Not sure",
                      ]}
                    />

                    <Field
                      label="City / Service Location"
                      name="city"
                      placeholder="Chennai"
                      value={form.city}
                      error={errors.city}
                      onChange={handleChange}
                    />

                   <DateField
  label="Campaign Start Date"
  name="startDate"
  value={form.startDate}
  error={errors.startDate}
  onChange={handleChange}
/>

                    <Field
                      label="Campaign Duration"
                      name="duration"
                      placeholder="e.g. 10 days"
                      value={form.duration}
                      error={errors.duration}
                      onChange={handleChange}
                    />

                    <Select
                      label="Budget Range"
                      name="budget"
                      value={form.budget}
                      error={errors.budget}
                      onChange={handleChange}
                      options={[
                        "< ₹1 Lakh",
                        "₹1 – 3 Lakh",
                        "₹3 – 7 Lakh",
                        "₹7 Lakh+",
                        "Discuss",
                      ]}
                    />

                    <div className="sm:col-span-2">
                      <label className={labelCx}>Message / Requirement *</label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Tell us about your campaign goal..."
                        value={form.message}
                        onChange={handleChange}
                        className={`${inputCx} resize-none ${
                          errors.message ? "border-red-500" : "border-border focus:border-primary"
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-2 text-[13px] text-red-600">{errors.message}</p>
                      )}
                    </div>
                  </div>

                  <BleedButton type="submit">Submit Enquiry</BleedButton>

                  <p className="mt-5 text-xs text-muted-foreground">
                    By submitting, you agree to be contacted by ADINN Roadshow about your enquiry.
                  </p>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  value,
  error,
  onChange,
}: {
  label: string;
  name: keyof FormState;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  error?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelCx}>
        {label}
        {required && " *"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={`${inputCx} ${
          error ? "border-red-500" : "border-border focus:border-primary"
        }`}
      />
      {error && <p className="mt-2 text-[13px] text-red-600">{error}</p>}
    </div>
  );
}

function Select({
  label,
  name,
  options,
  value,
  error,
  onChange,
}: {
  label: string;
  name: keyof FormState;
  options: string[];
  value: string;
  error?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelCx}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`${inputCx} appearance-none ${
          error ? "border-red-500" : "border-border focus:border-primary"
        }`}
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-[13px] text-red-600">{error}</p>}
    </div>
  );
}



function DateField({
  label,
  name,
  value,
  error,
  onChange,
}: {
  label: string;
  name: keyof FormState;
  value: string;
  error?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelCx}>
        {label} *
      </label>

      <input
        id={name}
        name={name}
        type="date"
        value={value}
        onChange={onChange}
        min={new Date().toISOString().split("T")[0]}
        className={`${inputCx} cursor-pointer ${
          error ? "border-red-500" : "border-border focus:border-primary"
        }`}
      />

      {error && <p className="mt-2 text-[13px] text-red-600">{error}</p>}
    </div>
  );
}