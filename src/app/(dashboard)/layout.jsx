import { redirect } from "next/navigation";

/* next-auth */
import { getServerSession } from "next-auth";

/* supabase */
// import { supabaseServer } from '@/config/supabase'
import createSupabaseServerClient from "@/config/supabase-server";

/* firebase */
import { initAdmin } from "@/config/firebase-admin";

/* components */
import Navbar from "@/components/Navbar";
// next-auth
import SessionProvider from "@/components/SessionProvider";
/* end of components */

export default async function DashboardLayout({ children }) {
  /* supabase */
  // const { data } = await supabaseServer.auth.getSession();
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession();
  console.log("dashboard layout session: ", session);
  if (!session) redirect("/login");

  /* firebase */
  // await initAdmin()

  /* next-auth */
  // const session = await getServerSession();
  // console.log('session: ', session)
  // if (!session || !session.user) {
  //   // redirect("/api/auth/signin");
  //   redirect("/login");
  // }

  return (
    <>
      {/* next-auth */}
      {/* <SessionProvider session={session}>
        <Navbar user={session.user} />
        {children}
      </SessionProvider> */}

      {/* supabase */}
      <Navbar user={session.user} />
      {children}
    </>
  );
}
