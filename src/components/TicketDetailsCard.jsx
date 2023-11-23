import React from 'react'

export default function TicketDetailsCard({ ticket }) {
  return (
    // <div className="card" key={ticket.id}>
    <div className="card" key={ticket.$id}>
      <h3>{ticket.title}</h3>
      <small>Created by {ticket.user_email}</small>
      <p>{ticket.body}</p>
      <div className={`pill ${ticket.priority}`}>
        {ticket.priority} priority
      </div>
    </div>
  );
}
