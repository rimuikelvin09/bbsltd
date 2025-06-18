"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { HiOutlineXMark, HiBars3, HiChevronLeft } from "react-icons/hi2";
import Image from "next/image";
import { generateSlug } from "@/utils";
import { Product } from "@/types";
import Container from "./Container";
import { siteDetails } from "@/data/siteDetails";
import { menuItems } from "@/data/menuItems";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [showProductsSubmenu, setShowProductsSubmenu] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    // When closing the main menu, reset the product submenu state
    if (isOpen) {
      setShowProductsSubmenu(false);
    }
  };

  // Toggle products submenu
  const toggleProductsSubmenu = () => {
    setShowProductsSubmenu((prev) => !prev);
  };

  // Fetch products and handle scroll
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        setProducts(await response.json());
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${
        isScrolled ? "bg-white/70 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <Container className="!px-0">
        <nav className="shadow-md md:shadow-none bg-white md:bg-transparent mx-auto flex justify-between items-center py-2 px-5 md:py-10">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <div className="hidden md:block w-40 h-auto relative">
              <Image
                width={140}
                height={20}
                src={
                  isScrolled ? siteDetails.siteLogo : siteDetails.siteWhiteLogo
                }
                alt={siteDetails.siteName}
                className="object-contain"
              />
            </div>
            <div className="md:hidden w-10 h-auto relative">
              <Image
                width={100}
                height={10}
                src={siteDetails.siteLogomark}
                alt={siteDetails.siteName}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex text-xl font-semibold text-[#212466] space-x-6 items-center">
            {menuItems.map((item) =>
              item.text === "Products" ? (
                <li key={item.text} className="relative group">
                  <button
                    className={`nav-link ${
                      isScrolled ? "text-foreground" : "text-white"
                    } hover:text-foreground-accent transition-colors`}
                  >
                    {item.text}
                  </button>
                  <div className="absolute left-0 mt-2 w-48 hidden group-hover:block bg-white/90 backdrop-blur-md border border-white/20 rounded-md shadow-lg">
                    <ul className="py-1">
                      {products.map((product) => (
                        <li key={product.id}>
                          <Link
                            href={`/products/${generateSlug(
                              product.productTitle
                            )}`}
                            className="block px-4 py-2 text-sm text-primary hover:bg-white/20 hover:text-secondary transition-colors"
                          >
                            {product.productTitle}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.text}>
                  <Link
                    href={item.url}
                    className={`nav-link ${
                      isScrolled ? "text-foreground" : "text-white"
                    } hover:text-foreground-accent transition-colors`}
                  >
                    {item.text}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden bg-primary text-[#212466] rounded-full w-10 h-10 flex items-center justify-center"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <HiOutlineXMark className="h-6 w-6" />
            ) : (
              <HiBars3 className="h-6 w-6" />
            )}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40" // Darker overlay for better contrast
          onClick={toggleMenu}
        />
      )}

      <Transition
        show={isOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 -translate-x-full"
        enterTo="opacity-100 translate-x-0"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 -translate-x-full"
      >
        <div className="md:hidden fixed top-0 left-0 h-full w-3/4 bg-white/90 backdrop-blur-md z-50 flex flex-col shadow-lg">
          {/* Mobile Menu Header (Logo and Close Button) */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="w-10 h-auto relative">
              <Image
                width={100}
                height={10}
                src={siteDetails.siteLogomark}
                alt={siteDetails.siteName}
                className="object-contain"
              />
            </div>
            {/* Removed the 'X' button here as per requirement 1 */}
          </div>

          {/* Mobile Menu Content - Main Menu vs. Products Submenu */}
          <div className="flex flex-col flex-1 py-6 px-4 font-extrabold text-[#212466] overflow-y-auto relative">
            {/* Main Menu Transition */}
            <Transition
              show={!showProductsSubmenu}
              enter="transition ease-out duration-300 transform"
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-in duration-200 transform"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 -translate-x-full"
            >
              {/* Added a div to hold the className for styling the transition content */}
              <div className="absolute inset-0 p-4">
                <ul className="flex flex-col space-y-6 text-left">
                  {menuItems.map((item) =>
                    item.text === "Products" ? (
                      <li key={item.text}>
                        <button
                          className="text-primary hover:text-secondary text-xl font-medium flex items-center justify-between w-full pr-4"
                          onClick={toggleProductsSubmenu}
                        >
                          {item.text}
                        </button>
                      </li>
                    ) : (
                      <li key={item.text}>
                        <Link
                          href={item.url}
                          className="text-primary hover:text-secondary text-xl font-medium block"
                          onClick={toggleMenu}
                        >
                          {item.text}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </Transition>

            {/* Products Submenu Transition */}
            <Transition
              show={showProductsSubmenu}
              enter="transition ease-out duration-300 transform"
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-in duration-200 transform"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 -translate-x-full"
            >
              {/* Added a div to hold the className for styling the transition content */}
              <div className="absolute inset-0 p-4">
                <button
                  className="flex items-center text-[#991212] text-sm font-bold mb-6 text-left"
                  onClick={toggleProductsSubmenu}
                >
                  <HiChevronLeft className="w-6 h-6 mr-2 text-[#991212]" />
                  Back to main menu
                </button>
                <ul className="flex flex-col space-y-6 text-left">
                  {products.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/products/${generateSlug(product.productTitle)}`}
                        className="text-primary hover:text-secondary text-xl font-medium block"
                        onClick={toggleMenu}
                      >
                        {product.productTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
