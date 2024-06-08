/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    STORY_URL: process.env.STORY_URL,
    AUTH_URL: process.env.AUTH_URL,
  },
};

export default nextConfig;
