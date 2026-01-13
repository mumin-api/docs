'use client'

import { motion } from 'framer-motion'

interface Feature {
    icon: string
    title: string
    description: string
}

interface FeatureGridProps {
    items: Feature[]
}

export function FeatureGrid({ items }: FeatureGridProps) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
            {items.map((item, index) => (
                <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-white border border-emerald-900/10 rounded-xl hover:border-gold-500/30 hover:shadow-lg transition-all group"
                >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                        {item.icon}
                    </div>
                    <h3 className="text-lg font-display text-emerald-900 mb-2">
                        {item.title}
                    </h3>
                    <p className="text-sm text-charcoal/60 font-body">
                        {item.description}
                    </p>
                </motion.div>
            ))}
        </div>
    )
}
