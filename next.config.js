/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'images.unsplash.com', "flagcdn.com", "upload.wikimedia.org",
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
