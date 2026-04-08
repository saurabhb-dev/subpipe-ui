'use client'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function UserNav({ avatarUrl }) {
  const router = useRouter()
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh() // Reloads the page to clear the session state
  }

  return (
    <div className="flex items-center gap-5">
      {avatarUrl ? (
        <img 
          src={avatarUrl} 
          alt="Hunter Avatar" 
          className="w-10 h-10 rounded-full border-2 border-slate-200 shadow-sm" 
          referrerPolicy="no-referrer" // Prevents Google image blocking
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
          H
        </div>
      )}
      <button 
        onClick={handleLogout}
        className="text-sm font-bold text-slate-500 hover:text-rose-600 transition"
      >
        Logout
      </button>
    </div>
  )
}