"use client";

import { useState, useTransition } from "react";
import { submitContactForm } from "@/app/actions/contact";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success: boolean;
    error?: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);

    startTransition(async () => {
      const res = await submitContactForm(formData);
      setResult(res);
      if (res.success) {
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    });
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Name + Email row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1 block text-sm font-medium text-text-primary"
          >
            Name <span className="text-red-400">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full rounded-lg border border-border bg-bg-surface px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1 block text-sm font-medium text-text-primary"
          >
            Email <span className="text-red-400">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-border bg-bg-surface px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="contact-subject"
          className="mb-1 block text-sm font-medium text-text-primary"
        >
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          placeholder="e.g. Data Engineer opportunity"
          className="w-full rounded-lg border border-border bg-bg-surface px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1 block text-sm font-medium text-text-primary"
        >
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about the opportunity or project..."
          className="w-full resize-none rounded-lg border border-border bg-bg-surface px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
        />
        <p className="mt-1 text-xs text-text-muted">
          {formData.message.length}/2000
        </p>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-bg transition-all hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>

      {/* Result message */}
      {result && (
        <div
          role="alert"
          className={`rounded-lg px-4 py-3 text-sm ${
            result.success
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {result.success
            ? "✓ Message sent successfully! I'll get back to you soon."
            : `✗ ${result.error}`}
        </div>
      )}
    </form>
  );
}
