/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'cdn.fishandshrimp.in',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'fishandshrimp.in',
                port: '',
            },
        ],
    },
};

export default nextConfig;
