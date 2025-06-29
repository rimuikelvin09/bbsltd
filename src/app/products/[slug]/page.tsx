"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Product } from "@/types";
import { generateSlug } from "@/utils";
import Image from "next/image";
import Container from "@/components/Container";
import { motion, Variants, AnimatePresence } from "framer-motion";
import clsx from "clsx";

// --- Animation Variants ---
const imageVariants: Variants = {
  initial: { opacity: 0, x: 100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", bounce: 0.2, duration: 0.9 },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { type: "spring", bounce: 0.2, duration: 0.5 },
  },
};

const contentVariants: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.5, ease: "easeIn" } },
};

const ProductPage = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const latestSlug = useRef(slug);

  useEffect(() => {
    latestSlug.current = slug;
  }, [slug]);

  // Fetch all products once
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Update current product when `slug` or `products` changes
  useEffect(() => {
    if (products.length > 0 && slug) {
      const foundProduct = products.find(
        (p: Product) => generateSlug(p.productTitle) === slug
      );
      setCurrentProduct(foundProduct || null);
    }
  }, [slug, products]);

  const handleProductClick = useCallback(
    (productSlug: string) => {
      if (productSlug !== latestSlug.current) {
        setIsSidebarOpen(false);
        router.push(`/products/${productSlug}`);
      }
    },
    [router]
  );

  // Loading state with red spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#991212] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-800 text-white">
        Error: {error}
      </div>
    );
  }

  if (!currentProduct) {
    const displaySlug = Array.isArray(slug) ? slug.join("-") : slug;
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#212466] text-white">
        No product found for{" "}
        {displaySlug ? displaySlug.replace(/-/g, " ") : "this URL"}.
      </div>
    );
  }

  return (
    <section id="product-page" className="relative flex min-h-screen">
      {/* Background Styling */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProduct.productTitle + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 -z-10 w-full h-full overflow-hidden"
        >
          {currentProduct.fileType === "IMAGE" && currentProduct.fileUrl ? (
            <Image
              src={currentProduct.fileUrl}
              alt={`${currentProduct.productTitle} background`}
              fill
              className="w-full h-full object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-[#212466]" />
          )}
          <div className="absolute inset-0 bg-[rgba(33,36,102,0.84)]" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
        <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <div
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-32 right-4 z-[100] px-4 py-2 text-white bg-[#991212]/90 rounded-md shadow-lg cursor-pointer"
      >
        <span className="text-sm font-medium">
          {isSidebarOpen ? "Close Product List" : "View Other Products"}
        </span>
      </div>

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-52 left-0 h-auto max-h-[70vh] w-64 bg-white/70 backdrop-blur-md shadow-lg z-50 transform transition-transform duration-300 ease-in-out",
          "py-8 px-6 overflow-y-hidden",
          {
            "-translate-x-full": !isSidebarOpen,
            "translate-x-0": isSidebarOpen,
          },
          "lg:translate-x-0"
        )}
      >
        <h3 className="text-xl font-semibold text-[#212466] mb-6">
          Other Products
        </h3>
        <ul>
          {products.map((p) => (
            <li key={generateSlug(p.productTitle)} className="mb-2">
              <a
                onClick={() => handleProductClick(generateSlug(p.productTitle))}
                className={clsx(
                  "block px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer",
                  {
                    "bg-[#212466] text-white font-semibold":
                      generateSlug(p.productTitle) === slug,
                    "text-[#212466] hover:bg-gray-100":
                      generateSlug(p.productTitle) !== slug,
                  }
                )}
              >
                {p.productTitle}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Product Content Area */}
      <main className="flex-1 flex items-center justify-center mt-24 p-5 lg:pl-0 lg:ml-64">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.productTitle}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="z-10 w-full"
          >
            <Container>
              <div className="mx-auto py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-4">
                <div className="text-left md:w-1/2 md:pr-8">
                  <motion.h1
                    className="text-2xl md:leading-tight font-semibold text-shadow-md text-[#fefeff] max-w-lg md:max-w-2xl mx-auto md:mx-0"
                    variants={contentVariants}
                  >
                    {currentProduct.productHook}
                  </motion.h1>
                  {currentProduct.description &&
                    currentProduct.description.length > 0 && (
                      <motion.ul
                        className="mt-4 max-w-lg md:max-w-xl font-normal text-white mx-auto md:mx-0 list-disc list-outside pl-5"
                        variants={contentVariants}
                      >
                        {currentProduct.description.flatMap((desc, index) => [
                          <li key={`${index}-a`}>{desc.a}</li>,
                          <li key={`${index}-b`}>{desc.b}</li>,
                          <li key={`${index}-c`}>{desc.c}</li>,
                        ])}
                      </motion.ul>
                    )}
                  {/*<div className="mt-6 flex flex-col sm:flex-row items-start gap-4">
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center min-w-[205px] px-6 h-14 rounded-full w-full sm:w-fit shadow-md transition-all duration-300 ease-in-out hover:text-white hover:bg-[#212466] text-[#212466] bg-[#fffffffd] font-semibold text-sm"
                    >
                      <div>
                        <div className="-mt-1 font-sans">
                          Download Documentation
                        </div>
                      </div>
                    </a>
                  </div>*/}
                </div>
                <motion.div
                  className="md:w-1/2 flex justify-center mt-12 md:mt-0"
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  viewport={{ once: true }}
                >
                  <div className="w-[min(2108px,100%)] h-auto relative">
                    {currentProduct.fileType === "IMAGE" &&
                    currentProduct.fileUrl ? (
                      <Image
                        src={currentProduct.fileUrl}
                        width={854}
                        height={480}
                        quality={100}
                        sizes="(max-width: 768px) 100vw, 1508px"
                        unoptimized={true}
                        alt={currentProduct.productTitle}
                        className="md:h-[400px] w-full max-w-lg filter object-cover"
                      />
                    ) : (
                      <div className="w-full max-w-lg h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                        No Image Available
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </Container>
          </motion.div>
        </AnimatePresence>
      </main>
    </section>
  );
};

export default ProductPage;
