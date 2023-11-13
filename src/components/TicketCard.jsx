import Link from 'next/link'

export default function TicketCard({ ticket }) {
  return (
    <div key={ticket.id} className="card my-5">
      <Link href={`tickets/${ticket.id}`}>
        <h3>{ticket.title}</h3>
        <p>{ticket.body.slice(0, 200)}...</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </Link>
    </div>
  );
}
