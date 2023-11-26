export default function TicketDetailsCard({ ticket }) {
  return (
    <div className="card">
      <h3>{ticket.title}</h3>
      <small>Created by {ticket.user_email}</small>
      <p>{ticket.body}</p>
      {/* <p>{new Date(ticket.created_at.toDate())}</p> */}
      {/* <p>{ticket.created_at.toDate().toISOString()}</p> */}
      <p>{ticket.created_at.toDate().toString()}</p>
      {/* <p>{new Date(ticket.created_at.seconds*1000)}</p> */}
      {/* <p>{new Date(ticket.createdAt._seconds * 1000).toLocaleDateString("en-US")}</p> */}
      <div className={`pill ${ticket.priority}`}>
        {ticket.priority} priority
      </div>
    </div>
  );
}
