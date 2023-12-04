import { redirect } from "next/navigation";

/* context */
import { CountContext } from "@/context/counter";

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
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  // console.log("user session | dashboard layout: ", session);
  if (!session) redirect("/login");

  /* clerk */
  // const user = await currentUser()
  // if (!user) redirect("/sign-in");

  /* firebase */
  // await initAdmin()

  /* next-auth */
  // const session = await getServerSession();
  // console.log("user session | dashboard: ", session?.user);
  // if (!session || !session?.user) {
  //   /* next-auth default signin page */
  //   // redirect("/api/auth/signin");

  //   /* customize next-auth login page */
  //   redirect("/login");
  // }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
