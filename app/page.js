import Hero from './components/Hero'
import AuthButton from './components/AuthButton'
import UserNav from './components/UserNav'
import Features from './components/Features'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function Home() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          // Server Components are read-only
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  let apiKey = null
  let avatarUrl = null
  let scansRemaining = 5000 // Fallback

  if (session) {
    avatarUrl = session.user.user_metadata?.avatar_url
    
    // FETCH THE CORRECT COLUMNS
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('api_key, scan_count, allowed_scan_count')
      .eq('id', session.user.id)
      .single()

    if (error) {
      console.error("Supabase fetch error:", error.message)
    }

    apiKey = profile?.api_key || 'ERROR_RETRIEVING_KEY'
    
    // CALCULATE REMAINING SCANS
    if (profile) {
      const allowed = profile.allowed_scan_count ?? 5000
      const used = profile.scan_count ?? 0
      scansRemaining = allowed - used
    }
  }

  return (
    <main className="min-h-screen flex flex-col selection:bg-blue-200 selection:text-blue-900">
      
      <nav className="flex items-center justify-between py-6 px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 font-extrabold text-2xl tracking-tight text-slate-900">
          <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          SubPipe
        </div>
        {!session ? (
          <AuthButton className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm text-sm" />
        ) : (
          <UserNav avatarUrl={avatarUrl} />
        )}
      </nav>

      <div className="flex-grow flex flex-col justify-center pb-20">
        {/* Pass the calculated value to the Hero */}
        <Hero apiKey={apiKey} scansRemaining={scansRemaining} />
        <Features />
        <FAQ />
      </div>

      <Footer />
    </main>
  )
}