/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*", 
        has: [{ type: "host", value: "mad-kor.co.il" }],
        destination: "https://ezracards.co.il/madkor/:path*",  
      },
    ];
  },
};

module.exports = nextConfig;
