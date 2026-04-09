'use client'
import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "Does SubPipe discover subdomains for me?",
      answer: "No. SubPipe is a vulnerability analysis engine, not a discovery tool. You bring the subdomains (using tools like subfinder, amass, or your own datasets), pipe them into the CLI, and SubPipe will tell you exactly which ones are vulnerable."
    },
    {
      question: "Is my recon data safe?",
      answer: "Absolutely. We do not store, log, or harvest your subdomains. The engine processes the domains in memory to determine vulnerability status and drops them immediately. We are built by bug bounty hunters, for bug bounty hunters."
    },
    {
      question: "Need more than 5,000 scans/month?",
      answer: "The free tier gives you 5,000 scans to get a feel for the engine's accuracy. If you are running high-volume enterprise recon or need unlimited API access, please reach out directly at saurabh.banawar@gmail.com to request an extended quota."
    },
    {
      question: "Who built SubPipe?",
      answer: (
        <>
          SubPipe was built by Saurabh Banawar, a security researcher and product manager with over a decade of experience in access control and infrastructure vulnerabilities. You can connect with him on{' '}
          <a href="https://www.linkedin.com/in/saurabh-banawar-766834140/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">
            LinkedIn
          </a>.
        </>
      )
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 max-w-3xl mx-auto px-8 w-full">
      <h2 className="text-4xl font-extrabold text-slate-900 text-center mb-10 tracking-tight">FAQ</h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
            >
              <span className="font-bold text-slate-900 pr-4">{faq.question}</span>
              <svg 
                className={`w-5 h-5 text-blue-600 transform transition-transform duration-200 shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}