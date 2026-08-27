/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "media.graphassets.com",
      "media2.dev.to",
      "res.cloudinary.com",
      "images.unsplash.com",
      "api.dicebear.com",
      "via.placeholder.com",
      "solatrixer-cv.vercel.app",
      "api.microlink.io",
      "api.microlink.io",
      "api.screenshotmachine.com",
      "image.thum.io",
    ],
    unoptimized: true,
  },
  transpilePackages: ["swiper", "ssr-window", "dom7"],
}

module.exports = nextConfig
