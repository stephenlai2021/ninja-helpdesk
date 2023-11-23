// import { getTicket } from "@/actions/tickets/supabase";
import { getTicket } from "@/actions/tickets/appwrite";
// import { getTicket } from "@/actions/tickets/json-server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerClient } from "@supabase/ssr";
import {  cookies } from 'next/headers'

// components
import TicketDetailsCard from "@/components/TicketDetailsCard";
import DeleteButton from "@/components/DeleteButton";

// export const dynamicParams = true;

// const cookieStore = cookies();
// const supabase = createServerClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//   {
//     cookies: {
//       get(name) {
//         return cookieStore.get(name)?.value;
//       }
//     },
//   }
// );

// const supabase = createServerComponentClient( { cookies })
// export async function generateMetadata({ params }) {
//   const res = await fetch('http://localhost:4000/tickets/' + params.id)

//   const { data: ticket } = await supabase.from('ninja-helpdesk-tickets')
//     .select()
//     .eq('id', params.id)
//     .single()	

// 	return {
//     title: `Dojo Helpdesk | ${ticket?.title || 'Ticket not Found'}`
// 	}
// }

export default async function TicketDetailsPage({ params }) {
  const ticket = await getTicket(params.id);
  console.log('ticket: ', ticket)

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        <div className="ml-auto">
          {/* {data.session.user.email === ticket.user_email && (
            <DeleteIcon id={ticket.id} />
          )} */}
          {/* supabase && json-server */}
          {/* <DeleteButton id={ticket.id} /> */}
          {/* appwrite */}
          <DeleteButton id={ticket.$id} />
        </div>
      </nav>
      
      <TicketDetailsCard ticket={ticket} />
    </main>
  );
}
