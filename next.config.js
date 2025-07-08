/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Statik eksportni o‘chirildi, chunki API route va NextAuth uchun kerak emas
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
