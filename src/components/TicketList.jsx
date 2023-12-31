// import { getTickets } from "@/actions/tickets/supabase";
import { getTickets } from "@/actions/tickets/mongodb";
// import { getTickets } from "@/actions/tickets/firebase";
// import { getTickets } from "@/actions/tickets/appwrite";
// import { getTickets } from "@/actions/tickets/json-server";

/* components */
import TicketCard from "./TicketCard";

export default async function TicketList() {
  const tickets = await getTickets();
  console.log('tickets | ticket list ', tickets)

  return (
    <>
      {tickets.map((ticket) => (
        /* appwrite */
        // <div key={ticket.$id} className="card my-5"> 
        //   <TicketCard ticket={ticket} />
        // </div>        

        /* supabase && firebase && json-server */
        // <div key={ticket.id} className="card my-5"> 
        //   <TicketCard ticket={ticket} />
        // </div>

        /* mongodb */
        <div key={ticket._id} className="card my-5"> 
          <TicketCard ticket={ticket} />
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  );
}
