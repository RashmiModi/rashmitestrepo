import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  images: {


      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.uploadthink.com',
          pathname: '**',
        },
      ],
   
    domains: ['kj46g4md8h.ufs.sh'],
  },
  
};


export default nextConfig;
