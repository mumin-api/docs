'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface ResponseExampleProps {
    status: number
    data: any
    headers?: Record<string, string>
    time?: number
}

export function ResponseExample({ status, data, headers, time }: ResponseExampleProps) {
    const [copied, setCopied] = useState(false)

    const copyResponse = () => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2))
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="my-6 border border-emerald-900/10 rounded-xl overflow-hidden shadow-islamic">
            {/* Header */}
            <div className="bg-charcoal px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <span className="text-white/60 text-sm font-accent">Response</span>
                    <span
                        className={`px-2 py-1 rounded text-xs font-mono ${status >= 200 && status < 300
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : status >= 400 && status < 500
                                    ? 'bg-gold-500/20 text-gold-400'
                                    : 'bg-rose-500/20 text-rose-400'
                            }`}
                    >
                        {status}
                    </span>
                    {time && (
                        <span className="text-xs text-white/40 font-mono">
                            ⚡ {time}ms
                        </span>
                    )}
                </div>

                <button
                    onClick={copyResponse}
                    className="flex items-center space-x-1 text-sm text-white/60 hover:text-white transition-colors"
                >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
            </div>

            {/* Headers (if provided) */}
            {headers && (
                <div className="bg-charcoal/50 px-4 py-2 border-t border-white/10">
                    <div className="text-xs text-white/40 mb-1 font-accent">Headers:</div>
                    {Object.entries(headers).map(([key, value]) => (
                        <div key={key} className="text-xs font-mono">
                            <span className="text-gold-400">{key}:</span>{' '}
                            <span className="text-white/60">{value}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Body */}
            <div className="bg-charcoal p-4">
                <SyntaxHighlighter
                    language="json"
                    style={oneDark}
                    customStyle={{ margin: 0, background: 'transparent', fontSize: '13px' }}
                >
                    {JSON.stringify(data, null, 2)}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}
