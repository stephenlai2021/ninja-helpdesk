import { getTicket } from "@/actions/tickets";
import Loading from "@/app/loading";
import TicketDetailsCard from "@/components/TicketDetailsCard";
import { Suspense } from "react";

export const dynamicParams = true;

export async function generateStaticParams() {
  const res = await fetch("http://localhost:4000/tickets");

  const tickets = await res.json();

  return tickets.map((ticket) => ({
    id: ticket.id,
  }));
}

export default async function TicketDetails({ params }) {
  const ticket = await getTicket(params.id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      
      <TicketDetailsCard ticket={ticket} />
    </main>
  );
}
