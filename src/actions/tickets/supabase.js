"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { createServerClient } from "@supabase/ssr";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

// const supabase = createServerActionClient({ cookies: () => cookieStore })

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

const supabase = createServerActionClient({ cookies });

export async function getTickets() {
  // await new Promise(resolve => setTimeout(resolve, 3000))

  const { data, error } = await supabase
    .from("ninja-helpdesk")
    .select();

  if (error) console.log(error.message);
  return data;
}

export async function getTicket(id) {
  // await new Promise(resolve => setTimeout(resolve, 3000))

  const { data } = await supabase
    .from("ninja-helpdesk")
    .select()
    .eq("id", id)
    .single();

  if (!data) notFound();
  return data;
}

export async function addTicket(ticket) {
  const {
    data: { session },
  } = await supabase.auth.getSession({ cookies });

  const { data, error } = await supabase
    .from("ninja-helpdesk")
    .insert({
      ...ticket,
      user_email: session.user.email,
    })
    .select()
    .single();

  return { data, error };
}
