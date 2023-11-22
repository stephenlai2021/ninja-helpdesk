import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// components
import Navbar from "@/components/Navbar";

export default async function DashboardLayout({ children }) {
  const cookieStore = cookies()
  // const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const supabase = createServerComponentClient({ cookies })

  // const cookieStore = cookies();
  // const supabase = createServerClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  //   {
  //     cookies: {
  //       get(name) {
  //         return cookieStore.get(name)?.value;
  //       },
  //     },
  //   }
  // );

  // const { data } = await supabase.auth.getSession();
  // console.log('dashboard layout session: ', data.session)

  // if (!data.session) redirect("/login");

  return (
    <>
      {/* <Navbar user={data.session.user} /> */}
      <Navbar />
      {children}
    </>
  );
}
