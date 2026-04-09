'use client'
import { useState } from 'react'
import AuthButton from './AuthButton'

export default function Hero({ apiKey, scansRemaining }) {
  const [copied, setCopied] = useState(false)

  const command = `cat subdomains.txt | subpipe --SUBPIPE_API_KEY=${apiKey}`

  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isExhausted = scansRemaining <= 0;

  return (
    <section className="pt-16 md:pt-24 pb-12 md:pb-20 max-w-7xl mx-auto px-8 w-full flex flex-col xl:flex-row items-center gap-12 xl:gap-20">

      {/* LEFT COLUMN: Text & CTA */}
      <div className="flex-1 text-center xl:text-left">
        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
          Stop Chasing Ghosts. <br className="hidden xl:block" />
          Detect DNS Vulns with <span className="text-blue-600">Zero Noise.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto xl:mx-0 leading-relaxed">
          A high-fidelity engine built to eliminate theoretical false positives. Get verified takeovers, dangling cloud IPs, and SSRF enablers—not just 'potential' leads.
        </p>

        <div className="flex flex-col items-center xl:items-start gap-4 w-full">
          {!apiKey ? (
            <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
              {/* Primary CTA with "The Why" */}
              <AuthButton
                text="Sign in with Google to get an API key"
                className="bg-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-xl shadow-blue-600/20 text-base md:text-lg w-full lg:w-auto whitespace-nowrap"
              />
              
              {/* GitHub CTA - Forced to 1 line */}
              <a 
                href="https://github.com/subpipe/subpipe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-4 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition text-base md:text-lg w-full lg:w-auto whitespace-nowrap"
              >
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                View on GitHub
              </a>
            </div>
          ) : (
            <div className="w-full max-w-lg text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className={`p-3 pl-4 rounded-xl border flex items-center justify-between gap-4 shadow-2xl transition-colors ${isExhausted ? 'bg-rose-950/20 border-rose-900/50' : 'bg-[#0D1117] border-slate-800'}`}>
                <code className={`font-mono text-sm whitespace-pre-wrap break-all ${isExhausted ? 'text-rose-400/50 line-through' : 'text-emerald-400'}`}>
                  {command}
                </code>
                <button
                  onClick={handleCopy}
                  disabled={isExhausted}
                  className={`shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition ${isExhausted ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              {/* Status and Pro Tip sections remain the same */}
              <div className="flex flex-col gap-1.5 mt-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative shrink-0">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isExhausted ? 'bg-rose-400' : 'bg-emerald-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isExhausted ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
                  </span>
                  {isExhausted ? (
                    <p className="text-sm font-bold text-rose-600">API Key Exhausted. 0 scans remaining.</p>
                  ) : (
                    <p className="text-sm text-slate-600 font-medium">
                      API Key Active. <span className="text-slate-900 font-bold">{scansRemaining.toLocaleString()}</span> scans remaining.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Terminal Window (Matches your enhanced design) */}
      <div className="flex-1 w-full max-w-3xl mx-auto perspective-1000">
        <div className="bg-[#0D1117] rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] overflow-hidden border border-slate-800 text-left font-mono transform xl:rotate-2 xl:scale-105 hover:rotate-0 hover:scale-110 transition-all duration-500 ease-out">
          <div className="bg-[#161B22] px-4 py-3 flex items-center gap-2 border-b border-slate-800">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            <span className="text-slate-500 text-xs ml-2 font-sans font-medium tracking-wide">saurabh@prashrut: ~/subpipe-cli</span>
          </div>
          
          <div className="p-6 text-[11px] sm:text-xs text-slate-300 space-y-1.5 overflow-x-auto whitespace-pre leading-relaxed">
            <p className="text-white opacity-90">$ cat subdomains.txt | subpipe</p>
            <p className="text-blue-400 mt-3 mb-3 font-medium">🚀 SubPipe Analysis Started: 26 targets sent to api.subpipe.run</p>
            
            <div className="space-y-1 border-y border-slate-800/50 py-3">
              <p><span className="text-cyan-400/90">[13:38:52] LOW</span>      Internal/RFC1918 IP Exposure (SSRF): internal-test.subpipe.run</p>
              <p><span className="text-rose-500 font-bold">[13:38:52] HIGH</span>     MX Domain Expired: <span className="underline decoration-rose-500/30">alt-dead-domain.subpipe.run</span></p>
              <p><span className="text-purple-400 font-bold animate-pulse">[13:38:52] CRITICAL</span> Nameserver Takeover: demo-ns.subpipe.run [Verified]</p>
              <p><span className="text-amber-400">[13:38:57] MEDIUM</span>   Potential GCP Elastic IP Takeover: demo-gcp.subpipe.run</p>
              <p><span className="text-rose-500 font-bold">[13:39:00] HIGH</span>     ElasticBeanstalk Takeover Detected: demo-eb.subpipe.run</p>
            </div>
            
            <p className="text-emerald-400 font-bold pt-2 flex items-center gap-2">
              <span>✅ Scan Finished in 44.34s</span>
              <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse"></span>
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}