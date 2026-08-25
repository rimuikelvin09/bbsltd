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
  title: siteDetails.metadata.title,
  description: siteDetails.metadata.description,
  openGraph: {
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    url: siteDetails.siteUrl,
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
