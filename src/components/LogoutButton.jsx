"use client";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { firebaseAuth } from "@/config/firebase";
import { signOut } from "firebase/auth";

export default function LogoutButton() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  
  const handleLogoutSupabase = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) router.push('/login');
  };

  const handleLogoutFirebase = async () => {
    await signOut(firebaseAuth)
    consle.log('user signout successfully!')

    router.push('/login')
  }

  // return <button onClick={handleLogoutSupabase}>Logout</button>;
  return <button onClick={handleLogoutFirebase}>Logout</button>;
}
