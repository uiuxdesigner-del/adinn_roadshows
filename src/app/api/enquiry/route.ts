import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type EnquiryData = {
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

function cleanPhone(phone: string) {
  return phone.replace(/\s+/g, "").replace("+91", "");
}

function validate(data: EnquiryData) {
  const errors: Partial<Record<keyof EnquiryData, string>> = {};

  if (!data.fullName?.trim()) {
    errors.fullName = "Full name / company is required.";
  }

  const phone = cleanPhone(data.phone || "");

  if (!phone) {
    errors.phone = "Phone number is required.";
  } else if (!/^[6-9]\d{9}$/.test(phone)) {
    errors.phone = "Enter a valid 10-digit phone number.";
  }

  if (!data.email?.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.city?.trim()) {
    errors.city = "City / service location is required.";
  }

  if (!data.startDate?.trim()) {
    errors.startDate = "Campaign start date is required.";
  }

  const days = Number((data.duration || "").replace(/\D/g, ""));

  if (!data.duration?.trim()) {
    errors.duration = "Campaign duration is required.";
  } else if (!days || days < 10) {
    errors.duration = "Minimum campaign duration is 10 days.";
  }

  if (!data.message?.trim()) {
    errors.message = "Please enter your campaign requirement.";
  }

  return errors;
}

function enquiryText(data: EnquiryData) {
  return `New ADINN Roadshow Enquiry

Name / Company: ${data.fullName}
Phone: ${data.phone}
Email: ${data.email}
Campaign Type: ${data.campaignType || "-"}
Preferred Vehicle: ${data.preferredVehicle || "-"}
City / Service Location: ${data.city}
Campaign Start Date: ${data.startDate}
Campaign Duration: ${data.duration}
Budget Range: ${data.budget || "-"}

Message / Requirement:
${data.message}`;
}

async function sendEmail(data: EnquiryData) {
  if (!process.env.SMTP_HOST) {
    throw new Error("SMTP_HOST missing. Check .env.local location.");
  }

  if (!process.env.SMTP_USER) {
    throw new Error("SMTP_USER missing. Check .env.local.");
  }

  if (!process.env.SMTP_PASS) {
    throw new Error("SMTP_PASS missing. Add real email password in .env.local.");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.verify();

  await transporter.sendMail({
    from: `"ADINN Roadshow" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: process.env.ENQUIRY_EMAIL_TO || process.env.SMTP_USER,
    replyTo: data.email,
    subject: `New Roadshow Enquiry - ${data.fullName}`,
    text: enquiryText(data),
  });
}

async function sendSmsIfEnabled(data: EnquiryData) {
  if (!process.env.SMS_API_URL || !process.env.SMS_API_KEY) {
    return {
      skipped: true,
      reason: "SMS API not configured",
    };
  }

  const smsMessage = `New ADINN enquiry from ${data.fullName}. Phone: ${data.phone}. City: ${data.city}. Vehicle: ${data.preferredVehicle || "-"}.`;

  const res = await fetch(process.env.SMS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SMS_API_KEY}`,
    },
    body: JSON.stringify({
      to: process.env.ALERT_PHONE || "916380849557",
      message: smsMessage,
      senderId: process.env.SMS_SENDER_ID || "ADINN",
      templateId: process.env.SMS_TEMPLATE_ID || "",
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`SMS failed: ${errorText}`);
  }

  return {
    skipped: false,
    message: "SMS sent",
  };
}

async function sendWhatsAppIfEnabled(data: EnquiryData) {
  if (!process.env.WHATSAPP_API_URL || !process.env.WHATSAPP_API_KEY) {
    return {
      skipped: true,
      reason: "WhatsApp API not configured",
    };
  }

  const res = await fetch(process.env.WHATSAPP_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
    },
    body: JSON.stringify({
      to: process.env.ALERT_PHONE || "916380849557",
      templateName: process.env.WHATSAPP_TEMPLATE_NAME || "",
      variables: {
        name: data.fullName,
        phone: data.phone,
        email: data.email,
        city: data.city,
        vehicle: data.preferredVehicle || "-",
        duration: data.duration,
      },
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`WhatsApp failed: ${errorText}`);
  }

  return {
    skipped: false,
    message: "WhatsApp sent",
  };
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Enquiry API is working",
    env: {
      SMTP_HOST: !!process.env.SMTP_HOST,
      SMTP_USER: !!process.env.SMTP_USER,
      SMTP_PASS: !!process.env.SMTP_PASS,
    },
  });
}

export async function POST(request: Request) {
  try {
    const data: EnquiryData = await request.json();

    const errors = validate(data);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          errors,
        },
        { status: 400 }
      );
    }

    await sendEmail(data);

    const smsResult = await sendSmsIfEnabled(data).catch((error) => ({
      skipped: false,
      error: error instanceof Error ? error.message : "SMS failed",
    }));

    const whatsappResult = await sendWhatsAppIfEnabled(data).catch((error) => ({
      skipped: false,
      error: error instanceof Error ? error.message : "WhatsApp failed",
    }));

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully.",
      channels: {
        email: "sent",
        sms: smsResult,
        whatsapp: whatsappResult,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown enquiry API error";

    console.error("Enquiry API error:", message);

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}