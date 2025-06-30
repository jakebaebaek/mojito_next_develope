/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["mojito-cocktail-img.s3.ap-northeast-2.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.ap-northeast-2.amazonaws.com",
        pathname: "/mojito-emoji-img/**",
      },
      {
        protocol: "https",
        hostname: "mojito-emoji-img.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  reactStrictMode: false,
};

export default nextConfig;
