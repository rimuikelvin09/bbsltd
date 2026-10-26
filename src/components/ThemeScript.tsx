/**
 * NO-FLASH THEME BOOTSTRAP
 *
 * Goes in the root layout's <head>, before any stylesheet. It runs
 * synchronously, before first paint, and resolves the viewer's theme into an
 * explicit data-theme attribute on <html>.
 *
 * Why it must be inline and blocking: a theme read in React, in an effect,
 * runs AFTER the browser has painted. The viewer gets a white flash on every
 * navigation before the page turns dark. Every framework solves this the
 * same way, because there is no other way.
 *
 * It also means the CSS needs no prefers-color-scheme query anywhere: the
 * attribute is always present and always resolved, so one selector covers
 * both "chose dark" and "system is dark". That avoids the classic bug where
 * an explicit light choice loses to a dark OS setting.
 */

export const THEME_STORAGE_KEY = "bbs:theme";

const bootstrap = `
(function () {
  try {
    var saved = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    var theme = saved === "dark" || saved === "light"
      ? saved
      // Deliberately NOT the OS setting. "Dark" here means navy bands -
      // the site as it has always looked - and a visitor with a light OS is
      // not asking for blush. Light is opt-in, so nobody who ignores the
      // toggle sees a changed site.
      : "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
`;

export default function ThemeScript() {
  // Our own string. No user input, nothing interpolated from a request.
  return <script dangerouslySetInnerHTML={{ __html: bootstrap }} />;
}
