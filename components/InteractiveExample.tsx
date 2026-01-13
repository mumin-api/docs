'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Copy, Check, Loader2 } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface InteractiveExampleProps {
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE'
    endpoint: string
    queryParams?: Array<{ name: string; value: string; type: 'text' | 'boolean' | 'number' }>
    bodyParams?: Array<{ name: string; value: string; type: 'text' | 'boolean' | 'number' }>
    requiresAuth?: boolean
}

export function InteractiveExample({
    method,
    endpoint,
    queryParams = [],
    bodyParams = [],
    requiresAuth = false,
}: InteractiveExampleProps) {
    const [apiKey, setApiKey] = useState('')
    const [params, setParams] = useState(queryParams)
    const [body, setBody] = useState(bodyParams)
    const [response, setResponse] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const [activeTab, setActiveTab] = useState<'preview' | 'curl'>('preview')

    const makeRequest = async () => {
        setLoading(true)
        setResponse(null)

        try {
            const queryString = params
                .filter(p => p.value)
                .map(p => `${p.name}=${encodeURIComponent(p.value)}`)
                .join('&')

            const url = `${process.env.NEXT_PUBLIC_API_URL || 'https://api.mumin.ink/v1'}${endpoint}${queryString ? `?${queryString}` : ''}`

            const headers: HeadersInit = {
                'Content-Type': 'application/json',
            }

            if (requiresAuth && apiKey) {
                headers['Authorization'] = `Bearer ${apiKey}`
            }

            const options: RequestInit = {
                method,
                headers,
            }

            if (method !== 'GET' && body.length > 0) {
                const bodyObj: any = {}
                body.forEach(param => {
                    if (param.value) {
                        bodyObj[param.name] = param.type === 'boolean'
                            ? param.value === 'true'
                            : param.type === 'number'
                                ? Number(param.value)
                                : param.value
                    }
                })
                options.body = JSON.stringify(bodyObj)
            }

            const startTime = Date.now()
            const res = await fetch(url, options)
            const endTime = Date.now()
            const data = await res.json()

            setResponse({
                status: res.status,
                statusText: res.statusText,
                time: endTime - startTime,
                headers: Object.fromEntries(res.headers.entries()),
                body: data,
            })
        } catch (error: any) {
            setResponse({
                status: 500,
                statusText: 'Error',
                error: error.message,
            })
        } finally {
            setLoading(false)
        }
    }

    const copyCode = () => {
        const code = generateCurlCommand()
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const generateCurlCommand = () => {
        const queryString = params
            .filter(p => p.value)
            .map(p => `${p.name}=${encodeURIComponent(p.value)}`)
            .join('&')

        let cmd = `curl -X ${method} "${process.env.NEXT_PUBLIC_API_URL || 'https://api.mumin.ink/v1'}${endpoint}${queryString ? `?${queryString}` : ''}"`

        if (requiresAuth) {
            cmd += ` \\\n  -H "Authorization: Bearer ${apiKey || 'YOUR_API_KEY'}"`
        }

        cmd += ` \\\n  -H "Content-Type: application/json"`

        if (method !== 'GET' && body.length > 0) {
            const bodyObj: any = {}
            body.forEach(param => {
                if (param.value) {
                    bodyObj[param.name] = param.type === 'boolean'
                        ? param.value === 'true'
                        : param.type === 'number'
                            ? Number(param.value)
                            : param.value
                }
            })
            cmd += ` \\\n  -d '${JSON.stringify(bodyObj, null, 2)}'`
        }

        return cmd
    }

    const methodColors = {
        GET: 'bg-emerald-100 text-emerald-700 border-emerald-300',
        POST: 'bg-gold-100 text-gold-700 border-gold-300',
        PATCH: 'bg-sapphire-100 text-sapphire-700 border-sapphire-300',
        DELETE: 'bg-rose-100 text-rose-700 border-rose-300',
    }

    return (
        <div className="my-8 border border-emerald-900/20 rounded-xl overflow-hidden bg-white shadow-islamic">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-50 to-gold-50/30 px-6 py-4 border-b border-emerald-900/10">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-md text-sm font-mono font-bold border ${methodColors[method]}`}>
                            {method}
                        </span>
                        <code className="text-sm text-charcoal font-mono">{endpoint}</code>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-charcoal/60 font-accent">🔥 Try it live!</span>
                    </div>
                </div>
            </div>

            {/* Input Section */}
            <div className="p-6 space-y-4 bg-sand/30">
                {requiresAuth && (
                    <div>
                        <label className="block text-sm font-medium text-charcoal mb-2 font-accent">
                            🔐 API Key
                        </label>
                        <input
                            type="password"
                            placeholder="sk_mumin_..."
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="w-full px-4 py-2 border border-emerald-900/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-mono text-sm"
                        />
                        <p className="mt-1 text-xs text-charcoal/60 font-body">
                            Get your API key from{' '}
                            <a href="https://dashboard.mumin.ink" className="text-emerald-600 hover:underline">
                                dashboard.mumin.ink
                            </a>
                        </p>
                    </div>
                )}

                {params.length > 0 && (
                    <div>
                        <label className="block text-sm font-medium text-charcoal mb-2 font-accent">
                            📋 Query Parameters
                        </label>
                        <div className="space-y-2">
                            {params.map((param, index) => (
                                <div key={param.name} className="flex items-center space-x-2">
                                    <span className="text-sm text-charcoal/70 w-32 font-mono">{param.name}</span>
                                    {param.type === 'boolean' ? (
                                        <input
                                            type="checkbox"
                                            checked={param.value === 'true'}
                                            onChange={(e) => {
                                                const newParams = [...params]
                                                newParams[index].value = e.target.checked ? 'true' : 'false'
                                                setParams(newParams)
                                            }}
                                            className="rounded border-emerald-900/20 text-emerald-600 focus:ring-emerald-500"
                                        />
                                    ) : (
                                        <input
                                            type={param.type}
                                            value={param.value}
                                            onChange={(e) => {
                                                const newParams = [...params]
                                                newParams[index].value = e.target.value
                                                setParams(newParams)
                                            }}
                                            className="flex-1 px-3 py-2 border border-emerald-900/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {body.length > 0 && (
                    <div>
                        <label className="block text-sm font-medium text-charcoal mb-2 font-accent">
                            📦 Request Body
                        </label>
                        <div className="space-y-2">
                            {body.map((param, index) => (
                                <div key={param.name} className="flex items-center space-x-2">
                                    <span className="text-sm text-charcoal/70 w-32 font-mono">{param.name}</span>
                                    <input
                                        type={param.type}
                                        value={param.value}
                                        onChange={(e) => {
                                            const newBody = [...body]
                                            newBody[index].value = e.target.value
                                            setBody(newBody)
                                        }}
                                        className="flex-1 px-3 py-2 border border-emerald-900/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="flex items-center space-x-2 border-b border-emerald-900/10">
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`px-4 py-2 text-sm font-accent transition-colors ${activeTab === 'preview'
                                ? 'text-emerald-600 border-b-2 border-emerald-600'
                                : 'text-charcoal/60 hover:text-charcoal'
                            }`}
                    >
                        Preview
                    </button>
                    <button
                        onClick={() => setActiveTab('curl')}
                        className={`px-4 py-2 text-sm font-accent transition-colors ${activeTab === 'curl'
                                ? 'text-emerald-600 border-b-2 border-emerald-600'
                                : 'text-charcoal/60 hover:text-charcoal'
                            }`}
                    >
                        cURL
                    </button>
                </div>

                {/* cURL Preview */}
                {activeTab === 'curl' && (
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-charcoal font-accent">Request Command</label>
                            <button
                                onClick={copyCode}
                                className="flex items-center space-x-1 text-sm text-emerald-600 hover:text-emerald-700 font-accent"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                <span>{copied ? 'Copied!' : 'Copy'}</span>
                            </button>
                        </div>
                        <SyntaxHighlighter
                            language="bash"
                            style={oneDark}
                            customStyle={{ borderRadius: '0.5rem', fontSize: '13px' }}
                        >
                            {generateCurlCommand()}
                        </SyntaxHighlighter>
                    </div>
                )}

                {/* Execute Button */}
                <button
                    onClick={makeRequest}
                    disabled={loading || (requiresAuth && !apiKey)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-emerald-900 hover:bg-emerald-800 disabled:bg-charcoal/20 disabled:cursor-not-allowed text-white rounded-lg font-accent transition-all shadow-lg hover:shadow-glow-emerald"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Executing...</span>
                        </>
                    ) : (
                        <>
                            <Play className="w-4 h-4" />
                            <span>Try It Now! 🚀</span>
                        </>
                    )}
                </button>
            </div>

            {/* Response Section */}
            <AnimatePresence>
                {response && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-emerald-900/10"
                    >
                        <div className="bg-charcoal px-6 py-3 border-b border-white/10">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-white/60 font-accent">Response</span>
                                    <span className={`px-2 py-1 rounded text-xs font-mono ${response.status >= 200 && response.status < 300
                                            ? 'bg-emerald-500/20 text-emerald-400'
                                            : 'bg-rose-500/20 text-rose-400'
                                        }`}>
                                        {response.status} {response.statusText}
                                    </span>
                                    {response.time && (
                                        <span className="text-xs text-white/40 font-mono">
                                            ⚡ {response.time}ms
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-charcoal max-h-96 overflow-auto">
                            <SyntaxHighlighter
                                language="json"
                                style={oneDark}
                                customStyle={{ margin: 0, background: 'transparent' }}
                            >
                                {JSON.stringify(response.body || response, null, 2)}
                            </SyntaxHighlighter>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
