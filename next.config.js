const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: function (config) {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, "node_modules/tinymce"),
            to: path.join(__dirname, "public/lib/tinymce"),
            filter: (resourcePath) => {
              return /(\.min\.js|\Hans\.js|\.min\.css)$/.test(resourcePath);
            },
          },
        ],
      }),
    );
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3000",
        pathname: "/api/resource/**",
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

module.exports = nextConfig;
