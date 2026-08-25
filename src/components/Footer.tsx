import Link from "next/link";
import Image from "next/image";
import { siteDetails } from "@/data/siteDetails";
import { footerDetails } from "@/data/footer";
import { getPlatformIconByName } from "@/utils";
import { Product } from "@/types";
import { generateSlug } from "@/utils";

interface FooterProps {
  /** Supplied by the root layout, which reads them on the server. */
  products: Product[];
}

const Footer: React.FC<FooterProps> = ({ products }) => {

  return (
    <footer className="surface-dark relative">
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
        <div
          className={`max-w-7xl w-full mx-auto px-6 grid grid-cols-1 gap-10 ${
            products.length > 0 ? "md:grid-cols-4" : "md:grid-cols-3"
          }`}
        >
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
            <h4 className="mb-2 text-[color:var(--text)]">Head Office</h4>
            <hr className="border-[#991212] w-12 mb-4" />
            <div className="text-primary-accent">
              <p className="mb-2 font-[350]">{footerDetails.address}</p>
            </div>
          </div>

          {/* Column 2: Products. Hidden entirely while the catalogue is
              empty, so the heading never renders above a blank space. */}
          {products.length > 0 && (
            <div>
              <h4 className="mb-2 text-[color:var(--text)]">Products</h4>
              <hr className="border-[#991212] w-12 mb-4" />
              <ul className="text-primary-accent">
                {products.map((product) => (
                  <li key={product.id} className="mb-2 font-[350]">
                    <Link
                      href={`/products/${generateSlug(product.productTitle)}`}
                      className="link"
                    >
                      {product.productTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Column 3: Quicklinks */}
          <div>
            <h4 className="mb-2 text-[color:var(--text)]">Resources</h4>
            <hr className="border-[#991212] w-12 mb-4" />
            <ul className="text-primary-accent">
              {footerDetails.resources.map((link) => (
                <li key={link.text} className="mb-2 font-[350]">
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener"
                    className="link"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details and Socials */}
          <div>
            <h4 className="mb-2 text-[color:var(--text)]">Contact Us</h4>
            <hr className="border-[#991212] w-12 mb-4" />
            <div className="text-primary-accent font-[350]">
              {footerDetails.email && (
                <a
                  href={`mailto:${footerDetails.email}`}
                  className="link mb-2 block w-fit"
                >
                  Email: {footerDetails.email}
                </a>
              )}
              {footerDetails.telephones &&
                footerDetails.telephones.map((phone, idx) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    className="link mb-2 block w-fit"
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
                          className="link"
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
          <p className="meta mb-2 text-center font-semibold text-gray-800 md:mb-0">
            Copyright © {new Date().getFullYear()} {siteDetails.siteName}. All
            rights reserved.
          </p>
          <p className="meta font-semibold">
            Powered by{" "}
            <a
              href="https://alphainsights.co.ke/"
              target="_blank"
              rel="noopener"
              className="link text-[color:var(--crimson)]"
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
