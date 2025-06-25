const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://bbsltd.ke/api/api/:path*",
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "bbspaces.blr1.digitaloceanspaces.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "img.youtube.com",
                pathname: "/vi/**", // This allows YouTube thumbnails
            },
        ],

    },
};

export default nextConfig;

