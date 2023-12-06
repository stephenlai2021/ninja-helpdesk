// import { getTicket } from "@/actions/tickets/supabase";
import { getTicket } from "@/actions/tickets/mongodb";
// import { getTicket } from "@/actions/tickets/firebase";
// import { getTicket } from "@/actions/tickets/appwrite";
// import { getTicket } from "@/actions/tickets/json-server";

/* clerk */
// import { auth, currentUser } from "@clerk/nextjs";

/* supabase */
import createSupabaseServerClient from "@/config/supabase-server";

/* firebase */
import { firebaseDb } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

/* mongodb */
import Ticket from '@/models/ticket'

/* next-auth */
import { getServerSession } from "next-auth";

/* components */
import TicketDetailsCard from "@/components/TicketDetailsCard";
import DeleteButton from "@/components/DeleteButton";

export async function generateMetadata({ params }) {
  /* json-server */
  // const res = await fetch('http://localhost:4000/tickets/' + params.id)
  // const ticket = res.json()

  /* appwrite */
  // const ticket = await databases.getDocument(
  //   "6559c1f61971f0447dbe",
  //   "6559ca511dc0f0ae8d5f",
  //   id
  // );

  /* firebase */
  // const docSnap = await getDoc(doc(firebaseDb, "tickets", params.id));
  // const ticket = docSnap.data()

  /* supabase */
  // const supabase = await createSupabaseServerClient();
  // const { data: ticket } = await supabase
  //   .from("ninja-helpdesk")
  //   .select()
  //   .eq("id", params.id)
  //   .single();

  /* mongodb */
  const ticket = await Ticket.findById(params.id)

  return {
    title: `Dojo Helpdesk | ${ticket?.title || "Ticket not Found"}`,
  };
}

export default async function TicketDetailsPage({ params }) {
  const ticket = await getTicket(params.id);
  console.log("ticket | ticket details: ", ticket);

  /* supabase auth */
  // const supabase = await createSupabaseServerClient();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  // console.log('session | ticket details: ', session?.user);

  /* clerk auth */
  // const user = await currentUser()
  // console.log('user: ', user)
  // console.log('user email: ', user.emailAddresses[0].emailAddress)
  // const userEmail = user.emailAddresses[0].emailAddress

  /* nextauth */
   const session = await getServerSession();
   console.log("session | ticket details: ", session);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        <div className="ml-auto">
          {/* supabase  */}
          {/* {session?.user.email === ticket.user_email && <DeleteButton id={ticket.id} />} */}

          {/* nextauth + mongodb */}
          {session?.user.email === ticket?.user_email && <DeleteButton id={ticket._id} />}

          {/* clerk */}
          {/* {userEmail === ticket.user_email && <DeleteButton id={ticket.id} />} */}

          {/* firebase */}
          {/* <DeleteButton id={params.id} />  */}

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
