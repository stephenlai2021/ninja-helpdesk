import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const res = await fetch("http://localhost:4000/tickets/" + params.id);
  const ticket = await res.json();

  if (!res.ok) {
    return NextResponse.json({
      error: "Could not find the ticket",
    }, {
      status: 404 
    });
  }

  return NextResponse.json(ticket, { status: 200 })
}
