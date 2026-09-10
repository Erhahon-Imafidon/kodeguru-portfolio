"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { site } from "@/data/site";

export type ContactFields = { name: string; email: string; message: string };

export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  | {
      status: "error";
      message?: string;
      fields?: Partial<ContactFields>;
      values: ContactFields;
    };

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: ContactFields) {
  const fields: Partial<ContactFields> = {};
  if (values.name.length < 2 || values.name.length > 80) fields.name = "Please add your name.";
  if (!EMAIL.test(values.email)) fields.email = "That email address doesn't look right.";
  if (values.message.length < 10) fields.message = "Tell me a little more — at least a sentence.";
  if (values.message.length > 3000) fields.message = "Please keep it under 3,000 characters.";
  return fields;
}

const fallback = `Email me directly at ${site.email}.`;

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: bots fill every field; humans never see this one.
  if (formData.get("company")) return { status: "sent" };

  const values: ContactFields = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const fields = validate(values);
  if (Object.keys(fields).length) return { status: "error", fields, values };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: `Too many messages from this connection. Try again in a few minutes, or ${fallback.toLowerCase()}`,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { status: "error", message: `The form isn't connected yet. ${fallback}`, values };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL ?? site.email,
    replyTo: values.email,
    subject: `Portfolio enquiry from ${values.name}`,
    text: `From: ${values.name} <${values.email}>\n\n${values.message}`,
  });

  if (error) {
    console.error("Contact form send failed:", error);
    return { status: "error", message: `Couldn't send right now. ${fallback}`, values };
  }

  return { status: "sent" };
}
