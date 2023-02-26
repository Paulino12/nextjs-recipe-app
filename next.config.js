/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  images: {
		domains: ['cdn.sanity.io'],
	}
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  env: {
      NEXT_PUBLIC_ENV: 'PRODUCTION', //your next configs goes here
  },
})

module.exports = nextConfig
