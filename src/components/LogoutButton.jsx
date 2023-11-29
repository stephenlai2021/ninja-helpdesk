"use client";

import { useRouter } from "next/navigation";

/* supabase */
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import createSupabaseClient from "@/config/supabase-client";

/* firebase */
import { firebaseAuth } from "@/config/firebase";
// import { signOut } from "firebase/auth";

/* next-auth */
// import { signIn, signOut, useSession } from "next-auth/react";

export default function LogoutButton() {
  const router = useRouter()
  
  const handleLogoutSupabase = async () => {
    // const supabase = createClientComponentClient()
    const supabase = await createSupabaseClient()
    const { error } = await supabase.auth.signOut();

    if (!error) router.push('/login');
  };

  const handleLogoutFirebase = async () => {
    await signOut(firebaseAuth)
    consle.log('user signout successfully!')

    router.push('/login')
  }

  /* supabase */
  return <button onClick={handleLogoutSupabase}>Logout</button>;
  
  /* firebase */
  // return <button onClick={handleLogoutFirebase}>Logout</button>;

  /* next-auth */
  // return <button className="pr-"  onClick={() => signOut({ callbackUrl: "/login" })}>Logout</button>;
}
