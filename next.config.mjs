const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://68.183.80.112/api/api/:path*",
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
