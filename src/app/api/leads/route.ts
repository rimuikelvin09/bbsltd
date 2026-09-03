import { NextResponse } from "next/server";
import { validateLead } from "@/lib/leads/types";
import {
  createLeadItem,
  sendMail,
  graphConfigured,
  mailConfigured,
} from "@/lib/leads/graph";
import { teamNotification, acknowledgement } from "@/lib/leads/messages";

/**
 * The single seam every lead passes through.
 *
 * The form knows about this route and nothing else. Adding a CRM later means
 * adding a branch here — the form, the validation and the payload shape do
 * not change, and nothing has to be migrated.
 *
 * Storing the lead and telling somebody about it are treated separately on
 * purpose: if the notification fails the lead is still saved, and the visitor
 * still gets a success response rather than submitting twice and creating a
 * duplicate.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** A form completed impossibly fast was not completed by a person. */
const MIN_ELAPSED_MS = 2500;

/** Crude per-instance throttle. Enough to blunt a script; not a WAF. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many submissions. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Malformed request." },
      { status: 400 }
    );
  }

  const { data: lead, errors } = validateLead(body);
  if (!lead) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  // Bots fill hidden fields and submit instantly. Answer 200 either way, so a
  // scripted attacker learns nothing about which signal caught them.
  const looksAutomated =
    Boolean(lead.website) ||
    (typeof lead.elapsedMs === "number" && lead.elapsedMs < MIN_ELAPSED_MS);
  if (looksAutomated) {
    return NextResponse.json({ ok: true });
  }

  const failures: string[] = [];
  let stored = false;

  if (graphConfigured) {
    try {
      await createLeadItem(lead);
      stored = true;
    } catch (error) {
      failures.push(`store: ${(error as Error).message}`);
    }
  } else {
    failures.push("store: Microsoft Graph is not configured.");
  }

  let notified = false;
  let acknowledged = false;

  if (mailConfigured) {
    const channel = process.env.MS_SALES_CHANNEL_EMAIL;
    if (channel) {
      try {
        const message = teamNotification(lead);
        await sendMail({
          to: [channel],
          subject: message.subject,
          html: message.html,
          replyTo: lead.email,
        });
        notified = true;
      } catch (error) {
        failures.push(`notify: ${(error as Error).message}`);
      }
    }

    try {
      const message = acknowledgement(lead);
      await sendMail({
        to: [lead.email],
        subject: message.subject,
        html: message.html,
      });
      acknowledged = true;
    } catch (error) {
      failures.push(`acknowledge: ${(error as Error).message}`);
    }
  }

  if (failures.length) {
    // Server-side only. The visitor never sees infrastructure detail.
    console.error("[leads]", failures.join(" | "));
  }

  // As long as the lead reached a person somehow, the submission succeeded.
  if (!stored && !notified) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not record your enquiry. Please call +254 722 333 324 and we will take the details.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, stored, notified, acknowledged });
}
