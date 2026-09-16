import type { Metadata } from "next";

import ProductsListing from "@/components/ProductListing";
import Container from "@/components/Container";
import { getProducts } from "@/lib/content";
import { siteDetails } from "@/data/siteDetails";

/**
 * The "Products" item in the main navigation points at /products, but this
 * route never existed -- on desktop the nav item was a hover-only dropdown,
 * so the dead link went unnoticed. It now renders the full catalogue.
 */
export const metadata: Metadata = {
  title: "Products",
  description: `Explore the building solutions and services offered by ${siteDetails.siteName}.`,
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <section className="surface-light w-full pb-4 pt-32 sm:pt-36 lg:pt-44">
        <Container>
          <p className="eyebrow">What we do</p>
          <h1 className="t-section mt-5 max-w-3xl">
            Six ways to build, and one of them is yours.
          </h1>
          <p className="lede mt-6 max-w-2xl">
            The right route depends on what you already have — land, financing,
            materials, or just a plan. Answer three questions and we will point
            you at it, or read all six below.
          </p>
        </Container>
      </section>
      <ProductsListing products={products} />
    </>
  );
}
