
/** @type {import('next').NextConfig} */

const nextConfig = {
  
          typescript:{
ignoreBuildErrors:true
      },

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'linked-posts.routemisr.com',
            port: '',
            pathname: '/uploads/**',
          },
        ],
      },
  
};
 
export default nextConfig;

