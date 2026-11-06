import Link from "next/link";
import Image from "next/image";
import { siteDetails } from "@/data/siteDetails";
import { footerDetails } from "@/data/footer";
import { getPlatformIconByName, generateSlug } from "@/utils";
import { Product } from "@/types";

interface FooterProps {
  /** Supplied by the root layout, which reads them on the server. */
  products: Product[];
}

/**
 * THE FOOTER
 * ----------
 * Rebuilt Nov 2026, reflowed 7 Nov.
 *
 * FOUR COLUMNS ON ONE BASELINE. The first pass stacked Company underneath
 * Learn, which left it hanging in the middle of the grid with no heading in
 * line with the others. Company is now its own column and the office
 * details sit under it; the map moved into column one, under the hours,
 * where it belongs with the rest of the "where we are" material.
 *
 * THE MAP IS THE REAL EMBED. An earlier version drew one in SVG to save
 * weight. It saved about 400KB and cost the thing a map is for: nobody
 * could tell it was a map. The embed carries `loading="lazy"`, so it costs
 * nothing until somebody scrolls to it, and it never touches LCP because
 * the hero is always the largest paint. The aspect ratio is set in CSS
 * rather than measured in JavaScript, so it cannot shift the layout.
 *
 * THE SEAM AT THE TOP. The enquiry band above fades down into
 * `rgba(var(--band-rgb), 1)` and this fades up out of the same colour, so
 * the two read as one block. Same technique as the hero and the process
 * section. Change one, change the other.
 *
 * COLOUR COMES FROM THE SURFACE. globals.css line 27: components never name
 * a colour. This carries .surface-dark and everything resolves from --text,
 * --text-soft, --text-faint, --text-muted, --rule and --band-text, so it
 * inverts with the theme without a single override.
 */
const Footer: React.FC<FooterProps> = ({ products }) => {
  const year = new Date().getFullYear();
  const linkClass =
    "text-[length:var(--type-meta)] text-[color:var(--text-soft)] transition-colors hover:text-[color:var(--text)]";
  const headingClass =
    "meta font-bold uppercase tracking-[0.16em] text-[color:var(--band-text)]";

  return (
    <footer className="surface-dark relative w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[color:var(--band)]" />

      {/* The seam. Mirrors the fade at the bottom of the enquiry band. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32"
        style={{
          background:
            "linear-gradient(to bottom, rgba(var(--band-rgb), 1) 0%, rgba(var(--band-rgb), 0.86) 42%, rgba(var(--band-rgb), 0) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-14 pb-10 sm:pt-16">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1fr]">
          {/* ---------- 1. who and where ---------- */}
          <div className="min-w-0">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/images/whitelogomark.png"
                alt={siteDetails.siteName}
                width={112}
                height={28}
                className="h-auto w-[104px] object-contain"
              />
            </Link>

            <p className="body-text mt-4 max-w-[32ch] text-[color:var(--text-faint)]">
              Design, county approvals and construction on one contract.
              Building in Kenya since 2012.
            </p>

            <dl className="mt-5 grid gap-1.5">
              {footerDetails.hours.map((h) => (
                <div key={h.days} className="flex flex-wrap gap-x-2">
                  <dt className="meta font-bold text-[color:var(--text)]">
                    {h.days}
                  </dt>
                  <dd className="meta text-[color:var(--text-muted)]">
                    {h.time}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 overflow-hidden rounded-lg border border-[color:var(--rule)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.984014313502!2d36.826334874586394!3d-1.1717401988170464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3d226b37a1cd%3A0x3c5feb1c073fa1a9!2sBenchmark%20Building%20Solutions%20Ltd!5e0!3m2!1sen!2ske!4v1745319406552!5m2!1sen!2ske"
                title="Benchmark Building Solutions, K-Unity Building, Kiambu Town"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-[4/3] w-full border-0 sm:aspect-[16/10]"
              />
            </div>
          </div>

          {/* ---------- 2. products ---------- */}
          {products.length > 0 && (
            <nav aria-labelledby="ft-build" className="min-w-0">
              <h2 id="ft-build" className={headingClass}>
                Build with us
              </h2>
              <ul className="mt-4 grid gap-2.5">
                {products.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/products/${generateSlug(product.productTitle)}`}
                      className={linkClass}
                    >
                      {product.productTitle}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/products" className={linkClass}>
                    Compare all six
                  </Link>
                </li>
              </ul>
            </nav>
          )}

          {/* ---------- 3. learn ---------- */}
          <nav aria-labelledby="ft-learn" className="min-w-0">
            <h2 id="ft-learn" className={headingClass}>
              Learn
            </h2>
            <ul className="mt-4 grid gap-2.5">
              {footerDetails.resources.map((link) => (
                <li key={link.text}>
                  <Link href={link.url} className={linkClass}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- 4. company, then how to reach us ---------- */}
          <div className="min-w-0">
            <nav aria-labelledby="ft-company">
              <h2 id="ft-company" className={headingClass}>
                Company
              </h2>
              <ul className="mt-4 grid gap-2.5">
                {footerDetails.company.map((link) => (
                  <li key={link.text}>
                    <Link href={link.url} className={linkClass}>
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <h2 className={`${headingClass} mt-8`}>Head office</h2>
            <address className="mt-4 grid gap-3 not-italic">
              <p className="text-[length:var(--type-meta)] text-[color:var(--text-soft)]">
                {footerDetails.address}
              </p>
              <p className="grid gap-1">
                {footerDetails.telephones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className={`numeral ${linkClass}`}
                  >
                    {phone}
                  </a>
                ))}
              </p>
              <a href={`mailto:${footerDetails.email}`} className={linkClass}>
                {footerDetails.email}
              </a>
            </address>
          </div>
        </div>

        {/* ---------- socials and legal ---------- */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-[color:var(--rule)] pt-7">
          <ul className="flex flex-wrap items-center gap-3">
            {Object.keys(footerDetails.socials).map((platformName) => {
              const href = footerDetails.socials[platformName];
              if (!href) return null;
              return (
                <li key={platformName}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      platformName === "whatsapp"
                        ? "WhatsApp Channel"
                        : platformName
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--rule)] text-[color:var(--text-soft)] transition-colors hover:border-[color:var(--text-muted)] hover:text-[color:var(--text)]"
                  >
                    {getPlatformIconByName(platformName)}
                  </a>
                </li>
              );
            })}
          </ul>

          <p className="meta text-[color:var(--text-muted)]">
            &copy; {year} {siteDetails.siteName}. Powered by{" "}
            <a
              href="https://alphainsights.co.ke/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--text-soft)] underline underline-offset-4 transition-colors hover:text-[color:var(--text)]"
            >
              Alphatech Insights
            </a>
          </p>
        </div>
      </div>

      {/* A street under construction. Scaffold and crane included. ~1KB. */}
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none block h-[70px] w-full text-[color:var(--band-text)] opacity-40 sm:h-[90px]"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
          <path d="M0 120V84h54V60h40v24h38V44h58v40h30V68h46v52" />
          <path d="M296 120V52h72V34h52v18h28v68" />
          <path d="M448 120V72h44V48h62v24h34v48" />
          <path d="M588 120V30h88v90" />
          <path d="M604 30v-14h56M632 16v14M604 44h72M604 60h72M604 76h72M604 92h72" />
          <path d="M676 22h74M750 22v38M742 60h16" />
          <path d="M700 120V64h52V40h58v80" />
          <path d="M810 120V56h40V76h52V50h46v70" />
          <path d="M948 120V70h58V46h46v24h40v50" />
          <path d="M1092 120V62h56V86h52v34" />
        </g>
        <path d="M0 118h1200" stroke="currentColor" strokeWidth="2" opacity="0.55" />
      </svg>
    </footer>
  );
};

export default Footer;
