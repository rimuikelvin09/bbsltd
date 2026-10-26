import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import Container from "@/components/Container";
import VideoFacade from "@/components/learn/VideoFacade";
import AskDisclosure from "@/components/learn/AskDisclosure";
import {
  getCategoryDef,
  getLearnItemBySlug,
  getLearnRoutes,
  getRelatedItems,
} from "@/lib/learn";
import { learnImage } from "@/lib/learn/images";
import { getQuestionsForSlug } from "@/lib/learn/questions";
import {
  JsonLd,
  articleJsonLd,
  guideJsonLd,
  podcastEpisodeJsonLd,
} from "@/lib/seo/jsonLd";
import { LearnItem } from "@/types";

/**
 * /learn/[category]/[slug] - ONE PUBLICATION
 *
 * A page, never a modal. A modal has no URL, so Google cannot index it,
 * nobody can send the link on WhatsApp, the question thread has no
 * permanent address, and structured data has nothing to attach to.
 */

interface PageProps {
  params: { category: string; slug: string };
}

export async function generateStaticParams() {
  const routes = await getLearnRoutes();
  return routes.map((r) => ({ category: r.category, slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const item = await getLearnItemBySlug(params.category, params.slug);
  if (!item) return { title: "Not found" };

  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/learn/${item.category}/${item.slug}` },
    openGraph: {
      title: item.title,
      description: item.summary,
      url: `/learn/${item.category}/${item.slug}`,
      type: item.form === "written" ? "article" : "website",
      images: item.thumbnail ? [{ url: item.thumbnail }] : undefined,
    },
  };
}

function structuredData(item: LearnItem) {
  const slug = `${item.category}/${item.slug}`;

  if (item.form === "video") {
    return podcastEpisodeJsonLd({
      title: item.title,
      description: item.summary,
      slug,
      publishedAt: item.publishedAt,
      videoId: item.videoId,
      image: item.thumbnail,
    });
  }
  if (item.form === "download" && item.fileUrl) {
    return guideJsonLd({
      title: item.title,
      description: item.summary,
      slug,
      fileUrl: item.fileUrl,
    });
  }
  return articleJsonLd({
    title: item.title,
    description: item.summary,
    slug,
    publishedAt: item.publishedAt,
  });
}

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function PublicationPage({ params }: PageProps) {
  const item = await getLearnItemBySlug(params.category, params.slug);
  if (!item) notFound();

  const def = getCategoryDef(item.category);
  const [questions, related] = await Promise.all([
    getQuestionsForSlug(item.slug),
    getRelatedItems(item, 3),
  ]);
  const header = learnImage(`article-${item.slug}`);

  return (
    <div className="surface-light w-full">
      <JsonLd data={structuredData(item)} />

      <article style={{ paddingTop: "calc(var(--header-h, 5rem) + 2.5rem)" }}>
        <Container>
          <p className="font-mono text-[0.75rem] tracking-[0.04em] text-[color:var(--text-muted)]">
            <Link href="/learn" className="text-[color:var(--accent)]">Learn</Link>
            {" / "}
            <Link href={`/learn/${item.category}`} className="text-[color:var(--accent)]">
              {def?.title ?? item.category}
            </Link>
          </p>

          <h1 className="mt-4 max-w-[22ch]">{item.title}</h1>

          {item.draft && (
            <p className="mt-4 inline-block rounded bg-[#ffeded] px-3 py-1 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--crimson)]">
              Draft &middot; visible locally, excluded from the live build
            </p>
          )}

          <p className="lede mt-5 max-w-[62ch]">{item.summary}</p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <span className="font-mono text-[length:var(--type-meta)] text-[color:var(--text-muted)]">
              {formatDate(item.publishedAt)}
              {item.form === "written" && ` · ${item.readingMinutes ?? 5} min read`}
              {item.form === "download" && item.fileMeta && ` · ${item.fileMeta}`}
            </span>

            {questions.length > 0 && (
              // Scrolls to answers that are already in the page. A reader
              // halfway down has no idea a thread is waiting below.
              <a
                href="#questions"
                className="inline-flex items-center gap-[9px] rounded-full border border-[color:var(--rule)] bg-white px-4 py-2 text-[0.8125rem] font-semibold text-[color:var(--text)] transition-colors hover:border-[color:var(--accent)]"
              >
                <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-[color:var(--accent)]" />
                {questions.length} question{questions.length === 1 ? "" : "s"} answered
              </a>
            )}
          </div>

          {item.form === "video" && item.videoId && (
            <div className="mt-8 max-w-[900px]">
              <VideoFacade videoId={item.videoId} title={item.title} thumbnail={item.thumbnail} priority />
            </div>
          )}

          {item.form === "written" && header && (
            <Image src={header} alt="" width={1600} height={900} priority
              className="mt-8 aspect-video w-full max-w-[760px] rounded-xl object-cover" />
          )}

          {item.form === "download" && item.fileUrl && (
            <div className="mt-8 max-w-[560px] rounded-2xl border border-[color:var(--rule)] bg-white p-7">
              <p className="text-[length:var(--type-meta)] text-[color:var(--text-muted)]">
                {/* No email wall. The enquiry form is the conversion point. */}
                Free, no email required.
              </p>
              <a href={item.fileUrl} target="_blank" rel="noopener noreferrer"
                className="btn-pill-dark mt-4">
                Open the {item.fileMeta ?? "PDF"}
              </a>
            </div>
          )}

          <div className="mt-10 grid grid-cols-1 items-start gap-9 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
            <div className="min-w-0">
              {item.form === "written" && item.blocks && (
                <div className="body-text max-w-[65ch]">
                  {item.blocks.map((block, i) =>
                    block.type === "h2" ? (
                      <h2 key={i} className="t-sub mt-9 first:mt-0">{block.text}</h2>
                    ) : block.type === "ul" ? (
                      <ul key={i} className="mt-4 grid list-disc gap-3 pl-5">
                        {(block.items ?? []).map((li, j) => <li key={j}>{li}</li>)}
                      </ul>
                    ) : (
                      <p key={i} className="mt-4">{block.text}</p>
                    ),
                  )}
                </div>
              )}

              {item.form === "video" && item.notes && item.notes.length > 0 && (
                <>
                  <h2 className="t-sub">In this episode</h2>
                  <div className="mt-4">
                    {item.notes.map((note) => (
                      <div key={note.at}
                        className="grid grid-cols-[60px_1fr] items-baseline gap-4 border-t border-[color:var(--rule)] py-[11px] last:border-b">
                        <span className="font-mono text-[0.8125rem] tabular-nums text-[color:var(--accent)]">{note.at}</span>
                        <span className="text-[0.9375rem] text-[color:var(--text-soft)]">{note.text}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {item.topics.length > 0 && (
                <div className="mt-7 flex flex-wrap gap-x-3 gap-y-1">
                  {item.topics.map((t) => (
                    <span key={t} className="font-mono text-[0.6875rem] tracking-[0.05em] text-[color:var(--text-muted)]">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {related.length > 0 && (
              <aside className="rounded-2xl border border-[color:var(--rule)] bg-white p-[22px]">
                <h3>Related</h3>
                <ul className="mt-4 grid gap-[13px]">
                  {related.map((r) => (
                    <li key={`${r.category}/${r.slug}`}
                      className="min-w-0 border-b border-[color:var(--rule)] pb-[13px] last:border-b-0 last:pb-0">
                      <span className="mb-[3px] block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[color:var(--text-muted)]">
                        {getCategoryDef(r.category)?.title ?? r.category}
                      </span>
                      <Link href={`/learn/${r.category}/${r.slug}`}
                        className="text-[0.9375rem] transition-colors hover:text-[color:var(--accent)]">
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </Container>
      </article>

      {/* QUESTIONS. Attached to this publication, never to the hub. The
          answers render server-side always - they are the SEO asset. Only
          the form is behind a button. */}
      <section id="questions" className="scroll-mt-24 py-14 sm:py-20">
        <Container>
          <div className="border-t border-[color:var(--rule)] pt-10">
            <p className="eyebrow">Questions &amp; feedback</p>
            <h2 className="t-section mt-4 max-w-[26ch]">
              {item.form === "video"
                ? "Ask about anything said here."
                : "Ask about anything on this page."}
            </h2>

            <div className="mt-8 max-w-[72ch]">
              {questions.length === 0 ? (
                <p className="text-[length:var(--type-meta)] text-[color:var(--text-muted)]">
                  No questions on this one yet. Yours would be the first, and it
                  gets answered in public so the next person finds it too.
                </p>
              ) : (
                questions.map((q) => (
                  <div key={q.id} className="border-t border-[color:var(--rule)] py-6 last:border-b">
                    <p className="font-[family-name:var(--font-display)] text-[1.1875rem] leading-[1.32]">
                      {q.question}
                    </p>
                    <p className="mt-[9px] font-mono text-[0.75rem] text-[color:var(--text-muted)]">
                      {q.askerName}
                      {q.askerPlace ? ` · ${q.askerPlace}` : ""}
                      {q.timestamp ? ` · at ${q.timestamp}` : ""}
                      {` · ${formatDate(q.askedAt)}`}
                    </p>
                    {q.answer && (
                      <div className="mt-[18px] border-l-2 border-[color:var(--accent)] pl-[17px]">
                        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[color:var(--accent)]">
                          {q.answeredBy ?? "Benchmark"}
                        </span>
                        <p className="mt-[9px] text-[0.9375rem] text-[color:var(--text-soft)]">{q.answer}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="mt-7 max-w-[620px]">
              <AskDisclosure slug={item.slug} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
