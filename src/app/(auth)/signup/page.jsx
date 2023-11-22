"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// components
import AuthForm from "@/components/AuthForm"

// const cookieStore = cookies();
// const supabase = createBrowserClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

const supabase = createClientComponentClient()

export default function Signup() {
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e, email, password) => {
    e.preventDefault()
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`
      }
    })

    if (error) {
      setError(error.message)
      console.log('signup error: ', error.message)
    }
    if (!error) {
      router.refresh()
      router.push('/verify') 
    }
  }

  return (
    <main>
      <h2 className="text-center">Register</h2>

      <AuthForm handleSubmit={handleSubmit} />

      {error && (
        <div className="error">{error}</div>
      )}
    </main>
  )
}