// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

const cookieStore = cookies();
const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value;
      },
      set(name, value, options) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name, options) {
        cookieStore.set({ name, value: "", ...options });
      },
    },
  }
);

export async function GET() {
  const res = await fetch("http://localhost:4000/tickets", {
    next: {
      revalidate: 0 // disable cache, force fetch database every time
      // revalidate: 60, // 每隔 60 秒 fetch json-server
    },
  });
  const tickets = await res.json()

  return NextResponse.json(tickets, { status: 200 })
}

export async function POST(request) {
  const ticket = await request.json()

  // const supabase = createRouteHandlerClient({ cookies })

  const { data: { session } } = await supabase.auth.getSession()

  const { data, error } = await supabase.from('ninja-helpdesk-tickets')
    .insert({
      ...ticket,
      user_email: session.user.email
    })
    // .insert(ticket)
    .select()
    .single()

  return NextResponse.json({ data, error })

  /* insert new ticket to json-server */
  // const res = await fetch('http://localhost:4000/tickets', {
  //   method: 'POST',
  //   headers: 'Content-Type: application/json',
  //   body: JSON.Stringify(ticket)
  // })
  // const newTicket = res.json()
  // return NextResponse.json(newTicket, { status: 201 })
}