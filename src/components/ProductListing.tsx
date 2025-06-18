"use client";
import React, { useEffect, useState, useRef } from "react";
import { Product } from "@/types";
import Link from "next/link";
import { generateSlug } from "@/utils";
import Container from "@/components/Container";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { productTitle, productVp, fileType, fileUrl } = product;
  const slug = generateSlug(productTitle);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse X relative to card
      const y = e.clientY - rect.top; // Mouse Y relative to card
      cardRef.current.style.setProperty("--mouse-x", `${x}px`);
      cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.setProperty("--mouse-x", "0px");
      cardRef.current.style.setProperty("--mouse-y", "0px");
    }
  };

  return (
    <Link href={`/products/${slug}`} className="block">
      <div
        className="bg-white/10 backdrop-blur-sm border  border-white p-6 text-white shadow-lg flex flex-col product-card-hover min-h-full flex-grow"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {fileType === "IMAGE" && fileUrl && (
          <Image
            src={fileUrl}
            alt={productTitle}
            className="w-full h-48 object-cover  mb-4"
            width={400} // Adjust based on desired size
            height={200} // Adjust based on desired size
          />
        )}
        <h2 className="text-[18px] font-semibold mb-3">{productTitle}</h2>
        <p className="text-sm mb-10">{productVp}</p>
        <button
          className="flex items-center justify-center min-w-[205px] px-6 h-14 rounded-full w-full sm:w-fit shadow-md 
             transition-colors duration-300 ease-in-out 
             mt-auto text-[#212466] bg-[#fffffffd] 
             hover:text-white hover:bg-[#212466] 
             text-sm font-semibold"
        >
          Learn More
        </button>
      </div>
    </Link>
  );
};

const ProductsListing: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-white">
        Error: {error}
      </div>
    );
  }

  return (
    <section
      id="product-listings"
      className="min-h-screen w-full flex items-center justify-center relative"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgba(33,36,102,0.75)]"></div>

      {/* Content */}
      <Container>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className=" py-10 text-left sm:text-center mb-8">
            <div className="mx-auto max-w-2xl">
              <p className="mt-4  text-sm  text-[#ffffff] uppercase ">
                Our Products
              </p>
              <div className="w-32 h-[2px] bg-[#991212] my-2 sm:mx-auto mx-0"></div>
              <h2 className="text-4xl  font-semibold capitalize text-[#ffffff] ">
                explore our innovative building solutions and services
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductsListing;
