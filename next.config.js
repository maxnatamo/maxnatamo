/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: '',
    reactStrictMode: true,
    swcMinify: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    images: {
      unoptimized: true,
    },
};

module.exports = nextConfig;