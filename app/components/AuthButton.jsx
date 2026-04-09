'use client'
import { createBrowserClient } from '@supabase/ssr'

export default function AuthButton({ className, text = "Sign in with Google" }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }

  // Matching the enhanced shadow and font-weight for the hero
  const defaultStyle = "bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-xl shadow-blue-600/20 text-lg"


  return (
    <button onClick={handleLogin} className={className || defaultStyle}>
      {text}
    </button>
  )
}