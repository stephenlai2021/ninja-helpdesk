import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// const cookieStore = cookies();
// const supabase = createServerClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//   {
//     cookies: {
//       get(name) {
//         return cookieStore.get(name)?.value;
//       },
//       set(name, value, options) {
//         cookieStore.set({ name, value, ...options });
//       },
//       remove(name, options) {
//         cookieStore.set({ name, value: "", ...options });
//       },
//     },
//   }
// );

const cookieStore = cookies()
const supabase = createServerComponentClient({ cookies: () => cookieStore });

export default async function AuthLayout({ children }) {
  // const { data } = await supabase.auth.getSession();
  // console.log('auth layout session: ', data.session)

  // if (data.session) redirect("/");

  return (
    <>
      <nav className="px-4">
        <Link href="/">
          <h1>Dojo Helpdesk</h1>
        </Link>
        <Link href="/signup">Regiser</Link>
        <Link href="/login">Login</Link>
      </nav>
      {children}
    </>
  );
}
