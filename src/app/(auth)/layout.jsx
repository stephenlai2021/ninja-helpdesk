import Link from "next/link";
import { redirect } from "next/navigation";

/* supabase */
// import { supabaseServer } from '@/config/supabase'

/* next-auth */
import { getServerSession } from "next-auth";

/* components */
import SessionProvider from "@/components/SessionProvider";

export default async function AuthLayout({ children }) {
  /* supabase */
  // const { data } = await supabaseServer.auth.getSession();
  // console.log('auth layout session: ', data.session)
  // if (data.session) redirect("/");

  /* firebase */

  /* next-auth */
  const session = await getServerSession();
  console.log("session: ", session);
  if (session?.user) {
    redirect("/");
  }

  return (
    <>
      <SessionProvider session={session}>
        <nav className="px-4">
          <Link href="/">
            <h1>Dojo Helpdesk</h1>
          </Link>
          <Link href="/signup">Regiser</Link>
          <Link href="/login">Login</Link>
        </nav>
        {children}
      </SessionProvider>
    </>
  );
}
