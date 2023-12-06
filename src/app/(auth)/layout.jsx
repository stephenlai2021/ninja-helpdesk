import Link from "next/link";
import { redirect } from "next/navigation";

/* supabase */
import createSupabaseServerClient from "@/config/supabase-server";

/* next-auth */
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";

/* clerk */
import { ClerkProvider, auth, currentUser } from "@clerk/nextjs";

export default async function AuthLayout({ children }) {
  /* supabase auth */
  // const supabase = await createSupabaseServerClient();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  // console.log("user session | auth layout ", session);
  // if (session) redirect("/");

  /* clerk auth*/
  // const user = await currentUser();
  // console.log("user | clerk: ", user);
  // if (user) redirect("/");

  /* firebase */

  /* nextauth */
  const session = await getServerSession();
  console.log("user session | auth layout: ", session);
  if (session?.user) redirect("/");

  return (
    <>
      <nav className="px-4">
        <Link href="/">
          <h1>Dojo Helpdesk</h1>
        </Link>
        <Link href="/signup">Sign up</Link>
        <Link href="/login">Log in</Link>
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
