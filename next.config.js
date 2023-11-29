/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com", "cdn-icons-png.flaticon.com"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "avatars.githubusercontent.com",
    //     port: "",
    //     pathname: "/u/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "cdn-icons-png.flaticon.com",
    //     port: "",
    //     pathname: "/512/**",
    //   },
    // ],
  },
};

module.exports = nextConfig;
