import { redirect } from "next/navigation";
import { supabaseServer } from '@/config/supabase'

// components
import Navbar from "@/components/Navbar";

export default async function DashboardLayout({ children }) {  
  const { data } = await supabaseServer.auth.getSession();
  console.log("dashboard layout session: ", data.session);

  if (!data.session) redirect("/login");

  return (
    <>
      <Navbar user={data.session.user} />
      {children}
    </>
  );
}
