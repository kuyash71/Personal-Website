"use client";

import { type FormEvent, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/messages";

type ContactFormProps = {
  locale: Locale;
  labels: Messages["contact"];
};

type FormState =
  | { type: "idle" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

type ContactApiResponse = {
  ok?: boolean;
  message?: string;
};

function getApiMessage(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const message = (payload as ContactApiResponse).message;
  return typeof message === "string" ? message : null;
}

export function ContactForm({ locale, labels }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<FormState>({ type: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setFormState({ type: "idle" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("locale", locale);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData
      });

      const payload = (await response.json().catch(() => null)) as unknown;
      const apiMessage = getApiMessage(payload);

      if (response.ok && (payload as ContactApiResponse | null)?.ok === true) {
        setFormState({
          type: "success",
          message: apiMessage ?? labels.status.success
        });
        form.reset();
        return;
      }

      setFormState({
        type: "error",
        message: apiMessage ?? labels.status.error
      });
    } catch {
      setFormState({ type: "error", message: labels.status.networkError });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form action="/api/contact" method="post" onSubmit={handleSubmit}>
      <input defaultValue={locale} name="locale" type="hidden" />

      <div className="form-row">
        <label htmlFor="name">{labels.labels.name}</label>
        <input className="input" id="name" maxLength={100} minLength={2} name="name" required />
      </div>

      <div className="form-row">
        <label htmlFor="email">{labels.labels.email}</label>
        <input className="input" id="email" maxLength={254} name="email" required type="email" />
      </div>

      <div className="form-row">
        <label htmlFor="subject">{labels.labels.subject}</label>
        <input className="input" id="subject" maxLength={150} minLength={3} name="subject" required />
      </div>

      <div className="form-row">
        <label htmlFor="message">{labels.labels.message}</label>
        <textarea className="textarea" id="message" maxLength={4000} minLength={10} name="message" required />
      </div>

      <input aria-hidden="true" autoComplete="off" name="website" style={{ display: "none" }} tabIndex={-1} />

      <button aria-disabled={isSubmitting} className="button" disabled={isSubmitting} type="submit">
        {isSubmitting ? labels.submitting : labels.submit}
      </button>

      {formState.type !== "idle" ? (
        <p
          aria-live="polite"
          className={`form-status ${formState.type === "error" ? "form-status-error" : "form-status-success"}`}
          role="status"
        >
          {formState.message}
        </p>
      ) : null}
    </form>
  );
}
