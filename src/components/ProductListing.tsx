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
  return (
    <section
      id="product-listings"
      className="surface-light w-full py-12 sm:py-14 lg:py-16"
    >
      <Container>
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4 sm:mb-10">
          <p className="eyebrow">All six routes</p>
          <p className="meta">
            Prefer to talk it through?{" "}
            <Link href="/contact" className="link font-semibold">
              Talk to us
            </Link>
          </p>
        </div>

        {products.length > 0 ? (
          // ONE GRID, NOT TWO ROWS. Each row previously carried
          // lg:min-h-[100svh], so the six cards cost two full viewports and
          // left the gap you could drive a bus through. Six cards in a
          // single 3-up grid, sized by their content, is one screen.
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <Reveal
                key={product.id}
                delay={Math.min(index % 3, 3) * 0.09}
                className="h-full"
              >
                <Link
                  href={`/products/${generateSlug(product.productTitle)}`}
                  className="group flex h-full flex-col"
                >
                  {/* Landscape, not portrait: these are services, and the
                      name carries the decision. The photograph is
                      atmosphere, so it does not get to set the height. */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1B1E58]">
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
                    <span
                      aria-hidden="true"
                      className="numeral absolute left-5 top-4 text-[length:var(--type-meta)] text-white/70"
                    >
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-24 [background:var(--card-foot-veil)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>

                  {product.badge && (
                    <span className="mt-4 inline-flex w-fit items-center rounded-full bg-[#FFEDED] px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#991212]">
                      {product.badge}
                    </span>
                  )}
                  <h3 className={`t-card text-[#212466] ${product.badge ? "mt-2" : "mt-4"}`}>
                    {product.productTitle}
                  </h3>
                  <p className="body-text mt-2 line-clamp-2">{product.productVp}</p>
                  <span className="meta mt-auto inline-flex items-center gap-2 pt-4 font-semibold text-[#212466]">
                    Learn more
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
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
