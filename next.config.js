const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/api/resource/**",
        port: process.env.PORT || "3000",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/api/resource/**",
        port: process.env.PORT || "3000",
      },
    ],
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
