import { redirect } from "next/navigation";

/* next-auth */
import { getServerSession } from "next-auth";

/* supabase */
// import { supabaseServer } from '@/config/supabase'

/* firebase */
import { initAdmin } from "@/config/firebase-admin";

// components
import Navbar from "@/components/Navbar";
import SessionProvider from "@/components/SessionProvider";

export default async function DashboardLayout({ children }) {
  /* supabase */
  // const { data } = await supabaseServer.auth.getSession();
  // console.log("dashboard layout session: ", data.session);
  // if (!data.session) redirect("/login");

  /* firebase */
  // await initAdmin()

  /* next-auth */
  const session = await getServerSession();
  console.log('session: ', session)
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  
  return (
    <>
      <SessionProvider session={session}>
        <Navbar user={session.user} />
        {/* <Navbar /> */}
        {children}
      </SessionProvider>
    </>
  );
}
