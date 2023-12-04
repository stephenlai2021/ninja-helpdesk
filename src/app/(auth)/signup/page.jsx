"use client"

/* react */
import { useState } from 'react'

/* next */
import { useRouter } from 'next/navigation'

/* zustand */
import useCountStore from '@/stores/zustand/count'

/* context */
import { CounterContext } from "@/context/counter";
import { useContext } from "react";

/* supabase */
import createSupabaseClient from '@/config/supabase-client'

/* firebase */
import { firebaseAuth } from '@/config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

/* components */
import AuthForm from "@/components/AuthForm"
import SignupForm from '@/components/SignupForm'

export default function Signup() {
  /* react */  
  const [error, setError] = useState('')

  /* next */
  const router = useRouter()

  /* zustand */
  // const { count, dec, inc } = useCountStore()

  /* context */
  const { appState, incrementCounter, decrementCounter } = useContext(CounterContext)

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
      console.log("signup user: ", user);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log('error code: ', error.code)
      console.log('error message: ', error.message)
      setError(error.message);
    }
  };

  const handleSubmitSupabase = async (e, email, password) => {
    e.preventDefault()
    setError('')

    const supabase = await createSupabaseClient()
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

      {/* supabase */}
      {/* <h2 className="text-center">Register</h2> */}

      {/* <h2>Zustand</h2>
      <div className="flex">
        <span className="flex items-center">{count}</span>
        <button onClick={inc}>one up</button>
        <button onClick={dec}>one down</button>
      </div> */}

       {/* context */}
       <div className="flex">
        <span className="flex items-center">{appState.counter}</span>
        <button onClick={incrementCounter}>increment</button>
        <button onClick={decrementCounter}>decrement</button>
      </div>

      <AuthForm handleSubmit={handleSubmitSupabase} auth="Sign up" />
      {error && <div className="error">{error}</div>}
      
      {/* nextauth + mongodb */}
      {/* <SignupForm /> */}

      {/* firebase */}
      {/* <AuthForm handleSubmit={handleSubmitFirebase} /> */}
      {/* {error && <div className="error">{error}</div>} */}

    </main>
  )
}