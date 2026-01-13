'use client'

import { useState, ReactElement } from 'react'
import { motion } from 'framer-motion'

interface Tab {
    label: string
    children: React.ReactNode
}

interface LanguageTabsProps {
    children: ReactElement<Tab>[]
}

export function LanguageTabs({ children }: LanguageTabsProps) {
    const [activeTab, setActiveTab] = useState(0)

    const languages = [
        { label: 'JavaScript', icon: '🟨' },
        { label: 'Python', icon: '🐍' },
        { label: 'PHP', icon: '🐘' },
        { label: 'cURL', icon: '💻' },
        { label: 'TypeScript', icon: '🔷' },
    ]

    const getIcon = (label: string) => {
        const lang = languages.find(l => label.toLowerCase().includes(l.label.toLowerCase()))
        return lang?.icon || '📝'
    }

    return (
        <div className="my-6 border border-emerald-900/10 rounded-xl overflow-hidden bg-white shadow-islamic">
            {/* Tab Headers */}
            <div className="flex border-b border-emerald-900/10 overflow-x-auto bg-sand/30">
                {children.map((child, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`
              px-4 py-3 text-sm font-accent whitespace-nowrap transition-all flex items-center space-x-2
              ${activeTab === index
                                ? 'text-emerald-600 border-b-2 border-emerald-600 bg-white'
                                : 'text-charcoal/60 hover:text-charcoal hover:bg-white/50'
                            }
            `}
                    >
                        <span>{getIcon(child.props.label)}</span>
                        <span>{child.props.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4"
            >
                {children[activeTab]}
            </motion.div>
        </div>
    )
}

export function Tab({ children }: { label: string; children: React.ReactNode }) {
    return <div>{children}</div>
}
