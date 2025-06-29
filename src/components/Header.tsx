"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import {
  HiOutlineXMark,
  HiBars3,
  HiChevronLeft,
  HiUser,
} from "react-icons/hi2";
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
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen((prev) => {
      console.log(
        "Mobile menu toggled, isOpen:",
        !prev,
        "isScrolled:",
        isScrolled
      );
      return !prev;
    });
    if (isOpen) {
      setShowProductsSubmenu(false);
    }
  };

  // Toggle products submenu
  const toggleProductsSubmenu = () => {
    setShowProductsSubmenu((prev) => {
      console.log("Products submenu toggled, showProductsSubmenu:", !prev);
      return !prev;
    });
  };

  // Handle mouse enter for menu items
  const handleMouseEnter = (menuText: string) => {
    setActiveMenu(menuText);
  };

  // Handle mouse leave for menu items
  const handleMouseLeave = (menuText: string) => {
    if (activeMenu === menuText) {
      setActiveMenu(null);
    }
  };

  // Fetch products and handle scroll
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
        console.log("Products fetched:", data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();

    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
      console.log("Scroll detected, isScrolled:", scrolled);
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
      className={`fixed top-0 left-0 right-0 z-[50] w-full transition-colors duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <Container className="!px-0">
        <nav className="shadow-md md:shadow-none bg-white md:bg-transparent mx-auto flex items-end py-2 px-5 md:py-10">
          {/* Mobile Nav: Logo and Hamburger */}
          <div className="flex justify-between items-center w-full md:hidden">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-20 h-auto relative">
                <Image
                  width={100}
                  height={10}
                  src={siteDetails.siteLogo}
                  alt={siteDetails.siteName}
                  className="object-contain"
                />
              </div>
            </Link>
            <button
              className="bg-primary text-[#212466] rounded-full w-10 h-10 flex items-center justify-center"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <HiOutlineXMark className="h-6 w-6" />
              ) : (
                <HiBars3 className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Nav: Logo, Menu, Login */}
          <div className="hidden md:flex items-end w-full">
            {/* Logo (Left) */}
            <div className="flex justify-start">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-40 h-auto relative">
                  <Image
                    width={140}
                    height={20}
                    src={
                      isScrolled
                        ? siteDetails.siteLogo
                        : siteDetails.siteWhiteLogo
                    }
                    alt={siteDetails.siteName}
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Menu (Centered) */}
            <ul className="flex flex-1 justify-center text-xl font-semibold space-x-6 items-end">
              {menuItems.map((item) => (
                <li
                  key={item.text}
                  className="flex items-end relative"
                  onMouseEnter={() => handleMouseEnter(item.text)}
                  onMouseLeave={() => handleMouseLeave(item.text)}
                >
                  {item.text === "Products" ? (
                    <>
                      <button
                        className={`nav-link ${
                          isScrolled ? "text-[#212466]" : "text-white"
                        } hover:text-foreground-accent transition-colors`}
                      >
                        {item.text}
                      </button>
                      {activeMenu === "Products" && (
                        <div
                          className="absolute top-full left-0 w-80 bg-white/90 backdrop-blur-md text-[#212466] border border-white/20 rounded-md shadow-lg"
                          onMouseEnter={() => handleMouseEnter("Products")}
                          onMouseLeave={() => handleMouseLeave("Products")}
                        >
                          <ul className="py-1">
                            {products.map((product) => (
                              <li key={product.id}>
                                <Link
                                  href={`/products/${generateSlug(
                                    product.productTitle
                                  )}`}
                                  className="block px-4 py-2 text-lg font-normal text-primary hover:bg-[#ffeded] hover:text-secondary transition-colors"
                                >
                                  {product.productTitle}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.url}
                      className={`nav-link ${
                        isScrolled ? "text-[#212466]" : "text-white"
                      } hover:text-foreground-accent transition-colors`}
                    >
                      {item.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Login Button (Right) */}
            <div className="flex justify-end items-end">
              <Link
                href="https://bbsltd.ke/auth"
                className={`nav-link ${
                  isScrolled ? "text-[#212466]" : "text-white"
                } hover:text-foreground-accent transition-colors flex items-center gap-2 text-xl font-semibold`}
              >
                <HiUser className="h-6 w-6" />
                Login
              </Link>
            </div>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu Overlay */}
      <Transition
        show={isOpen}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 bg-black/50 z-[40]"
          onClick={toggleMenu}
        />
      </Transition>

      {/* Mobile Menu */}
      <Transition
        show={isOpen}
        key={`mobile-menu-${isScrolled}`}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 -translate-x-full"
        enterTo="opacity-100 translate-x-0"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 -translate-x-full"
      >
        <div className="md:hidden fixed top-0 left-0 h-full w-3/4 bg-white/90 backdrop-blur-md z-[50] flex flex-col shadow-lg isolate">
          {/* Mobile Menu Header */}
          <div className="flex justify-start items-center p-4 border-b border-gray-200">
            <div className="w-10 h-auto relative">
              <Image
                width={100}
                height={10}
                src={siteDetails.siteLogomark}
                alt={siteDetails.siteName}
                className="object-contain"
              />
            </div>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex flex-col flex-1 py-6 px-4 font-extrabold text-[#212466] overflow-y-auto">
            {!showProductsSubmenu ? (
              <ul key="main-menu" className="flex flex-col space-y-6 text-left">
                {menuItems.map((item) => (
                  <li key={item.text}>
                    {item.text === "Products" ? (
                      <button
                        className="text-[#212466] hover:text-secondary text-xl font-medium flex items-center justify-between w-full pr-4"
                        onClick={toggleProductsSubmenu}
                      >
                        {item.text}
                      </button>
                    ) : (
                      <Link
                        href={item.url}
                        className="text-[#212466] hover:text-secondary text-xl font-medium block"
                        onClick={toggleMenu}
                      >
                        {item.text}
                      </Link>
                    )}
                  </li>
                ))}
                <li>
                  <Link
                    href="https://bbsltd.ke/auth"
                    className="text-[#212466] hover:text-secondary text-xl font-medium flex items-center gap-2"
                    onClick={toggleMenu}
                  >
                    <HiUser className="h-6 w-6" />
                    Login
                  </Link>
                </li>
              </ul>
            ) : (
              <div key="products-submenu">
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
                        className="text-[#212466] hover:text-secondary text-xl font-medium block"
                        onClick={toggleMenu}
                      >
                        {product.productTitle}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="https://bbsltd.ke/auth"
                      className="text-[#212466] hover:text-secondary text-xl font-medium flex items-center gap-2"
                      onClick={toggleMenu}
                    >
                      <HiUser className="h-6 w-6" />
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
