import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  // If we have a code, exchange it for a session
  if (code) {
    const cookieStore = await cookies() // Await mandatory in Next.js 15/16

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // Ignore if called from Server Component
            }
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Auth Callback Error:', error.message)
      // Redirect to an error page or back home with a message
      return NextResponse.redirect(`${origin}/auth-error`)
    }
  }

  // URL to redirect to after sign-in process completes
  // This pushes the user back to the homepage where their API Key will appear
  return NextResponse.redirect(origin)
}