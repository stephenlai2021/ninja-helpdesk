import Link from "next/link";
import { redirect } from "next/navigation";

/* supabase */
import createSupabaseServerClient from "@/config/supabase-server";

/* next-auth */
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";

/* clerk */
// import { ClerkProvider, auth, currentUser } from "@clerk/nextjs";

export default async function AuthLayout({ children }) {
  /* supabase */
  // const supabase = await createSupabaseServerClient();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  // console.log("auth layout session: ", session);
  // if (session) redirect("/");

  /* clerk */
  // const user = await currentUser();
  // console.log("user | clerk: ", user);
  // if (user) redirect("/");

  /* firebase */

  /* next-auth */
  const session = await getServerSession();
  console.log("user session | auth layout: ", session);
  if (session?.user) redirect("/");

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

      {/* clerk */}
      {/* <nav className="px-4">
        <Link href="/">
          <h1>Dojo Helpdesk</h1>
        </Link>
      </nav>
      {children} */}
    </>
  );
}
