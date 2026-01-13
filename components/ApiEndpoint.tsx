'use client'

interface ApiEndpointProps {
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE'
    path: string
    auth?: 'required' | 'optional' | 'none'
}

export function ApiEndpoint({ method, path, auth = 'required' }: ApiEndpointProps) {
    const methodColors = {
        GET: 'bg-emerald-100 text-emerald-700 border-emerald-300',
        POST: 'bg-gold-100 text-gold-700 border-gold-300',
        PATCH: 'bg-sapphire-100 text-sapphire-700 border-sapphire-300',
        DELETE: 'bg-rose-100 text-rose-700 border-rose-300',
    }

    return (
        <div className="my-6 p-6 bg-gradient-to-r from-emerald-50 to-gold-50/30 border border-emerald-900/10 rounded-xl shadow-islamic">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-3 flex-wrap">
                    <span className={`px-3 py-1 rounded-md text-sm font-mono font-bold border ${methodColors[method]}`}>
                        {method}
                    </span>
                    <code className="text-base md:text-lg font-mono text-charcoal break-all">
                        <span className="text-charcoal/40">https://api.mumin.ink</span>
                        <span className="text-emerald-600">{path}</span>
                    </code>
                </div>

                {auth === 'required' && (
                    <span className="px-3 py-1 bg-gold-100 border border-gold-300 text-gold-700 rounded-md text-xs font-medium flex items-center space-x-1">
                        <span>🔐</span>
                        <span>Auth Required</span>
                    </span>
                )}
                {auth === 'optional' && (
                    <span className="px-3 py-1 bg-sapphire-100 border border-sapphire-300 text-sapphire-700 rounded-md text-xs font-medium">
                        🔓 Auth Optional
                    </span>
                )}
            </div>
        </div>
    )
}
