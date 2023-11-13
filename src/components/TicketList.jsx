import { getTickets } from "@/actions/tickets";
import Link from "next/link";
import TicketCard from "./TicketCard";

export default async function TicketList() {
  const tickets = await getTickets();

  return (
    <>
      {tickets.map((ticket) => (
        <TicketCard ticket={ticket} />
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  );
}
