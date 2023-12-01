"use server";

import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/* supabase */
import createSupabaseServerClient from "@/config/supabase-server";

/* clerk */
// import { ClerkProvider, auth, currentUser } from "@clerk/nextjs";

export async function getTickets() {
  // await new Promise(resolve => setTimeout(resolve, 3000))

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("ninja-helpdesk")
    .select()
    .order("created_at", { ascending: false });

  if (error) console.log(error.message);
  return data;
}

export async function getTicket(id) {
  // await new Promise(resolve => setTimeout(resolve, 3000))

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("ninja-helpdesk")
    .select()
    .eq("id", id)
    .single();

  if (!data) notFound();
  return data;
}

// export async function addTicket(ticket) {
// const supabase = await createSupabaseServerClient();
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
  // const ticket = Object.fromEntries(formData);
  // console.log("ticket: ", ticket);
  // delete ticket.$ACTION_ID_03acda53bf9a11717f791aaf7589ef1207793a80;
  // console.log("filtered ticket: ", ticket);

  const title = formData.get("title");
  const body = formData.get("body");
  const priority = formData.get("priority");
  console.log("title: ", title);
  console.log("body: ", body);
  console.log("priority: ", priority);

  /* supabase */
  const supabase = await createSupabaseServerClient();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  /* clerk */
  const user = await currentUser()
  const userEmail = user.emailAddresses[0].emailAddress

  const { data, error } = await supabase
    .from("ninja-helpdesk")

    /* supabase */
    // .insert({
    //   title,
    //   body,
    //   priority,
    //   user_email: session?.user.email || "test123@gmail.com",
    // })

    /* clerk */
    .insert({
      title,
      body,
      priority,
      user_email: userEmail || "test123@gmail.com",
    })
    .select();

  if (error) throw new Error("Could not add the new ticket.");
  if (data) {
    console.log("ticket returned: ", data);
    revalidatePath("/tickets");
    redirect("/tickets");
  }
}

export async function deleteTicket(id) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("ninja-helpdesk").delete().eq("id", id);

  if (error) throw new Error("Could not delete the ticket.");

  revalidatePath("/tickets");
  redirect("/tickets");
}
