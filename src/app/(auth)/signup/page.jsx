"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

/* supabase */
import { supabaseClient } from '@/config/supabase'

/* firebase */
import { createUserWithEmailAndPassword } from 'firebase/auth'

// components
import AuthForm from "@/components/AuthForm"

export default function Signup() {
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmitFirebase = async (e, email, password) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("user: ", user);
      router.refresh();
      router.push("/verify");
    } catch (error) {
      console.log('error code: ', error.code)
      console.log('error message: ', error.message)
      setError(error.message);
    }
  };

  const handleSubmitSupabase = async (e, email, password) => {
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

      <AuthForm handleSubmit={handleSubmitFirebase} />

      {error && (
        <div className="error">{error}</div>
      )}
    </main>
  )
}