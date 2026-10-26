import { NextResponse } from "next/server";

/**
 * POST /api/questions
 *
 * Takes a question from a publication page and puts it in the moderation
 * queue. Nothing posted here ever appears on the site automatically.
 *
 * THE SPAM LAYERS, cheapest first:
 *   1. Honeypot. A hidden `company` field people never see and bots fill.
 *   2. Submit time. A form completed in under two seconds was not typed.
 *   3. Link count. More than one URL in a question is a near-certain tell.
 *   4. (Next) Cloudflare Turnstile, and a per-IP rate limit.
 *
 * Rejections return 200 with a normal-looking body. Telling a bot which
 * check caught it is free information for whoever wrote it; an honest error
 * code is for honest callers, and these are not.
 *
 * STORAGE is not wired yet - see lib/learn/questions.ts. Until the
 * SharePoint list exists this logs the submission server-side so the flow
 * can be exercised end to end in development.
 */

interface Payload {
  question?: string;
  name?: string;
  email?: string;
  stage?: string;
  slug?: string;
  timestamp?: string;
  /** Honeypot. Must arrive empty. */
  company?: string;
  /** Milliseconds between the form mounting and submission. */
  elapsedMs?: number;
}

const MIN_ELAPSED_MS = 2000;
const MAX_QUESTION = 2000;

/** Accepted, but quietly dropped. The caller cannot tell the difference. */
function silentlyDiscard(reason: string) {
  console.warn(`[questions] discarded: ${reason}`);
  return NextResponse.json({ ok: true, queued: true });
}

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  if (body.company) return silentlyDiscard("honeypot filled");
  if (typeof body.elapsedMs === "number" && body.elapsedMs < MIN_ELAPSED_MS) {
    return silentlyDiscard("submitted too fast");
  }

  const question = (body.question ?? "").trim();
  const email = (body.email ?? "").trim();
  const name = (body.name ?? "").trim();
  const slug = (body.slug ?? "").trim();

  if (question.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Please write a little more so we can answer properly." },
      { status: 422 },
    );
  }
  if (question.length > MAX_QUESTION) {
    return NextResponse.json(
      { ok: false, error: "That is longer than we can take here. Email us instead." },
      { status: 422 },
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "We need a working email to tell you when it is answered." },
      { status: 422 },
    );
  }
  if ((question.match(/https?:\/\//gi) ?? []).length > 1) {
    return silentlyDiscard("multiple links");
  }
  if (!slug) {
    return NextResponse.json(
      { ok: false, error: "Missing the publication this question belongs to." },
      { status: 422 },
    );
  }

  const submission = {
    slug,
    question,
    name: name || "Anonymous",
    email,
    stage: body.stage ?? "",
    timestamp: body.timestamp ?? "",
    receivedAt: new Date().toISOString(),
  };

  if (!process.env.MS_QUESTIONS_LIST_ID) {
    // Development path. Replace with a Graph write to the Website Questions
    // list, mirroring lib/leads/graph.ts, once that list exists.
    console.info("[questions] queued (not persisted):", submission);
    return NextResponse.json({ ok: true, queued: true, persisted: false });
  }

  console.info("[questions] queued:", submission.slug);
  return NextResponse.json({ ok: true, queued: true, persisted: false });
}
