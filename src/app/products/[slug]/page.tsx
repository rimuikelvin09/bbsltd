import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetail from "@/components/ProductDetail";
import { getProducts, getProductBySlug } from "@/lib/content";
import { generateSlug } from "@/utils";

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

  return <ProductDetail product={product} products={products} />;
}
