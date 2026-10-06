import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import WhatsAppButton from "@/components/WhatsAppButton";
import CustomCursor from "@/components/CustomCursor";
import BackToTop from "@/components/BackToTop";
import { siteDetails } from "@/data/siteDetails";
import {
  JsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo/jsonLd";
import { getProducts } from "@/lib/content";

import "./globals.css";

// Exposed as CSS variables and wired into tailwind.config.ts, so
// `font-sans` and `font-serif` resolve to these rather than to
// Tailwind's defaults. Manrope was dropped: it was downloaded on every
// page load and then overridden to Inter by globals.css.
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  /**
   * Without metadataBase every relative URL in metadata - the OG image, every
   * canonical - resolves against localhost at build time. Next warns about it
   * on every build; this is the fix.
   */
  metadataBase: new URL(siteDetails.siteUrl),
  title: {
    default: siteDetails.metadata.title,
    /** A page sets title: "About" and gets "About · Benchmark...". */
    template: `%s · ${siteDetails.siteName}`,
  },
  description: siteDetails.metadata.description,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    url: siteDetails.siteUrl,
    siteName: siteDetails.siteName,
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/images/seoimage.jpg",
        width: 1200,
        height: 675,
        alt: siteDetails.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    images: ["/images/seoimage.jpg"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read once here on the server. Header stays a client component for its
  // menu and scroll behaviour, so it receives the list as a prop.
  const products = await getProducts();

  return (
    <html lang="en">
      <body
        className={`${sourceSans.variable} ${sourceSerif.variable} font-sans antialiased`}
      >
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        {siteDetails.googleAnalyticsId && (
          <GoogleAnalytics gaId={siteDetails.googleAnalyticsId} />
        )}
        {/** */}
        <Preloader />
        <CustomCursor />
        <Header products={products} />
        <WhatsAppButton />
        <BackToTop />

        <main>{children}</main>
        <Footer products={products} />
        <SpeedInsights />
      </body>
    </html>
  );
}
