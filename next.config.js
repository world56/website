const path = require("path");

const { protocol, hostname, port } = new URL(
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL,
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: process.env.PORT,
        pathname: "/api/resource/**",
      },
      process.env.NEXT_PUBLIC_IMAGE_BASE_URL
        ? {
            port,
            hostname,
            pathname: "/api/resource/**",
            protocol: protocol.replace(":", ""),
          }
        : undefined,
    ].filter(Boolean),
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/main",
      },
      {
        source: "/life",
        destination: "/main/post/life/list",
      },
      {
        source: "/life/:id",
        destination: "/main/post/life/:id",
      },
      {
        source: "/achievements",
        destination: "/main/post/achievements/list",
      },
      {
        source: "/achievements/:id",
        destination: "/main/post/achievements/:id",
      },
      {
        source: "/notes",
        destination: "/main/post/notes/list",
      },
      {
        source: "/notes/:id",
        destination: "/main/post/notes/:id",
      },
      {
        source: "/contact",
        destination: "/main/contact",
      },
    ];
  },
};

if (process.env.NODE_ENV === "development") {
  const CopyPlugin = require("copy-webpack-plugin");
  nextConfig.webpack = function (config) {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, "node_modules/tinymce"),
            to: path.join(__dirname, "public/lib/tinymce"),
            filter: (resourcePath) =>
              /(\.min\.js|\Hans\.js|\.min\.css)$/.test(resourcePath),
          },
        ],
      }),
    );
    return config;
  };
}

module.exports = nextConfig;
