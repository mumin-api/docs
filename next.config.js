const withNextra = require('nextra')({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
    defaultShowCopyCode: true,
    latex: true,
})

module.exports = withNextra({
    reactStrictMode: true,
    images: {
        domains: ['api.mumin.ink'],
    },
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.mumin.ink/v1',
    },
})
