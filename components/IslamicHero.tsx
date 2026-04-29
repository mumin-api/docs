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
        <div className="relative overflow-hidden bg-gradient-islamic rounded-3xl p-16 my-12 shadow-2xl">
            {/* Background Pattern Layers */}
            <div className="absolute inset-0 opacity-[0.05] scale-110">
                <GeometricPattern />
            </div>
            <div className="absolute inset-0 opacity-[0.02] -rotate-45 scale-150">
                <GeometricPattern />
            </div>

            {/* Gradient Glows */}
            <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-emerald-400/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gold-400/10 blur-[120px] rounded-full" />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-block mb-6 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 backdrop-blur-sm"
                >
                    <span className="text-gold-400 font-accent text-sm tracking-widest uppercase">The Sovereign API</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-display text-ivory mb-6 leading-tight text-shimmer"
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-xl md:text-2xl text-ivory/80 mb-10 font-body leading-relaxed"
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
