"use client";

import React, { useEffect, useState } from "react";
import { THEME_STORAGE_KEY } from "./ThemeScript";

/**
 * LIGHT / DARK TOGGLE
 *
 * The attribute on <html> is the single source of truth - ThemeScript set it
 * before this component existed, so mounting is just reading it back.
 *
 * HYDRATION: the server cannot know the viewer's theme, so the icon would
 * mismatch on first render. Rather than suppress the warning, the button
 * shows a neutral placeholder until mounted - one frame, and it never claims
 * a state it does not know.
 */

type Theme = "light" | "dark";

/**
 * Colour is the CALLER'S job. This button sits on a transparent header over
 * a navy hero, on a white scrolled header, and inside a light drawer - three
 * different grounds. Baking a colour in and overriding it from outside means
 * two competing Tailwind utilities and whichever lands later in the sheet
 * wins, which is not a thing to leave to chance.
 */
const DEFAULT_COLORS = "border-[color:var(--rule)] text-[color:var(--text)]";

const ThemeToggle: React.FC<{ className?: string }> = ({
  className = DEFAULT_COLORS,
}) => {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage blocked: the choice holds for this page only.
    }
  }

  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      // Says what it DOES. "Dark mode" on a button is ambiguous - is that
      // the current state or the thing that will happen?
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-[6px] text-[0.8125rem] font-semibold transition-opacity hover:opacity-75 ${className}`}
    >
      <span className="grid h-4 w-4 place-items-center" aria-hidden="true">
        {theme === null ? (
          <span className="block h-[14px] w-[14px] rounded-full border border-current opacity-40" />
        ) : dark ? (
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M13.5 9.6A6 6 0 0 1 6.4 2.5 6 6 0 1 0 13.5 9.6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="3.1" stroke="currentColor" strokeWidth="1.4" />
            <path d="M8 .9v1.8M8 13.3v1.8M15.1 8h-1.8M2.7 8H.9M13 3l-1.3 1.3M4.3 11.7 3 13M13 13l-1.3-1.3M4.3 4.3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <span>{theme === null ? "Theme" : dark ? "Dark" : "Light"}</span>
    </button>
  );
};

export default ThemeToggle;
