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
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="p-8 glass rounded-2xl hover:border-gold-500/50 hover:shadow-glow-emerald transition-all duration-300 group cursor-default"
                >
                    <div className="text-5xl mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                        {item.icon}
                    </div>
                    <h3 className="text-xl font-display text-emerald-900 mb-3 group-hover:text-emerald-700 transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-sm text-charcoal/60 font-body leading-relaxed">
                        {item.description}
                    </p>
                </motion.div>
            ))}
        </div>
    )
}
