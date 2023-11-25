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

// const supabase = createBrowserClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );
const supabase = createClientComponentClient();

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
      console.log("user: ", user);
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
      <AuthForm handleSubmit={handleSubmitSupabase} />
      {error && <div className="error">{error}</div>}
    </main>
  );
}
