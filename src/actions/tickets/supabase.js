"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { createServerClient } from "@supabase/ssr";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";


// const cookieStore = cookies();
// const supabase = createServerActionClient({ cookies: () => cookieStore })

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

// export async function addTicket(ticket) {
//   const {
//     data: { session },
//   } = await supabase.auth.getSession({ cookies });

//   const { data, error } = await supabase
//     .from("ninja-helpdesk")
//     .insert({
//       ...ticket,
//       user_email: session.user.email,
//     })
//     .select()
//     .single();

//   return { data, error };
// }

export async function addTicketFormData(formData) {
  const ticket = Object.fromEntries(formData)
  console.log('ticket: ', ticket)
  
  /* When using formData + server actions, an item '$ACTION_ID_03acda53bf9a11717f791aaf7589ef1207793a80' will be inserted into formData, 
    we have to manually remove it from our ticket object in order to insert data successfully !!!
    Example:
    new ticket:  {
      '$ACTION_ID_03acda53bf9a11717f791aaf7589ef1207793a80': '',
      title: "what's wrong with supabase + server actions ???",
      body: 'blah blah blah',
      priority: 'low'
    }
  */
  delete ticket.$ACTION_ID_03acda53bf9a11717f791aaf7589ef1207793a80
  console.log('filtered ticket: ', ticket)

  // const { data: { session } } = await supabase.auth.getSession()

  const { data, error } = await supabase.from('ninja-helpdesk')
    .insert({
      ...ticket,
      // user_email: session.user.email,
      user_email: "test123@gmail.com",
    })
    .select()
    // .single()

  if (error) throw new Error('Could not add the new ticket.')
  // if (error) console.log('Error: Could not add the new ticket.')

  if (data) {
    console.log('ticket returned: ', data)
    revalidatePath('/tickets')
    redirect('/tickets')
  }
}
