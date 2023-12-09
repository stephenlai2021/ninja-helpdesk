import { redirect } from "next/navigation";

/* next-auth */
import { getServerSession } from "next-auth";

/* supabase */
import createSupabaseServerClient from "@/config/supabase-server";

/* clerk */
import { ClerkProvider, auth, currentUser } from "@clerk/nextjs";

/* components */
import Navbar from "@/components/Navbar";

export default async function DashboardLayout({ children }) {
  /* supabase auth */
  // const supabase = await createSupabaseServerClient();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  // if (!session) redirect("/login");

  /* clerk auth */
  // const user = await currentUser()
  // if (!user) redirect("/sign-in");

  /* 
    next-auth 
    default signin page 
    redirect("/api/auth/signin");
  */
  const session = await getServerSession();
  console.log("user session | dashboard: ", session?.user);
  if (!session || !session?.user) redirect("/login")

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
