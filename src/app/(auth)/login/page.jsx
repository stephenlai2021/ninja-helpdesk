"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createBrowserClient } from "@supabase/ssr";

// components
import AuthForm from "@/components/AuthForm";

// const supabase = createBrowserClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );
const supabase = createClientComponentClient()

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  
  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    setError("");
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      console.log('login error: ', error.message)
    }
    if (!error) {
      router.refresh()
      router.push("/");
    }
  };

  return (
    <main>
      <h2 className="text-center">Login</h2>
      <AuthForm handleSubmit={handleSubmit} />
      {error && <div className="error">{error}</div>}
    </main>
  );
}
