/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["mojito-cocktail-img.s3.ap-northeast-2.amazonaws.com"],
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
