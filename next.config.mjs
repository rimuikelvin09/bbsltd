/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: the previous `/api/:path*` rewrite pointed at the DigitalOcean
  // droplet that hosted the old backend. That droplet is gone, and because
  // bbsltd.ke now resolves to this same Next.js app, keeping the rewrite
  // would make /api/products loop back into itself indefinitely.
  // Products and portfolio items are now read from src/lib/content.ts.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**", // YouTube thumbnails
      },
      // The bbspaces.blr1.digitaloceanspaces.com bucket was deleted along
      // with the droplet. Product and project images now live in /public.
      // When media moves to a CMS, add that host's pattern here.
    ],
  },
};

export default nextConfig;
