import { redirect } from "next/navigation";

/* supabase */
// import { supabaseServer } from '@/config/supabase'

/* firebase */
import { initAdmin } from "@/config/firebase-admin";

// components
import Navbar from "@/components/Navbar";

export default async function DashboardLayout({ children }) {
  /* supabase */  
  // const { data } = await supabaseServer.auth.getSession();
  // console.log("dashboard layout session: ", data.session);
  // if (!data.session) redirect("/login");

  /* firebase */
  await initAdmin()
  
  
  return (
    <>
      {/* <Navbar user={data.session.user} /> */}
      <Navbar />
      {children}
    </>
  );
}
