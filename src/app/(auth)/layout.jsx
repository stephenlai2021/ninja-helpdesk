import Link from "next/link";
import { redirect } from "next/navigation";
import { supabaseServer } from '@/config/supabase'

export default async function AuthLayout({ children }) {
  const { data } = await supabaseServer.auth.getSession();
  console.log('auth layout session: ', data.session)

  if (data.session) redirect("/");

  return (
    <>
      <nav className="px-4">
        <Link href="/">
          <h1>Dojo Helpdesk</h1>
        </Link>
        <Link href="/signup">Regiser</Link>
        <Link href="/login">Login</Link>
      </nav>
      {children}
    </>
  );
}
