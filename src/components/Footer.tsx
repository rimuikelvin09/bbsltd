"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { siteDetails } from "@/data/siteDetails";
import { footerDetails } from "@/data/footer";
import { getPlatformIconByName } from "@/utils";
import { Product } from "@/types";
import { generateSlug } from "@/utils";

const Footer: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products for the Products column
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products", {
          next: { revalidate: 3600 },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <footer className="relative text-[#FBFBFB]">
      {/* Main Section with Background Image and Gradient Overlay */}
      <div className="relative py-12">
        <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
          <Image
            src="/images/footer-bg.jpg"
            alt="Footer background"
            fill
            className="w-full h-full object-cover"
            priority
          />
          <div className="footer-bg-filter absolute inset-0 bg-gradient-to-tr from-[#212466] to-[rgba(33,36,102,0.41)] backdrop-blur-md" />
        </div>
        <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1: Logo and Address */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-40 h-auto relative">
                <Image
                  width={80}
                  height={10}
                  src="/images/whitelogomark.png"
                  alt={siteDetails.siteName}
                  className="object-contain"
                />
              </div>
            </Link>
            <h4 className="text-xl font-bold mb-2">Head Office</h4>
            <hr className="border-[#991212] w-12 mb-4" />
            <div className="text-primary-accent">
              <p className="mb-2 font-[350]">{footerDetails.address}</p>
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h4 className="text-xl font-bold mb-2">Products</h4>
            <hr className="border-[#991212] w-12 mb-4" />
            <ul className="text-primary-accent">
              {products.map((product) => (
                <li key={product.id} className="mb-2 font-[350]">
                  <Link
                    href={`/products/${generateSlug(product.productTitle)}`}
                    className="hover:text-[#991212] transition-colors duration-200"
                  >
                    {product.productTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quicklinks */}
          <div>
            <h4 className="text-xl font-bold mb-2">Resources</h4>
            <hr className="border-[#991212] w-12 mb-4" />
            <ul className="text-primary-accent">
              {footerDetails.resources.map((link) => (
                <li key={link.text} className="mb-2 font-[350]">
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener"
                    className="hover:text-[#991212] transition-colors duration-200"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details and Socials */}
          <div>
            <h4 className="text-xl font-bold mb-2">Contact Us</h4>
            <hr className="border-[#991212] w-12 mb-4" />
            <div className="text-primary-accent font-[350]">
              {footerDetails.email && (
                <a
                  href={`mailto:${footerDetails.email}`}
                  className="block hover:text-[#991212] mb-2 transition-colors duration-200"
                >
                  Email: {footerDetails.email}
                </a>
              )}
              {footerDetails.telephones &&
                footerDetails.telephones.map((phone, idx) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    className="block hover:text-[#991212] mb-2 transition-colors duration-200"
                  >
                    Phone {idx === 0 ? "" : "(Alt)"}: {phone}
                  </a>
                ))}
              {footerDetails.socials && (
                <div className="mt-5 flex items-center gap-5 flex-wrap">
                  {Object.keys(footerDetails.socials).map((platformName) => {
                    if (platformName && footerDetails.socials[platformName]) {
                      return (
                        <Link
                          href={footerDetails.socials[platformName]}
                          key={platformName}
                          aria-label={platformName}
                          className="hover:text-[#991212] transition-colors duration-200"
                        >
                          {getPlatformIconByName(platformName)}
                        </Link>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-white text-gray-800 py-6 ">
        <div className="max-w-7xl w-full mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center mb-2 md:mb-0 font-semibold">
            Copyright © {new Date().getFullYear()} {siteDetails.siteName}. All
            rights reserved.
          </p>
          <p className="text-sm text-gray-600 font-semibold">
            Powered by{" "}
            <a
              href="https://alphainsights.co.ke/"
              target="_blank"
              rel="noopener"
              className="text-[#991212] hover:underline"
            >
              Alphatech Insights
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
