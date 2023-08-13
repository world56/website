const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  async redirects(){
    return [
      {
        source: "/",
        destination: "/main",
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img2.baidu.com",
        port: "",
        pathname: "/it/**",
      },
    ],
  },
};

module.exports = nextConfig;
