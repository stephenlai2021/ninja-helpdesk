import { redirect } from "next/navigation";

/* next-auth */
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";

/* supabase */
import createSupabaseServerClient from "@/config/supabase-server";

/* firebase */
import { initAdmin } from "@/config/firebase-admin";

/* clerk */
// import { ClerkProvider, auth, currentUser } from "@clerk/nextjs";

/* components */
import Navbar from "@/components/Navbar";

export default async function DashboardLayout({ children }) {
  /* supabase */
  // const supabase = await createSupabaseServerClient()
  // const { data: { session } } = await supabase.auth.getSession();
  // console.log("dashboard layout session: ", session);
  // if (!session) redirect("/login");

  /* clerk */
  // const user = await currentUser()
  // if (!user) redirect("/sign-in");

  /* firebase */
  // await initAdmin()

  /* next-auth */
  const session = await getServerSession();
  console.log("user session | dashboard: ", session?.user);
  if (!session || !session?.user) {
    /* next-auth default signin page */
    // redirect("/api/auth/signin");

    /* customize next-auth login page */
    redirect("/login");
  }

  return (
    <>
      {/* next-auth && supabase */}
      {/* <Navbar /> */}
      {/* pass user session to navbar on server side is faster than fetch user session in navbar */}
      <Navbar user={session?.user} />
      {children}

      {/* clerk */}
      {/* <Navbar />
      {children} */}
    </>
  );
}
