import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { generateSlug } from "@/utils";
import Container from "./Container";
import Reveal from "@/components/Reveal";

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
 * The six routes. No section headline: the banner above already made the
 * claim, and repeating it would only add weight to a page whose job is to
 * feel uncrowded. The card is the action, so it carries no button.
 */
const ProductsListing: React.FC<ProductsListingProps> = ({ products }) => {
  return (
    <section
      id="product-listings"
      className="surface-light w-full py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4 sm:mb-12">
          <p className="eyebrow">Find your product</p>
          <p className="meta">
            Not sure which applies?{" "}
            <Link href="/contact" className="link font-semibold">
              Talk to us
            </Link>
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-11 gap-y-12 sm:gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.id} delay={Math.min(i, 5) * 0.06}>
                <Link
                  href={`/products/${generateSlug(product.productTitle)}`}
                  className="group flex h-full flex-col"
                >
                <div className="relative h-[190px] w-full overflow-hidden bg-[#1B1E58] sm:h-[212px]">
                  {product.fileType === "IMAGE" && product.fileUrl ? (
                    <Image
                      src={product.fileUrl}
                      alt={product.productTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="border border-dashed border-white/25 px-5 py-3 text-[length:var(--type-eyebrow)] uppercase tracking-[0.22em] text-white/40">
                        Photo needed
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="t-card mt-6 text-[#212466]">
                  {product.productTitle}
                </h3>
                <p className="body-text mt-3">{product.productVp}</p>
                <span className="meta mt-auto inline-flex items-center gap-2 pt-5 font-semibold text-[#212466]">
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
      </Container>
    </section>
  );
};

export default ProductsListing;
