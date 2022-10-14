/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source: "/api/(.*)",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value:
  //             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //         },
  //       ],
  //     },
  //   ];
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "https://camer-event-hall-lpof9yh5v-bacale-kevin.vercel.app/:path*",
  //     },
  //   ];
  // },
};
