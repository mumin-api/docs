import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import Link from 'next/link'

const config: DocsThemeConfig = {
    logo: (
        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-900 rounded-lg flex items-center justify-center">
                <span className="text-gold-400 font-display text-lg">م</span>
            </div>
            <span className="text-emerald-900 font-display text-xl font-bold">Mumin API</span>
        </div>
    ),

    project: {
        link: 'https://github.com/mumin-api',
    },

    chat: {
        link: 'https://discord.gg/mumin',
    },

    docsRepositoryBase: 'https://github.com/mumin-api/docs',

    footer: {
        text: (
            <div className="flex w-full flex-col items-center sm:items-start space-y-2">
                <p className="text-xs">
                    © {new Date().getFullYear()} Mumin Hadith API. Made with ❤️ for the Muslim community.
                </p>
                <div className="flex space-x-4">
                    <Link href="/legal/terms" className="text-xs hover:text-gold-500 transition-colors">Terms of Service</Link>
                    <Link href="/legal/privacy" className="text-xs hover:text-gold-500 transition-colors">Privacy Policy</Link>
                </div>
            </div>
        ),
    },

    sidebar: {
        defaultMenuCollapseLevel: 1,
        toggleButton: true,
    },

    toc: {
        backToTop: true,
        float: true,
    },

    navigation: {
        prev: true,
        next: true,
    },

    editLink: {
        text: 'Edit this page on GitHub →',
    },

    feedback: {
        content: 'Question? Give us feedback →',
        labels: 'feedback',
    },

    primaryHue: 160, // Emerald green

    useNextSeoProps() {
        const { asPath } = useRouter()
        const siteUrl = 'https://docs.mumin.ink'
        const canonical = `${siteUrl}${asPath === '/' ? '' : asPath}`
        
        return {
            titleTemplate: asPath === '/' ? 'Mumin API – The Pulse of Authentic Islamic Knowledge' : '%s – Mumin API Docs',
            description: 'Production-ready Islamic Hadith API with 40,000+ authentic hadiths and MuminAI scholarly context.',
            canonical,
            openGraph: {
                url: canonical,
                site_name: 'Mumin Hadith API',
                images: [
                    {
                        url: `${siteUrl}/og-image.png`,
                        width: 1200,
                        height: 630,
                        alt: 'Mumin Hadith API Documentation',
                    }
                ],
            },
            twitter: {
                handle: '@mumin_api',
                site: '@mumin_api',
                cardType: 'summary_large_image',
            },
        }
    },

    head: (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="robots" content="index, follow" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap" rel="stylesheet" />
        </>
    ),
}

export default config
