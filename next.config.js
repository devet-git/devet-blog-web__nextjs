/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		dangerouslyAllowSVG: true,
		domains: ['tailwindui.com']
	},
	reactStrictMode: true
}

module.exports = nextConfig
