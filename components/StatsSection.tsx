'use client'

import { motion } from 'framer-motion'

const stats = [
    { label: 'Authentic Hadiths', value: '40,000+', icon: '📜' },
    { label: 'Core Collections', value: '10+', icon: '📚' },
    { label: 'Global Languages', value: '3+', icon: '🌍' },
    { label: 'Uptime SLA', value: '99.9%', icon: '🛡️' },
]

export function StatsSection() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-16">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative overflow-hidden p-8 glass rounded-3xl text-center group"
                >
                    <div className="absolute top-0 right-0 p-2 opacity-10 text-4xl group-hover:scale-125 transition-transform">
                        {stat.icon}
                    </div>
                    <div className="text-4xl md:text-5xl font-display text-emerald-900 mb-2 group-hover:text-gold-600 transition-colors">
                        {stat.value}
                    </div>
                    <div className="text-sm font-accent text-charcoal/50 uppercase tracking-widest">
                        {stat.label}
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
