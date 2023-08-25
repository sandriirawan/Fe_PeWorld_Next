/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  pageExtensions: ['jsx', 'js'],
  pageTransition: {
    type: 'fade', 
    duration: 500, 
  },
};

module.exports = nextConfig
