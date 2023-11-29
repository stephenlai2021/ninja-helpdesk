import { getServerSession } from "next-auth";

/* components */
import Image from "next/image";

export default async function TicketDetailsCard({ ticket }) {
  const session = await getServerSession();
  console.log("user: ", session.user);

  return (
    <div className="card">
      <div className="flex">
        <div>
          <h3>{ticket.title}</h3>
          <small>Created by {ticket.user_email}</small>
        </div>
        <div className="ml-auto">
          <Image
            src={
              session?.user?.image ||
              "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
            }
            className="rounded-full border border-sm"
            width={35}
            height={35}
            alt="user image"
            quality={100}
          />
        </div>
      </div>
      <p>{ticket.body}</p>
      <p>{ticket.created_at.toDate().toString()}</p>
      <div className={`pill ${ticket.priority}`}>
        {ticket.priority} priority
      </div>
    </div>
  );
}
