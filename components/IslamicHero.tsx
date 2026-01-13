'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { GeometricPattern } from './islamic/GeometricPattern'

interface IslamicHeroProps {
    title: string
    subtitle: string
    cta?: {
        text: string
        href: string
    }
}

export function IslamicHero({ title, subtitle, cta }: IslamicHeroProps) {
    return (
        <div className="relative overflow-hidden bg-gradient-islamic rounded-2xl p-12 my-8 shadow-glow-emerald">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
                <GeometricPattern />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-emerald-900/20 via-transparent to-sapphire-900/20 animate-pulse-glow" />

            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-display text-ivory mb-4 leading-tight"
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-ivory/80 mb-8 font-body"
                >
                    {subtitle}
                </motion.p>

                {cta && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href={cta.href}
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-emerald-900 rounded-lg font-accent text-lg transition-all shadow-glow-gold group"
                        >
                            <span>{cta.text}</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
