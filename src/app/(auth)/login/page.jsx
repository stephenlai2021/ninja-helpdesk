"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* supabase */
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

/* firebase */
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/config/firebase";

// components
import AuthForm from "@/components/AuthForm";


export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  
  const handleSubmitFirebase = async (e, email, password) => {
    e.preventDefault();
    setError("");
    
    try {      
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("signin user: ", user);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log('error code: ', error.code)
      console.log('error message: ', error.message)
      setError(error.message);
    }
  };

  const handleSubmitSupabase = async (e, email, password) => {
    e.preventDefault();
    setError("");

    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      console.log("login error: ", error.message);
    }
    if (!error) {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <main>
      <h2 className="text-center">Login</h2>
      {/* <AuthForm handleSubmit={handleSubmitSupabase} /> */}
      <AuthForm handleSubmit={handleSubmitFirebase} />
      {error && <div className="error">{error}</div>}
    </main>
  );
}
