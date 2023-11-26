// import { getTicket } from "@/actions/tickets/supabase";
import { getTicket } from "@/actions/tickets/firebase";
// import { getTicket } from "@/actions/tickets/appwrite";
// import { getTicket } from "@/actions/tickets/json-server";

/* supabase */
import { supabaseServer } from "@/config/supabase";

/* firebase */
import { firebaseDb } from "@/config/firebase";
import { doc, getDoc } from 'firebase/firestore'

// components
import TicketDetailsCard from "@/components/TicketDetailsCard";
import DeleteButton from "@/components/DeleteButton";

export async function generateMetadata({ params }) {
  /* json-server */
  // const res = await fetch('http://localhost:4000/tickets/' + params.id)

  /* appwrite */
  // const ticket = await databases.getDocument(
  //   "6559c1f61971f0447dbe",
  //   "6559ca511dc0f0ae8d5f",
  //   id
  // );

  /* firebase */
  const docSnap = await getDoc(doc(firebaseDb, "tickets", params.id));
  const ticket = docSnap.data()

  /* supabase */
  // const { data: ticket } = await supabaseServer
  //   .from("ninja-helpdesk")
  //   .select()
  //   .eq("id", params.id)
  //   .single();

  return {
    title: `Dojo Helpdesk | ${ticket?.title || "Ticket not Found"}`,
  };
}

export default async function TicketDetailsPage({ params }) {
  const ticket = await getTicket(params.id);
  console.log("ticket details: ", ticket);
  
  /* supabase */
  // const { data: { session } } = await supabaseServer.auth.getSession();
  // console.log("user session: ", session);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        <div className="ml-auto">
          {/* // supabase  */}
          {/* {session?.user.email === ticket.user_email && (
            <DeleteButton id={ticket.id} /> 
          )} */}

          {/* firebase */}
          <DeleteButton id={params.id} /> 


          {/* json-server */}
          {/* <DeleteButton id={ticket.id} /> */}

          {/* appwrite */}
          {/* <DeleteButton id={ticket.$id} /> */}
        </div>
      </nav>
      <TicketDetailsCard ticket={ticket} /> 
    </main>
  );
}
