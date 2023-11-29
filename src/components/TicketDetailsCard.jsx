/* next-auth */
import { getServerSession } from "next-auth";

/* supabase */
import createSupabaseServerClient from "@/config/supabase-server";

/* components */
import Image from "next/image";

export default async function TicketDetailsCard({ ticket }) {
  /* next-auth */
  // const session = await getServerSession();
  // console.log("user | next-auth: ", session.user);

  /* supabase */
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  console.log("user | supabase: ", session.user);

  return (
    <div className="card">
      <div className="flex">
        <div>
          <h3>{ticket.title}</h3>
          <small>Created by {ticket.user_email}</small>
        </div>
        <div className="ml-auto">
          {/* next-auth */}
          {/* <Image
            src={
              session?.user?.image ||
              "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
            }
            className="rounded-full border border-sm"
            width={35}
            height={35}
            alt="user image"
            quality={100}
          /> */}

          {/* supabase */}
          <Image
            src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
            className="rounded-full border border-sm"
            width={35}
            height={35}
            alt="user image"
            quality={100}
          />
        </div>
      </div>
      <p>{ticket.body}</p>

      {/* firebase */}
      {/* <p>{ticket.created_at.toDate().toString()}</p> */}

      {/* supabase */}
      <p>{ticket.created_at}</p>

      <div className={`pill ${ticket.priority}`}>
        {ticket.priority} priority
      </div>
    </div>
  );
}
