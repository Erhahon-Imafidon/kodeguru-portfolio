"use client";

import { useActionState, useId } from "react";
import { sendMessage, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { status: "idle" };

const field =
  "w-full rounded-lg border border-white/25 bg-white/10 px-4 py-3 text-[15px] text-white placeholder:text-white/50 transition-colors focus:border-white focus:bg-white/15 focus:outline-none";
const label = "mb-1.5 block text-[13.5px] font-medium text-white/85";
const errorText = "mt-1.5 text-[13px] text-amber-100";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);
  const id = useId();

  if (state.status === "sent") {
    return (
      <div
        role="status"
        className="rounded-xl border border-white/25 bg-white/10 px-5 py-6 text-white"
      >
        <p className="font-display text-lg font-semibold">Thanks — it&apos;s on its way.</p>
        <p className="mt-1 text-[15px] text-white/85">I usually reply within a day.</p>
      </div>
    );
  }

  const err = state.status === "error" ? state : null;
  const values = err?.values;

  return (
    <form action={action} noValidate className="grid gap-4">
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor={`${id}-name`}>Name</label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={values?.name}
            aria-invalid={!!err?.fields?.name}
            aria-describedby={err?.fields?.name ? `${id}-name-err` : undefined}
            className={field}
            placeholder="Your name"
          />
          {err?.fields?.name && <p id={`${id}-name-err`} className={errorText}>{err.fields.name}</p>}
        </div>
        <div>
          <label className={label} htmlFor={`${id}-email`}>Email</label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={values?.email}
            aria-invalid={!!err?.fields?.email}
            aria-describedby={err?.fields?.email ? `${id}-email-err` : undefined}
            className={field}
            placeholder="you@company.com"
          />
          {err?.fields?.email && <p id={`${id}-email-err`} className={errorText}>{err.fields.email}</p>}
        </div>
      </div>

      <div>
        <label className={label} htmlFor={`${id}-message`}>Message</label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          required
          defaultValue={values?.message}
          aria-invalid={!!err?.fields?.message}
          aria-describedby={err?.fields?.message ? `${id}-message-err` : undefined}
          className={`${field} resize-y`}
          placeholder="What are you building, or what should stop being manual?"
        />
        {err?.fields?.message && (
          <p id={`${id}-message-err`} className={errorText}>{err.fields.message}</p>
        )}
      </div>

      <div aria-live="polite">
        {err?.message && <p className={errorText}>{err.message}</p>}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="font-display inline-flex w-fit items-center rounded-full bg-white px-[26px] py-[13px] text-[15px] font-semibold text-navy transition-[transform,box-shadow,opacity] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(0,0,0,.45)] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
