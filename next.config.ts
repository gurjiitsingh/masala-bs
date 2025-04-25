import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
},
env: {
  //PAYPAL_CLIENT_ID:"AWYPPPLznnr2XarKXjAp0p_bj7ghZR7JJLHItDUeTQXi724NqyyvGiBIVky7V2cLJW-DK9CfqRM31kcN",//gs
 // PAYPAL_CLIENT_ID:"AT7irQIfyDgGiAQzVuNrRvgeHrOVHSEbI-lVAlRYbPtfoAGWBwHBFWyGfBlSxcrFM5FjcMwqTssALvmZ",
 //PAYPAL_CLIENT_ID:"BAAQambvfgf8cMiIWoROWluTo5X08lvESisQno-RXyWIK7Mk8JzNL7UNonzp8h5g5ZGjd8HTp2vBHD_4zk",//vijay
  //PAYPAL_MODE:"sandbox",
  //PAYPAL_CLIENT_ID:"AaE5j_iAGG8h6JeuW6y3khLvftR8OT2qDi2tqlhTaOeC4QxU3feFgMgF1RYMGe7LuYAtd7EyhQZpUhQz",//sandbox(this is client id in indiaan business)
  
},
};

export default nextConfig;
