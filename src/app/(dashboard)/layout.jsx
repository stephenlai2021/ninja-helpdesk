import { redirect } from "next/navigation";

/* next-auth */
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";

/* supabase */
import createSupabaseServerClient from "@/config/supabase-server";

/* firebase */
import { initAdmin } from "@/config/firebase-admin";

/* clerk */
import { ClerkProvider, auth, currentUser } from "@clerk/nextjs";

/* components */
import Navbar from "@/components/Navbar";

export default async function DashboardLayout({ children }) {
  /* supabase */
  // const supabase = await createSupabaseServerClient()
  // const { data: { session } } = await supabase.auth.getSession();
  // console.log("dashboard layout session: ", session);
  // if (!session) redirect("/login");
  
  /* clerk */
  const user = await currentUser()
  // console.log('user | dashboard layout: ', user._User)
  if (!user) redirect("/sign-in");


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
      {/* <Navbar user={session.user} />
      {children} */}

      {/* clerk */}
      {/* <ClerkProvider> */}
        <Navbar />
        {children}
      {/* </ClerkProvider> */}
    </>
  );
}
