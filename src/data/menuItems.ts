import { IMenuItem } from "@/types";

/**
 * Header and footer navigation.
 *
 * "Learn" is placed after Products provisionally. Whether it belongs in the
 * header at all, and whether this header is the right shape, is W8 in
 * claude/website-backlog.md - a navigation audit that should run against GA4
 * click data rather than opinion. Treat this position as temporary.
 */
export const menuItems: IMenuItem[] = [
  { text: "Home", url: "/" },
  { text: "About Us", url: "/about" },
  { text: "Client Portal", url: "/portal" },
  { text: "Products", url: "/products" },
  { text: "Learn", url: "/learn" },
  { text: "Portfolio", url: "/portfolio" },
  { text: "Contact Us", url: "/contact" },
];
