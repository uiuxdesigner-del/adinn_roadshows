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
title:"South Indian Coverage",
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
              <span>roadshows.</span>
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