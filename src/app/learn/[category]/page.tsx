import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import Container from "@/components/Container";
import ComingSoon from "@/components/ComingSoon";
import CategoryList from "@/components/learn/CategoryList";
import { getCategoryDef, getItemsByCategory } from "@/lib/learn";
import { learnImage } from "@/lib/learn/images";
import { categories } from "@/data/learn";

/**
 * /learn/[category]
 *
 * The real reason the section is shaped this way: six categories are six
 * search entry points. /learn/legislation can rank for "NCA requirements
 * Kenya"; a filter chip on one combined index never could.
 *
 * Parked and empty categories 404 rather than render a blank page - their
 * cards do not link, so arriving here means a stale link or a guess.
 */

interface PageProps {
  params: { category: string };
}

export async function generateStaticParams() {
  // Parked categories are included: their card is visible and marked, so
  // the route has to exist or the mark becomes a 404.
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const def = getCategoryDef(params.category);
  if (!def) return { title: "Not found" };

  return {
    title: `${def.title} | Learn`,
    description: def.blurb,
    alternates: { canonical: `/learn/${def.slug}` },
    // A holding page in the index is a holding page somebody arrives on
    // from a search. Followed, so the links out of it still carry weight.
    ...(def.parked ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: `${def.title} | Learn`,
      description: def.blurb,
      url: `/learn/${def.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const def = getCategoryDef(params.category);
  if (!def) notFound();

  const items = await getItemsByCategory(def.slug);
  const banner = learnImage(`banner-${def.slug}`);
  const index = categories.findIndex((c) => c.slug === def.slug) + 1;

  return (
    <div className="surface-light w-full">
      <section
        className="border-b border-[color:var(--rule)]"
        style={{ paddingTop: "calc(var(--header-h, 5rem) + 2.5rem)" }}
      >
        <Container className="pb-12 sm:pb-14">
          <p className="font-mono text-[0.75rem] tracking-[0.04em] text-[color:var(--text-muted)]">
            <Link href="/learn" className="text-[color:var(--accent)]">
              Learn
            </Link>{" "}
            / {def.title}
          </p>

          <p className="eyebrow mt-5">
            Category {String(index).padStart(2, "0")}
          </p>
          <h1 className="mt-4 max-w-[20ch]">{def.title}</h1>
          <p className="lede mt-5 max-w-[56ch]">{def.intro}</p>

          {banner && (
            <Image
              src={banner}
              alt=""
              width={1600}
              height={900}
              priority
              className="mt-8 aspect-video w-full max-w-[720px] rounded-xl object-cover"
            />
          )}
        </Container>
      </section>

      <section className="pb-16 sm:pb-20 lg:pb-24">
        <Container>
          {def.parked ? (
            // Shipped deliberately. The card says "Coming soon" and links
            // here; landing on a 404 instead would make the mark a lie.
            <ComingSoon
              title="We are building this one properly rather than quickly."
              body={def.parkedNote ?? ""}
              primary={{ label: "Talk to us about your project", href: "/contact" }}
              secondary={{ label: "What is already published", href: "/learn" }}
            />
          ) : (
          <CategoryList
            items={items}
            categorySlug={def.slug}
            defaultView={def.defaultView}
          />
          )}
        </Container>
      </section>
    </div>
  );
}
