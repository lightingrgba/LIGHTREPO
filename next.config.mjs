/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { nextRuntime }) => {
    // better-sqlite3 needs Node's fs; it can never run on the edge runtime,
    // so keep webpack from trying to bundle it into edge routes.
    if (nextRuntime === "edge") {
      config.resolve.alias = {
        ...config.resolve.alias,
        "better-sqlite3": false,
        "drizzle-orm/better-sqlite3": false,
      }
    }
    return config
  },
}

export default nextConfig
