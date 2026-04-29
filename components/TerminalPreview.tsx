'use client'

import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'

export function TerminalPreview() {
    return (
        <div className="my-16 perspective-1000">
            <motion.div
                initial={{ opacity: 0, rotateX: 10, y: 20 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-charcoal border border-emerald-900/30"
            >
                {/* Header */}
                <div className="bg-charcoal/50 px-4 py-3 border-b border-emerald-900/10 flex items-center justify-between">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                        <div className="w-3 h-3 rounded-full bg-gold-500/50" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="text-ivory/30 text-xs font-mono uppercase tracking-widest flex items-center">
                        <Terminal className="w-3 h-3 mr-2" />
                        bash — mumin-api-v1
                    </div>
                    <div className="w-12" />
                </div>

                {/* Body */}
                <div className="p-6 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto">
                    <div className="flex">
                        <span className="text-emerald-500 mr-3">$</span>
                        <span className="text-ivory">curl -X GET "https://api.mumin.ink/v1/hadiths/random" \</span>
                    </div>
                    <div className="ml-6 text-ivory/60">-H "Authorization: Bearer YOUR_API_KEY"</div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="mt-6 space-y-2"
                    >
                        <div className="text-gold-400">HTTP/1.1 200 OK</div>
                        <div className="text-emerald-400/80">{"{"}</div>
                        <div className="ml-4 text-emerald-400/80">"id": 42,</div>
                        <div className="ml-4 text-emerald-400/80">"collection": "Sahih al-Bukhari",</div>
                        <div className="ml-4 text-emerald-400/80">"hadithNumber": 1,</div>
                        <div className="ml-4 text-ivory">"arabicText": "إنما الأعمال بالنيات...",</div>
                        <div className="ml-4 text-gold-400/80">"translation": {"{"}</div>
                        <div className="ml-8 text-gold-400/80">"languageCode": "en",</div>
                        <div className="ml-8 text-ivory">"text": "The reward of deeds depends upon the intentions..."</div>
                        <div className="ml-4 text-gold-400/80">{"}"}</div>
                        <div className="text-emerald-400/80">{"}"}</div>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="inline-block w-2 h-5 bg-gold-400 ml-1 translate-y-1"
                    />
                </div>
            </motion.div>
        </div>
    )
}
