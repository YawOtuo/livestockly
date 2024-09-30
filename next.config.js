const withPWA = require('next-pwa')({
    dest: 'public'
  })
  
  /** @type {import('next').NextConfig} */
  const nextConfig = withPWA({
    swcMinify: true,
    compiler: {
      removeConsole: process.env.NODE_ENV !== "development" 
    },
    reactStrictMode: true, 
    experimental: {
      appDir: true,
    },
    async redirects() {
      return [
        // {
        //   source: '/',
        //   destination: '/home',
        //   permanent: false,
        // },
      ];
    },
    images: {
      domains: ['res.cloudinary.com', 'images.unsplash.com'],
    },
    typescript: {
      ignoreBuildErrors: false,
    },
    // Add PWA configuration here
    pwa: {
      dest: 'public', 
      disable: process.env.NODE_ENV === 'development', 
      register: true, // Automatically registers the service worker
      skipWaiting: true, 
    },
  });
  
  module.exports = nextConfig;
  