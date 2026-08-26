"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
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

/**
 * AUTO-HIDING HEADER
 * At the top of the page the header is always visible. Scrolling down
 * hides it, scrolling up brings it back, and once back it hides itself
 * again after a pause — so the header is only present while it is
 * actually being used, and the content gets the whole viewport.
 *
 * This is the number worth tuning. Too short and the header disappears
 * while someone is still reading the menu they scrolled up to reach.
 */
const HIDE_AFTER_IDLE_MS = 2500;
/** Ignore scroll jitter below this, so a trackpad twitch cannot toggle it. */
const SCROLL_DEADZONE = 6;
/** Anything within this of the top counts as "at the top". */
const TOP_THRESHOLD = 12;

interface HeaderProps {
  /** Supplied by the root layout, which reads them on the server. */
  products: Product[];
}

const Header: React.FC<HeaderProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProductsSubmenu, setShowProductsSubmenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** True while the pointer or keyboard focus is inside the header. */
  const holdOpen = useRef(false);
  /** Mirrors menu state so the scroll listener sees it without rebinding. */
  const menuOpen = useRef(false);

  const clearIdleTimer = useCallback(() => {
    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
      idleTimer.current = null;
    }
  }, []);

  const armIdleTimer = useCallback(() => {
    clearIdleTimer();
    idleTimer.current = setTimeout(() => {
      idleTimer.current = null;
      if (
        window.scrollY > TOP_THRESHOLD &&
        !holdOpen.current &&
        !menuOpen.current
      ) {
        setIsHidden(true);
      }
    }, HIDE_AFTER_IDLE_MS);
  }, [clearIdleTimer]);

  const revealHeader = useCallback(() => {
    setIsHidden(false);
    clearIdleTimer();
  }, [clearIdleTimer]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen((prev) => {
      return !prev;
    });
    if (isOpen) {
      setShowProductsSubmenu(false);
    }
  };

  // Toggle products submenu
  const toggleProductsSubmenu = () => {
    setShowProductsSubmenu((prev) => {
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

  // Publish the header's height as --header-h so pinned sections can clear
  // it exactly. It is fixed-position, so nothing else knows how tall it is.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const publish = () =>
      document.documentElement.style.setProperty(
        "--header-h",
        `${Math.round(el.getBoundingClientRect().height)}px`
      );
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    window.addEventListener("resize", publish);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", publish);
    };
  }, []);

  // Direction-aware scroll handling, batched into an animation frame so a
  // fast scroll does not run this on every event.
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let frame = 0;

    const evaluate = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      setIsScrolled(y > 0);

      if (y <= TOP_THRESHOLD) {
        setIsHidden(false);
        clearIdleTimer();
      } else if (menuOpen.current || holdOpen.current) {
        setIsHidden(false);
      } else if (delta > SCROLL_DEADZONE) {
        setIsHidden(true);
        clearIdleTimer();
      } else if (delta < -SCROLL_DEADZONE) {
        setIsHidden(false);
        armIdleTimer();
      }

      if (Math.abs(delta) > SCROLL_DEADZONE) lastScrollY.current = y;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(evaluate);
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      clearIdleTimer();
    };
  }, [armIdleTimer, clearIdleTimer]);

  // A header that slid away with its own menu open would be a trap.
  useEffect(() => {
    const open = isOpen || showProductsSubmenu || activeMenu !== null;
    menuOpen.current = open;

    if (open) {
      revealHeader();
    } else if (window.scrollY > TOP_THRESHOLD && !holdOpen.current) {
      armIdleTimer();
    }
  }, [isOpen, showProductsSubmenu, activeMenu, revealHeader, armIdleTimer]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
    <header
      ref={headerRef}
      onMouseEnter={() => {
        holdOpen.current = true;
        revealHeader();
      }}
      onMouseLeave={() => {
        holdOpen.current = false;
        if (window.scrollY > TOP_THRESHOLD) armIdleTimer();
      }}
      onFocusCapture={() => {
        holdOpen.current = true;
        revealHeader();
      }}
      onBlurCapture={() => {
        holdOpen.current = false;
        if (window.scrollY > TOP_THRESHOLD) armIdleTimer();
      }}
      className={`fixed top-0 left-0 right-0 z-[50] w-full transition-[transform,opacity,background-color,box-shadow] duration-500 ease-out motion-reduce:transition-none ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      } ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
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
                  {item.text === "Products" && products.length > 0 ? (
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
    </header>

      {/* Mobile Menu Overlay. Deliberately a sibling of <header>, not a
          child: the header is transformed when it hides, and a transformed
          ancestor would make these fixed elements size to the header bar
          rather than the viewport. */}
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
                    {item.text === "Products" && products.length > 0 ? (
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
    </>
  );
};

export default Header;
