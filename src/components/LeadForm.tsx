"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { countries, kenyaCounties } from "@/data/location";

interface LeadFormProps {
  onClose: () => void;
  /**
   * Which page the form was opened from. The product pages pass their own
   * title, the calculator passes "Jenga Kwako", the general CTA passes
   * "General enquiry". It is shown to the visitor as well as recorded, so
   * they can see we already know what they are asking about.
   */
  product?: string;
  /** Text dropped into the message field when the form opens. */
  prefillNotes?: string;
}

/**
 * THE ENQUIRY FORM
 * ----------------
 * This replaced a nine-input form in which seven inputs were required,
 * gender was one of them, the name was split across two mandatory fields,
 * and there was nowhere at all to say what you wanted. It read as an intake
 * interview and it asked for personal data before anyone had spoken.
 *
 * What it asks now is the shortest set that lets someone call you back and
 * know what they are calling about: who you are, how to reach you, where the
 * project is, and what it is. Everything an application later needs - ID,
 * bank, employer - is collected in that call, where there is a person to
 * explain why it is needed.
 *
 * Gender is gone. It priced nothing, designed nothing and built nothing, and
 * holding it without a stated purpose is a liability rather than an asset.
 *
 * Context travels silently alongside: the product, the page, the referrer
 * and any campaign parameters. A submission also fires a `generate_lead`
 * event to GA4 carrying the product, so conversions can be read by product
 * in Analytics without anyone opening SharePoint.
 */
const LeadForm: React.FC<LeadFormProps> = ({
  onClose,
  product,
  prefillNotes,
}) => {
  const uid = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  /** Used to reject submissions that arrive faster than a human can type. */
  const openedAt = useRef<number>(Date.now());
  /** Honeypot. Hidden from people, irresistible to bots. */
  const [website, setWebsite] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    locationType: "KENYA" as "KENYA" | "INTERNATIONAL",
    county: "",
    country: "",
    notes: prefillNotes || "",
    preferredContact: "" as "" | "CALL" | "WHATSAPP" | "SMS" | "EMAIL",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [apiError, setApiError] = useState("");

  const productLabel = product || "General enquiry";

  useEffect(() => {
    document.body.classList.add("form-open");
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("form-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const set = (k: string, v: string | boolean) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => {
      const n = { ...p };
      delete n[k];
      return n;
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Please tell us your name";
    if (!/^\+?[\d\s()-]{9,20}$/.test(form.phoneNumber.trim()))
      e.phoneNumber = "A phone number we can reach you on";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      e.email = "A valid email address";
    if (form.locationType === "KENYA" && !form.county)
      e.county = "Which county?";
    if (form.locationType === "INTERNATIONAL" && !form.country)
      e.country = "Which country?";
    if (!form.preferredContact) e.preferredContact = "Pick one";
    if (!form.consent) e.consent = "We need your permission to get in touch";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      // Send focus to the first thing that needs fixing.
      const first = document.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    setIsSubmitting(true);
    setApiError("");
    try {
      const params = new URLSearchParams(window.location.search);
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phoneNumber: form.phoneNumber.trim(),
          preferredContact: form.preferredContact,
          locationType: form.locationType,
          county: form.county,
          country: form.country,
          notes: form.notes.trim(),
          consent: form.consent,
          productOffering: productLabel,
          // Attribution, captured silently. Costs nothing now; it is the only
          // way to answer "which page or campaign produced this" later.
          pageUrl: window.location.href,
          referrer: document.referrer || "",
          utmSource: params.get("utm_source") || "",
          utmMedium: params.get("utm_medium") || "",
          utmCampaign: params.get("utm_campaign") || "",
          website,
          elapsedMs: Date.now() - openedAt.current,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body.message ||
            (Array.isArray(body.errors) && body.errors[0]) ||
            "We could not send your enquiry. Please try again.",
        );
      }
      await res.json();

      // GA4. Lets Analytics report conversions broken down by product.
      const w = window as unknown as {
        gtag?: (...a: unknown[]) => void;
      };
      if (typeof w.gtag === "function") {
        w.gtag("event", "generate_lead", {
          product: productLabel,
          page_location: window.location.href,
        });
      }

      setSent(true);
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "Submission failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const field =
    "w-full rounded-lg border border-[color:var(--rule)] bg-white px-4 py-3 text-[length:var(--type-body)] text-[color:var(--text)] outline-none transition-colors placeholder:text-[color:var(--text-muted)] focus:border-[#212466] focus:ring-2 focus:ring-[#212466]/15";
  const label =
    "meta mb-2 block font-semibold uppercase tracking-[0.14em] text-[color:var(--text)]";
  const err = "meta mt-1.5 block text-[color:var(--accent)]";

  const backdrop = (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-[#0d0e24]/60 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${uid}-title`}
    />
  );

  if (sent) {
    return (
      <>
        {backdrop}
        <div className="pointer-events-none fixed inset-0 z-[61] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <div className="pointer-events-auto w-full max-w-[480px] rounded-t-2xl bg-white p-8 text-center shadow-2xl sm:rounded-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#212466]">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h2 className="t-sub mt-6 text-[#212466]">That is with us.</h2>
            <p className="body-text mx-auto mt-4 max-w-sm">
              Thank you{form.fullName ? `, ${form.fullName.split(" ")[0]}` : ""}.
              We have your enquiry about <strong>{productLabel}</strong> and
              someone will be in touch. A confirmation is on its way to{" "}
              {form.email}.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="btn-pill btn-pill-dark mt-8 w-full"
            >
              Close
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {backdrop}
      <div className="pointer-events-none fixed inset-0 z-[61] flex items-end justify-center p-0 sm:items-center sm:p-6">
        <div
          ref={panelRef}
          tabIndex={-1}
          className="pointer-events-auto max-h-[92svh] w-full max-w-[560px] overflow-y-auto rounded-t-2xl bg-white shadow-2xl outline-none sm:max-h-[90svh] sm:rounded-2xl"
        >
          {/* The header names what they are enquiring about, so the context we
              are already carrying is visible to them too. */}
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-2xl bg-[#212466] px-6 py-5 sm:px-8">
            <div>
              <p className="eyebrow eyebrow-muted">Enquiry</p>
              <h2
                id={`${uid}-title`}
                className="t-card mt-1.5 text-white"
              >
                {productLabel}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="-mr-2 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate className="px-6 py-7 sm:px-8">
            <p className="body-text mb-7">
              Four things and we can call you back knowing what you need. No
              documents, no obligation.
            </p>

            {/* Honeypot. Hidden from people and from screen readers; bots fill
                it in, and the server discards anything that arrives with it set. */}
            <div
              aria-hidden="true"
              className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
            >
              <label htmlFor={`${uid}-website`}>Website</label>
              <input
                id={`${uid}-website`}
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <label htmlFor={`${uid}-name`} className={label}>
                  Your name
                </label>
                <input
                  id={`${uid}-name`}
                  className={field}
                  autoComplete="name"
                  placeholder="e.g. Jane Wanjiru"
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? `${uid}-name-e` : undefined}
                />
                {errors.fullName && (
                  <span id={`${uid}-name-e`} className={err}>
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${uid}-phone`} className={label}>
                    Phone
                  </label>
                  <input
                    id={`${uid}-phone`}
                    type="tel"
                    inputMode="tel"
                    className={field}
                    autoComplete="tel"
                    placeholder="+254 7.."
                    value={form.phoneNumber}
                    onChange={(e) => set("phoneNumber", e.target.value)}
                    aria-invalid={Boolean(errors.phoneNumber)}
                  />
                  {errors.phoneNumber && (
                    <span className={err}>{errors.phoneNumber}</span>
                  )}
                </div>
                <div>
                  <label htmlFor={`${uid}-email`} className={label}>
                    Email
                  </label>
                  <input
                    id={`${uid}-email`}
                    type="email"
                    inputMode="email"
                    className={field}
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <span className={err}>{errors.email}</span>}
                </div>
              </div>

              <div>
                <span className={label}>Where is the project?</span>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      ["KENYA", "In Kenya"],
                      ["INTERNATIONAL", "Outside Kenya"],
                    ] as const
                  ).map(([v, l]) => (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={form.locationType === v}
                      onClick={() => {
                        set("locationType", v);
                        set(v === "KENYA" ? "country" : "county", "");
                      }}
                      className={`rounded-lg border px-4 py-3 text-[length:var(--type-meta)] font-semibold transition-colors ${
                        form.locationType === v
                          ? "border-[#212466] bg-[#212466] text-white"
                          : "border-[color:var(--rule)] text-[color:var(--text)] hover:border-[#212466]"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>

                <div className="mt-3">
                  {form.locationType === "KENYA" ? (
                    <>
                      <select
                        aria-label="County"
                        className={field}
                        value={form.county}
                        onChange={(e) => set("county", e.target.value)}
                        aria-invalid={Boolean(errors.county)}
                      >
                        <option value="">Select a county</option>
                        {kenyaCounties.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      {errors.county && <span className={err}>{errors.county}</span>}
                    </>
                  ) : (
                    <>
                      <select
                        aria-label="Country"
                        className={field}
                        value={form.country}
                        onChange={(e) => set("country", e.target.value)}
                        aria-invalid={Boolean(errors.country)}
                      >
                        <option value="">Select a country</option>
                        {countries.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <span className={err}>{errors.country}</span>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor={`${uid}-notes`} className={label}>
                  About your project{" "}
                  <span className="font-normal normal-case tracking-normal text-[color:var(--text-muted)]">
                    — optional
                  </span>
                </label>
                <textarea
                  id={`${uid}-notes`}
                  rows={4}
                  maxLength={2000}
                  className={`${field} resize-y`}
                  placeholder="A plot in Kiambu, three bedrooms, hoping to start in the new year…"
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                />
              </div>

              <div>
                <span className={label}>Best way to reach you</span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(
                    [
                      ["CALL", "Call"],
                      ["WHATSAPP", "WhatsApp"],
                      ["SMS", "SMS"],
                      ["EMAIL", "Email"],
                    ] as const
                  ).map(([v, l]) => (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={form.preferredContact === v}
                      aria-invalid={Boolean(errors.preferredContact)}
                      onClick={() => set("preferredContact", v)}
                      className={`rounded-lg border px-3 py-2.5 text-[length:var(--type-meta)] font-semibold transition-colors ${
                        form.preferredContact === v
                          ? "border-[#212466] bg-[#212466] text-white"
                          : "border-[color:var(--rule)] text-[color:var(--text)] hover:border-[#212466]"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
                {errors.preferredContact && (
                  <span className={err}>{errors.preferredContact}</span>
                )}
              </div>

              <label className="flex cursor-pointer items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  aria-invalid={Boolean(errors.consent)}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#212466]"
                />
                <span className="meta leading-relaxed">
                  I agree that Benchmark Building Solutions may contact me about
                  this enquiry and hold these details for that purpose.
                </span>
              </label>
              {errors.consent && <span className={err}>{errors.consent}</span>}

              {apiError && (
                <p
                  role="alert"
                  className="body-text rounded-lg border border-[color:var(--accent)]/30 bg-[#fdf3f3] px-4 py-3 text-[color:var(--accent)]"
                >
                  {apiError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-pill btn-pill-dark mt-1 w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending…" : "Send my enquiry"}
              </button>
              <p className="meta text-center">
                We reply within one working day.
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LeadForm;
