import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetail from "@/components/ProductDetail";
import { getProducts, getProductBySlug } from "@/lib/content";
import { generateSlug } from "@/utils";
import Link from "next/link";
import Container from "@/components/Container";
import FinancingNudge from "@/components/FinancingNudge";
import Testimonials from "@/components/Testimonials";
import { JsonLd, serviceJsonLd } from "@/lib/seo/jsonLd";

interface ProductPageProps {
  params: { slug: string };
}

/**
 * One static page per product, so each route carries its own title,
 * description and share card, and the content is in the HTML for search
 * engines. A single scrolling page would have collapsed all six into one
 * URL competing for six different searches.
 */
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: generateSlug(product.productTitle),
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.productTitle,
    description: product.productVp,
    // Six products, six URLs, six canonicals. Without these, a crawler that
    // reaches the page with a tracking parameter appended treats it as a
    // separate page and splits the ranking between them.
    alternates: { canonical: `/products/${params.slug}` },
    openGraph: {
      title: product.productTitle,
      description: product.productVp,
      images: product.fileUrl ? [{ url: product.fileUrl }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // The index down the right side moves between routes, so the view
  // needs the whole catalogue as well as the product this URL is for.
  const products = await getProducts();

  return (
    <>
      {/* Tells Google this page is a service offered by the business in the
          site-wide block, rather than a page that merely mentions one. */}
      <JsonLd
        data={serviceJsonLd({
          name: product.productTitle,
          description: product.productVp,
          slug: params.slug,
        })}
      />
      <ProductDetail product={product} products={products} />

      {/*
        WHAT USED TO BE STRANDED ON THE HOME PAGE.

        A visitor who scrolls the home page, picks a product and clicks has
        behaved exactly as intended - and in doing so walked away from the
        financing answer, the social proof and the reason to come back. None
        of those blocks existed anywhere but page.tsx, which meant the whole
        bottom of the funnel was only ever seen by people who did NOT
        convert. They belong here, where the deciding happens.
      */}
      {product.financing && <FinancingNudge />}

      <Testimonials />

      <section className="surface-light w-full border-t border-[color:var(--rule)] py-12 sm:py-14">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div className="min-w-0">
            <p className="eyebrow">Not ready to talk yet</p>
            <p className="t-card mt-3 max-w-[28ch]">
              Read what this actually involves before you commit to anything.
            </p>
          </div>
          <Link href="/learn" className="btn-pill btn-pill-dark">
            Go to Learn
          </Link>
        </Container>
      </section>
    </>
  );
}
