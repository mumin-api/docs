'use client'

import { useState } from 'react'
import { Play, RotateCcw, Copy, Check } from 'lucide-react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface CodePlaygroundProps {
    code: string
    language?: string
    runnable?: boolean
    scope?: Record<string, any>
    showPreview?: boolean
}

export function CodePlayground({
    code,
    language = 'javascript',
    runnable = false,
    scope = {},
    showPreview = false,
}: CodePlaygroundProps) {
    const [output, setOutput] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [currentCode, setCurrentCode] = useState(code)
    const [copied, setCopied] = useState(false)

    const runCode = async () => {
        setOutput('')
        setError('')

        try {
            // Create a mock console that captures output
            const logs: string[] = []
            const mockConsole = {
                log: (...args: any[]) => logs.push(args.map(String).join(' ')),
                error: (...args: any[]) => logs.push('ERROR: ' + args.map(String).join(' ')),
                warn: (...args: any[]) => logs.push('WARNING: ' + args.map(String).join(' ')),
            }

            // Run code with mock console
            const fn = new Function('console', 'fetch', currentCode)
            await fn(mockConsole, fetch)

            setOutput(logs.join('\n') || '✅ Code executed successfully!')
        } catch (err: any) {
            setError(err.message)
        }
    }

    const resetCode = () => {
        setCurrentCode(code)
        setOutput('')
        setError('')
    }

    const copyCode = () => {
        navigator.clipboard.writeText(currentCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (!runnable) {
        // Static code block
        return (
            <div className="my-6 border border-emerald-900/10 rounded-xl overflow-hidden bg-charcoal">
                <div className="bg-charcoal/50 px-4 py-2 flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center space-x-2">
                        <div className="flex space-x-1.5">
                            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                            <div className="w-3 h-3 rounded-full bg-gold-500"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        </div>
                        <span className="ml-3 text-xs text-white/40 font-mono">{language}</span>
                    </div>
                    <button
                        onClick={copyCode}
                        className="flex items-center space-x-1 text-sm text-white/60 hover:text-white transition-colors"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                </div>
                <div className="p-4">
                    <SyntaxHighlighter
                        language={language}
                        style={oneDark}
                        customStyle={{
                            margin: 0,
                            background: 'transparent',
                            fontSize: '14px',
                        }}
                    >
                        {code}
                    </SyntaxHighlighter>
                </div>
            </div>
        )
    }

    // Interactive code playground
    return (
        <div className="my-6 border border-emerald-900/10 rounded-xl overflow-hidden bg-charcoal shadow-islamic">
            {/* Toolbar */}
            <div className="bg-charcoal/50 px-4 py-2 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center space-x-2">
                    <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                        <div className="w-3 h-3 rounded-full bg-gold-500"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                    <span className="ml-3 text-xs text-white/40 font-mono">{language}</span>
                    <span className="text-xs text-gold-400 font-accent">✨ Live Editor</span>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={resetCode}
                        className="p-1.5 text-white/60 hover:text-white rounded transition-colors"
                        title="Reset"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                        onClick={copyCode}
                        className="p-1.5 text-white/60 hover:text-white rounded transition-colors"
                        title="Copy"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={runCode}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm transition-colors"
                    >
                        <Play className="w-3 h-3" />
                        <span>Run</span>
                    </button>
                </div>
            </div>

            {/* Code Editor */}
            {showPreview ? (
                <LiveProvider code={currentCode} scope={scope} theme={oneDark as any}>
                    <div className="grid md:grid-cols-2">
                        <div className="p-4 border-r border-white/10">
                            <LiveEditor
                                onChange={(newCode) => setCurrentCode(newCode)}
                                style={{
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                    fontSize: '14px',
                                    background: 'transparent',
                                }}
                            />
                        </div>
                        <div className="p-4 bg-white">
                            <LivePreview />
                        </div>
                    </div>
                    <LiveError className="text-rose-400 p-4 text-sm border-t border-white/10" />
                </LiveProvider>
            ) : (
                <div className="p-4">
                    <textarea
                        value={currentCode}
                        onChange={(e) => setCurrentCode(e.target.value)}
                        className="w-full h-64 bg-transparent text-ivory font-mono text-sm resize-none focus:outline-none"
                        spellCheck={false}
                    />
                </div>
            )}

            {/* Output */}
            {(output || error) && (
                <div className="border-t border-white/10 p-4">
                    <div className="text-xs text-white/40 mb-2 font-accent">Output:</div>
                    {error ? (
                        <div className="text-rose-400 font-mono text-sm">{error}</div>
                    ) : (
                        <pre className="text-emerald-400 font-mono text-sm whitespace-pre-wrap">
                            {output}
                        </pre>
                    )}
                </div>
            )}
        </div>
    )
}
