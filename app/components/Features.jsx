export default function Features() {
  const currentVulns = [
    "Standard HTTP Subdomain Takeovers (via Nuclei templates).",
    "A Record Takeovers (Dangling Cloud IPs validated against AWS/GCP ranges). (ipv4)",
    "NS & MX Record Hijacking (Integrating automated registrar availability checks).",
    "Dangling CNAMEs to Internal RFC1918 IPs (SSRF enablers).",
    "Expired Domain Hijacking (Classic CNAMEs)."
  ]

  const upcomingVulns = [
    "TXT Record Secret Leakage (API keys, tokens).",
    "Unrestricted Zone Transfers (AXFR).",
    "BIMI & DMARC Delegation Takeovers.",
    "AAAA Record Takeovers (Dangling Cloud IPs validated against AWS/GCP ranges). (ipv6)"
  ]

  const bashScript = `targets=("demo-aws.subpipe.run" "demo-ipv6.subpipe.run" "demo-gcp.subpipe.run" "demo-ns.subpipe.run" "demo-mx.subpipe.run" "demo-s3-x912.subpipe.run" "demo-surge.subpipe.run" "demo-azure.subpipe.run" "demo-eb.subpipe.run" "analytics.google.com" "elements.heroku.com" "tasks.google.com" "cloud.google.com" "dead-domain.subpipe.run" "alt-dead-domain.subpipe.run" "internal-test.subpipe.run" "cname-ssrf.subpipe.run")\n\nprintf "%s\\n" "\${targets[@]}" > subdomains.txt\ncat subdomains.txt | subpipe`;

  return (
    <section className="pt-6 pb-24 max-w-7xl mx-auto px-8 w-full">
      
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">The SubPipe Arsenal</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">We do one thing, and we do it better than anyone else. Binary findings across the entire DNS spectrum.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Active Detection Grid */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Active Detection</h3>
          </div>
          <ul className="space-y-4">
            {currentVulns.map((vuln, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-600">
                <svg className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span className="text-sm font-medium">{vuln}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Coming Soon Grid */}
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 border-dashed">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Shipping Next</h3>
          </div>
          <ul className="space-y-4">
            {upcomingVulns.map((vuln, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-500">
                <svg className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <span className="text-sm font-medium">{vuln}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Installation & Test Block */}
      <div className="mt-16 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Side: Context & Install */}
        <div className="p-8 lg:w-1/3 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Built in Go.</h3>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            SubPipe is a lightning-fast, single-binary CLI tool. Install it directly via Go or grab the latest release from our <a href="https://github.com/subpipe/subpipe" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">GitHub repository</a>.
          </p>
          
          <div className="mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Step 1: Install</div>
          <div className="bg-[#0D1117] p-3 rounded-lg font-mono text-xs text-slate-300 shadow-inner mb-6 flex justify-between items-center group">
            <span className="overflow-x-auto"><span className="text-emerald-400">$</span> go install github.com/subpipe/subpipe@latest</span>
          </div>

          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Step 2: Test Instantly</div>
          <p className="text-xs text-slate-500 mt-1">Run the script on the right to verify engine outputs against real vulnerabilities that we hosted for you on *.subpipe.run</p>
          <div className="bg-[#0D1117] p-3 rounded-lg font-mono text-xs text-slate-300 shadow-inner mb-6 flex justify-between items-center group">
            <span className="overflow-x-auto"><span className="text-emerald-400">$</span> subfinder -d target.com -silent | subpipe</span>
          </div>
          
        </div>
        
        {/* Right Side: The Bash Script */}
        <div className="p-6 lg:w-2/3 bg-[#0D1117] relative flex flex-col justify-center">
          <div className="flex space-x-2 mb-4">
            <div className="w-2.5 h-2.5 bg-rose-500 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-amber-500 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
          </div>
          <pre className="text-xs sm:text-sm font-mono text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap break-all">
            {bashScript}
          </pre>
        </div>

      </div>
    </section>
  )
}