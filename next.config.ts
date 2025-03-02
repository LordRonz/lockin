/** @type {import('next').NextConfig} */
import { type NextConfig } from "next";
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
} as NextConfig;

export default nextConfig;
