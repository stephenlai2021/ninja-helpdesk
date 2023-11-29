import Link from "next/link";
import { redirect } from "next/navigation";

/* supabase */
// import { supabaseServer } from '@/config/supabase'
import createSupabaseServerClient from "@/config/supabase-server";

/* next-auth */
import { getServerSession } from "next-auth";

/* components */
// next-auth
import SessionProvider from "@/components/SessionProvider";

export default async function AuthLayout({ children }) {
  /* supabase */
  const supabase = await createSupabaseServerClient();
  // const { data } = await supabaseServer.auth.getSession();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log("auth layout session: ", session);
  if (session) redirect("/");

  /* firebase */

  /* next-auth */
  // const session = await getServerSession();
  // console.log("session: ", session);
  // if (session?.user) {
  //   redirect("/");
  // }

  return (
    <>
      {/* next-auth */}
      {/* <SessionProvider session={session}>
        <nav className="px-4">
          <Link href="/">
            <h1>Dojo Helpdesk</h1>
          </Link>
          <Link href="/signup">Regiser</Link>
          <Link href="/login">Login</Link>
        </nav>
        {children}
      </SessionProvider> */}

      {/* supabase */}
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
