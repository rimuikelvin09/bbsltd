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
        hostname: "i.ytimg.com",
        // What the YouTube Data API actually returns. Every thumbnail URL in
        // a playlistItems response is served from this host, so this is the
        // one that matters now the fetch is server-side and we use the real
        // URLs instead of building them by hand.
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        // The same images under an older hostname. Kept because anything
        // that still constructs a thumbnail URL by hand will use this form.
        pathname: "/vi/**",
      },
      // The bbspaces.blr1.digitaloceanspaces.com bucket was deleted along
      // with the droplet. Product and project images now live in /public.
      // When media moves to a CMS, add that host's pattern here.
    ],
  },
};

export default nextConfig;
