const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, "node_modules/tinymce"),
            to: path.join(__dirname, "public/lib/tinymce"),
          },
        ],
      }),
    );
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/main",
      },
      {
        source: "/portfolio",
        destination: "/main/post/portfolio/list",
      },
      {
        source: "/portfolio/:id",
        destination: "/main/post/portfolio/:id",
      },
      {
        source: "/share",
        destination: "/main/post/share/list",
      },
      {
        source: "/share/:id",
        destination: "/main/post/share/:id",
      },
      {
        source: "/contact",
        destination: "/main/contact",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/api/resource/:path*",
        destination: "http://127.0.0.1:2000/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
