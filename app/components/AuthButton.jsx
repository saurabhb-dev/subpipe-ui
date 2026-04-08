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

  // Use the passed className, or default to the blue style from your screenshot
  const defaultStyle = "bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
  
  return (
    <button onClick={handleLogin} className={className || defaultStyle}>
      {text}
    </button>
  )
}