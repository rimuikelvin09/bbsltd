import type { Metadata } from "next";

import ProductsListing from "@/components/ProductListing";
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

  return <ProductsListing products={products} />;
}
