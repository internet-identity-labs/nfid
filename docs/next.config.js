/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    mdxRs: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export",
  redirects: () => [
    {
      source: "/",
      destination: "https://docs.identitykit.xyz/",
      permanent: true,
    },
  ],
}

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
})

module.exports = withNextra(nextConfig)
