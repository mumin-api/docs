'use client'

import Link from 'next/link'
import { Book, Code, Zap, Rocket } from 'lucide-react'

export function QuickStartCards() {
    const cards = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: 'Quick Start',
            description: 'Get up and running in 5 minutes',
            href: '/getting-started/quick-start',
            color: 'emerald',
        },
        {
            icon: <Book className="w-6 h-6" />,
            title: 'API Reference',
            description: 'Complete endpoint documentation',
            href: '/api-reference',
            color: 'gold',
        },
        {
            icon: <Code className="w-6 h-6" />,
            title: 'Tutorials',
            description: 'Step-by-step guides and examples',
            href: '/tutorials',
            color: 'sapphire',
        },
        {
            icon: <Rocket className="w-6 h-6" />,
            title: 'SDKs',
            description: 'Client libraries for your language',
            href: '/sdks',
            color: 'rose',
        },
    ]

    const colors = {
        emerald: 'bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white',
        gold: 'bg-gold-500/10 text-gold-600 group-hover:bg-gold-500 group-hover:text-white',
        sapphire: 'bg-sapphire-500/10 text-sapphire-600 group-hover:bg-sapphire-500 group-hover:text-white',
        rose: 'bg-rose-500/10 text-rose-600 group-hover:bg-rose-500 group-hover:text-white',
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
            {cards.map((card) => (
                <Link
                    key={card.title}
                    href={card.href}
                    className="group p-6 bg-white border border-emerald-900/10 rounded-xl hover:border-gold-500/30 hover:shadow-lg transition-all"
                >
                    <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all ${colors[card.color as keyof typeof colors]
                            }`}
                    >
                        {card.icon}
                    </div>
                    <h3 className="text-lg font-display text-emerald-900 mb-2">
                        {card.title}
                    </h3>
                    <p className="text-sm text-charcoal/60 font-body">
                        {card.description}
                    </p>
                </Link>
            ))}
        </div>
    )
}
