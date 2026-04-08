'use client'
import { useState } from 'react'
import AuthButton from './AuthButton'

export default function Hero({ apiKey, scansRemaining }) {
  const [copied, setCopied] = useState(false)

  const command = `cat subdomains.txt | ./subpipe --SUBPIPE_API_KEY=${apiKey}`

  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isExhausted = scansRemaining <= 0;

  return (
    <section className="pt-16 md:pt-20 pb-8 md:pb-10 max-w-7xl mx-auto px-8 w-full flex flex-col xl:flex-row items-center gap-12 xl:gap-16">

      {/* LEFT COLUMN: Text & CTA */}
      <div className="flex-1 text-center xl:text-left">
        <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
          Detect DNS Vulnerabilities <br className="hidden xl:block" />
          With <span className="text-blue-600">Absolute Accuracy.</span>
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto xl:mx-0 leading-relaxed">
          A high-octane sniper engine designed for bug bounty hunters. Stop chasing theoretical noise, get verified takeovers, dangling cloud IPs, and SSRF enablers with zero false positives.
        </p>

        <div className="flex flex-col items-center xl:items-start gap-4 w-full">
          {!apiKey ? (
            <AuthButton
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 text-lg w-full sm:w-auto"
            />
          ) : (
            <div className="w-full max-w-lg text-left animate-in fade-in slide-in-from-bottom-4 duration-500">

              {/* Terminal Command Box (FIXED WRAPPING) */}
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

              {/* Dynamic Status Indicator */}
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

                {isExhausted ? (
                  <p className="text-xs text-slate-500 ml-4">
                    Quota reached. Email <a href="mailto:saurabh.banawar@gmail.com" className="text-blue-600 font-bold hover:underline">saurabh.banawar@gmail.com</a> to request an extension.
                  </p>
                ) : (
                  <div className="mt-2 ml-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 shadow-sm animate-in fade-in duration-500">
                    <span className="font-bold text-slate-800">💡 Pro Tip:</span> Keep your key out of your bash history.
                    <code className="block mt-2 p-2 bg-white rounded border border-slate-200 font-mono text-[11px] sm:text-xs select-all text-blue-600 cursor-pointer hover:border-blue-300 transition-colors" title="Click to select all">
                      export SUBPIPE_API_KEY={apiKey}
                    </code>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Terminal Window */}
      <div className="flex-1 w-full max-w-3xl mx-auto">
        <div className="bg-[#0D1117] rounded-xl shadow-2xl overflow-hidden border border-slate-800 text-left font-mono transform xl:rotate-1 transition hover:rotate-0 duration-300">
          <div className="bg-[#161B22] px-4 py-3 flex items-center gap-2 border-b border-slate-800">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-500 text-xs ml-2 font-sans font-medium">saurabh@prashrut: ~/subpipe-cli</span>
          </div>
          <div className="p-5 text-[10px] sm:text-xs text-slate-300 space-y-1 overflow-x-auto whitespace-pre">
            <p className="text-white">$ cat subdomains.txt | ./subpipe</p>
            <p className="text-blue-400 mt-2 mb-2">🚀 SubPipe Analysis Started: 26 targets sent to https://api.subpipe.run/v1/scan</p>
            <p className="text-slate-600">----------------------------------------------------------------------</p>
            <p><span className="text-cyan-400">[13:38:52] LOW</span>      Internal/RFC1918 IP Exposure (SSRF Enabler): internal-test.subpipe.run [10.0.0.5]</p>
            <p><span className="text-cyan-400">[13:38:52] LOW</span>      Internal/RFC1918 IP Exposure (SSRF Enabler): cname-ssrf.subpipe.run [10.0.0.5]</p>
            <p><span className="text-rose-500 font-bold">[13:38:52] HIGH</span>     Mail Exchange (MX) Domain Expired: alt-dead-domain.subpipe.run [Takeover: definitely-not-registered-alt-subpipe-123.com]</p>
            <p><span className="text-purple-500 font-bold">[13:38:52] CRITICAL</span> Nameserver Domain Expired: demo-ns.subpipe.run [Takeover: definitely-not-registered-subpipe-123.com]</p>
            <p><span className="text-amber-400">[13:38:57] MEDIUM</span>   Potential GCP Elastic IP Takeover: demo-gcp.subpipe.run [GCP - 34.152.86.1]</p>
            <p><span className="text-rose-500 font-bold">[13:39:00] HIGH</span>     ElasticBeanstalk Subdomain Takeover Detection: demo-eb.subpipe.run</p>
            <p><span className="text-slate-600">----------------------------------------------------------------------</span></p>
            <p className="text-emerald-400 font-bold mt-2">✅ Scan Finished in 44.34s</p>
          </div>
        </div>
      </div>

    </section>
  )
}