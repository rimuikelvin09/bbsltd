import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { generateSlug } from "@/utils";
import Container from "./Container";
import Reveal from "@/components/Reveal";
import ProductGuide from "@/components/ProductGuide";

interface ProductsListingProps {
  /** Supplied by the page, which reads them on the server. */
  products: Product[];
}

const Arrow = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[color:var(--accent)] transition-transform duration-300 group-hover:translate-x-1"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

/** Six products, three to a row. */
const chunk = <T,>(items: T[], size: number): T[][] => {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
};

/**
 * THE SIX ROUTES
 * --------------
 * Each row of three fills the viewport on a large screen. This is a size
 * change, not a return to scroll-jacking: the page scrolls normally
 * throughout, the content moves with it, and nothing is pinned. What it buys
 * is presence - a product gets a full column of photograph instead of a
 * thumbnail, which is the difference between a catalogue and a portfolio.
 *
 * On a phone the rows collapse to one column at natural height. Six
 * viewport-tall cards on a small screen is six screens of scrolling to see
 * six names, and the premium feeling does not survive the trip.
 *
 * The guide is the last child so that it sticks to the foot of the viewport
 * for exactly as long as this section is on screen. See ProductGuide.
 */
const ProductsListing: React.FC<ProductsListingProps> = ({ products }) => {
  const rows = chunk(products, 3);

  return (
    <section
      id="product-listings"
      className="surface-light w-full py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4 sm:mb-14">
          <p className="eyebrow">All six routes</p>
          <p className="meta">
            Prefer to talk it through?{" "}
            <Link href="/contact" className="link font-semibold">
              Talk to us
            </Link>
          </p>
        </div>

        {products.length > 0 ? (
          <div className="flex flex-col gap-14 lg:gap-24">
            {rows.map((row, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                // min-h, not h: on a short laptop a fixed viewport height
                // clipped the card. content-center holds the row in the
                // middle of the viewport so there is air above and below it
                // rather than the cards filling the screen edge to edge.
                className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:min-h-[100svh] lg:grid-cols-3 lg:content-center lg:py-[7vh]"
              >
                {row.map((product, i) => {
                  const index = rowIndex * 3 + i;
                  return (
                    <Reveal
                      key={product.id}
                      delay={Math.min(i, 3) * 0.09}
                      className="h-full"
                    >
                      <Link
                        href={`/products/${generateSlug(product.productTitle)}`}
                        className="group flex h-full flex-col"
                      >
                        {/* A FIXED RATIO, not flex-1. Letting the image take
                            the leftover height meant every card got a
                            different one - a two-line title or a shorter
                            blurb stole or gave back space, so the six frames
                            were six different shapes and the photographs were
                            cropped inconsistently. A ratio makes all six
                            identical at every width, and the text below
                            absorbs the difference instead. */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#1B1E58]">
                          {product.fileType === "IMAGE" && product.fileUrl ? (
                            <Image
                              src={product.fileUrl}
                              alt={product.productTitle}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="border border-dashed border-white/25 px-5 py-3 text-[length:var(--type-eyebrow)] uppercase tracking-[0.22em] text-white/40">
                                Photo needed
                              </span>
                            </div>
                          )}
                          {/* The numeral sits on the image so the eye can count
                              the set without reading it. */}
                          <span
                            aria-hidden="true"
                            className="numeral absolute left-5 top-4 text-[length:var(--type-meta)] text-white/70"
                          >
                            {(index + 1).toString().padStart(2, "0")}
                          </span>
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,rgba(27,30,88,0.55),rgba(27,30,88,0))] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          />
                        </div>

                        <h3 className="t-card mt-6 text-[#212466]">
                          {product.productTitle}
                        </h3>
                        <p className="body-text mt-3 line-clamp-3">
                          {product.productVp}
                        </p>
                        <span className="meta mt-auto inline-flex items-center gap-2 pt-5 font-semibold text-[#212466]">
                          Learn more
                          <Arrow />
                        </span>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <p className="body-text max-w-xl">
            Our product line-up is being updated.{" "}
            <Link href="/contact" className="link">
              Talk to us
            </Link>{" "}
            and we will walk you through what we offer.
          </p>
        )}

        <ProductGuide products={products} />
      </Container>
    </section>
  );
};

export default ProductsListing;
