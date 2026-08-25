import { Product, Project } from "@/types";
import { products } from "@/data/products";
import { projects } from "@/data/projects";
import { generateSlug } from "@/utils";

/**
 * CONTENT LAYER
 * -------------
 * Every part of the site reads products and projects through these four
 * functions -- nothing imports the data files directly. That indirection
 * is deliberate: when the site moves to a CMS (Payload, Keystatic,
 * Sanity, or a database), only this file changes. The pages and
 * components stay exactly as they are.
 *
 * These are async on purpose. They don't need to be today, but keeping
 * the signature async means swapping in a real data source later is a
 * change to this file alone.
 *
 * Note: these run on the server. Client components receive the data as
 * props from the server component that renders them.
 */

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find((p) => generateSlug(p.productTitle) === slug);
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  const all = await getProjects();
  return all.find((p) => generateSlug(p.title) === slug);
}
