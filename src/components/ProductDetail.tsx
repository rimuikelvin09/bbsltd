"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Product } from "@/types";
import { generateSlug } from "@/utils";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/CtaButton";
import LeadForm from "@/components/LeadForm";

interface ProductDetailProps {
  /** The product this route is for. */
  product: Product;
  /** The full catalogue, for the index that moves between product pages. */
  products: Product[];
}

// Capabilities and accreditation only -- never named clients or projects.
const CREDENTIALS = [
  "NCA accredited",
  "Building since 2012",
  "300+ personnel on site",
  "Architectural · structural · MEP in-house",
];

/**
 * One product, one full viewport, one message.
 *
 * The fold carries the eyebrow, the hook, one paragraph and one button —
 * nothing else. Supporting points live in the band below, as three
 * numbered items rather than a bulleted list.
 *
 * The overlay is a radial: it opens up around 70% across, where the
 * subject of a landscape photograph usually sits, and closes to near-solid
 * navy on the left so the type stays legible. Move the 70% if a particular
 * photo is composed differently.
 */
const ProductDetail: React.FC<ProductDetailProps> = ({ product, products }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const toggleForm = () => setIsFormOpen((prev) => !prev);

  const currentSlug = generateSlug(product.productTitle);
  const position = products.findIndex(
    (p) => generateSlug(p.productTitle) === currentSlug,
  );
  const num = (position < 0 ? 0 : position + 1).toString().padStart(2, "0");
  const hasImage = product.fileType === "IMAGE" && Boolean(product.fileUrl);

  return (
    <>
      <section
        id="product-hero"
        className="surface-dark relative flex min-h-screen w-full items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          {hasImage ? (
            <Image
              src={product.fileUrl}
              alt={product.productTitle}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-end bg-[#1B1E58] pr-8 lg:pr-52">
              <span className="text-[length:var(--type-eyebrow)] uppercase tracking-[0.22em] text-white/30">
                Photo needed
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(33,36,102,0.25)_0%,rgba(33,36,102,0.62)_32%,rgba(33,36,102,0.93)_68%)]" />
        </div>

        <Container className="relative z-10 pt-28 pb-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="numeral text-[length:var(--type-meta)] text-[color:var(--accent)]">
                {num}
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-white/30" />
              <span className="eyebrow eyebrow-muted display-shadow">
                {product.productTitle}
              </span>
            </div>

            <h2 className="display-shadow mt-6">{product.productHook}</h2>

            <p className="lede display-shadow mt-7 max-w-[560px]">
              {product.productVp}
            </p>

            <div className="mt-8">
              <CtaButton onClick={toggleForm} label={product.ctaLabel} />
            </div>
          </div>
        </Container>

        {/* Index of the other routes. Real links, not scroll targets. */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden -translate-y-1/2 xl:block">
          <Container>
            <nav
              aria-label="Other products"
              className="pointer-events-auto flex flex-col items-end gap-5"
            >
              {products.map((p) => {
                const slug = generateSlug(p.productTitle);
                const on = slug === currentSlug;
                return (
                  <Link
                    key={p.id}
                    href={`/products/${slug}`}
                    aria-current={on ? "page" : undefined}
                    className={clsx(
                      "display-shadow text-right text-[length:var(--type-meta)] transition-colors duration-200",
                      on
                        ? "font-semibold text-[color:var(--text)]"
                        : "text-[color:var(--text-muted)] hover:text-[color:var(--text)]",
                    )}
                  >
                    {p.productTitle}
                  </Link>
                );
              })}
            </nav>
          </Container>
        </div>

        {product.points.length > 0 && (
          <div className="absolute inset-x-0 bottom-8 z-10">
            <Container>
              <div className="flex items-center gap-3">
                <span className="eyebrow eyebrow-muted display-shadow tracking-[0.2em]">
                  What this covers
                </span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[color:var(--text-muted)]"
                  aria-hidden="true"
                >
                  <path d="M12 5v14" />
                  <path d="m19 12-7 7-7-7" />
                </svg>
              </div>
            </Container>
          </div>
        )}
      </section>

      {/* Supporting points. Three at most, and never as bullets. */}
      {product.points.length > 0 && (
        <section className="surface-light w-full py-16 sm:py-20 lg:py-24">
          <Container>
            <p className="eyebrow">What this covers</p>

            <div className="mt-10 grid grid-cols-1 gap-x-16 gap-y-10 sm:mt-14 md:grid-cols-3">
              {product.points.map((point, i) => (
                <Reveal
                  key={point.title}
                  delay={i * 0.08}
                  className="flex flex-col gap-4"
                >
                  <span
                    aria-hidden="true"
                    className="numeral text-[3rem] leading-none text-[#E3E3E9]"
                  >
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <h3 className="t-card text-[color:var(--text)]">
                    {point.title}
                  </h3>
                  <p className="body-text">{point.body}</p>
                </Reveal>
              ))}
            </div>

            {/* Facts, not a second CTA competing with the one on the fold. */}
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-[color:var(--rule)] pt-8 sm:mt-16">
              {CREDENTIALS.map((fact) => (
                <span key={fact} className="meta uppercase tracking-[0.16em]">
                  {fact}
                </span>
              ))}
            </div>
          </Container>
        </section>
      )}

      {isFormOpen && (
        <LeadForm onClose={toggleForm} product={product.productTitle} />
      )}
    </>
  );
};

export default ProductDetail;
