'use client'
import { useState } from 'react'

export default function Onboarding({ apiKey }) {
  const [tool, setTool] = useState('subfinder')

  const commands = {
    subfinder: `subfinder -d target.com -silent | SUBPIPE_KEY=${apiKey} ./subpipe`,
    amass: `amass enum -d target.com | SUBPIPE_KEY=${apiKey} ./subpipe`,
    txt: `cat subdomains.txt | SUBPIPE_KEY=${apiKey} ./subpipe`
  }

  return (
    <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl max-w-3xl mx-auto mt-12 text-white">
      <h2 className="text-2xl font-bold mb-6">Choose Your Fighter</h2>
      <div className="flex space-x-4 mb-8">
        {['subfinder', 'amass', 'txt'].map((t) => (
          <button
            key={t}
            onClick={() => setTool(t)}
            className={`px-6 py-2 rounded font-semibold transition ${
              tool === t ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>
      
      <div className="relative group">
        <div className="absolute -top-3 left-4 bg-gray-900 px-2 text-xs text-gray-500 font-mono">Terminal Command</div>
        <pre className="bg-black p-6 rounded border border-gray-700 overflow-x-auto">
          <code className="text-green-400 font-mono">{commands[tool]}</code>
        </pre>
        <button 
          onClick={() => navigator.clipboard.writeText(commands[tool])}
          className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 text-xs rounded border border-gray-600 transition"
        >
          Copy
        </button>
      </div>
      
      <div className="flex items-center justify-between mt-6 text-sm">
        <span className="text-gray-500">Quota: 5,000 scans remaining. No daily caps.</span>
        <span className="text-cyan-500 font-bold">API Key Active</span>
      </div>
    </div>
  )
}