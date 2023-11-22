"use client";

// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
// import { cookies } from 'next/headers'

// const cookieStore = cookies();
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LogoutButton() {
  const router = useRouter()
  
  const handleLogout = async () => {
    // const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signOut();

    if (!error) router.push('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
