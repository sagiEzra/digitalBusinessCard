/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      console.log("Applying rewrite rules...");
      return [
        {
          source: "/:path*", 
          has: [{ type: "host", value: "mad-kor.co.il" }],  
          destination: "/madkor/:path*",  
        },
      ];
    },
  };
  
  export default nextConfig;
  