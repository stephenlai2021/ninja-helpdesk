import { getTickets } from "@/actions/tickets";
import Link from "next/link";
import TicketCard from "./TicketCard";

export default async function TicketList() {
  const tickets = await getTickets();

  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <TicketCard ticket={ticket} />
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  );
}
