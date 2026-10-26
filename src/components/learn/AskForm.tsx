"use client";

import React, { useRef, useState } from "react";

/**
 * ASK A QUESTION, on the publication it is about.
 *
 * Two of the three spam defences are here and cost nothing: a honeypot field
 * that is off-screen rather than display:none (some bots skip hidden inputs
 * but fill positioned ones), and the time between mount and submit. The
 * third - moderation - is the one that actually matters, and it happens
 * after this form is done with.
 *
 * The confirmation says a person will read it, because that is the only
 * thing the person who just typed actually cares about.
 */
interface Props {
  slug: string;
  /** Podcast pages pass a position so the answer says what it answers. */
  timestamp?: string;
}

const AskForm: React.FC<Props> = ({ slug, timestamp }) => {
  const mountedAt = useRef(Date.now());
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setBusy(true);

    const data = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          timestamp,
          question: String(data.get("question") ?? ""),
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          stage: String(data.get("stage") ?? ""),
          company: String(data.get("company") ?? ""),
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });

      const body = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !body.ok) {
        setError(body.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSent(true);
    } catch {
      setError("We could not reach the server. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-[color:var(--rule)] bg-[color:var(--background)] p-6 text-center">
        <span className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-full bg-[color:var(--accent)]">
          <svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="m4.5 10.5 3.6 3.6L15.5 6.5" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" />
          </svg>
        </span>
        <h3>With the team</h3>
        <p className="mx-auto mt-3 max-w-[34ch] text-[length:var(--type-meta)] text-[color:var(--text-muted)]">
          It is queued for review. If it is a question other people are also
          asking, it gets answered here and you get an email when it goes up.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="btn-pill-dark mx-auto mt-5"
        >
          Ask another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative rounded-2xl border border-[color:var(--rule)] bg-[color:var(--background)] p-6"
    >
      <h3>Ask the team</h3>
      <p className="mt-[10px] text-[length:var(--type-meta)] text-[color:var(--text-muted)]">
        No account, no sign-up. A person reads every question before it appears
        here.
      </p>

      {timestamp && (
        <p className="mt-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rule)] px-3 py-1 font-mono text-[0.75rem] text-[color:var(--accent)]">
            Asking about {timestamp}
          </span>
        </p>
      )}

      <div className="mt-4 grid gap-[7px]">
        <label htmlFor="question" className="text-[0.8125rem] font-semibold">
          Your question
        </label>
        <textarea
          id="question"
          name="question"
          required
          rows={4}
          placeholder="Be specific - county, budget range, the stage you are at. Vague questions get vague answers."
          className="w-full resize-y rounded-lg border border-[color:var(--rule)] bg-white px-3 py-[10px] text-[0.9375rem] text-[color:var(--text)] focus:border-[color:var(--accent)] focus:outline-none"
        />
      </div>

      <div className="mt-4 grid gap-[7px]">
        <label htmlFor="stage" className="text-[0.8125rem] font-semibold">
          Where are you in this?
        </label>
        <select
          id="stage"
          name="stage"
          className="w-full rounded-lg border border-[color:var(--rule)] bg-white px-3 py-[10px] text-[0.9375rem] text-[color:var(--text)] focus:border-[color:var(--accent)] focus:outline-none"
        >
          <option>Still researching</option>
          <option>Planning a build</option>
          <option>Already building</option>
          <option>Building from abroad</option>
          <option>Just here for the podcast</option>
        </select>
      </div>

      <div className="mt-4 grid gap-[7px]">
        <label htmlFor="name" className="text-[0.8125rem] font-semibold">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Shown as a first name only"
          className="w-full rounded-lg border border-[color:var(--rule)] bg-white px-3 py-[10px] text-[0.9375rem] text-[color:var(--text)] focus:border-[color:var(--accent)] focus:outline-none"
        />
      </div>

      <div className="mt-4 grid gap-[7px]">
        <label htmlFor="email" className="text-[0.8125rem] font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-lg border border-[color:var(--rule)] bg-white px-3 py-[10px] text-[0.9375rem] text-[color:var(--text)] focus:border-[color:var(--accent)] focus:outline-none"
        />
        <span className="text-[0.75rem] leading-[1.45] text-[color:var(--text-muted)]">
          Never published. Used once, to tell you the answer is up.
        </span>
      </div>

      {/* Honeypot. Positioned off-screen rather than hidden, and never
          focusable or announced. People do not see it; bots fill it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p role="alert" className="mt-4 text-[length:var(--type-meta)] text-[color:var(--crimson)]">
          {error}
        </p>
      )}

      <button type="submit" disabled={busy} className="btn-pill-dark mt-5 w-full disabled:opacity-60">
        {busy ? "Sending…" : "Send the question"}
      </button>

      <div className="mt-[18px] flex items-start gap-[10px] border-t border-[color:var(--rule)] pt-[15px] text-[0.75rem] leading-[1.5] text-[color:var(--text-muted)]">
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true" className="mt-[2px] flex-none">
          <path d="M7 1 1 3.2v4.3C1 11.4 3.6 14.3 7 15c3.4-.7 6-3.6 6-7.5V3.2L7 1Z" stroke="currentColor" strokeWidth="1.3" />
          <path d="m4.6 7.8 1.7 1.7 3.1-3.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <span>
          Reviewed by a person before it appears. Nothing posts automatically,
          so there is nothing here for a bot to gain.
        </span>
      </div>
    </form>
  );
};

export default AskForm;
